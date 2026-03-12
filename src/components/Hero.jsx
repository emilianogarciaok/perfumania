import Image from "next/image";
import FadeIn from "./FadeIn";
import ScrollToButton from "./ScrollToButton";

const HERO_IMAGE_URL = "/hero.jpeg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Imagen de Fondo con Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE_URL}
          alt="Perfume destacado"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
      </div>

      {/* Botón abajo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <FadeIn>
          <ScrollToButton targetId="catalogo" />
        </FadeIn>
      </div>

      {/* Indicador visual de scroll */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
