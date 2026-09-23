-- 임시 사진: Unsplash 사진 URL 과 출처 (photos.md §3-6).
-- 사진은 Unsplash 서버에서 바로 받는다 (src/lib/imageLoader.ts). 캡션은 그대로 둔다 — 같은 장소가 아닐 수 있어 화면에 "Sample photo" 출처를 붙인다.
-- 직접 찍은 사진으로 바꿀 때는 image_urls 를 바꾸고 image_credits 를 '[]' 로 비운다.

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1763689389852-3f050e1750a3?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MTB8fGtvcmVhbiUyMGNhZmUlMjBzZWElMjB2aWV3fGVufDB8fHx8MTc5MDE1MjcwMHww&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'HANVIN CHEONG', 'author_url', 'https://unsplash.com/@hktram0311?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'anmok-beach-dawn-coffee';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1710575411696-a026ae570740?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8OXx8d2hpdGUlMjBzb2Z0JTIwdG9mdSUyMHNvdXB8ZW58MHx8fHwxNzkwMTUyODE2fDA&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'tommao wang', 'author_url', 'https://unsplash.com/@tommaomaoer?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'chodang-sundubu-breakfast';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1598883785173-a6a938f95c8c?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8Mnx8ZGFlZ3dhbGx5ZW9uZyUyMHNoZWVwfGVufDB8fHx8MTc5MDE1MjcyMnww&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'Taylor Brandon', 'author_url', 'https://unsplash.com/@house_42?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'daegwallyeong-sheep-farm';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1652292107840-068826a55369?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MXx8c2VvdWwlMjBvbGQlMjBhbGxleXxlbnwwfHx8fDE3OTAxNTI3MDJ8MA&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'Sean Lee', 'author_url', 'https://unsplash.com/@seontudio?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'euljiro-print-alleys';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1733670448372-12fbccaa4507?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MXx8aW53YW5nc2FufGVufDB8fHx8MTc5MDE1MjcyMXww&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'Oliver', 'author_url', 'https://unsplash.com/@oschill?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'inwangsan-sunset-walk';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1788265851623-be9e116dc903?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MTB8fGtvcmVhJTIwZmlzaCUyMG1hcmtldHxlbnwwfHx8fDE3OTAxNTI2OTh8MA&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'Yihui Chan', 'author_url', 'https://unsplash.com/@yihuichan?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'jumunjin-fish-market-dawn';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1742734704375-af03a327e8b9?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8Nnx8a29yZWFuJTIwdHJhZGl0aW9uYWwlMjBtYXJrZXQlMjBmb29kfGVufDB8fHx8MTc5MDE1MjY5OXww&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'Luo Jin Hong', 'author_url', 'https://unsplash.com/@logichom?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'mangwon-market-lunch';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1628579064393-28cd8ebec686?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MTJ8fHNlb3VsJTIwaGFub2slMjB2aWxsYWdlfGVufDB8fHx8MTc5MDE1MjcwN3ww&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'LING', 'author_url', 'https://unsplash.com/@lingtookthis?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'ojukheon-house';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1772331274660-7691d4f84020?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8Mnx8c2VvdWwlMjBvbGQlMjBhbGxleXxlbnwwfHx8fDE3OTAxNTI3MDJ8MA&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'chansu shin', 'author_url', 'https://unsplash.com/@xinchan?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'seochon-back-lanes';

update public.experiences set
  image_urls = array['https://images.unsplash.com/photo-1700064160470-efe6b77333c8?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8M3x8a29yZWElMjBtb3VudGFpbiUyMGF1dHVtbiUyMHRyYWlsfGVufDB8fHx8MTc5MDE1MjcwN3ww&ixlib=rb-4.1.0'],
  image_credits = jsonb_build_array(jsonb_build_object('author', 'Austin Curtis', 'author_url', 'https://unsplash.com/@afcurtis?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'))
where slug = 'sogeumgang-valley-hike';

update public.places set
  hero_image_url = 'https://images.unsplash.com/photo-1721743783066-96a0f7bfd926?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8Mnx8YW5tb2slMjBiZWFjaHxlbnwwfHx8fDE3OTAxNTI3MjB8MA&ixlib=rb-4.1.0',
  hero_image_credit = jsonb_build_object('author', 'A.Y.', 'author_url', 'https://unsplash.com/@mbday?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'),
  card_image_url = 'https://images.unsplash.com/photo-1720252741302-77213465eab2?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8Mnx8Z2FuZ25ldW5nfGVufDB8fHx8MTc5MDE1MjcwOHww&ixlib=rb-4.1.0',
  card_image_credit = jsonb_build_object('author', 'Seongil Park', 'author_url', 'https://unsplash.com/@senp?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral')
where slug = 'gangneung';

update public.places set
  hero_image_url = 'https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MXx8c2VvdWwlMjBoYW5vayUyMHZpbGxhZ2V8ZW58MHx8fHwxNzkwMTUyNzA3fDA&ixlib=rb-4.1.0',
  hero_image_credit = jsonb_build_object('author', 'Y K', 'author_url', 'https://unsplash.com/@yokeboy?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral'),
  card_image_url = 'https://images.unsplash.com/photo-1674220710675-5a4322525c47?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8Nnx8c2VvdWwlMjBjaXR5JTIwd2FsbCUyMHN1bnNldHxlbnwwfHx8fDE3OTAxNTI3MDN8MA&ixlib=rb-4.1.0',
  card_image_credit = jsonb_build_object('author', 'rawkkim', 'author_url', 'https://unsplash.com/@rawkkim?utm_source=experience_korea&utm_medium=referral', 'source', 'Unsplash', 'source_url', 'https://unsplash.com/?utm_source=experience_korea&utm_medium=referral')
where slug = 'seoul';
