import Image from "next/image";

export type PhotoRatio = "4:5" | "3:2" | "1:1" | "full";

type PhotoProps = {
  // 사진이 아직 없으면 null → line 색 빈 네모에 캡션만
  src: string | null;
  // "장소 · 시간" 한 줄. alt 에도 그대로 쓴다 (photos.md §3-1)
  caption: string;
  ratio: PhotoRatio;
  // below: 사진 아래 8px ink-soft / overlay: 사진 안 왼쪽 아래 흰색
  // none: 글자 없이 alt 로만 — 작은 카드는 사진 + 이름만 (components.md §4-8)
  captionPosition?: "below" | "overlay" | "none";
  // 화면에서 차지하는 폭. 기본은 몸통 폭(폰 화면 − 32px, PC 608px)
  sizes?: string;
  // 첫 화면처럼 맨 먼저 보이는 사진에만
  preload?: boolean;
};

const ratioClass: Record<PhotoRatio, string> = {
  "4:5": "aspect-4/5",
  "3:2": "aspect-3/2",
  "1:1": "aspect-square",
  // 첫 화면: 부모가 준 높이(머리와 발 사이 남은 공간)를 그대로 채운다
  full: "h-full",
};

const contentSizes = "(min-width: 640px) 608px, calc(100vw - 32px)";

// 사진 + 캡션 (components.md §4-6, photos.md §3). 잘라서 맞춘다(object-cover).
// 로딩 중에는 line 색 네모만 보인다 — 흐린 미리보기·반짝임 없음, 사진 위 막 없음
export default function Photo({
  src,
  caption,
  ratio,
  captionPosition = "below",
  sizes = ratio === "full" ? "100vw" : contentSizes,
  preload,
}: PhotoProps) {
  return (
    <div className={ratio === "full" ? "h-full" : undefined}>
      <div
        className={`relative w-full overflow-hidden bg-line ${ratioClass[ratio]}`}
        // 사진이 없을 때도 캡션을 사진 설명으로 읽어 준다
        {...(src ? {} : { role: "img", "aria-label": caption })}
      >
        {src && (
          <Image
            src={src}
            alt={caption}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover"
          />
        )}
        {captionPosition === "overlay" && (
          // alt 가 같은 문장을 읽어 주므로 화면 읽기에서는 뺀다.
          // 사진이 없을 때 흰 글자는 회색 네모 위에서 안 보여 ink-soft 로 둔다
          <p
            aria-hidden="true"
            className={`absolute bottom-md left-md font-mono text-caption ${
              src ? "text-paper" : "text-ink-soft"
            }`}
          >
            {caption}
          </p>
        )}
      </div>
      {captionPosition === "below" && (
        <p
          aria-hidden="true"
          className="mt-sm font-mono text-caption text-ink-soft"
        >
          {caption}
        </p>
      )}
    </div>
  );
}
