import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-choc/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link
            href="/admin"
            className="font-display text-xl font-bold"
          >
            Baker dashboard<span className="text-caramel">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/categories"
              className="text-sm font-semibold text-caramel hover:underline"
            >
              Categories & Tags
            </Link>

            <Link
              href="/"
              target="_blank"
              className="text-sm font-semibold text-caramel hover:underline"
            >
              View site
            </Link>

            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        {children}
      </main>
    </div>
  );
}