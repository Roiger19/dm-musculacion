import type { CSSProperties } from "react";
import { preload } from "react-dom";
import { totalCertificaciones } from "@/data/estudios";
import { perfil } from "@/data/perfil";
import { heroClip } from "@/data/videos";
import { HeroVideo } from "../hero-video";
import { ArrowDownIcon } from "../icons";
import { Logo } from "../logo";
import { WhatsappButton } from "../whatsapp-button";
import { Header } from "./header";

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

const DATOS = [
  { label: "Credencial", valor: perfil.rol },
  { label: "Formación", valor: `${totalCertificaciones} certificaciones` },
  { label: "Modalidad", valor: "Presencial y online" },
];

export function Hero() {
  if (heroClip) preload(heroClip.poster, { as: "image", fetchPriority: "high" });

  return (
    <section id="inicio" data-tone="dark" className="relative isolate overflow-hidden bg-carbon text-blanco">
      <Header videoToggle={heroClip !== null} />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-14 sm:px-8 sm:pt-24 md:pb-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:pt-28">
        <div>
          <p
            className="hero-rise font-accent text-xs font-semibold tracking-[0.16em] text-menta uppercase sm:text-sm"
            style={delay(0)}
          >
            {perfil.hero.eyebrow}
          </p>

          <h1
            className="hero-rise mt-5 font-display text-[clamp(2.5rem,6.4vw+0.6rem,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.015em] uppercase"
            style={delay(90)}
          >
            <span className="block">{perfil.hero.titulo[0]}</span>
            <span className="block text-menta">{perfil.hero.titulo[1]}</span>
          </h1>

          <p className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-blanco sm:text-xl" style={delay(180)}>
            {perfil.hero.bajada}
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7" style={delay(270)}>
            <WhatsappButton id="cta-hero" placement="hero" variant="esmeralda" />
            <a
              href="#sobre-mi"
              className="group inline-flex min-h-11 items-center gap-2 self-start font-display text-[0.95rem] font-semibold text-menta sm:self-auto"
            >
              <span className="link-grow">Conocé cómo trabajo</span>
              <ArrowDownIcon className="size-4 transition-transform duration-200 ease-out-strong group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {heroClip ? (
          /*
           * Clip vertical (9:16, 480 px de origen). En mobile es fondo a pantalla
           * completa bajo un scrim carbón (dm-branding §5.2); desde lg va enmarcado
           * en la columna derecha para no estirarlo más allá de su resolución.
           */
          <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-auto lg:aspect-[9/16] lg:w-[320px] lg:justify-self-end lg:overflow-hidden lg:rounded-2xl">
            <HeroVideo clip={heroClip} />
            <div className="absolute inset-0 bg-carbon/70 lg:hidden" />
            <div className="absolute inset-0 bg-linear-to-b from-carbon/30 via-carbon/0 to-carbon lg:hidden" />
          </div>
        ) : (
          <div className="hero-rise hidden justify-self-end lg:block" style={delay(140)}>
            <Logo color="menta" sizes="400px" preload className="h-auto w-[400px] max-w-full" />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 md:pb-14">
        <dl className="hero-rise grid gap-x-8 gap-y-4 border-t border-blanco/15 pt-6 sm:grid-cols-3" style={delay(360)}>
          {DATOS.map((d) => (
            <div key={d.label} className="flex items-baseline justify-between gap-4 sm:block">
              <dt className="font-accent text-[0.7rem] font-semibold tracking-[0.16em] text-esmeralda uppercase">
                {d.label}
              </dt>
              <dd className="font-display text-base font-semibold sm:mt-1.5 sm:text-lg">{d.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
