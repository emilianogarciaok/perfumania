import Image from "next/image";
import FadeIn from "./FadeIn";
import { supabase } from "../lib/supabaseClient";

// Esta será la única imagen que se use, siempre.
const HERO_IMAGE_URL = "https://images.pexels.com/photos/18031836/pexels-photo-18031836.jpeg";

const Hero = async () => {
  // 1. Pedimos un perfume a Supabase solo para obtener textos (Título/Precio)
  const { data: perfume } = await supabase
    .from('perfumes')
    .select('*')
    .limit(1)
    .maybeSingle();

  const titulo = perfume ? (perfume.nombre || perfume.name) : "AURA";
  const precio = perfume ? (perfume.precio || perfume.price) : "Descubre tu esencia";
  
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Fondo de Imagen Fijo */}
      {/* Eliminamos el z-index negativo extremo y usamos z-0 para la imagen base */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={HERO_IMAGE_URL}
          alt="Perfume destacado"
          fill 
          className="object-cover object-center opacity-60" // Usamos opacity aquí en vez de un div separado si prefieres
          priority 
        />
      </div>
      
      {/* Capa oscura (Opcional si usas opacity en la imagen, pero bueno para control fino) */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Contenido - Debe tener un z-index mayor */}
      <div className="relative z-20 w-full"> {/* Contenedor relativo para el FadeIn */}
        <FadeIn className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 font-bold drop-shadow-lg tracking-tight">
            {titulo}
            </h1>
            
            <p className="text-gray-100 text-lg md:text-2xl mb-12 font-light tracking-widest uppercase">
            {perfume ? `Disponible por ${precio}` : "Alta Perfumería"}
            </p>
            
            <button className="bg-white text-black px-12 py-4 rounded-sm uppercase text-xs font-bold tracking-[0.2em] hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-2xl">
            Ver Colección
            </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;