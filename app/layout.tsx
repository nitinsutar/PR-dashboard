import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PR Sentiment Dashboard",
  description: "Real-time PR intelligence for celebrities and athletes"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container py-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              PR Sentiment Dashboard <span className="text-brand-600">(Phase 1)</span>
            </h1>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noreferrer"
              className="text-sm opacity-80 hover:opacity-100"
            >
              Deploy on Vercel →
            </a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
