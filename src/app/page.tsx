import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { RevealObserver } from "@/components/reveal-observer";
import { Cierre } from "@/components/sections/cierre";
import { Footer } from "@/components/sections/footer";
import { Formacion } from "@/components/sections/formacion";
import { Hero } from "@/components/sections/hero";
import { Modalidades } from "@/components/sections/modalidades";
import { SobreMi } from "@/components/sections/sobre-mi";
import { Videos } from "@/components/sections/videos";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SobreMi />
        <Modalidades />
        <Formacion />
        <Videos />
        <Cierre />
      </main>
      <Footer />
      <FloatingWhatsapp />
      <RevealObserver />
    </>
  );
}
