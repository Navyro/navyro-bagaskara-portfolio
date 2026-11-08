import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center py-20 text-center">
      <div className="mx-auto max-w-md px-6">
        <span className="font-heading text-h1 font-extrabold text-accent">
          404
        </span>
        <h1 className="mt-4 font-heading text-h2 font-bold tracking-tight text-text-primary">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-4 text-body text-text-secondary">
          Halaman yang Anda cari mungkin telah dipindahkan, diubah namanya, atau tidak tersedia.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-btn bg-text-primary px-6 py-3 text-control font-semibold text-background hover:bg-black transition-colors"
          >
            <Home size={16} /> Beranda Utama
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-control font-semibold text-text-primary hover:border-text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Lihat Portofolio
          </Link>
        </div>
      </div>
    </div>
  );
}
