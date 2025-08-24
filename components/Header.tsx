"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { doSignIn, doSignOut } from "../lib/auth-client";

export default function Header() {
  const { data: session, status } = useSession();
  const params = useSearchParams();
  const router = useRouter();

  const celebrity = params.get("celebrity") || "Demo Star";

  function setCelebrity(name: string) {
    const sp = new URLSearchParams(params.toString());
    sp.set("celebrity", name || "Demo Star");
    router.push(`/?${sp.toString()}`);
  }

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          PR Sentiment Dashboard <span className="text-brand-600">(Pro)</span>
        </h1>
        <span className="text-sm text-zinc-400 hidden md:inline">for</span>
        <input
          defaultValue={celebrity}
          onBlur={(e) => setCelebrity(e.target.value.trim())}
          placeholder="Celebrity name"
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm"
          title="Type a celebrity name and unfocus to apply"
        />
      </div>

      <nav className="flex items-center gap-4">
        <Link href="https://vercel.com/new" className="text-sm opacity-80 hover:opacity-100" target="_blank">Deploy →</Link>
        {status === "authenticated" ? (
          <button onClick={doSignOut} className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-sm">
            Sign out {session?.user?.name ? `(${session.user.name.split(' ')[0]})` : ""}
          </button>
        ) : (
          <button onClick={doSignIn} className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-sm">
            Sign in with Google
          </button>
        )}
      </nav>
    </header>
  );
}
