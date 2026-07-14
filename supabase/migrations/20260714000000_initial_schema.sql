create extension if not exists "pgcrypto";

create table if not exists public.spots (
  id text primary key,
  name text not null,
  region text not null,
  latitude double precision not null,
  longitude double precision not null,
  category text not null check (category in ('culture', 'nature', 'food', 'activity')),
  tags text[] not null default '{}',
  description text not null default '',
  photo_url text,
  fee_amount integer not null default 0,
  fee_note text not null default '',
  duration_minutes integer not null default 90,
  opening_hours jsonb not null default '{}'::jsonb,
  popularity numeric not null default 0,
  source text not null default 'supabase',
  source_url text,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travel_plans (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination_name text not null,
  destination_latitude double precision not null,
  destination_longitude double precision not null,
  travel_date date not null,
  start_time time not null,
  travel_style text not null,
  travel_pace text not null,
  companion_type text not null,
  party_size integer not null check (party_size between 1 and 10),
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travel_plan_spots (
  id uuid primary key default gen_random_uuid(),
  travel_plan_id uuid not null references public.travel_plans(id) on delete cascade,
  spot_id text not null references public.spots(id),
  visit_order integer not null,
  transport_mode text,
  estimated_arrival_at timestamptz,
  estimated_departure_at timestamptz,
  estimated_route_minutes integer,
  estimated_route_distance_meters integer,
  estimated_route_cost integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (travel_plan_id, visit_order)
);

alter table public.spots enable row level security;
alter table public.travel_plans enable row level security;
alter table public.travel_plan_spots enable row level security;
create policy "spots are readable" on public.spots for select using (true);
create policy "owners can manage plans" on public.travel_plans for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "owners can manage plan spots" on public.travel_plan_spots for all using (exists (select 1 from public.travel_plans p where p.id = travel_plan_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.travel_plans p where p.id = travel_plan_id and p.owner_id = auth.uid()));
