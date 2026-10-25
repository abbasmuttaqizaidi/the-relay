import { useEffect, useState, type FormEvent } from "react";
import { Archive, Download, Loader2, Plus, RefreshCw, Search, Upload, UserRound, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  archiveAdminMarketingContact,
  getAdminMarketingContacts,
  importAdminMarketingContacts,
  saveAdminMarketingContact,
} from "@/functions/adminMarketingContacts";

type Contact = {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  notes: string | null;
  tags: string[];
  marketing_consent: boolean;
  consent_source: string | null;
  consent_at: string | null;
  archived_at: string | null;
  is_suppressed: boolean;
};

type ContactForm = {
  email: string;
  name: string;
  company: string;
  phone: string;
  notes: string;
  tags: string;
  marketingConsent: boolean;
  consentSource: string;
};

const EMPTY_FORM: ContactForm = {
  email: "",
  name: "",
  company: "",
  phone: "",
  notes: "",
  tags: "",
  marketingConsent: false,
  consentSource: "",
};
const PAGE_SIZE = 50;
const CSV_TEMPLATE =
  "email,name,company,phone,notes,tags,marketing_consent,consent_source,consent_at\n";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function AdminMarketingContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [subscribedCount, setSubscribedCount] = useState(0);
  const [suppressionCount, setSuppressionCount] = useState(0);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadContacts = async (nextOffset = offset, nextQuery = query, archived = includeArchived) => {
    const result = await getAdminMarketingContacts({
      data: { query: nextQuery, offset: nextOffset, includeArchived: archived },
    });
    setContacts(result.contacts);
    setTotalCount(result.totalCount);
    setSubscribedCount(result.subscribedCount);
    setSuppressionCount(result.suppressionCount);
    setOffset(result.offset);
  };

  useEffect(() => {
    loadContacts()
      .catch((error: unknown) => toast.error(errorMessage(error, "Could not load contacts.")))
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await saveAdminMarketingContact({
        data: {
          ...(editingId ? { id: editingId } : {}),
          email: form.email,
          name: form.name,
          company: form.company,
          phone: form.phone,
          notes: form.notes,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          marketingConsent: form.marketingConsent,
          consentSource: form.consentSource,
        },
      });
      toast.success(editingId ? "Contact updated." : "Contact added.");
      resetForm();
      await loadContacts(0, query);
    } catch (error: unknown) {
      toast.error(errorMessage(error, "Could not save this contact."));
    } finally {
      setSaving(false);
    }
  };

  const editContact = (contact: Contact) => {
    setEditingId(contact.id);
    setForm({
      email: contact.email,
      name: contact.name || "",
      company: contact.company || "",
      phone: contact.phone || "",
      notes: contact.notes || "",
      tags: contact.tags.join(", "),
      marketingConsent: contact.marketing_consent,
      consentSource: contact.consent_source || "",
    });
    document.getElementById("address-book-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const search = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(queryInput.trim());
    await loadContacts(0, queryInput.trim());
  };

  const toggleArchive = async (contact: Contact) => {
    const action = contact.archived_at ? "restore" : "archive";
    if (
      !window.confirm(
        `${action === "archive" ? "Archive" : "Restore"} ${contact.name || contact.email}?`,
      )
    ) {
      return;
    }
    setBusyId(contact.id);
    try {
      await archiveAdminMarketingContact({ data: { contactId: contact.id } });
      await loadContacts(offset, query);
      toast.success(action === "archive" ? "Contact archived." : "Contact restored." );
    } catch (error: unknown) {
      toast.error(errorMessage(error, "Could not update this contact."));
    } finally {
      setBusyId(null);
    }
  };

  const importFile = async (file?: File) => {
    if (!file) return;
    if (file.size > 1_000_000) {
      toast.error("CSV files must be 1 MB or smaller.");
      return;
    }
    setImporting(true);
    try {
      const result = await importAdminMarketingContacts({ data: { csv: await file.text() } });
      toast.success(
        `Imported ${result.importedCount} contact(s); ${result.subscribedCount} have recorded consent.`,
      );
      await loadContacts(0, query);
    } catch (error: unknown) {
      toast.error(errorMessage(error, "Could not import this CSV."));
    } finally {
      setImporting(false);
    }
  };

  const exportAll = async () => {
    setBusyId("export");
    try {
      const allContacts: Contact[] = [];
      for (let pageOffset = 0; pageOffset < totalCount; pageOffset += PAGE_SIZE) {
        const page = await getAdminMarketingContacts({
          data: { query, offset: pageOffset, includeArchived },
        });
        allContacts.push(...page.contacts);
      }
      downloadCsv(
        "relay-address-book.csv",
        [
          ["email", "name", "company", "phone", "notes", "tags", "marketing_consent", "consent_source", "consent_at"],
          ...allContacts.map((contact) => [
            contact.email,
            contact.name || "",
            contact.company || "",
            contact.phone || "",
            contact.notes || "",
            contact.tags.join(";"),
            String(contact.marketing_consent),
            contact.consent_source || "",
            contact.consent_at || "",
          ]),
        ],
      );
    } catch (error: unknown) {
      toast.error(errorMessage(error, "Could not export contacts."));
    } finally {
      setBusyId(null);
    }
  };

  const exportTemplate = () => {
    downloadCsv("relay-address-book-template.csv", [CSV_TEMPLATE.trimEnd().split(",")]);
  };

  const startIndex = totalCount === 0 ? 0 : offset + 1;
  const endIndex = Math.min(offset + PAGE_SIZE, totalCount);

  return (
    <section className="space-y-5" aria-labelledby="address-book-title">
      <div className="flex flex-col gap-3 border-b border-[#1f25301f] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="address-book-title" className="font-display text-xl font-extrabold text-slate-900">
            Email address book
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Store people and labels here. Contacts need recorded consent before they can receive campaigns.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <span>{totalCount.toLocaleString()} contact(s)</span>
          <span>{subscribedCount.toLocaleString()} opted in</span>
          <span>{suppressionCount.toLocaleString()} suppressed</span>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <form id="address-book-form" onSubmit={submitContact} className="space-y-3 border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {editingId ? "Edit contact" : "New contact"}
            </h3>
            {editingId ? (
              <Button type="button" variant="ghost" size="icon" aria-label="Cancel editing" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Plus className="h-4 w-4 text-slate-400" />
            )}
          </div>
          <Input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Email address"
            aria-label="Email address"
            required
            className="h-9 rounded-[2px] text-xs"
          />
          <Input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Name"
            aria-label="Name"
            className="h-9 rounded-[2px] text-xs"
          />
          <Input
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
            placeholder="Company"
            aria-label="Company"
            className="h-9 rounded-[2px] text-xs"
          />
          <Input
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="Phone"
            aria-label="Phone"
            className="h-9 rounded-[2px] text-xs"
          />
          <Input
            value={form.tags}
            onChange={(event) => setForm({ ...form, tags: event.target.value })}
            placeholder="Labels, separated by commas"
            aria-label="Labels"
            className="h-9 rounded-[2px] text-xs"
          />
          <textarea
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Notes"
            aria-label="Notes"
            maxLength={2000}
            className="min-h-20 w-full resize-y border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <label className="flex items-start gap-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={form.marketingConsent}
              onChange={(event) => setForm({ ...form, marketingConsent: event.target.checked })}
              className="mt-0.5 accent-orange-700"
            />
            <span>Explicit marketing consent has been recorded</span>
          </label>
          {form.marketingConsent && (
            <Input
              value={form.consentSource}
              onChange={(event) => setForm({ ...form, consentSource: event.target.value })}
              placeholder="Consent source (required)"
              aria-label="Consent source"
              required
              minLength={3}
              maxLength={200}
              className="h-9 rounded-[2px] text-xs"
            />
          )}
          <Button type="submit" disabled={saving} className="h-9 w-full rounded-[2px] text-xs">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {editingId ? "Save contact" : "Add contact"}
          </Button>
        </form>

        <div className="min-w-0 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={search} className="flex min-w-0 flex-1 gap-2">
              <div className="relative min-w-0 flex-1 sm:max-w-md">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <Input
                  value={queryInput}
                  onChange={(event) => setQueryInput(event.target.value)}
                  placeholder="Find a person, email, company, or label"
                  aria-label="Search contacts"
                  className="h-9 rounded-[2px] pl-8 text-xs"
                />
              </div>
              <Button type="submit" variant="outline" className="h-9 rounded-[2px] px-3 text-xs">
                Search
              </Button>
            </form>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIncludeArchived(!includeArchived);
                  loadContacts(0, query, !includeArchived).catch((error: unknown) =>
                    toast.error(errorMessage(error, "Could not load contacts.")),
                  );
                }}
                className="h-9 rounded-[2px] px-3 text-[10px]"
              >
                {includeArchived ? "Active contacts" : "Archived"}
              </Button>
              <Button type="button" variant="outline" onClick={exportAll} disabled={busyId === "export"} className="h-9 rounded-[2px] px-3 text-[10px]">
                {busyId === "export" ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Download className="mr-1.5 h-3.5 w-3.5" />}
                Export
              </Button>
              <Button type="button" variant="outline" onClick={exportTemplate} className="h-9 rounded-[2px] px-3 text-[10px]">
                CSV template
              </Button>
              <label className="inline-flex h-9 cursor-pointer items-center rounded-[2px] border border-slate-200 px-3 text-[10px] font-medium text-slate-700 hover:bg-slate-50">
                {importing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Upload className="mr-1.5 h-3.5 w-3.5" />}
                Import CSV
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="sr-only"
                  disabled={importing}
                  onChange={(event) => {
                    void importFile(event.currentTarget.files?.[0]);
                    event.currentTarget.value = "";
                  }}
                />
              </label>
            </div>
          </div>

          <div className="overflow-x-auto border-y border-slate-200">
            <table className="w-full min-w-[760px] border-collapse text-left text-xs">
              <thead className="bg-slate-50 text-[9px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Contact</th>
                  <th className="px-3 py-2.5 font-semibold">Company / phone</th>
                  <th className="px-3 py-2.5 font-semibold">Labels</th>
                  <th className="px-3 py-2.5 font-semibold">Email status</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={5} className="py-10 text-center text-slate-500"><Loader2 className="mx-auto h-4 w-4 animate-spin" /></td></tr>
                ) : contacts.length === 0 ? (
                  <tr><td colSpan={5} className="py-10 text-center text-slate-500">No matching contacts.</td></tr>
                ) : contacts.map((contact) => (
                  <tr key={contact.id} className="align-top hover:bg-slate-50/70">
                    <td className="px-3 py-3">
                      <div className="flex items-start gap-2">
                        <UserRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900">{contact.name || "Unnamed contact"}</div>
                          <div className="mt-0.5 break-all text-slate-500">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      <div>{contact.company || "—"}</div>
                      {contact.phone && <div className="mt-0.5 text-[10px] text-slate-400">{contact.phone}</div>}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex max-w-[220px] flex-wrap gap-1">
                        {contact.tags.length ? contact.tags.map((tag) => (
                          <span key={tag} className="border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] text-slate-600">{tag}</span>
                        )) : <span className="text-slate-400">—</span>}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-[10px] font-semibold ${contact.is_suppressed ? "text-red-700" : contact.marketing_consent ? "text-emerald-700" : "text-slate-500"}`}>
                        {contact.is_suppressed ? "Suppressed" : contact.marketing_consent ? "Opted in" : "Not subscribed"}
                      </span>
                      {contact.marketing_consent && contact.consent_source && (
                        <div className="mt-1 max-w-[180px] truncate text-[9px] text-slate-400" title={contact.consent_source}>{contact.consent_source}</div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex gap-1">
                        {!contact.archived_at && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => editContact(contact)} className="h-7 rounded-[2px] px-2 text-[10px]">Edit</Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={contact.archived_at ? "Restore contact" : "Archive contact"}
                          title={contact.archived_at ? "Restore contact" : "Archive contact"}
                          disabled={busyId === contact.id}
                          onClick={() => toggleArchive(contact)}
                          className="h-7 w-7 rounded-[2px]"
                        >
                          {busyId === contact.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Archive className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span>{startIndex.toLocaleString()}–{endIndex.toLocaleString()} of {totalCount.toLocaleString()}</span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={offset === 0 || loading}
                onClick={() => loadContacts(Math.max(0, offset - PAGE_SIZE)).catch((error: unknown) => toast.error(errorMessage(error, "Could not load contacts.")))}
                className="h-8 rounded-[2px] px-3 text-[10px]"
              >Previous</Button>
              <Button
                type="button"
                variant="outline"
                disabled={offset + PAGE_SIZE >= totalCount || loading}
                onClick={() => loadContacts(offset + PAGE_SIZE).catch((error: unknown) => toast.error(errorMessage(error, "Could not load contacts.")))}
                className="h-8 rounded-[2px] px-3 text-[10px]"
              >Next</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}