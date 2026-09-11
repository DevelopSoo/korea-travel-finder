import { notFound } from "next/navigation";

// /en 아래 없는 주소(/en/1 등)를 받아 [lang]/not-found.tsx 로 넘긴다.
// 이게 없으면 루트 기본 404가 떠서 머리·발이 사라진다.
export default function CatchAll() {
  notFound();
}
