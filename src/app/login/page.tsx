"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) {
      setErr("Wrong email or password");
      setBusy(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl border border-choc/10 bg-white/70 p-8 shadow-xl">
        <h1 className="text-center font-display text-3xl font-bold">Baker login</h1>
        <p className="text-center font-hand text-xl text-caramel">Only for the baker 🧁</p>
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-choc/20 bg-white px-4 py-3 outline-none focus:border-caramel" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-choc/20 bg-white px-4 py-3 outline-none focus:border-caramel" />
        {err && <p className="text-sm font-semibold text-red-700">{err}</p>}
        <button disabled={busy} className="w-full rounded-full bg-choc py-3 font-semibold text-cream transition hover:bg-caramel disabled:opacity-60">
          {busy ? "Logging in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}