-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  is_star BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public catalog reads for the landing.
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- V2 admin policies. Replace this with explicit roles before production.
CREATE POLICY "Admin CRUD categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD products" ON products FOR ALL TO authenticated USING (true);

-- Initial seed data
INSERT INTO categories (name, slug) VALUES
('Panadería', 'panaderia'),
('Bebidas frías', 'bebidas-frias'),
('Bebidas calientes', 'bebidas-calientes'),
('Pasabocas', 'pasabocas');

-- Storage setup will be completed in V2 with a public images bucket.
