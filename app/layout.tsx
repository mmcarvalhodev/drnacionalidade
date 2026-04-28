import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Advocacia especializada em nacionalidade portuguesa. Mais de 10 anos de atuação. OA Portugal e OAB Brasil. Atendimento direto com o advogado em Lisboa e Rio de Janeiro.",
  keywords: [
    "nacionalidade portuguesa",
    "cidadania portuguesa",
    "advogado nacionalidade Portugal",
    "transcrição de casamento Portugal",
    "passaporte português",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Advocacia especializada em nacionalidade portuguesa. Atendimento direto com o advogado em Lisboa e Rio de Janeiro.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description:
      "Advocacia especializada em nacionalidade portuguesa. Atendimento direto com o advogado.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
