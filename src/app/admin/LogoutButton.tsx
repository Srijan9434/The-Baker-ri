"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await createClient().auth.signOut();
        router.push("/login");
        router.refresh();
      }}
      className="rounded-full border border-choc/30 px-4 py-1.5 text-sm font-semibold hover:bg-choc hover:text-cream"
    >
      Log out
    </button>
  );
}