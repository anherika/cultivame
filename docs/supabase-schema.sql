-- Ejecutar en Supabase SQL Editor.
-- El catálogo es público; los registros de cada persona son privados.

create table if not exists public.user_plants (
  user_id uuid not null references auth.users(id) on delete cascade,
  plant_id text not null,
  status text not null default 'healthy' check (status in ('healthy','needs-care','dead')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, plant_id)
);

create table if not exists public.identifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  plant_id text,
  confidence numeric check (confidence >= 0 and confidence <= 1),
  source text not null default 'plantnet',
  created_at timestamptz not null default now()
);

create table if not exists public.care_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plant_id text not null,
  status text not null check (status in ('healthy','needs-care','dead')),
  note text,
  created_at timestamptz not null default now()
);

alter table public.user_plants enable row level security;
alter table public.identifications enable row level security;
alter table public.care_logs enable row level security;

create policy "Users can read their plants" on public.user_plants
  for select using (auth.uid() = user_id);
create policy "Users can add their plants" on public.user_plants
  for insert with check (auth.uid() = user_id);
create policy "Users can update their plants" on public.user_plants
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their plants" on public.user_plants
  for delete using (auth.uid() = user_id);

create policy "Users can read their identifications" on public.identifications
  for select using (auth.uid() = user_id);
create policy "Users can create identifications" on public.identifications
  for insert with check (auth.uid() = user_id or user_id is null);

create policy "Users can read their care logs" on public.care_logs
  for select using (auth.uid() = user_id);
create policy "Users can create their care logs" on public.care_logs
  for insert with check (auth.uid() = user_id);
