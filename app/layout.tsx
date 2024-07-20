import type { Metadata } from "next";
import "./globals.css";
import { inter, notoSansJP, orbitron } from "@/lib/fonts";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Newche | An app for SCI Cycle-ball Team",
  description: "Newche is an app that makes it easy to share SCI Cycle-ball Team schedule.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <header
          className={`${orbitron.className} px-4 text-3xl text-teal-300`}
        >
          <Link href="/">Newche</Link>
        </header>
        <Suspense fallback={<Loading />}>
          <main className="min-h-screen flex flex-col items-center justify-center gap-y-4 p-4" >{children}</main>
        </Suspense>
        <footer className={`${inter.className} px-4 py-2 flex flex-wrap justify-around gap-x-8 border-t border-slate-600 text-slate-400 text-sm`}>
          <Link href="/">Home</Link>
          <Link href="/internal">Schedule</Link>
          <Link href="/signin">Sign in</Link>
          <Link href="/internal/settings">Settings</Link>
          <Link href="/internal/admin">Admin</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </footer>
      </body>
    </html>
  );
}
