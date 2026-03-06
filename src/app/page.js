import Hero from "../components/Hero";
import ProductCatalog from "../components/ProductCatalog";
import { supabase } from "../lib/supabaseClient";

const PER_PAGE = 16;

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const searchTerm = params?.search || "";
  const sortOption = params?.sort || "";
  const perfilFiltro = params?.perfil || "";

  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE - 1;

  let products = [];
  let count = 0;
  let errorMsg = null;

  try {
    const listaPerfiles = perfilFiltro ? perfilFiltro.split(",") : [];

    const { data: rpcData, error } = await supabase.rpc("filtrar_perfumes", {
      p_search: searchTerm,
      p_perfiles: listaPerfiles,
      p_sort: sortOption,
      p_start: start,
      p_end: end,
    });

    if (error) throw new Error(error.message);

    products = rpcData?.data || [];
    count = rpcData?.count || 0;
  } catch (e) {
    console.error("Error en servidor:", e.message);
    errorMsg = "Error al cargar productos.";
  }

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ProductCatalog
        products={products}
        count={count}
        currentPage={currentPage}
        perPage={PER_PAGE}
        errorMsg={errorMsg}
      />
      <footer className="bg-dark text-white py-12 text-center border-t border-gray-200">
        <p className="font-serif text-2xl mb-4 text-gold/80">PERFUMANIA</p>
        <p className="text-gray-500 text-xs tracking-wider">
          © 2026 PERFUMANIA Parfums.
        </p>
      </footer>
    </main>
  );
}
