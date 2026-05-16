import { supabase } from './supabase';
import { Product, Category } from '@/types';

// --- CATEGORIES ---

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data as Category[];
}

export async function createCategory(name: string) {
  const slug = name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, slug }])
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// --- PRODUCTS ---

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*) ')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Product[];
}

export async function createProduct(product: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// --- STORAGE (IMAGES) ---

export async function uploadImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrl;
}
