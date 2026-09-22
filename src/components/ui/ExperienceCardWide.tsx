import type { CardItem } from "@/lib/cards";
import ArrowLink from "./ArrowLink";
import BookmarkButton from "./BookmarkButton";
import Eyebrow from "./Eyebrow";
import PhotoFrame from "./PhotoFrame";

type ExperienceCardWideProps = {
  item: CardItem;
  labels: { view: string; save: string };
  // 저장 페이지에서는 저장 단추 대신 "빼기" 글자 버튼이 붙는다
  footer?: React.ReactNode;
  saveMark?: React.ReactNode;
};

// 넓은 경험 카드 (components.md §4-14). 16:9 — 상세 페이지 "근처" 와 저장 목록에 쓴다
export default function ExperienceCardWide({
  item,
  labels,
  footer,
  saveMark,
}: ExperienceCardWideProps) {
  return (
    <article className="flex flex-col">
      <PhotoFrame
        src={item.src}
        caption={item.caption}
        seed={item.slug}
        ratio="16:9"
        sizes="(min-width: 768px) 45vw, 100vw"
      >
        {saveMark ?? (
          <BookmarkButton
            slug={item.slug}
            variant="on-photo-light"
            label={labels.save}
          />
        )}
      </PhotoFrame>

      <Eyebrow className="mt-3.5">{item.category}</Eyebrow>
      <h3 className="mt-1 text-card">{item.title}</h3>
      <p className="mt-1 mb-3 text-small text-ink-soft">{item.blurb}</p>
      {footer ?? (
        <ArrowLink href={item.href} variant="underline">
          {labels.view}
        </ArrowLink>
      )}
    </article>
  );
}
