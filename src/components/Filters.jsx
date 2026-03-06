"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

const olfactoryOptions = [
  {
    value: "Fresco",
    label: "🌊 Fresco",
    color: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
  },
  {
    value: "Dulce",
    label: "🍬 Dulce",
    color: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
  },
  {
    value: "Intenso",
    label: "🔥 Intenso",
    color: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  },
  {
    value: "Floral",
    label: "🌸 Floral",
    color:
      "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
  },
  {
    value: "Versátil",
    label: "✨ Versátil",
    color: "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200",
  },
];

const sortOptions = [
  { value: "", label: "Ordenar por..." },
  { value: "price_asc", label: "Precio: Menor a Mayor" },
  { value: "price_desc", label: "Precio: Mayor a Menor" },
  { value: "name_asc", label: "Nombre: A-Z" },
  { value: "name_desc", label: "Nombre: Z-A" },
];

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Inicializamos estados DIRECTAMENTE desde la URL para evitar desajustes
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const [perfilActivo, setPerfilActivo] = useState(() => {
    const perfilParam = searchParams.get("perfil");
    return perfilParam ? perfilParam.split(",") : [];
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const isFirstRender = useRef(true);
  const wrapperRef = useRef(null);
  const sortRef = useRef(null);

  // useEffect de suggestions (Sin cambios)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 1) {
        const { data } = await supabase
          .from("perfumania")
          .select("id, nombre, imagen, precio_venta")
          .ilike("nombre", `%${searchTerm}%`)
          .limit(5);
        if (data) {
          setSuggestions(data);
          setShowSuggestions(true);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    const timeoutId = setTimeout(() => fetchSuggestions(), 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // useEffect click outside (Sin cambios)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setShowSuggestions(false);
      if (sortRef.current && !sortRef.current.contains(event.target))
        setShowSortMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- FUNCIÓN HELPER PARA COMPARAR ESTADOS ---
  const getParamsString = (search, b, s, p) => {
    const pms = new URLSearchParams();
    if (search) pms.set("search", search);
    if (b) pms.set("brand", b);
    if (s) pms.set("sort", s);
    if (p.length > 0) pms.set("perfil", p.sort().join(","));
    pms.sort(); // Ordenar claves para comparación exacta
    return pms.toString();
  };

  // --- LÓGICA DE ACTUALIZACIÓN DE URL BLINDADA ---
  useEffect(() => {
    // Evitamos ejecutar en el montaje inicial
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      // 1. Estado Actual de la URL (Lo que el navegador tiene ahora)
      const currentUrlParams = new URLSearchParams(window.location.search);
      // Guardamos la página actual para no perderla si no hay cambios reales
      const currentPageFromUrl = currentUrlParams.get("page") || "1";

      // Limpiamos 'page' del objeto actual para comparar solo filtros
      currentUrlParams.delete("page");
      currentUrlParams.sort();
      const currentString = currentUrlParams.toString();

      // 2. Estado Deseado (Lo que dicen tus botones/inputs)
      const newString = getParamsString(searchTerm, brand, sort, perfilActivo);

      // 3. COMPARACIÓN: Solo actualizamos si hay diferencia real
      if (currentString !== newString) {
        const finalParams = new URLSearchParams(newString);
        // Si CAMBIARON los filtros, reseteamos a página 1
        finalParams.set("page", "1");
        router.push(`/?${finalParams.toString()}`, { scroll: false });
      }
      // Si son iguales, NO HACEMOS NADA.
      // Esto evita que al volver atrás se ejecute un router.push() que te mande al hero.
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, brand, sort, perfilActivo, router]);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sort)?.label || "Ordenar por...";

  const handlePerfilClick = (value) => {
    if (value === "") {
      setPerfilActivo([]);
      return;
    }
    setPerfilActivo((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
    setShowSortMenu(false);
  };

  return (
    <div className="flex flex-col gap-6 mb-8 relative z-30">
      {/* SECCIÓN DE FILTROS OLFATIVOS MULTIPLE */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start items-center">
        <button
          onClick={() => handlePerfilClick("")}
          className={`text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all duration-200 
                ${
                  perfilActivo.length === 0
                    ? "bg-gray-800 text-white border-gray-800 ring-2 ring-offset-1 ring-gray-300"
                    : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                }`}
        >
          Todos
        </button>

        {olfactoryOptions.map((option) => {
          const isActive = perfilActivo.includes(option.value);

          return (
            <button
              key={option.value}
              onClick={() => handlePerfilClick(option.value)}
              className={`
                text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all duration-200 flex items-center gap-1
                ${option.color}
                ${
                  isActive
                    ? "ring-2 ring-offset-1 ring-yellow-500/50 opacity-100 scale-105 font-bold shadow-sm"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }
              `}
            >
              {option.label}
              {isActive && <span className="text-[10px] ml-1">✕</span>}
            </button>
          );
        })}
      </div>
      <hr className="border-gray-200" />

      {/* BARRA DE BÚSQUEDA Y ORDENAMIENTO */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
        <div className="relative w-full md:w-1/3 group" ref={wrapperRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-600 transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar perfume..."
            className="pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 focus:bg-white transition-all placeholder:text-gray-400 text-gray-700"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-200">
              {suggestions.map((perfume) => (
                <Link
                  key={perfume.id}
                  href={`/product/${perfume.id}`}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group/item"
                >
                  <div className="relative w-12 h-12 shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100 shadow-sm group-hover/item:border-gray-200">
                    {perfume.imagen && (
                      <Image
                        src={perfume.imagen}
                        alt={perfume.nombre}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate group-hover/item:text-yellow-700">
                      {perfume.nombre}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-full md:w-64" ref={sortRef}>
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center justify-between w-full py-2.5 px-4 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 hover:bg-white transition-all"
          >
            <span className="truncate">{currentSortLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showSortMenu ? "rotate-180" : ""}`}
            />
          </button>
          {showSortMenu && (
            <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setSort(option.value);
                    setShowSortMenu(false);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${sort === option.value ? "bg-yellow-50 text-yellow-800 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
