import Image from "next/image";
import Link from "next/link";

const FALLBACK_URL = "https://via.placeholder.com/192x192.png?text=AURA+FOTO";

function resolveImageUrl(url) {
  if (!url) return FALLBACK_URL;
  // Convierte links de Google Drive al formato de imagen directa
  const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
}

const TAG_COLORS = {
  Fresco: "bg-blue-100 text-blue-800 border-blue-200",
  Dulce: "bg-pink-100 text-pink-800 border-pink-200",
  Intenso: "bg-red-100 text-red-800 border-red-200",
  Floral: "bg-purple-100 text-purple-800 border-purple-200",
  Versátil: "bg-teal-100 text-teal-800 border-teal-200",
  Default: "bg-gray-100 text-gray-600 border-gray-200",
};

// Cambiamos 'precio' por 'precio_venta' y 'tags' por 'perfil_olfativo'
// para que coincida con tu base de datos de Supabase
export default function ProductCard({
  id,
  nombre,
  precio_venta,
  imagen,
  perfil_olfativo = [],
}) {
  const imageUrl = resolveImageUrl(imagen);

  // 1. Detectamos stock real (mayor a 0)
  const numericPrice = Number(precio_venta);
  const tieneStock = precio_venta && !isNaN(numericPrice) && numericPrice > 0;

  // 2. Formateo de precio para Argentina
  const precioFormateado = tieneStock
    ? new Intl.NumberFormat("es-AR", { minimumFractionDigits: 0 }).format(
        numericPrice,
      )
    : "Sin Stock";

  return (
    <div className="group bg-white p-3 text-center border border-transparent hover:shadow-lg hover:border-gray-100 transition-all duration-300 flex flex-col h-[340px] w-full rounded-lg shadow-sm border-gray-50 relative">
      {/* Área de la Imagen con efecto de stock */}
      <div className="h-36 bg-white mb-2 rounded-md flex items-center justify-center relative shrink-0 overflow-hidden">
        <div
          className={`relative w-full h-full ${!tieneStock ? "grayscale opacity-70" : ""}`}
        >
          <Image
            src={imageUrl}
            alt={nombre || "Perfume"}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Etiquetas Olfativas dinámicas */}
      <div className="flex gap-1 justify-center mb-2 h-5 min-h-[20px]">
        {perfil_olfativo &&
          perfil_olfativo.slice(0, 2).map((tag) => {
            const colorClass = TAG_COLORS[tag] || TAG_COLORS.Default;
            return (
              <span
                key={tag}
                className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${colorClass}`}
              >
                {tag}
              </span>
            );
          })}
      </div>

      {/* Nombre */}
      <div className="h-10 mb-1 overflow-hidden px-1">
        <h3 className="font-serif text-sm text-gray-800 line-clamp-2 leading-tight group-hover:text-black transition-colors">
          {nombre}
        </h3>
      </div>

      {/* Precio / Stock */}
      <div className="mb-2 h-6 flex items-center justify-center">
        {tieneStock ? (
          <span className="block text-yellow-600 font-medium text-sm">
            $ {precioFormateado}
          </span>
        ) : (
          <span className="block text-red-500 font-bold text-[10px] tracking-wider border border-red-200 bg-red-50 px-2 py-0.5 rounded">
            AGOTADO
          </span>
        )}
      </div>

      {/* Botón dinámico */}
      <div className="mt-auto w-full px-2">
        <Link href={`/product/${id}`} className="block w-full">
          <button
            disabled={!tieneStock}
            className={`w-full uppercase text-[10px] tracking-widest border-b pb-1 transition-colors 
              ${
                tieneStock
                  ? "border-gray-200 text-gray-400 hover:border-black hover:text-black cursor-pointer"
                  : "border-transparent text-gray-300 cursor-not-allowed"
              }`}
          >
            {tieneStock ? "Ver Detalles" : "No disponible"}
          </button>
        </Link>
      </div>
    </div>
  );
}
