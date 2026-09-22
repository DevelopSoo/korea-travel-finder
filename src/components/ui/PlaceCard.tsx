import Link from "next/link";
import type { CardItem } from "@/lib/cards";
import PhotoFrame from "./PhotoFrame";

type PlaceCardProps = { item: CardItem };

// 장소 카드 (components.md §4-15). 첫 화면에만 쓴다.
// 카드 전체가 링크다 — 사진 위에 단추를 얹지 않는다
export default function PlaceCard({ item }: PlaceCardProps) {
  return (
    <Link href={item.href} className="group flex flex-col">
      <PhotoFrame
        src={item.src}
        caption={item.caption}
        seed={item.slug}
        ratio="card"
        rounded="none"
        className="rounded-[2px]"
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
      />
      <h3 className="mt-3.5 text-card group-hover:text-ink-soft">
        {item.title}
      </h3>
      <p className="text-small text-ink-soft">{item.blurb}</p>
    </Link>
  );
}
