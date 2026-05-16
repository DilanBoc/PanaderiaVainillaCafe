'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { Category } from '@/types';
import {
  createLocalId,
  createSlug,
  getLocalCategories,
  getLocalProducts,
  resetLocalCatalog,
  saveLocalCategories,
} from '@/lib/localCatalog';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>(() => getLocalCategories());
  const [newName, setNewName] = useState('');

  const persistCategories = (nextCategories: Category[]) => {
    setCategories(nextCategories);
    saveLocalCategories(nextCategories);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;

    const slug = createSlug(name);
    if (categories.some((category) => category.slug === slug)) {
      window.alert('Ya existe una categoría con ese nombre.');
      return;
    }

    const newCategory: Category = {
      id: createLocalId('cat'),
      name,
      slug,
      created_at: new Date().toISOString(),
    };

    persistCategories([...categories, newCategory]);
    setNewName('');
  };

  const handleDelete = (id: string) => {
    const productsUsingCategory = getLocalProducts().filter((product) => product.category_id === id);
    if (productsUsingCategory.length > 0) {
      window.alert('Primero cambia o elimina los productos de esta categoría.');
      return;
    }

    if (!window.confirm('¿Seguro que quieres borrar esta categoría?')) return;
    persistCategories(categories.filter((category) => category.id !== id));
  };

  const handleReset = () => {
    if (!window.confirm('¿Restaurar categorías y productos demo?')) return;
    resetLocalCatalog();
    setCategories(getLocalCategories());
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Volver al inicio">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">Demo local V1.1</p>
              <h1 className="text-3xl font-serif font-bold italic">Gestionar Categorías</h1>
            </div>
          </div>
          <Link href="/admin/products" className="text-sm font-bold text-[#7B3F00] hover:underline">
            Ir a productos
          </Link>
        </div>

        <form onSubmit={handleAdd} className="grid sm:grid-cols-[1fr_auto] gap-4 mb-8 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-stone-100">
          <input
            type="text"
            placeholder="Nombre de la nueva categoría"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-200"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <button type="submit" className="bg-[#7B3F00] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5D2F00] transition-all">
            <Plus className="w-5 h-5" />
            Agregar
          </button>
        </form>

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-stone-500">Los cambios se guardan en este navegador con localStorage.</p>
          <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-[#7B3F00]">
            <RotateCcw className="w-4 h-4" />
            Restaurar demo
          </button>
        </div>

        <div className="grid gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-5 sm:p-6 rounded-2xl flex justify-between items-center border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <p className="font-bold text-lg">{category.name}</p>
                <p className="text-stone-400 text-xs font-mono">slug: {category.slug}</p>
              </div>
              <button type="button" onClick={() => handleDelete(category.id)} className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" aria-label={`Borrar ${category.name}`}>
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
