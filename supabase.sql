-- Run in Supabase SQL editor
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null, category text not null, price numeric,
  description text, product_code text, sizes text,
  featured boolean default false, created_at timestamptz default now());
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null);
alter table products enable row level security;
alter table product_images enable row level security;
create policy "public read" on products for select using (true);
create policy "public read" on product_images for select using (true);
create policy "owner write" on products for all to authenticated using (true) with check (true);
create policy "owner write" on product_images for all to authenticated using (true) with check (true);
-- Storage: public bucket for photos
insert into storage.buckets (id, name, public) values ('jewellery','jewellery',true);
create policy "public read img" on storage.objects for select using (bucket_id='jewellery');
create policy "owner upload img" on storage.objects for all to authenticated using (bucket_id='jewellery') with check (bucket_id='jewellery');
-- Then: Authentication > Users > Add user (the owner's email + password) for /#/admin
