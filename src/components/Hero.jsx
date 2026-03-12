import Image from "next/image";

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
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/70 z-10" />
      </div>
    </section>
  );
};

export default Hero;
