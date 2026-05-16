'use client';

import { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory } from '@/lib/api';
import { Category } from '@/types';
import { Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MOCK_CATEGORIES } from '@/lib/constants';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCats() {
      try {
        // En producción: const data = await getCategories();
        // Para pruebas locales:
        setCategories(MOCK_CATEGORIES);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCats();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    try {
      // En producción: const newCat = await createCategory(newName);
      // Para simulación local:
      const newCat: Category = {
        id: Math.random().toString(),
        name: newName,
        slug: newName.toLowerCase().replace(/ /g, '-'),
        created_at: new Date().toISOString()
      };
      setCategories([...categories, newCat]);
      setNewName('');
    } catch (e) {
      alert('Error al crear categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que quieres borrar esta categoría?')) return;
    try {
      // En producción: await deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (e) {
      alert('Error al borrar');
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#7B3F00]" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-serif font-bold italic">Gestionar Categorías</h1>
      </div>

      <form onSubmit={handleAdd} className="flex gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <input 
          type="text" 
          placeholder="Nombre de la nueva categoría..." 
          className="flex-grow px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-200"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-[#7B3F00] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5D2F00] disabled:opacity-50 transition-all"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Agregar
        </button>
      </form>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-2xl flex justify-between items-center border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p className="font-bold text-lg">{cat.name}</p>
              <p className="text-stone-400 text-xs font-mono">slug: {cat.slug}</p>
            </div>
            <button 
              onClick={() => handleDelete(cat.id)}
              className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
