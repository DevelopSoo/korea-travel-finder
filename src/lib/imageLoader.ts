"use client";

import type { ImageLoaderProps } from "next/image";

// next/image 전체에 쓰는 로더 (next.config.ts images.loaderFile).
// Unsplash 사진은 Unsplash 서버에서 크기를 맞춰 바로 받는다 — Unsplash 가 요구하는 hotlink 방식이고,
// Vercel 이미지 변환을 거치지 않는다. 다른 주소는 그대로 쓴다
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
