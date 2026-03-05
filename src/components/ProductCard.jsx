import Image from "next/image";
import Link from "next/link";

const FALLBACK_URL = "https://via.placeholder.com/192x192.png?text=AURA+FOTO";

// Definimos los colores para cada tipo de perfil olfativo
const TAG_COLORS = {
  Fresco: "bg-blue-100 text-blue-800 border-blue-200",
  Dulce: "bg-pink-100 text-pink-800 border-pink-200",
  Intenso: "bg-red-100 text-red-800 border-red-200",
  Floral: "bg-purple-100 text-purple-800 border-purple-200",
  Versátil: "bg-teal-100 text-teal-800 border-teal-200",
  Default: "bg-gray-100 text-gray-600 border-gray-200"
};

// Agregamos 'tags' a las props (con un array vacío por defecto para evitar errores)
export default function ProductCard({ id, nombre, precio, imagen, tags = [] }) {
  const imageUrl = imagen || FALLBACK_URL;

  // 1. Detectamos si hay stock (Si precio existe y es mayor a 0)
  // Convertimos a número por seguridad en caso de recibir strings numéricos
  const numericPrice = Number(precio);
  const tieneStock = precio && !isNaN(numericPrice) && numericPrice > 0;

  // 2. Función para formatear el número
  // Verificamos si es un número válido antes de formatear para evitar errores
  const precioFormateado = tieneStock 
    ? new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(numericPrice)
    : precio;

  return (
    // AUMENTO DE ALTURA: Cambiado de h-[300px] a h-[340px] para acomodar los tags
    <div className="group bg-white p-3 text-center border border-transparent hover:shadow-lg hover:border-gray-100 transition-all duration-300 flex flex-col h-[340px] w-full rounded-lg shadow-sm border-gray-50 relative">
      
      {/* Área de la Imagen */}
      <div className="h-36 bg-white mb-2 rounded-md flex items-center justify-center relative shrink-0 overflow-hidden">
        <div className={`relative w-full h-full ${!tieneStock ? 'grayscale opacity-70' : ''}`}>
             <Image
              src={imageUrl}
              alt={nombre || "Perfume"}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      </div>

      {/* --- NUEVO: Etiquetas Olfativas (Chips) --- */}
      {/* Mostramos máximo 2 etiquetas para mantener el diseño limpio */}
      <div className="flex gap-1 justify-center mb-2 h-5 min-h-[20px]">
        {tags && tags.slice(0, 2).map((tag) => {
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
          <span className="block text-red-500 font-bold text-xs tracking-wider border border-red-200 bg-red-50 px-2 py-0.5 rounded">
            SIN STOCK
          </span>
        )}
      </div>

      {/* Botón */}
      <div className="mt-auto w-full px-2">
        <Link href={`/product/${id}`} className="block w-full">
          <button 
            disabled={!tieneStock} 
            className={`w-full uppercase text-[10px] tracking-widest border-b pb-1 transition-colors cursor-pointer 
              ${tieneStock 
                ? 'border-gray-200 text-gray-400 hover:border-black hover:text-black' 
                : 'border-transparent text-gray-300 cursor-not-allowed'
              }`}
          >
            {tieneStock ? 'Ver Detalles' : 'No disponible'}
          </button>
        </Link>
      </div>
    </div>
  );
}