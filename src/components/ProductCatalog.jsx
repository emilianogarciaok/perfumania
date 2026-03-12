import FadeIn from "./FadeIn";
import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import Filters from "./Filters";
import BrandSidebar from "./BrandSidebar";

export default function ProductCatalog({
  products,
  count,
  currentPage,
  perPage,
  errorMsg,
}) {
  const totalPages = Math.ceil(count / perPage);

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gray-50" id="catalogo">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl text-center mb-8 sm:mb-12 text-gray-800">
            Nuestro Catálogo
          </h2>
        </FadeIn>

        <FadeIn>
          <Filters />
        </FadeIn>

        {/* Mobile/Tablet: brand scroll horizontal */}
        <div className="lg:hidden mb-6">
          <BrandSidebar />
        </div>

        {/* Desktop: layout con sidebar */}
        <div className="lg:flex lg:gap-8">
          {/* Sidebar solo visible en desktop */}
          <div className="hidden lg:block">
            <BrandSidebar />
          </div>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {products.map((product, index) => (
                  <FadeIn key={product.id} delay={index * 0.05}>
                    <ProductCard
                      id={product.id}
                      nombre={product.nombre}
                      imagen={product.imagen}
                      precio_venta={product.precio_venta}
                      perfil_olfativo={product.perfil_olfativo || []}
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
        </div>
      </div>
    </section>
  );
}
