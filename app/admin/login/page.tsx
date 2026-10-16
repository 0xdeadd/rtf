import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in | RTF",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="bg-warm-white min-h-[70vh] flex items-center justify-center px-4 py-16">
      <LoginForm />
    </section>
  );
}
