'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PaginationControls({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Usamos una referencia para saber si el cambio de página fue provocado por un clic nuestro
  const isManualNavigation = useRef(false);

  // Efecto para hacer scroll SOLO si cambiamos de página manualmente
  useEffect(() => {
    if (isManualNavigation.current) {
      const catalogoSection = document.getElementById('catalogo');
      if (catalogoSection) {
        catalogoSection.scrollIntoView({ behavior: 'smooth' });
      }
      isManualNavigation.current = false; // Reset
    }
  }, [currentPage, searchParams]);

  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    // Marcamos que esta navegación fue manual para activar el scroll
    isManualNavigation.current = true;

    // Navegamos con scroll: false para evitar que Next.js nos lleve al Hero
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Si solo hay una página o ninguna, no mostramos los controles
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 mt-16 font-sans">
      <button
        onClick={() => updatePage(currentPage - 1)}
        disabled={isFirstPage}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isFirstPage
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
        }`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
      </button>

      <div className="text-sm font-medium text-gray-600">
        Página {currentPage} de {totalPages}
      </div>

      <button
        onClick={() => updatePage(currentPage + 1)}
        disabled={isLastPage}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isLastPage
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
        }`}
      >
        Siguiente <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}