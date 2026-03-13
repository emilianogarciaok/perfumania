"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HERO_IMAGE_URL = "/hero.jpeg";

export default function Hero() {
  const scrollToCatalog = () => {
    const el = document.getElementById("catalogo");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with slow zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <Image
          src={HERO_IMAGE_URL}
          alt="Fondo perfumería"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/80 z-10" />
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40 z-10" />

      {/* Animated gold line accents */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-transparent via-yellow-600/40 to-transparent z-20"
        initial={{ height: 0 }}
        animate={{ height: "30%" }}
        transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-t from-transparent via-yellow-600/30 to-transparent z-20"
        initial={{ height: 0 }}
        animate={{ height: "20%" }}
        transition={{ duration: 2, delay: 2, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Subtitle line */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            className="block h-px bg-yellow-600/60"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
          <span className="text-yellow-600/80 text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase">
            Alta Perfumería
          </span>
          <motion.span
            className="block h-px bg-yellow-600/60"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Title with staggered lines */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight leading-[1.05]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            La esencia
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-yellow-600/90 font-bold tracking-tight leading-[1.05]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            que define
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight leading-[1.05]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            tu estilo
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-sm md:text-base font-light tracking-wide max-w-md mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          Descubrí nuestra colección exclusiva de fragancias importadas.
          Elegancia en cada detalle.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToCatalog}
          className="group relative px-12 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-yellow-600/50 transition-all duration-500 cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Ver Colección</span>
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-yellow-600/20 via-yellow-600/10 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-linear-to-b from-white/40 to-transparent"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
