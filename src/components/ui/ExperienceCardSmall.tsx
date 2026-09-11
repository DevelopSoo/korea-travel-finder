import Link from "next/link";
import type { Experience } from "@/lib/types";
import Photo from "./Photo";

type ExperienceCardSmallProps = {
  experience: Experience;
  href: string;
};

// 경험 카드 작은 것 (components.md §4-8) — 상세 페이지 관련 경험.
// 1:1 사진 + 이름만, 설명 없음. 가로 3개·넘기기는 부모가 맡는다
export default function ExperienceCardSmall({
  experience,
  href,
}: ExperienceCardSmallProps) {
  return (
    <Link href={href} className="block">
      <Photo
        src={experience.image_urls[0] ?? null}
        caption={experience.image_captions[0]}
        ratio="1:1"
        captionPosition="none"
        // 폰에서 화면의 1/3쯤, PC 에서 608px 의 1/3쯤
        sizes="(min-width: 640px) 200px, 33vw"
      />
      <p className="mt-sm text-small text-ink">{experience.name_en}</p>
    </Link>
  );
}
