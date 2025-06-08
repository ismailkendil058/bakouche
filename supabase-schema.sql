
-- Pharmacie Bakouche Database Schema for Supabase
-- This schema defines the tables needed for the pharmacy website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE order_status AS ENUM ('En attente', 'Confirmé', 'Livré');
CREATE TYPE ordonnance_status AS ENUM ('À vérifier', 'Disponible', 'Contacté');

-- Promo Packs Table
CREATE TABLE promo_packs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(50) NOT NULL,
    original_price VARCHAR(50) NOT NULL,
    image_url TEXT,
    items TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers Table
CREATE TABLE customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    pack_id UUID REFERENCES promo_packs(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    delivery_address TEXT NOT NULL,
    pack_title VARCHAR(255) NOT NULL,
    status order_status DEFAULT 'En attente',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ordonnances Table
CREATE TABLE ordonnances (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    image_url TEXT,
    status ordonnance_status DEFAULT 'À vérifier',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Settings Table
CREATE TABLE admin_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Information Table
CREATE TABLE contact_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pharmacy_name VARCHAR(255) NOT NULL DEFAULT 'Pharmacie Bakouche',
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255),
    google_maps_url TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin settings
INSERT INTO admin_settings (setting_key, setting_value) VALUES 
('admin_password', '0000'),
('site_title', 'Pharmacie Bakouche'),
('delivery_zone', 'Rouiba'),
('free_delivery', 'true');

-- Insert default contact information
INSERT INTO contact_info (pharmacy_name, phone, address, google_maps_url) VALUES 
('Pharmacie Bakouche', '+213 XXX XXX XXX', 'Centre-ville Rouiba, Alger, Algérie', 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3196.123456789!2d3.123456!3d36.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYuMTIzNDU2LCAzLjEyMzQ1Ng!5e0!3m2!1sen!2s!4v1234567890');

-- Insert sample promo packs
INSERT INTO promo_packs (title, description, price, original_price, image_url, items) VALUES 
('Pack Famille Santé', 'Pack complet pour toute la famille avec produits essentiels', '2500 DA', '3200 DA', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9', ARRAY['Vitamines multiples', 'Thermomètre digital', 'Masques chirurgicaux', 'Gel hydroalcoolique', 'Pansements assortis']),
('Pack Beauté & Bien-être', 'Prenez soin de vous avec notre sélection beauté', '1800 DA', '2400 DA', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901', ARRAY['Crème hydratante', 'Sérum vitamine C', 'Masque purifiant', 'Huile essentielle', 'Baume à lèvres']),
('Pack Hygiène Complète', 'Tout le nécessaire pour une hygiène parfaite', '1200 DA', '1600 DA', 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1', ARRAY['Dentifrice premium', 'Brosse à dents électrique', 'Bain de bouche', 'Savon antibactérien', 'Déodorant naturel']);

-- Create indexes for better performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_ordonnances_status ON ordonnances(status);
CREATE INDEX idx_ordonnances_created_at ON ordonnances(created_at);
CREATE INDEX idx_promo_packs_active ON promo_packs(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE promo_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordonnances ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to promo packs and contact info
CREATE POLICY "Enable read access for all users" ON promo_packs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON contact_info FOR SELECT USING (true);

-- Create policies for admin access (you'll need to implement authentication)
-- These are basic policies - adjust based on your authentication setup
CREATE POLICY "Enable all access for authenticated users" ON promo_packs FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON customers FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON orders FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON ordonnances FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON admin_settings FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON contact_info FOR ALL USING (true);

-- Create triggers to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_promo_packs_updated_at BEFORE UPDATE ON promo_packs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ordonnances_updated_at BEFORE UPDATE ON ordonnances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
