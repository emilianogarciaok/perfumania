import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import { MessageCircle, Share2, ShieldCheck } from "lucide-react";
import BackButton from "../../../components/BackButton";

const FALLBACK_URL = "https://via.placeholder.com/500x500.png?text=AURA+FOTO";

const TAG_COLORS = {
  Fresco: "bg-blue-50 text-blue-700 border-blue-200",
  Dulce: "bg-pink-50 text-pink-700 border-pink-200",
  Intenso: "bg-red-50 text-red-700 border-red-200",
  Floral: "bg-purple-50 text-purple-700 border-purple-200",
  Versátil: "bg-teal-50 text-teal-700 border-teal-200",
  Default: "bg-gray-50 text-gray-600 border-gray-200",
};

export default async function ProductDetail({ params }) {
  const { id } = await params;

  const { data: perfume } = await supabase
    .from("perfumania")
    .select("*")
    .eq("id", id)
    .single();

  if (!perfume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4 text-gray-800">
            Perfume no encontrado
          </h2>
          <BackButton />
        </div>
      </div>
    );
  }

  const imagenSrc = perfume.imagen || FALLBACK_URL;
  const precioNumerico = Number(perfume.precio_venta);
  const tieneStock = precioNumerico > 0;

  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precioNumerico);

  const etiquetas = perfume.perfil_olfativo || [];

  return (
    // 1. AJUSTE: Quitamos 'flex flex-col justify-center' para que suba y no se centre verticalmente
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      {/* 2. AJUSTE: Volvemos a 'max-w-7xl' para recuperar el ancho que te gustaba */}
      <div className="max-w-7xl mx-auto w-full">
        <nav className="flex justify-between items-center mb-8">
          <BackButton />
        </nav>

        {/* Mantenemos items-center para que la foto y el texto estén alineados en su eje central */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* COLUMNA IZQUIERDA: IMAGEN */}
          <div className="relative aspect-square max-w-lg mx-auto w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
            {perfume.casa && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-sm text-gray-800">
                {perfume.casa}
              </div>
            )}

            <Image
              src={imagenSrc}
              alt={perfume.nombre}
              fill
              className={`object-contain p-6 transition-all duration-700 group-hover:scale-105 ${!tieneStock ? "grayscale opacity-60" : ""}`}
              priority
            />

            {!tieneStock && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="bg-red-500 text-white px-6 py-2 font-bold tracking-widest uppercase rounded shadow-lg transform -rotate-12">
                  Sin Stock
                </span>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: INFO */}
          <div className="flex flex-col h-full pt-2">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold text-yellow-600 tracking-widest uppercase bg-yellow-50 px-2 py-1 rounded">
                {perfume.genero || "Unisex"}
              </span>
              {etiquetas.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] px-2 py-1 rounded-full border uppercase font-semibold ${TAG_COLORS[tag] || TAG_COLORS.Default}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-3 leading-tight">
              {perfume.nombre}
            </h1>

            {perfume.inspiracion && (
              <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                <span>Inspirado en:</span>
                <span className="font-medium text-gray-900 italic">
                  {perfume.inspiracion}
                </span>
              </div>
            )}

            <div className="mb-8 border-b border-gray-100 pb-6">
              {tieneStock ? (
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-medium text-gray-900">
                    {precioFormateado}
                  </span>
                  <span className="text-sm text-gray-500 mb-2 font-medium">
                    ARS
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-red-400">
                  No Disponible Temporalmente
                </span>
              )}
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
              <p>
                {perfume.description ||
                  "Una fragancia cautivadora seleccionada especialmente para ti. Descubre la magia de sus notas y deja una huella inolvidable en cada ocasión."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
              <a
                href={`https://wa.me/549XXXXXXXXXX?text=Hola! Me interesa el perfume ${perfume.nombre}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-4 px-8 rounded-full border border-gray-200 text-gray-700 font-bold hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all flex items-center justify-center gap-2 text-sm uppercase"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                <span>Garantía de calidad AURA</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span>Envío a todo el país</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
