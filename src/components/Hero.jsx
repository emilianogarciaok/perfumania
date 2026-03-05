import Image from "next/image";
import FadeIn from "./FadeIn";
import { supabase } from "../lib/supabaseClient";

const HERO_IMAGE_URL =
  "https://images.pexels.com/photos/954405/pexels-photo-954405.jpeg";

const Hero = async () => {
  // 1. Pedimos el primer perfume que SÍ tenga stock (precio_venta > 0)
  const { data: perfume } = await supabase
    .from("perfumania")
    .select("nombre, precio_venta")
    .gt("precio_venta", 0) // Filtro: "greater than" (mayor a 0)
    .order("id", { ascending: true }) // Trae el primero disponible según ID
    .limit(1)
    .maybeSingle();

  // 2. Lógica de textos (siempre habrá stock por el filtro de arriba)
  const titulo = perfume?.nombre || "AURA";

  const precioFormateado = perfume?.precio_venta
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(perfume.precio_venta)
    : "ALTA PERFUMERÍA";

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

      {/* Contenido Centrado */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        <FadeIn className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          <span className="text-yellow-500 text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase mb-6 drop-shadow-md">
            Lanzamiento Exclusivo
          </span>

          <h1 className="font-serif text-5xl md:text-[9rem] text-white mb-8 font-bold tracking-tighter leading-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] uppercase">
            {titulo}
          </h1>

          <p className="text-gray-200 text-base md:text-xl mb-14 font-light tracking-[0.3em] uppercase drop-shadow-lg">
            {perfume
              ? `Desde ${precioFormateado}`
              : "Explora nuestra colección"}
          </p>

          <button className="bg-white text-black px-14 py-5 rounded-full uppercase text-[10px] font-black tracking-[0.3em] hover:bg-yellow-600 hover:text-white transition-all duration-700 border border-white/20 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Ver Colección
          </button>
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
