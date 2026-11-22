"use client";

import { useEffect, useState } from "react";
import { WhatsappButton } from "./whatsapp-button";

/**
 * CTA flotante solo en mobile. Aparece cuando el CTA del hero ya quedó arriba
 * y se oculta cuando el CTA del cierre está a la vista: nunca hay dos a la vez.
 */
export function FloatingWhatsapp() {
  const [pasoHero, setPasoHero] = useState(false);
  const [cierreVisible, setCierreVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("cta-hero");
    const cierre = document.getElementById("cta-cierre");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPasoHero(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === cierre) setCierreVisible(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (cierre) io.observe(cierre);
    return () => io.disconnect();
  }, []);

  const visible = pasoHero && !cierreVisible;

  return (
    <div
      className={`fixed inset-x-4 z-40 transition-[opacity,translate,visibility] duration-300 ease-out-strong motion-reduce:translate-y-0 md:hidden ${
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <WhatsappButton placement="flotante" variant="carbon" className="w-full border border-menta/40">
        Escribime por WhatsApp
      </WhatsappButton>
    </div>
  );
}
