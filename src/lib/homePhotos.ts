import type { PhotoCredit } from "./types";

// 첫 화면 큰 사진 2장. DB 에 없는 자리라 여기 둔다 — 캡션은 messages.home.*.caption.
// 지금은 Unsplash 임시 사진이다 (photos.md §3-6). 직접 찍은 사진으로 바꾸면 credit 을 null 로 둔다
type HomePhoto = { src: string | null; credit: PhotoCredit | null };

export const homePhotos: { hero: HomePhoto; season: HomePhoto } = {
  hero: {
    src: "https://images.unsplash.com/photo-1661697773752-4824ae28ff13?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8NHx8a29yZWElMjBiZWFjaCUyMHN1bnJpc2V8ZW58MHx8fHwxNzkwMTUyNjk5fDA&ixlib=rb-4.1.0",
    credit: {
      author: "Minku Kang",
      author_url:
        "https://unsplash.com/@minkus?utm_source=experience_korea&utm_medium=referral",
      source: "Unsplash",
      source_url:
        "https://unsplash.com/?utm_source=experience_korea&utm_medium=referral",
    },
  },
  season: {
    src: "https://images.unsplash.com/photo-1700307927087-8f166c9fc2bf?ixid=M3wxMDc5NjI0fDB8MXxzZWFyY2h8MTB8fGtvcmVhJTIwdmFsbGV5JTIwc3RyZWFtfGVufDB8fHx8MTc5MDE1MjcwNnww&ixlib=rb-4.1.0",
    credit: {
      author: "Ken Cheung",
      author_url:
        "https://unsplash.com/@hk_kenc?utm_source=experience_korea&utm_medium=referral",
      source: "Unsplash",
      source_url:
        "https://unsplash.com/?utm_source=experience_korea&utm_medium=referral",
    },
  },
};
