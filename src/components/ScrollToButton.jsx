"use client";

export default function ScrollToButton({ targetId }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-black px-14 py-5 rounded-full uppercase text-[10px] font-black tracking-[0.3em] hover:bg-yellow-600 hover:text-white transition-all duration-700 border border-white/20 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
    >
      Ver Colección
    </button>
  );
}
