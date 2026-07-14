insert into public.spots (id, name, region, latitude, longitude, category, tags, description, fee_amount, fee_note, duration_minutes, opening_hours, popularity, source, source_url)
values
('seoul-gyeongbokgung', '경복궁', '서울 종로구', 37.5796, 126.977, 'culture', array['culture','slow','couple','family'], '고즈넉한 궁궐과 북촌 풍경을 함께 즐기는 서울 명소', 3000, '성인 기준', 120, '{"weekly":{"0":{"open":"09:00","close":"18:00"}}}', .9, 'supabase', 'https://korean.visitkorea.or.kr/'),
('busan-gamcheon', '감천문화마을', '부산 사하구', 35.0975, 129.0106, 'culture', array['culture','activity','balanced','friends'], '알록달록한 골목과 바다 전망이 있는 마을', 0, '무료', 90, '{"weekly":{}}', .8, 'supabase', 'https://korean.visitkorea.or.kr/'),
('jeju-seongsan', '성산일출봉', '제주 서귀포시', 33.4581, 126.9426, 'nature', array['nature','activity','fast','friends'], '제주 동쪽의 대표적인 일출과 화산 지형', 5000, '성인 기준', 120, '{"weekly":{}}', .95, 'supabase', 'https://korean.visitkorea.or.kr/')
on conflict (id) do nothing;
