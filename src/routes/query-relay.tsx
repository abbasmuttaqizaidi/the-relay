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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <form
        id="nexorem-lead-form"
        onSubmit={handleSubmit}
        style={{
          maxWidth: 450,
          margin: "20px auto",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: 24,
          border: "1px solid #e4e4e7",
          borderRadius: 16,
          background: "#ffffff",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          width: "100%",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 6,
            color: "#18181b",
            fontSize: 18,
            fontWeight: 700,
            textAlign: "left",
          }}
        >
          Contact Us
        </h3>
        <p
          style={{
            marginTop: 0,
            marginBottom: 20,
            color: "#71717a",
            fontSize: 12,
            textAlign: "left",
          }}
        >
          Please fill out this form to connect with our team.
        </p>

        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontSize: 10,
                fontWeight: 650,
                color: "#52525b",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={firstName}
              onChange={handleInputChange(setFirstName)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d4d4d8",
                borderRadius: 8,
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontSize: 10,
                fontWeight: 650,
                color: "#52525b",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={lastName}
              onChange={handleInputChange(setLastName)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d4d4d8",
                borderRadius: 8,
                fontSize: 13,
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 12, textAlign: "left" }}>
          <label
            style={{
              display: "block",
              fontSize: 10,
              fontWeight: 650,
              color: "#52525b",
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d4d4d8",
              borderRadius: 8,
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: 12, textAlign: "left" }}>
          <label
            style={{
              display: "block",
              fontSize: 10,
              fontWeight: 650,
              color: "#52525b",
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={handleInputChange(setPhone)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d4d4d8",
              borderRadius: 8,
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          id="nexorem-submit-btn"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: 10,
            border: "none",
            borderRadius: 8,
            background: "#1e1e1a",
            color: "#f7f5f0",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Lead"}
        </button>

        <div
          id="nexorem-status"
          style={{
            marginTop: 12,
            fontSize: 12,
            fontWeight: 600,
            textAlign: "center",
            display: statusVisible ? "block" : "none",
            color: statusColor,
          }}
        >
          {statusText}
        </div>
      </form>
    </div>
  );
}
