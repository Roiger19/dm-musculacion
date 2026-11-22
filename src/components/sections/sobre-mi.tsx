import type { CSSProperties } from "react";
import Image from "next/image";
import { perfil } from "@/data/perfil";
import { Logo } from "../logo";

export function SobreMi() {
  const { sobreMi, fotos } = perfil;
  const foto = fotos[0];

  return (
    <section id="sobre-mi" className="bg-blanco py-20 text-carbon md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          {foto ? (
            <Image
              src={foto.src}
              alt={foto.alt}
              width={foto.width}
              height={foto.height}
              sizes="(min-width: 1024px) 420px, 100vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          ) : (
            <figure className="flex h-full flex-col justify-between gap-10 rounded-2xl bg-menta p-7 sm:p-10">
              <Logo kind="monograma" color="carbon" sizes="96px" className="h-12 w-auto self-start" />
              <blockquote className="font-display text-[clamp(1.6rem,3vw+0.6rem,2.25rem)] leading-tight font-bold">
                {sobreMi.cita}
              </blockquote>
              <figcaption className="font-accent text-xs font-semibold tracking-[0.16em] uppercase">
                {perfil.nombreCorto} · {perfil.rol}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <p className="font-accent text-xs font-semibold tracking-[0.16em] uppercase sm:text-sm" data-reveal>
            {sobreMi.eyebrow}
          </p>
          <h2
            className="mt-4 font-display text-[clamp(2rem,3.4vw+0.8rem,3rem)] leading-[1.08] font-bold tracking-[-0.01em]"
            data-reveal
          >
            {sobreMi.titulo}
          </h2>
          <div className="mt-8 max-w-prose space-y-5 text-[1.0625rem]">
            {sobreMi.bio.map((parrafo, i) => (
              <p key={i} data-reveal style={{ "--reveal-delay": `${(i + 1) * 50}ms` } as CSSProperties}>
                {parrafo}
              </p>
            ))}
          </div>
          {foto && (
            <blockquote
              className="mt-10 max-w-prose border-l-2 border-esmeralda pl-5 font-display text-xl leading-snug font-semibold sm:text-2xl"
              data-reveal
            >
              {sobreMi.cita}
            </blockquote>
          )}
        </div>
      </div>
    </section>
  );
}
