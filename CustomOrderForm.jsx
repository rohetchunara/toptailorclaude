"use client";

import { useState } from "react";

const GARMENTS = ["Suit (2-piece)", "Suit (3-piece)", "Tuxedo", "Daura Suruwal", "Blazer", "Waistcoat"];
const MEASUREMENT_FIELDS = [
  { key: "chest", label: "Chest (in)" },
  { key: "waist", label: "Waist (in)" },
  { key: "hips", label: "Hips (in)" },
  { key: "shoulder", label: "Shoulder Width (in)" },
  { key: "sleeve", label: "Sleeve Length (in)" },
  { key: "inseam", label: "Inseam (in)" },
  { key: "neck", label: "Neck (in)" },
  { key: "height", label: "Height (ft/in)" },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  garmentType: GARMENTS[0],
  fabricPreference: "",
  notes: "",
};

export default function CustomOrderForm() {
  const [form, setForm] = useState(initialForm);
  const [measurements, setMeasurements] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateMeasurement = (key, value) =>
    setMeasurements((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, measurements }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm(initialForm);
      setMeasurements({});
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--hairline)] p-10 text-center">
        <p className="font-display text-3xl text-[var(--ink)]">Request Received</p>
        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          Thank you. A Top Tailor consultant will reach out within 24 hours to confirm your
          measurements and fabric selection.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 border border-[var(--ink)] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          Full Name
          <input
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
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
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          Phone
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          Garment Type
          <select
            value={form.garmentType}
            onChange={(e) => update("garmentType", e.target.value)}
            className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
          >
            {GARMENTS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] sm:col-span-2">
          Fabric Preference
          <input
            value={form.fabricPreference}
            onChange={(e) => update("fabricPreference", e.target.value)}
            placeholder="e.g. Navy merino wool, Dhaka silk, linen..."
            className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]"
          />
        </label>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--ink)]">
          Your Measurements <span className="text-[var(--ink-soft)] normal-case">(optional — see guide below)</span>
        </p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MEASUREMENT_FIELDS.map((field) => (
            <label key={field.key} className="flex flex-col gap-2 text-xs uppercase tracking-[0.15em] text-[var(--ink-soft)]">
              {field.label}
              <input
                value={measurements[field.key] || ""}
                onChange={(e) => updateMeasurement(field.key, e.target.value)}
                className="border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
              />
            </label>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        Additional Notes
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="resize-none border-b border-[var(--hairline)] bg-transparent py-2 text-base normal-case tracking-normal text-[var(--ink)] outline-none"
        />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[var(--ink)] py-4 text-xs uppercase tracking-[0.25em] text-[var(--bg)] transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {status === "loading" ? "Submitting..." : "Submit Custom Order Request"}
      </button>
    </form>
  );
}
