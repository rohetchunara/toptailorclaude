"use client";

import { useState } from "react";

export default function StoreInquiryForm({ stores }) {
  const [form, setForm] = useState({ name: "", email: "", storeCity: stores[0]?.city ?? "", message: "" });
  const [status, setStatus] = useState("idle");

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/store-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", storeCity: stores[0]?.city ?? "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--hairline)] p-8 text-center">
        <p className="font-display text-2xl text-[var(--ink)]">Message Sent</p>
        <p className="mt-3 text-sm text-[var(--ink-soft)]">
          A member of our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          Name
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        Preferred Boutique
        <select
          value={form.storeCity}
          onChange={(e) => update("storeCity", e.target.value)}
          className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
        >
          {stores.map((s) => (
            <option key={s.city} value={s.city}>{s.city}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        Message
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="resize-none border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[var(--ink)] py-4 text-xs uppercase tracking-[0.25em] text-[var(--bg)] transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
