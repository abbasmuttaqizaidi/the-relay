import { createFileRoute } from "@tanstack/react-router";
import { useState, ChangeEvent, FormEvent } from "react";

export const Route = createFileRoute("/query-relay")({
  head: () => ({
    meta: [
      { title: "Query Relay — Contact Us" },
      {
        name: "description",
        content: "Contact The Relay team through the website web-to-lead form.",
      },
    ],
  }),
  component: QueryRelayPage,
});

function QueryRelayPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [statusText, setStatusText] = useState("");
  const [statusColor, setStatusColor] = useState("#16a34a");
  const [statusVisible, setStatusVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange =
    (setter: (value: string) => void) => (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusVisible(false);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      source: "Website Web-to-Lead Form",
    };

    try {
      const res = await fetch(
        "https://tyxsinmlemiihounjjwh.supabase.co/functions/v1/api/v1/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "nx_live_588487854ac3e9123eba36bcc41a250b5a126758380c7fa6",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error("Ingestion failed");
      }

      await res.json();

      setStatusColor("#16a34a");
      setStatusText("✓ Thank you! Your submission has been received.");
      setStatusVisible(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error(error);
      setStatusColor("#dc2626");
      setStatusText("❌ Submission failed. Please verify connection and try again.");
      setStatusVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4 py-12 selection:bg-slate-900 selection:text-white">
      <form
        id="nexorem-lead-form"
        onSubmit={handleSubmit}
        className="max-w-[450px] w-full bg-white border border-slate-200/80 p-6 sm:p-8 rounded-[4px] shadow-xs animate-momentum"
      >
        <h3 className="font-display text-xl font-black text-slate-950 uppercase tracking-tight mb-1">
          Contact Us
        </h3>
        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-6">
          Please fill out this form to connect with our team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 text-left">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
              className="w-full h-10 px-3 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs rounded-[2px] font-mono"
            />
          </div>
          <div className="flex-1 text-left">
            <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={handleInputChange(setLastName)}
              className="w-full h-10 px-3 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs rounded-[2px] font-mono"
            />
          </div>
        </div>

        <div className="mb-4 text-left">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            className="w-full h-10 px-3 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs rounded-[2px] font-mono"
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={handleInputChange(setPhone)}
            className="w-full h-10 px-3 border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs rounded-[2px] font-mono"
          />
        </div>

        <button
          type="submit"
          id="nexorem-submit-btn"
          disabled={isSubmitting}
          className="w-full bg-slate-900 hover:bg-slate-800 hover:border-slate-800 disabled:opacity-50 text-white h-11 text-[10px] font-mono uppercase tracking-widest transition-all rounded-[2px] font-bold shadow-sm flex items-center justify-center border border-slate-900 cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit Lead"}
        </button>

        {statusVisible && (
          <div
            id="nexorem-status"
            className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest text-center"
            style={{ color: statusColor }}
          >
            {statusText}
          </div>
        )}
      </form>
    </div>
  );
}
