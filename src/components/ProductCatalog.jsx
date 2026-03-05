import FadeIn from "./FadeIn";
import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import Filters from "./Filters";

export default function ProductCatalog({ products, count, currentPage, perPage, errorMsg }) {
  const totalPages = Math.ceil(count / perPage);

  return (
    <section className="py-24 px-6 bg-gray-50" id="catalogo">
      <div className="max-w-6xl mx-auto">
        
        <FadeIn>
          <h2 className="font-serif text-4xl text-center mb-12 text-gray-800">
            Nuestro Catalogo
          </h2>
        </FadeIn>

        <FadeIn>
          <Filters />
        </FadeIn>

        {errorMsg && (
          <p className="text-red-500 text-center my-8 p-4 bg-red-50 rounded-lg border border-red-100">
            {errorMsg}
          </p>
        )}

        {!products || products.length === 0 ? (
          !errorMsg && (
            <p className="text-center text-gray-500 py-10 text-lg">
              No se encontraron perfumes con esos criterios.
            </p>
          )
        ) : (
          // Ajustamos la grilla para 4 columnas en desktop
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.05}>
                <ProductCard 
                  id={product.id}
                  nombre={product.nombre}
                  // 1. Lógica para detectar Sin Stock
                  precio={(!product.precio_venta || product.precio_venta === 0) 
                    ? "Sin Stock" 
                    : product.precio_venta
                  }
                  imagen={product.imagen}
                  // 2. Lógica para pasar las etiquetas (tags)
                  tags={product.perfil_olfativo || []} 
                />
              </FadeIn>
            ))}
          </div>
        )}

        {count > perPage && (
          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
}