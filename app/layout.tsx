import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";        // must exist at app/providers.tsx
import Header from "../components/Header";  // must exist at components/Header.tsx

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
