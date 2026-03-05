'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors group cursor-pointer"
    >
      <span className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 mr-3 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 
      </span>
      Volver al catálogo
    </button>
  );
}