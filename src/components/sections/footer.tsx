import Link from "next/link";
import { site } from "@/data/site";
import { whatsappUrl } from "@/data/whatsapp";
import { ExternalLink } from "../external-link";
import { InstagramIcon, LinkedinIcon, WhatsappIcon } from "../icons";
import { Logo } from "../logo";

export function Footer() {
  const { instagram } = site.redes;
  const dev = site.desarrollador;

  return (
    <footer data-tone="dark" className="bg-carbon pt-14 pb-28 text-blanco md:pb-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Logo kind="monograma" color="menta" sizes="96px" className="h-11 w-auto self-start" />
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <li>
              <ExternalLink
                href={instagram.href}
                className="group inline-flex min-h-11 items-center gap-2.5 font-medium"
              >
                <InstagramIcon className="size-5 text-menta" />
                <span className="link-grow">{instagram.usuario}</span>
                <span className="sr-only">(Instagram, pestaña nueva)</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={whatsappUrl("cierre")} className="inline-flex min-h-11 items-center gap-2.5 font-medium">
                <WhatsappIcon className="size-5 text-menta" />
                <span className="link-grow">WhatsApp</span>
                <span className="sr-only">(pestaña nueva)</span>
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-blanco/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4">
            <span>
              © {site.anio} {site.marca}. {site.eslogan}.
            </span>
            <Link href="/privacidad" className="inline-flex min-h-11 items-center sm:min-h-0">
              <span className="link-grow">Privacidad</span>
            </Link>
          </p>
          <p>
            Desarrollado por{" "}
            <ExternalLink
              href={dev.href}
              className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-menta sm:min-h-0"
            >
              <span className="link-grow">{dev.nombre}</span>
              <LinkedinIcon className="size-4 transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5" />
              <span className="sr-only">(LinkedIn, pestaña nueva)</span>
            </ExternalLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
