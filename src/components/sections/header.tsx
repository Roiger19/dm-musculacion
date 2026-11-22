import { site } from "@/data/site";
import { ExternalLink } from "../external-link";
import { HeroVideoToggle } from "../hero-video";
import { InstagramIcon } from "../icons";
import { Logo } from "../logo";

/** Va dentro del hero (fondo carbón). Sin menú hamburguesa: en mobile alcanza con marca + Instagram. */
export function Header({ videoToggle = false }: { videoToggle?: boolean }) {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 pt-5 sm:px-8 sm:pt-7">
      <a href="#inicio" className="-m-1 block p-1">
        <Logo kind="monograma" color="blanco" sizes="64px" alt="DM Musculación, inicio" className="h-9 w-auto sm:h-10" />
      </a>

      <nav aria-label="Secciones" className="hidden md:block">
        <ul className="flex items-center gap-8 font-accent text-[0.8rem] font-semibold tracking-[0.16em] text-blanco uppercase">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-grow py-2">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        {videoToggle && <HeroVideoToggle />}
        <ExternalLink
          href={site.redes.instagram.href}
          aria-label={`Instagram ${site.redes.instagram.usuario} (pestaña nueva)`}
          className="grid size-11 place-items-center rounded-full border border-blanco/25 text-blanco transition-[color,border-color,transform] duration-150 ease-out-strong hover:border-menta hover:text-menta active:scale-[0.97]"
        >
          <InstagramIcon className="size-5" />
        </ExternalLink>
      </div>
    </header>
  );
}
