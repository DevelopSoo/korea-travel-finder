import type { CardItem } from "@/lib/cards";
import ArrowLink from "./ArrowLink";
import BookmarkButton from "./BookmarkButton";
import Eyebrow from "./Eyebrow";
import PhotoFrame from "./PhotoFrame";

type ExperienceCardProps = {
  item: CardItem;
  // 눈썹 줄에 지역을 함께 적는다 (경험 목록에서만)
  showRegion?: boolean;
  labels: { view: string; save: string };
};

// 경험 카드 (components.md §4-14). 테두리 없는 카드 — 사진이 카드의 경계다.
// 높이를 고정하지 않는다: 글 길이만큼 늘어난다
export default function ExperienceCard({
  item,
  showRegion,
  labels,
}: ExperienceCardProps) {
  return (
    <article className="flex flex-col">
      <PhotoFrame
        src={item.src}
        caption={item.caption}
        seed={item.slug}
        ratio="card"
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
      >
        <BookmarkButton slug={item.slug} label={labels.save} />
      </PhotoFrame>

      <div className="mt-4 flex items-center gap-2.5">
        {showRegion && (
          <>
            <Eyebrow className="font-semibold text-ink">{item.region}</Eyebrow>
            <span aria-hidden="true" className="text-line-strong">
              |
            </span>
          </>
        )}
        <Eyebrow>{item.category}</Eyebrow>
      </div>

      <h3 className="mt-1.5 text-card">{item.title}</h3>
      <p className="mt-1.5 mb-3 text-small text-ink-soft">{item.blurb}</p>
      <ArrowLink href={item.href} variant="plain">
        {labels.view}
      </ArrowLink>
    </article>
  );
}
