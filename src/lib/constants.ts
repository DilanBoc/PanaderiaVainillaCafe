import { Category, Product } from '@/types';

/**
 * Mock data for initial development and local testing.
 * These match the seed data in the Supabase migration.
 */

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Panadería', slug: 'panaderia', created_at: new Date().toISOString() },
  { id: '2', name: 'Bebidas', slug: 'bebidas', created_at: new Date().toISOString() },
  { id: '3', name: 'Pasabocas', slug: 'pasabocas', created_at: new Date().toISOString() },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hogaza Masa Madre',
    description: 'Corteza rústica y miga tierna. Nuestra firma artesanal más buscada.',
    price: 18000,
    category_id: '1',
    image_url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800',
    is_star: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Granizado de Café',
    description: 'Frapé cremoso con café de altura y un toque secreto de vainilla.',
    price: 8900,
    category_id: '2',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800',
    is_star: false,
    created_at: new Date().toISOString(),
  },
];
