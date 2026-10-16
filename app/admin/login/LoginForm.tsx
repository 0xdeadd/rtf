"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not sign in");
    } catch {
      setError("Network error. Try again.");
    }
    setBusy(false);
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm bg-white rounded-xl border border-warm-gray p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center gap-2 text-navy-dark mb-1">
        <Lock className="w-5 h-5 text-amber-dark" aria-hidden="true" />
        <h1 className="text-xl font-bold">Admin sign in</h1>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Road To Freedom Group site admin.
      </p>
      <label htmlFor="password" className="block text-sm font-medium text-navy-dark mb-1">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-warm-gray px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber"
      />
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !password}
        className="mt-5 w-full rounded-lg bg-navy-dark text-white font-medium py-3 text-base hover:bg-navy transition-colors disabled:opacity-50"
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
