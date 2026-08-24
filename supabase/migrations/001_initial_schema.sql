-- ============================================================
-- Gidiyorum — Initial Database Schema
-- Run this in Supabase SQL Editor or via: supabase db push
-- ============================================================

-- ----------------------------------------------------------------
-- TABLE: users (synchronized with Supabase Auth)
-- ----------------------------------------------------------------
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text unique,
  avatar_url  text,
  created_at  timestamptz default now() not null
);

-- Trigger: auto-create user profile on new signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name'
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------------------
-- TABLE: trips
-- ----------------------------------------------------------------
create table if not exists public.trips (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.users(id) on delete cascade,
  title          text not null,
  city           text not null,
  country        text not null default '',
  start_date     date,
  end_date       date,
  budget_level   text check (budget_level in ('budget', 'mid', 'luxury')),
  walking_pace   text check (walking_pace in ('slow', 'moderate', 'fast')),
  interest_tags  text[] default '{}',
  cover_image    text,
  created_at     timestamptz default now() not null
);

create index if not exists trips_user_id_idx on public.trips(user_id);
create index if not exists trips_start_date_idx on public.trips(start_date);

-- ----------------------------------------------------------------
-- TABLE: itinerary_days
-- ----------------------------------------------------------------
create table if not exists public.itinerary_days (
  id          uuid primary key default gen_random_uuid(),
  trip_id     uuid not null references public.trips(id) on delete cascade,
  day_number  int not null,
  date        date,
  created_at  timestamptz default now() not null,
  unique(trip_id, day_number)
);

create index if not exists itinerary_days_trip_id_idx on public.itinerary_days(trip_id);

-- ----------------------------------------------------------------
-- TABLE: itinerary_items
-- ----------------------------------------------------------------
create table if not exists public.itinerary_items (
  id           uuid primary key default gen_random_uuid(),
  day_id       uuid not null references public.itinerary_days(id) on delete cascade,
  place_name   text not null,
  category     text,
  time_slot    text,
  order_index  int not null default 0,
  latitude     float8,
  longitude    float8,
  description  text,
  image_url    text,
  price_level  int check (price_level between 1 and 4),
  created_at   timestamptz default now() not null
);

create index if not exists itinerary_items_day_id_idx on public.itinerary_items(day_id);
create index if not exists itinerary_items_order_idx  on public.itinerary_items(day_id, order_index);

-- ----------------------------------------------------------------
-- TABLE: chat_messages
-- ----------------------------------------------------------------
create table if not exists public.chat_messages (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.users(id) on delete cascade,
  trip_id               uuid references public.trips(id) on delete set null,
  role                  text not null check (role in ('user', 'assistant')),
  content               text not null,
  metadata_suggestions  jsonb,
  created_at            timestamptz default now() not null
);

create index if not exists chat_messages_user_trip_idx on public.chat_messages(user_id, trip_id);
create index if not exists chat_messages_created_at_idx on public.chat_messages(created_at);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================
alter table public.users           enable row level security;
alter table public.trips           enable row level security;
alter table public.itinerary_days  enable row level security;
alter table public.itinerary_items enable row level security;
alter table public.chat_messages   enable row level security;

-- users: read/write own row only
drop policy if exists "users_own_row" on public.users;
create policy "users_own_row"
  on public.users for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- trips: CRUD own trips
drop policy if exists "trips_own_rows" on public.trips;
create policy "trips_own_rows"
  on public.trips for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- itinerary_days: access only if the parent trip belongs to the user
drop policy if exists "itinerary_days_via_trip" on public.itinerary_days;
create policy "itinerary_days_via_trip"
  on public.itinerary_days for all
  using (
    exists (
      select 1 from public.trips
      where id = trip_id and user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.trips
      where id = trip_id and user_id = auth.uid()
    )
  );

-- itinerary_items: access only via own trip → day chain
drop policy if exists "itinerary_items_via_day" on public.itinerary_items;
create policy "itinerary_items_via_day"
  on public.itinerary_items for all
  using (
    exists (
      select 1
      from public.itinerary_days d
      join public.trips t on t.id = d.trip_id
      where d.id = day_id and t.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.itinerary_days d
      join public.trips t on t.id = d.trip_id
      where d.id = day_id and t.user_id = auth.uid()
    )
  );

-- chat_messages: own rows only
drop policy if exists "chat_messages_own_rows" on public.chat_messages;
create policy "chat_messages_own_rows"
  on public.chat_messages for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
