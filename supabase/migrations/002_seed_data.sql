-- ============================================================
-- Gidiyorum — Seed Data SQL Migration
-- Run this in Supabase SQL Editor to populate demo trips,
-- itinerary days, items, and AI chat history into your real DB.
-- ============================================================

-- 1. Demo User Profile (Replace with your actual auth user ID if needed)
insert into public.users (id, email, name, avatar_url)
values (
  'd0000000-0000-0000-0000-000000000001',
  'demo@gidiyorum.app',
  'Ahmet Yılmaz',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
)
on conflict (id) do update set
  name = excluded.name,
  avatar_url = excluded.avatar_url;

-- 2. Demo Trips
insert into public.trips (
  id, user_id, title, city, country, start_date, end_date, budget_level, walking_pace, interest_tags, cover_image
)
values
(
  't0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'İstanbul Tarihi Yarımada ve Moda Rotaları',
  'İstanbul',
  'Türkiye',
  '2026-09-01',
  '2026-09-05',
  'mid',
  'moderate',
  array['Tarih', 'Yemek', 'Mimari', 'Sanat', 'Manzara'],
  'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=800'
),
(
  't0000000-0000-0000-0000-000000000002',
  'd0000000-0000-0000-0000-000000000001',
  'Paris Sanat ve Gurme Turu',
  'Paris',
  'Fransa',
  '2026-05-10',
  '2026-05-15',
  'luxury',
  'slow',
  array['Müze', 'Sanat', 'Yemek', 'Mimari'],
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'
),
(
  't0000000-0000-0000-0000-000000000003',
  'd0000000-0000-0000-0000-000000000001',
  'Roma Antik Çağ & Lezzet Keşfi',
  'Roma',
  'İtalya',
  '2026-10-12',
  '2026-10-17',
  'mid',
  'fast',
  array['Tarih', 'Tarihi Eser', 'Yemek'],
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'
)
on conflict (id) do nothing;

-- 3. Itinerary Days for İstanbul Trip
insert into public.itinerary_days (id, trip_id, day_number, date)
values
('d1000000-0000-0000-0000-000000000001', 't0000000-0000-0000-0000-000000000001', 1, '2026-09-01'),
('d1000000-0000-0000-0000-000000000002', 't0000000-0000-0000-0000-000000000001', 2, '2026-09-02'),
('d1000000-0000-0000-0000-000000000003', 't0000000-0000-0000-0000-000000000001', 3, '2026-09-03')
on conflict (id) do nothing;

-- 4. Itinerary Items for Day 1
insert into public.itinerary_items (
  id, day_id, place_name, category, time_slot, order_index, latitude, longitude, description, image_url, price_level
)
values
(
  'i1000000-0000-0000-0000-000000000001',
  'd1000000-0000-0000-0000-000000000001',
  'Ayasofya-i Kebir Cami-i Şerifi',
  'Tarihi Eser',
  '09:00 - 11:00',
  0,
  41.0086,
  28.9802,
  'Dünya mimarlık tarihinin en ihtişamlı eserlerinden biri. 1500 yıllık mozaikleri ve kubbe mimarisini inceleyin.',
  'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600',
  2
),
(
  'i1000000-0000-0000-0000-000000000002',
  'd1000000-0000-0000-0000-000000000001',
  'Topkapı Sarayı Müzesi',
  'Müze & Saray',
  '11:30 - 14:00',
  1,
  41.0115,
  28.9833,
  'Osmanlı İmparatorluğu’nun 400 yıl boyunca idare merkezi olan tarihi saray kompleksi.',
  'https://images.unsplash.com/photo-1628178121651-789a744e8ec6?w=600',
  3
),
(
  'i1000000-0000-0000-0000-000000000003',
  'd1000000-0000-0000-0000-000000000001',
  'Tarihi Sultanahmet Köftecisi',
  'Yemek & Lezzet',
  '14:15 - 15:30',
  2,
  41.0078,
  28.9772,
  '1920’den beri değişmeyen lezzetiyle ızgara köfte ve piyaz keyfi.',
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600',
  2
),
(
  'i1000000-0000-0000-0000-000000000004',
  'd1000000-0000-0000-0000-000000000001',
  'Yerebatan Sarnıcı',
  'Tarih',
  '15:45 - 17:00',
  3,
  41.0084,
  28.9779,
  'Bizans döneminden kalma büyüleyici yeraltı su sarnıcı.',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600',
  2
)
on conflict (id) do nothing;

-- 5. Chat Messages History
insert into public.chat_messages (id, user_id, trip_id, role, content)
values
(
  'm0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  't0000000-0000-0000-0000-000000000001',
  'user',
  'İstanbul rotamda bugün nereleri gezmeliyim?'
),
(
  'm0000000-0000-0000-0000-000000000002',
  'd0000000-0000-0000-0000-000000000001',
  't0000000-0000-0000-0000-000000000001',
  'assistant',
  'Harika bir tercih! 🌟 Günün ilk yarısında Ayasofya-i Kebir Cami ve Topkapı Sarayı rotasını takip edebilirsiniz. Öğle yemeğinde tarihi Sultanahmet Köftecisi’ne uğramayı unutmayın! 😋'
)
on conflict (id) do nothing;
