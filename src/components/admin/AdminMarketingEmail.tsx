import { useRef, useState, type FormEvent } from "react";
import { BookUser, Loader2, Search, Send, Users } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminMarketingContacts } from "@/components/admin/AdminMarketingContacts";
import { getAdminMarketingContacts } from "@/functions/adminMarketingContacts";
import { sendAdminDirectMarketingEmail } from "@/functions/sendAdminDirectMarketingEmail";

type AddressBookContact = {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  marketing_consent: boolean;
  is_suppressed: boolean;
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Email could not be sent.";
}

function countAddresses(value: string) {
  return new Set(
    value
      .split(/[\s,;]+/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  ).size;
}

export function AdminMarketingEmail() {
  const [view, setView] = useState<"send" | "contacts">("send");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [permissionConfirmed, setPermissionConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    sentCount: number;
    suppressedCount: number;
    failed: Array<{ email: string; error: string }>;
  } | null>(null);
  const [addressBookOpen, setAddressBookOpen] = useState(false);
  const [addressBookContacts, setAddressBookContacts] = useState<AddressBookContact[]>([]);
  const [addressBookQuery, setAddressBookQuery] = useState("");
  const [addressBookOffset, setAddressBookOffset] = useState(0);
  const [addressBookTotal, setAddressBookTotal] = useState(0);
  const [addressBookLoading, setAddressBookLoading] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const requestId = useRef<string | null>(null);
  const recipientCount = countAddresses(recipients);

  const invalidateRequest = () => {
    requestId.current = null;
    setResult(null);
  };

  const loadAddressBook = async (query = addressBookQuery, offset = 0) => {
    setAddressBookLoading(true);
    try {
      const result = await getAdminMarketingContacts({
        data: { query, offset, includeArchived: false },
      });
      setAddressBookContacts(result.contacts);
      setAddressBookOffset(result.offset);
      setAddressBookTotal(result.totalCount);
    } catch (error: unknown) {
      toast.error(errorMessage(error));
    } finally {
      setAddressBookLoading(false);
    }
  };

  const openAddressBook = () => {
    setAddressBookOpen(true);
    setAddressBookQuery("");
    setSelectedContacts(new Set());
    void loadAddressBook("", 0);
  };

  const addSelectedContacts = () => {
    const merged = new Set(
      recipients
        .split(/[\s,;]+/)
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean),
    );
    selectedContacts.forEach((email) => merged.add(email));
    setRecipients([...merged].join(", "));
    invalidateRequest();
    setAddressBookOpen(false);
    setSelectedContacts(new Set());
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requestId.current) requestId.current = crypto.randomUUID();
    setSending(true);
    setResult(null);
    try {
      const response = await sendAdminDirectMarketingEmail({
        data: {
          recipients,
          subject,
          htmlContent,
          permissionConfirmed: true,
          requestId: requestId.current,
        },
      });
      setResult(response);
      requestId.current = null;
      if (response.failed.length > 0) {
        toast.warning(`${response.sentCount} sent; ${response.failed.length} failed.`);
      } else {
        toast.success(
          `${response.sentCount} sent${response.suppressedCount ? `; ${response.suppressedCount} suppressed` : ""}.`,
        );
      }
    } catch (error: unknown) {
      toast.error(errorMessage(error));
    } finally {
      setSending(false);
    }
  };

  const preview = `<!doctype html><html><body style="margin:0;padding:24px;font-family:Arial,sans-serif">${htmlContent}</body></html>`;

  return (
    <section className="space-y-6" aria-labelledby="direct-email-title">
      <div className="inline-flex border border-slate-200" role="tablist" aria-label="Email tools">
        <Button
          type="button"
          role="tab"
          aria-selected={view === "send"}
          variant={view === "send" ? "default" : "ghost"}
          onClick={() => setView("send")}
          className="h-9 rounded-none text-xs"
        >Send email</Button>
        <Button
          type="button"
          role="tab"
          aria-selected={view === "contacts"}
          variant={view === "contacts" ? "default" : "ghost"}
          onClick={() => setView("contacts")}
          className="h-9 rounded-none text-xs"
        >Address book</Button>
      </div>

      {view === "contacts" ? <AdminMarketingContacts /> : (
        <div className="space-y-5">
          <header className="border-b border-slate-200 pb-4">
            <h2 id="direct-email-title" className="font-display text-xl font-extrabold text-slate-900">Send an email</h2>
            <p className="mt-1 text-xs text-slate-500">Send one private copy to each address. Recipients do not see one another.</p>
          </header>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="direct-recipients" className="text-xs font-semibold text-slate-700">To</label>
                  <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={openAddressBook} className="h-8 rounded-[2px] px-2.5 text-[10px]">
                      <BookUser className="mr-1.5 h-3.5 w-3.5" /> Choose contacts
                    </Button>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><Users className="h-3 w-3" />{recipientCount} / 100</span>
                  </div>
                </div>
                <textarea
                  id="direct-recipients"
                  value={recipients}
                  onChange={(event) => { setRecipients(event.target.value); invalidateRequest(); }}
                  required
                  placeholder="name@example.com, another@example.com"
                  aria-describedby="recipient-hint"
                  className="min-h-24 w-full resize-y border border-slate-200 p-3 font-mono text-xs leading-5 text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <p id="recipient-hint" className="text-[10px] text-slate-500">Separate addresses with commas, spaces, or new lines. Maximum 100 per send.</p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="direct-subject" className="text-xs font-semibold text-slate-700">Subject</label>
                <Input
                  id="direct-subject"
                  value={subject}
                  onChange={(event) => { setSubject(event.target.value); invalidateRequest(); }}
                  maxLength={150}
                  required
                  placeholder="Email subject"
                  className="h-10 rounded-[2px]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="direct-html" className="text-xs font-semibold text-slate-700">Message HTML</label>
                  <span className="text-[10px] text-slate-400">HTML supported</span>
                </div>
                <textarea
                  id="direct-html"
                  value={htmlContent}
                  onChange={(event) => { setHtmlContent(event.target.value); invalidateRequest(); }}
                  maxLength={100_000}
                  required
                  spellCheck={false}
                  placeholder={"<h1>Hello</h1>\n<p>Your message</p>"}
                  className="min-h-64 w-full resize-y border border-slate-200 p-3 font-mono text-xs leading-5 text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <label className="flex items-start gap-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={permissionConfirmed}
                  onChange={(event) => setPermissionConfirmed(event.target.checked)}
                  className="mt-0.5 accent-orange-700"
                />
                <span>I have permission to email these recipients.</span>
              </label>

              <Button
                type="submit"
                disabled={sending || recipientCount === 0 || recipientCount > 100 || !permissionConfirmed}
                className="h-10 rounded-[2px] bg-slate-900 px-4 text-xs font-semibold text-white hover:bg-slate-800"
              >
                {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {sending ? "Sending" : `Send to ${recipientCount || "..."}`}
              </Button>

              {result && (
                <div className="border-l-4 border-emerald-700 bg-emerald-50 p-3 text-xs" role="status">
                  <p className="font-semibold text-slate-900">{result.sentCount} sent{result.suppressedCount ? ` · ${result.suppressedCount} suppressed` : ""}{result.failed.length ? ` · ${result.failed.length} failed` : ""}</p>
                  {result.failed.map((failure) => <p key={failure.email} className="mt-1 text-red-700">{failure.email}: {failure.error}</p>)}
                </div>
              )}
            </form>

            <div className="min-w-0">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-slate-700">Preview</h3>
                <span className="text-[10px] text-slate-400">Scripts disabled</span>
              </div>
              <iframe title="Email preview" sandbox="" srcDoc={preview} className="h-[480px] w-full border border-slate-200 bg-white" />
            </div>
          </div>
        </div>
      )}

      <Dialog open={addressBookOpen} onOpenChange={setAddressBookOpen}>
        <DialogContent className="max-w-2xl border-slate-200 bg-white">
          <DialogHeader>
            <DialogTitle>Select address book contacts</DialogTitle>
            <DialogDescription>Choose contacts to add to the To field. Existing recipients are kept and duplicates are removed.</DialogDescription>
          </DialogHeader>

          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void loadAddressBook(addressBookQuery.trim(), 0);
            }}
          >
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <Input
                value={addressBookQuery}
                onChange={(event) => setAddressBookQuery(event.target.value)}
                placeholder="Search name, email, company, or label"
                aria-label="Search address book"
                className="h-9 rounded-[2px] pl-8 text-xs"
              />
            </div>
            <Button type="submit" variant="outline" disabled={addressBookLoading} className="h-9 rounded-[2px] px-3 text-xs">Search</Button>
          </form>

          <div className="max-h-[48vh] overflow-y-auto border-y border-slate-200">
            {addressBookLoading ? (
              <div className="flex items-center justify-center gap-2 py-10 text-xs text-slate-500"><Loader2 className="h-4 w-4 animate-spin" />Loading contacts</div>
            ) : addressBookContacts.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-500">No contacts found.</div>
            ) : addressBookContacts.map((contact) => (
              <label key={contact.id} className={`flex items-center gap-3 border-b border-slate-100 px-3 py-2.5 last:border-0 ${contact.is_suppressed ? "opacity-50" : "hover:bg-slate-50"}`}>
                <Checkbox
                  checked={selectedContacts.has(contact.email)}
                  disabled={contact.is_suppressed}
                  onCheckedChange={(checked) => {
                    setSelectedContacts((current) => {
                      const next = new Set(current);
                      if (checked) next.add(contact.email);
                      else next.delete(contact.email);
                      return next;
                    });
                  }}
                  aria-label={`Select ${contact.name || contact.email}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium text-slate-800">{contact.name || contact.email}</span>
                  <span className="block truncate text-[10px] text-slate-500">{contact.name ? contact.email : contact.company || ""}{contact.name && contact.company ? ` · ${contact.company}` : ""}</span>
                </span>
                <span className={`shrink-0 text-[9px] ${contact.is_suppressed ? "text-red-700" : contact.marketing_consent ? "text-emerald-700" : "text-slate-500"}`}>
                  {contact.is_suppressed ? "Suppressed" : contact.marketing_consent ? "Opted in" : "No recorded opt-in"}
                </span>
              </label>
            ))}
          </div>

          <DialogFooter className="items-center justify-between gap-2 sm:justify-between">
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" disabled={addressBookLoading || addressBookOffset === 0} onClick={() => void loadAddressBook(addressBookQuery, Math.max(0, addressBookOffset - 50))} className="h-8 rounded-[2px] px-2.5 text-[10px]">Previous</Button>
              <Button type="button" variant="outline" disabled={addressBookLoading || addressBookOffset + 50 >= addressBookTotal} onClick={() => void loadAddressBook(addressBookQuery, addressBookOffset + 50)} className="h-8 rounded-[2px] px-2.5 text-[10px]">Next</Button>
              <span className="text-[10px] text-slate-500">{addressBookTotal} contacts</span>
            </div>
            <Button type="button" onClick={addSelectedContacts} disabled={selectedContacts.size === 0} className="h-9 rounded-[2px] px-3 text-xs">Add selected ({selectedContacts.size})</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}