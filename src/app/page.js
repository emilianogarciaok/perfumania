import Hero from "../components/Hero";
import ProductCatalog from "../components/ProductCatalog";
import { supabase } from "../lib/supabaseClient";

const PER_PAGE = 16;

export default async function Home({ searchParams }) {
  // 1. Resolver parámetros
  const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  const searchTerm = params?.search || "";
  const sortOption = params?.sort || "";

  // Capturamos el perfil de la URL (ej: "Fresco,Dulce")
  const perfilFiltro = params?.perfil || "";

  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE - 1;

  let products = [];
  let count = 0;
  let errorMsg = null;

  try {
    // 2. Construir consulta a Supabase
    let query = supabase
      .from("perfumania")
      .select("id, nombre, precio_venta, imagen, casa, perfil_olfativo", {
        count: "exact",
      })
      // FILTRO GLOBAL DE STOCK: Solo perfumes con precio mayor a 0
      .gt("precio_venta", 0);

    // FILTRO DE BÚSQUEDA
    if (searchTerm) query = query.ilike("nombre", `%${searchTerm}%`);

    // --- FILTRO POR PERFIL (JSONB) ---
    if (perfilFiltro) {
      const listaPerfiles = perfilFiltro.split(",");
      // Usamos 'contains' porque en tu DB perfil_olfativo es tipo jsonb ["Dulce"]
      query = query.contains("perfil_olfativo", listaPerfiles);
    }

    // ORDENAMIENTO (Corregido a 'precio_venta')
    switch (sortOption) {
      case "price_asc":
        query = query.order("precio_venta", { ascending: true });
        break;
      case "price_desc":
        query = query.order("precio_venta", { ascending: false });
        break;
      case "name_asc":
        query = query.order("nombre", { ascending: true });
        break;
      case "name_desc":
        query = query.order("nombre", { ascending: false });
        break;
      default:
        query = query.order("id", { ascending: true });
        break;
    }

    // 3. Ejecutar consulta con paginación
    const { data, count: totalCount, error } = await query.range(start, end);

    if (error) throw new Error(error.message);

    products = data;
    count = totalCount;
  } catch (e) {
    console.error("Error detectado:", e.message);
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
