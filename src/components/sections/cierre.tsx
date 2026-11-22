import { Logo } from "../logo";
import { WhatsappButton } from "../whatsapp-button";

export function Cierre() {
  return (
    <section className="bg-menta py-20 text-carbon md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h2
            className="font-display text-[clamp(2.25rem,4vw+0.8rem,3.5rem)] leading-[1.04] font-extrabold tracking-[-0.015em] uppercase"
            data-reveal
          >
            El primer paso
            <br />
            es escribirme.
          </h2>
          <p className="mt-5 max-w-lg text-lg" data-reveal>
            Contame tu objetivo y armamos juntos el camino, presencial u online.
          </p>
          <div className="mt-8" data-reveal>
            <WhatsappButton id="cta-cierre" placement="cierre" variant="carbon-blanco">
              Pedí información
            </WhatsappButton>
          </div>
        </div>
        <Logo color="carbon" sizes="320px" className="hidden h-auto w-[320px] lg:block" />
      </div>
    </section>
  );
}
