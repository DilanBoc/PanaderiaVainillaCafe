import Link from 'next/link';
import { ArrowLeft, Boxes, Tags } from 'lucide-react';

export default function AdminDemoHome() {
  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      <div className="max-w-5xl mx-auto p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Volver al inicio">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">Acceso demo V1.1</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold italic">Panel Administrativo</h1>
          </div>
        </div>

        <div className="bg-white border border-stone-100 rounded-[2rem] p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-3">Demo sin login</h2>
          <p className="text-stone-600 leading-relaxed max-w-3xl">
            En V1.1 este panel no tiene autenticación. Está pensado para mostrarle a la dueña cómo funcionaría la creación de categorías y productos. En V2 se reemplaza este acceso directo por login real y persistencia en Supabase.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link href="/admin/categories" className="bg-white border border-stone-100 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <Tags className="w-8 h-8 text-[#7B3F00] mb-5" />
            <h3 className="text-2xl font-serif font-bold mb-2">Categorías</h3>
            <p className="text-sm text-stone-500 leading-relaxed">Crear y borrar categorías demo para filtrar el catálogo.</p>
          </Link>

          <Link href="/admin/products" className="bg-white border border-stone-100 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <Boxes className="w-8 h-8 text-[#7B3F00] mb-5" />
            <h3 className="text-2xl font-serif font-bold mb-2">Productos</h3>
            <p className="text-sm text-stone-500 leading-relaxed">Crear y borrar productos demo con precio, categoría e imagen pública.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
