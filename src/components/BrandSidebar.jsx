"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const LOGO_BASE =
  "https://zcbeeitubmylgoatgxmk.supabase.co/storage/v1/object/public/IMAGES/LOGOS";

const casaOptions = [
  { value: "AFNAN", logo: `${LOGO_BASE}/AFNAN.png` },
  { value: "AL HARAMAIN", logo: `${LOGO_BASE}/AL HARAMAIN.jpg` },
  { value: "AL WATANIAH", logo: `${LOGO_BASE}/AL WATANIAH.jpg` },
  { value: "ARMAF", logo: `${LOGO_BASE}/ARMAF.jpg` },
  { value: "BOROUJ", logo: `${LOGO_BASE}/BOROUJ.jpg` },
  { value: "DUA FRAGRANCES", logo: `${LOGO_BASE}/DUAFRAG.jpg` },
  { value: "EMPER", logo: `${LOGO_BASE}/EMPER.jpg` },
  { value: "FRAGRANCE WORLD", logo: `${LOGO_BASE}/FRAGRANCEWORLD.webp` },
  { value: "FRENCH AVENUE", logo: `${LOGO_BASE}/FRENCHAVENUE.jpg` },
  { value: "Lattafa", logo: `${LOGO_BASE}/LATTAFA.png` },
  { value: "MAISON ALHAMBRA", logo: `${LOGO_BASE}/MAISONALHAMBRA.jpg` },
  { value: "NAUTICA", logo: `${LOGO_BASE}/NAUTICA.jpg` },
  { value: "RASASI", logo: `${LOGO_BASE}/RASASI.webp` },
  { value: "RAYHAAN", logo: `${LOGO_BASE}/RAYHAAN.jpg` },
  { value: "ZENTIDOS FRAGANCIAS", logo: `${LOGO_BASE}/ZENTIDO.jpg` },
  { value: "ZIMAYA", logo: `${LOGO_BASE}/ZIMAYA.jpg` },
];

export default function BrandSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand") || "";

  const handleBrandClick = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === brand) {
      params.delete("brand");
    } else {
      params.set("brand", value);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* MOBILE/TABLET: scroll horizontal */}
      <div className="lg:hidden">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Marcas
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => handleBrandClick("")}
            className={`shrink-0 text-[11px] font-semibold py-2 px-4 rounded-lg border transition-all duration-200
              ${brand === ""
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-500 border-gray-200"
              }`}
          >
            Todas
          </button>
          {casaOptions.map((casa) => (
            <button
              key={casa.value}
              onClick={() => handleBrandClick(casa.value)}
              className={`shrink-0 flex flex-col items-center gap-1 py-1.5 px-2 rounded-lg border transition-all duration-200
                ${brand === casa.value
                  ? "border-gray-900 ring-2 ring-yellow-500/50 shadow-md bg-white"
                  : "border-gray-200 bg-white opacity-60"
                }`}
            >
              <div className="relative w-14 h-8">
                <Image
                  src={casa.logo}
                  alt={casa.value}
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <span className="text-[8px] text-gray-400 font-medium leading-tight truncate max-w-16">
                {casa.value}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP: sidebar vertical */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto pr-2 scrollbar-hide">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">
          Marcas
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleBrandClick("")}
            className={`text-[11px] font-semibold py-2 px-3 rounded-lg border transition-all duration-200 col-span-2
              ${brand === ""
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
          >
            Todas las marcas
          </button>
          {casaOptions.map((casa) => (
            <button
              key={casa.value}
              onClick={() => handleBrandClick(casa.value)}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg border transition-all duration-200
                ${brand === casa.value
                  ? "border-gray-900 ring-2 ring-offset-1 ring-yellow-500/50 shadow-md bg-white"
                  : "border-gray-200 bg-white opacity-60 hover:opacity-100 hover:border-gray-400"
                }`}
            >
              <div className="relative w-full h-10">
                <Image
                  src={casa.logo}
                  alt={casa.value}
                  fill
                  className="object-contain px-1.5"
                  sizes="104px"
                />
              </div>
              <span className="text-[8px] text-gray-400 font-medium leading-tight truncate w-full px-1 text-center">
                {casa.value}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
