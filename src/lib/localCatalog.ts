import { Category, Product } from '@/types';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from './constants';

const CATEGORIES_KEY = 'vyc:v1.1:categories';
const PRODUCTS_KEY = 'vyc:v1.1:products';

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalCategories(): Category[] {
  return readJson<Category[]>(CATEGORIES_KEY, MOCK_CATEGORIES);
}

export function getLocalProducts(): Product[] {
  return readJson<Product[]>(PRODUCTS_KEY, MOCK_PRODUCTS);
}

export function saveLocalCategories(categories: Category[]) {
  writeJson(CATEGORIES_KEY, categories);
}

export function saveLocalProducts(products: Product[]) {
  writeJson(PRODUCTS_KEY, products);
}

export function resetLocalCatalog() {
  saveLocalCategories(MOCK_CATEGORIES);
  saveLocalProducts(MOCK_PRODUCTS);
}

export function createLocalId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
