type RegionBadgeProps = {
  region: string;
};

// 지역 뱃지 (components.md §4-9). 글자만 — 배경·테두리 없음
// text-badge 가 자간 0.08em 을 함께 준다. 대문자는 CSS 로 바꾼다
export default function RegionBadge({ region }: RegionBadgeProps) {
  return (
    <span className="text-badge font-medium uppercase text-ink-soft">
      {region}
    </span>
  );
}
