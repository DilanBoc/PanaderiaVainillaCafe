'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, RotateCcw, Star, Trash2 } from 'lucide-react';
import { Category, Product } from '@/types';
import {
  createLocalId,
  getLocalCategories,
  getLocalProducts,
  resetLocalCatalog,
  saveLocalProducts,
} from '@/lib/localCatalog';

const fallbackImage = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800';

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>(() => getLocalProducts());
  const [categories, setCategories] = useState<Category[]>(() => getLocalCategories());
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    is_star: false,
  });

  const persistProducts = (nextProducts: Product[]) => {
    setProducts(nextProducts);
    saveLocalProducts(nextProducts);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const price = Number(formData.price);

    if (!formData.name.trim() || !formData.category_id || !Number.isFinite(price) || price <= 0) {
      window.alert('Completa nombre, categoría y un precio válido.');
      return;
    }

    const newProduct: Product = {
      id: createLocalId('prod'),
      name: formData.name.trim(),
      description: formData.description.trim(),
      price,
      category_id: formData.category_id,
      image_url: formData.image_url.trim() || fallbackImage,
      is_star: formData.is_star,
      created_at: new Date().toISOString(),
    };

    persistProducts([newProduct, ...products]);
    setFormData({ name: '', description: '', price: '', category_id: '', image_url: '', is_star: false });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('¿Borrar este producto?')) return;
    persistProducts(products.filter((product) => product.id !== id));
  };

  const handleReset = () => {
    if (!window.confirm('¿Restaurar categorías y productos demo?')) return;
    resetLocalCatalog();
    setProducts(getLocalProducts());
    setCategories(getLocalCategories());
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9]">
      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Volver al inicio">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">Demo local V1.1</p>
              <h1 className="text-3xl font-serif font-bold italic">Gestionar Productos</h1>
            </div>
          </div>
          <div className="flex gap-4 text-sm font-bold">
            <Link href="/admin/categories" className="text-[#7B3F00] hover:underline">Categorías</Link>
            <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 text-stone-500 hover:text-[#7B3F00]">
              <RotateCcw className="w-4 h-4" />
              Restaurar demo
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <form onSubmit={handleAdd} className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-stone-100 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold mb-2">Nuevo Producto</h2>
              <p className="text-sm text-stone-500 mb-6">Se guarda localmente para demostrar el flujo antes de Supabase.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Nombre</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Categoría</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none bg-white" value={formData.category_id} onChange={(event) => setFormData({ ...formData, category_id: event.target.value })}>
                    <option value="">Seleccionar...</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Precio COP</label>
                  <input type="number" min="1" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none" value={formData.price} onChange={(event) => setFormData({ ...formData, price: event.target.value })} />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Descripción</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none h-24 resize-none" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Imagen URL pública</label>
                  <input type="url" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none" value={formData.image_url} onChange={(event) => setFormData({ ...formData, image_url: event.target.value })} />
                </div>

                <label className="flex items-center gap-3 py-2 text-sm font-bold text-stone-700">
                  <input type="checkbox" className="w-5 h-5 rounded border-stone-300 accent-[#7B3F00]" checked={formData.is_star} onChange={(event) => setFormData({ ...formData, is_star: event.target.checked })} />
                  Producto estrella
                </label>

                <button type="submit" className="w-full bg-[#7B3F00] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#5D2F00] transition-all mt-4">
                  <Plus className="w-5 h-5" />
                  Crear Producto
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-[1.75rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col group">
                  <div className="h-48 relative bg-stone-100">
                    <img src={product.image_url || fallbackImage} className="w-full h-full object-cover" alt={product.name} />
                    {product.is_star && <Star className="absolute top-4 left-4 w-5 h-5 fill-[#7B3F00] text-[#7B3F00]" />}
                    <button type="button" onClick={() => handleDelete(product.id)} className="absolute top-4 right-4 p-2 bg-white/85 backdrop-blur-md rounded-xl text-stone-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-sm" aria-label={`Borrar ${product.name}`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <span className="text-[#7B3F00] font-serif font-bold whitespace-nowrap">${(product.price / 1000).toFixed(1)}k</span>
                    </div>
                    <p className="text-stone-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full w-fit">
                      {categories.find((category) => category.id === product.category_id)?.name || 'Sin categoría'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
