'use client';

import { useState, useEffect } from 'react';
import { getCategories, getProducts, createProduct, deleteProduct, uploadImage } from '@/lib/api';
import { Category, Product } from '@/types';
import { Plus, Trash2, ArrowLeft, Loader2, Image as ImageIcon, Star } from 'lucide-react';
import Link from 'next/link';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/constants';

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    is_star: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // En producción: const [p, c] = await Promise.all([getProducts(), getCategories()]);
        setProducts(MOCK_PRODUCTS);
        setCategories(MOCK_CATEGORIES);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;

      // Prioridad: Si hay archivo, subirlo. Si no, usar la URL del input.
      if (selectedFile) {
        // finalImageUrl = await uploadImage(selectedFile); // Solo funciona con Supabase activo
        finalImageUrl = URL.createObjectURL(selectedFile); // Mock temporal para visualización local
      }

      const newProd: Product = {
        id: Math.random().toString(),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category_id: formData.category_id,
        image_url: finalImageUrl,
        is_star: formData.is_star,
        created_at: new Date().toISOString()
      };

      setProducts([newProd, ...products]);
      setFormData({ name: '', description: '', price: '', category_id: '', image_url: '', is_star: false });
      setSelectedFile(null);
    } catch (e) {
      alert('Error al crear producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Borrar este producto?')) return;
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#7B3F00]" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-serif font-bold italic">Gestionar Productos</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <form onSubmit={handleAdd} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Nuevo Producto</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Nombre</label>
                <input 
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Categoría</label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none bg-white"
                  value={formData.category_id}
                  onChange={e => setFormData({...formData, category_id: e.target.value})}
                >
                  <option value="">Seleccionar...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Precio ($)</label>
                <input 
                  type="number" required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Descripción</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none h-24 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Imagen (URL o Archivo)</label>
                <input 
                  type="text" placeholder="URL externa..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-100 outline-none mb-2"
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                />
                <input 
                  type="file" accept="image/*"
                  className="text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" id="is_star"
                  className="w-5 h-5 rounded border-stone-300 text-[#7B3F00] focus:ring-[#7B3F00]"
                  checked={formData.is_star}
                  onChange={e => setFormData({...formData, is_star: e.target.checked})}
                />
                <label htmlFor="is_star" className="text-sm font-bold text-stone-700">¿Producto Estrella?</label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#7B3F00] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#5D2F00] transition-all mt-4"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                Crear Producto
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Productos */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col group">
                <div className="h-48 relative">
                  <img src={p.image_url || ''} className="w-full h-full object-cover" alt={p.name} />
                  {p.is_star && <Star className="absolute top-4 left-4 w-5 h-5 fill-[#7B3F00] text-[#7B3F00]" />}
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-xl text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <span className="text-[#7B3F00] font-serif font-bold">${(p.price/1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-stone-500 text-sm line-clamp-2 mb-4">{p.description}</p>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full w-fit">
                    {categories.find(c => c.id === p.category_id)?.name || 'Sin Categoría'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
