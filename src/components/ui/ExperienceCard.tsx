import Link from "next/link";
import type { Experience } from "@/lib/types";
import type { Messages } from "@/messages";
import Photo from "./Photo";
import RegionBadge from "./RegionBadge";
import Stars from "./Stars";

type ExperienceCardProps = {
  experience: Experience;
  href: string;
  messages: Messages;
};

// 경험 카드 큰 것 (components.md §4-7) — 결과 화면.
// 카드 전체가 링크. 누르면(마우스를 올리면) 테두리만 ink — 커지거나 떠오르지 않는다.
// 높이를 고정하지 않는다: 글 길이만큼 늘어난다 (patterns.md 24번)
export default function ExperienceCard({
  experience,
  href,
  messages,
}: ExperienceCardProps) {
  const t = messages.experience;

  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-md border border-line bg-paper hover:border-ink active:border-ink"
    >
      <Photo
        src={experience.image_urls[0] ?? null}
        caption={experience.image_captions[0]}
        ratio="4:5"
        captionPosition="overlay"
      />
      <div className="p-md">
        <RegionBadge region={experience.region} />
        <h2 className="mt-xs font-display text-card font-semibold text-ink">
          {experience.name_en}
        </h2>
        <p className="mt-xs text-small text-ink-soft">
          {experience.tagline_en}
        </p>
        {/* 카드 안에서 눈에 띄는 유일한 자리: 소제목 Mono + 내용 본문 폰트 */}
        <p className="mt-md font-mono text-caption text-ink-soft">
          {t.whyNotSeoul}
        </p>
        <p className="mt-xs text-small text-ink">
          {experience.why_not_seoul_en}
        </p>
        <p className="mt-md flex flex-wrap items-center gap-md font-mono text-caption text-ink">
          <span>{t.duration[experience.duration]}</span>
          <span>{t.price[experience.price_level]}</span>
          <Stars
            value={experience.english_ease}
            label={t.stars.english}
            ariaLabel={`${t.stars.englishName} ${t.stars.outOf.replace(
              "{value}",
              String(experience.english_ease),
            )}`}
          />
        </p>
      </div>
    </Link>
  );
}
