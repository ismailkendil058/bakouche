-- DROP IF EXISTS (clean slate)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ordonnances CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS promo_packs CASCADE;
DROP TABLE IF EXISTS admin_credentials CASCADE;

DROP TYPE IF EXISTS order_status;
DROP TYPE IF EXISTS ordonnance_status;

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM Types
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM ('En attente', 'Confirmé', 'Livré');
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ordonnance_status') THEN
    CREATE TYPE ordonnance_status AS ENUM ('À vérifier', 'Disponible', 'Contacté');
  END IF;
END$$;

-- Trigger Function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABLE: promo_packs
-- ============================================
CREATE TABLE promo_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(50) NOT NULL,
  original_price VARCHAR(50) NOT NULL,
  image_url TEXT,
  items TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER trg_updated_at_promo_packs
BEFORE UPDATE ON promo_packs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLE: customers
-- ============================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_customers_phone ON customers(phone);

-- ============================================
-- TABLE: orders
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  total_price VARCHAR(50),
  order_status order_status DEFAULT 'En attente',
  note TEXT,
  wilaya VARCHAR(100),
  commune VARCHAR(100),
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER trg_updated_at_orders
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLE: order_items
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  promo_pack_id UUID REFERENCES promo_packs(id) ON DELETE CASCADE,
  quantity INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ordonnances
-- ============================================
CREATE TABLE ordonnances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  image_url TEXT,
  ordonnance_status ordonnance_status DEFAULT 'À vérifier',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER trg_updated_at_ordonnances
BEFORE UPDATE ON ordonnances
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TABLE: admin_credentials
-- ============================================
CREATE TABLE admin_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL DEFAULT 'admin',
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER trg_updated_at_admin_credentials
BEFORE UPDATE ON admin_credentials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS Policies
-- ============================================
ALTER TABLE promo_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordonnances ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read promo_packs" ON promo_packs
FOR SELECT USING (true);

CREATE POLICY "Read for auth users" ON customers
FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read for auth users" ON orders
FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read for auth users" ON order_items
FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read for auth users" ON ordonnances
FOR SELECT TO authenticated USING (true);
CREATE POLICY "Full access to admin_credentials" ON admin_credentials
FOR ALL TO authenticated USING (true);

-- ============================================
-- Default Admin Password (Set hashed)
-- Replace with real hash later
-- ============================================
-- Replace this line with a hash from bcrypt (e.g. $2a$10$...)
INSERT INTO admin_credentials (username, password_hash)
VALUES ('admin', '$2b$10$examplehashadminpassword');
