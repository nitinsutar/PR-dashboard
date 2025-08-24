import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";        // must exist at app/providers.tsx (lowercase)
import Header from "../components/Header";  // relative path, no alias

export const metadata: Metadata = {
  title: "PR Sentiment Dashboard",
  description: "Real-time PR intelligence for celebrities and athletes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="container py-6">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
