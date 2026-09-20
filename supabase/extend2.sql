-- ==============================================================================
-- SUPABASE EXTENSION & DELTA MIGRATION: EXTEND2.SQL
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query
-- (Skrip ini menambahkan tabel Leads / Pesan Kontak & Kebijakan Keamanan RLS)
-- ==============================================================================

-- 1. TABEL LEADS (PESAN KONTAK DARI PENGUNJUNG / CALON KLIEN)
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'read', 'replied'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- Kebijakan: Pengunjung publik dapat mengirim pesan baru (INSERT)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can insert leads') THEN
    CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;

  -- Kebijakan: Admin terautentikasi dapat membaca seluruh pesan (SELECT)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can view leads') THEN
    CREATE POLICY "Authenticated users can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
  END IF;

  -- Kebijakan: Admin terautentikasi dapat memperbarui status pesan (UPDATE)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can update leads') THEN
    CREATE POLICY "Authenticated users can update leads" ON public.leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;

  -- Kebijakan: Admin terautentikasi dapat menghapus pesan (DELETE)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can delete leads') THEN
    CREATE POLICY "Authenticated users can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);
  END IF;
END $$;
