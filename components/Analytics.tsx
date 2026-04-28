"use client";

import Script from "next/script";
import { useEffect } from "react";

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const GADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function Analytics() {
  useEffect(() => {
    if (!GADS_ID || !GADS_CONVERSION_LABEL) return;

    const handler = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (!/wa\.me\/|api\.whatsapp\.com/.test(href)) return;
      window.gtag?.("event", "conversion", {
        send_to: `${GADS_ID}/${GADS_CONVERSION_LABEL}`,
        value: 1.0,
        currency: "BRL",
      });
    };

    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  if (!GADS_ID && !GA4_ID) return null;

  const primaryId = GADS_ID || GA4_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
          ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
