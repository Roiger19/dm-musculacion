import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "@/components/external-link";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/sections/footer";
import { perfil } from "@/data/perfil";
import { site } from "@/data/site";
import { whatsappUrl } from "@/data/whatsapp";

export const metadata: Metadata = {
  title: `Privacidad — ${site.marca}`,
  description: `Qué pasa con tus datos en el sitio de ${site.marca}: no recolecta datos personales ni usa cookies.`,
  alternates: { canonical: "/privacidad" },
};

const ACTUALIZADO = "noviembre de 2026";

function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="border-t border-carbon/15 pt-8">
      <h2 className="font-display text-xl font-bold sm:text-2xl">{titulo}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function Privacidad() {
  return (
    <>
      <div data-tone="dark" className="bg-carbon">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-7">
          <Link href="/" className="-m-1 block p-1">
            <Logo kind="monograma" color="blanco" sizes="64px" alt="DM Musculación, inicio" className="h-9 w-auto sm:h-10" />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-accent text-[0.8rem] font-semibold tracking-[0.16em] text-blanco uppercase"
          >
            <span className="link-grow">Volver al inicio</span>
          </Link>
        </header>
      </div>

      <main className="mx-auto max-w-6xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20">
        <div className="max-w-prose">
          <p className="font-accent text-[0.8rem] font-semibold tracking-[0.16em] uppercase">Privacidad</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Este sitio no guarda tus datos.
          </h1>
          <p className="mt-6 text-[1.0625rem]">
            Acá te contamos qué pasa con tu información cuando visitás la página de {site.marca} y cuando escribís
            por WhatsApp.
          </p>

          <div className="mt-12 space-y-10">
            <Bloque titulo="Qué datos recolecta el sitio">
              <p>
                Ninguno. No hay formularios ni registro, y el sitio no usa cookies, herramientas de analítica ni
                píxeles de seguimiento.
              </p>
            </Bloque>

            <Bloque titulo="Cuando escribís por WhatsApp">
              <p>
                Los botones de WhatsApp abren una conversación con un mensaje sugerido que podés cambiar antes de
                enviarlo. Lo que escribas le llega a {perfil.nombreCorto}, que lo usa solo para responder tu
                consulta.
              </p>
              <p>
                WhatsApp es un servicio de Meta y se rige por su propia política de privacidad. Lo mismo vale para
                Instagram y LinkedIn, que se abren en otra pestaña.
              </p>
            </Bloque>

            <Bloque titulo="Alojamiento">
              <p>
                El sitio está alojado en Vercel. Como cualquier servidor web, registra datos técnicos de cada
                visita, como la dirección IP y el navegador, para funcionar y protegerse de abusos. Este sitio no
                usa esos registros para identificarte.
              </p>
            </Bloque>

            <Bloque titulo="Imágenes">
              <p>Las personas que aparecen en las fotos y los videos autorizaron el uso de su imagen.</p>
            </Bloque>

            <Bloque titulo="Tus derechos">
              <p>
                La Ley 25.326 de Protección de Datos Personales te permite pedir acceso, corrección o eliminación
                de tus datos. Si le escribiste a {perfil.nombreCorto} y querés que borre la conversación, pedíselo{" "}
                <ExternalLink href={whatsappUrl("flotante")} className="font-semibold">
                  <span className="link-grow">por WhatsApp</span>
                  <span className="sr-only"> (pestaña nueva)</span>
                </ExternalLink>
                .
              </p>
            </Bloque>

            <Bloque titulo="Cambios">
              <p>
                Si el sitio suma alguna herramienta que trate datos personales, esta página se actualiza antes de
                hacerlo.
              </p>
              <p className="text-sm">Última actualización: {ACTUALIZADO}.</p>
            </Bloque>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
