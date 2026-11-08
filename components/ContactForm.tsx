"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Copy, Check, ArrowLeft } from "lucide-react";
import { profileData } from "@/data/profile";

const encode = (value: string) => encodeURIComponent(value);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "composing" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const subject = formData.subject.trim() || "Pesan dari portfolio";
  const body = `${formData.message}\n\n—\n${formData.name}\n${formData.email}`;

  const handleCopy = async () => {
    const text = `Kepada: ${profileData.email}\nSubjek: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Mohon lengkapi seluruh kolom wajib sebelum mengirim.");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Mohon masukkan format alamat email yang valid.");
      setStatus("error");
      return;
    }

    setStatus("composing");

    // Hand the composed message to the visitor's mail client. Nothing is sent from this
    // site, so no copy may ever claim that a message was delivered.
    window.location.href = `mailto:${profileData.email}?subject=${encode(subject)}&body=${encode(body)}`;
  };

  return (
    <div className="rounded-card border border-border bg-surface p-6 md:p-10 shadow-sm">
      <h3 className="font-heading text-2xl font-bold tracking-tight text-text-primary">
        Kirim Pesan Langsung
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        Isi formulir di bawah ini untuk memulai diskusi proyek atau peluang kerja sama.
      </p>

      {status === "composing" ? (
        <div className="mt-8 rounded-btn border border-border bg-background p-6 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={24} className="text-accent" />
            <h4 className="font-heading font-bold text-text-primary">
              Draf pesan disiapkan
            </h4>
          </div>
          <p className="mt-2 text-sm text-text-secondary">
            Aplikasi email Anda seharusnya sudah terbuka dengan pesan ini. Jika tidak, salin
            teks di bawah dan kirim ke{" "}
            <a
              className="font-semibold text-accent underline"
              href={`mailto:${profileData.email}`}
            >
              {profileData.email}
            </a>
            .
          </p>

          <dl className="mt-4 space-y-2 rounded-btn border border-border bg-surface p-4 text-xs">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-bold uppercase tracking-wider text-text-muted">Kepada</dt>
              <dd className="text-text-primary">{profileData.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-bold uppercase tracking-wider text-text-muted">Subjek</dt>
              <dd className="text-text-primary">{subject}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 font-bold uppercase tracking-wider text-text-muted">Pesan</dt>
              <dd className="whitespace-pre-line break-words text-text-primary">{body}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-btn bg-text-primary px-4 py-2.5 text-xs font-semibold text-background transition-colors hover:bg-accent hover:text-white"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Tersalin" : "Salin pesan"}
            </button>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary underline decoration-border hover:text-text-primary"
            >
              <ArrowLeft size={13} /> Kembali ke form
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} data-transport="mailto" className="mt-8 space-y-6">
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-text-primary px-8 py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent hover:text-white"
          >
            <span>Siapkan pesan</span>
            <Send size={16} />
          </button>
          <p className="text-center text-xs text-text-muted">
            Pesan dibuka di aplikasi email Anda — tidak ada yang terkirim langsung dari
            halaman ini.
          </p>
        </form>
      )}
    </div>
  );
}
