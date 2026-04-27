import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "../login/actions";

export const metadata = {
  title: "Administração",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <section className="bg-stone-50 py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <header className="mb-8 flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <Link
              href="/admin"
              className="font-serif text-xl font-semibold text-navy-900 hover:text-navy-700"
            >
              Administração
            </Link>
            <p className="text-xs text-stone-500">
              Conectado como {session.username}
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded border border-stone-300 px-3 py-1.5 text-sm text-stone-700 transition hover:bg-stone-100"
            >
              Sair
            </button>
          </form>
        </header>
        {children}
      </div>
    </section>
  );
}
