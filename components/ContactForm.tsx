"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Mohon lengkapi seluruh kolom wajib sebelum mengirim.");
      setStatus("error");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMessage("Mohon masukkan format alamat email yang valid.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Simulate server response handling
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="rounded-card border border-border bg-surface p-6 md:p-10 shadow-sm">
      <h3 className="font-heading text-2xl font-bold tracking-tight text-text-primary">
        Kirim Pesan Langsung
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        Isi formulir di bawah ini untuk memulai diskusi proyek atau peluang kerja sama.
      </p>

      {status === "success" ? (
        <div className="mt-8 rounded-btn border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={24} className="text-emerald-600" />
            <h4 className="font-heading font-bold">Pesan Berhasil Terkirim!</h4>
          </div>
          <p className="mt-2 text-sm text-emerald-700">
            Terima kasih telah menghubungi. Saya akan membalas pesan Anda ke alamat email secepatnya.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {status === "error" && errorMessage && (
            <div className="flex items-center gap-2 rounded-btn border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
              >
                Nama Lengkap <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="cth. Alexandra"
                className="mt-2 w-full rounded-btn border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
              >
                Alamat Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="cth. alexandra@company.com"
                className="mt-2 w-full rounded-btn border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
            >
              Subjek / Topik
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="cth. Tawaran Proyek Redesain Web / Opportunity"
              className="mt-2 w-full rounded-btn border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
            >
              Pesan <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..."
              className="mt-2 w-full rounded-btn border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-text-primary px-8 py-3.5 text-sm font-semibold text-background transition-all hover:bg-black disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span>Mengirim...</span>
            ) : (
              <>
                <span>Kirim Pesan</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
