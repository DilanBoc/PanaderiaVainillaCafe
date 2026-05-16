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

-- Create policies (Public read, Admin write)
-- Note: In a real Supabase environment, you would use auth.uid() or roles.
-- For now, we'll allow public read.
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- Admin policies (Authenticated users can do everything)
CREATE POLICY "Admin CRUD categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin CRUD products" ON products FOR ALL TO authenticated USING (true);

-- Initial seed data
INSERT INTO categories (name, slug) VALUES 
('Panadería', 'panaderia'),
('Bebidas', 'bebidas'),
('Pasabocas', 'pasabocas');

-- Storage setup (this is usually done via Supabase dashboard or CLI config, 
-- but we can mention it in the instructions)
