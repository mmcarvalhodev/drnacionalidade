import { login } from "./actions";

export const metadata = {
  title: "Acesso administrativo",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-semibold text-navy-900">
            Acesso administrativo
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Entre para gerenciar artigos do site.
          </p>

          {error === "1" && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              Usuário ou senha inválidos.
            </div>
          )}
          {error === "config" && (
            <div className="mt-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Credenciais não configuradas no servidor. Defina ADMIN_USERNAME e
              ADMIN_PASSWORD nas variáveis de ambiente.
            </div>
          )}

          <form action={login} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-stone-800"
              >
                Usuário
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-800"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none focus:ring-1 focus:ring-navy-700"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-navy-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-900"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
