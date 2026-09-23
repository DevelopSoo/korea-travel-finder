import Image from "next/image";
import type { ReactNode } from "react";
import { type PhotoTone, photoGlow, photoTones, toneFor } from "@/lib/photoTone";
import type { PhotoCredit } from "@/lib/types";

export type PhotoRatio = "card" | "4:5" | "3:2" | "16:9" | "1:1" | "fill";

type PhotoFrameProps = {
  // 사진이 아직 없으면 null → 자리 표시 그라데이션 (photos.md §3-5)
  src: string | null;
  // "장소 · 시간" 한 줄. alt 에도 그대로 쓴다 (photos.md §3-1)
  caption: string;
  ratio: PhotoRatio;
  // 그라데이션 톤을 정하는 값. 보통 slug
  seed: string;
  // 톤을 손으로 고를 때 (첫 사진처럼 자리가 정해진 곳)
  tone?: PhotoTone;
  // 사진 안 캡션 위치. 넓은 사진은 오른쪽 아래
  captionSide?: "left" | "right";
  // 남이 찍은 사진의 출처. 큰 사진에만 넘긴다 — 카드에는 넣지 않는다 (photos.md §3-6)
  credit?: PhotoCredit | null;
  // "Sample photo by {author} on {source}" — messages.photo.credit
  creditLabel?: string;
  rounded?: "sm" | "md" | "xl" | "none";
  // 사진 위에 얹는 것 (저장 버튼, 제목 등)
  children?: ReactNode;
  sizes?: string;
  preload?: boolean;
  className?: string;
};

const ratioClass: Record<PhotoRatio, string> = {
  card: "aspect-[1/0.86]",
  "4:5": "aspect-4/5",
  "3:2": "aspect-3/2",
  "16:9": "aspect-video",
  "1:1": "aspect-square",
  fill: "h-full",
};

const roundedClass = {
  sm: "rounded-sm",
  md: "rounded-md",
  xl: "rounded-xl",
  none: "",
} as const;

// 사진 + 캡션 (components.md §4-1, photos.md §3). 잘라서 맞춘다(object-cover).
// 사진 위에 반투명 막을 씌우지 않는다 — 글자가 안 읽히면 사진을 바꾼다
export default function PhotoFrame({
  src,
  caption,
  ratio,
  seed,
  tone,
  captionSide = "left",
  credit,
  creditLabel,
  rounded = "sm",
  children,
  sizes = "(min-width: 768px) 50vw, 100vw",
  preload,
  className = "",
}: PhotoFrameProps) {
  return (
    <div
      // isolate: 사진을 -z-10 으로 내려도 이 틀 밖으로 빠지지 않게 한다
      className={`relative isolate overflow-hidden ${ratioClass[ratio]} ${roundedClass[rounded]} ${className}`}
      style={
        src
          ? undefined
          : {
              backgroundImage: `${photoGlow},${photoTones[tone ?? toneFor(seed)]}`,
            }
      }
      // 사진이 없을 때도 캡션을 사진 설명으로 읽어 준다
      {...(src ? {} : { role: "img", "aria-label": caption })}
    >
      {/* 사진은 맨 아래 층에 깐다 — 위에 얹는 글(children)이 absolute 가 아니어도 사진에 가리지 않게 */}
      {src && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={src}
            alt={caption}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover"
          />
        </div>
      )}
      {/* 출처는 캡션 바로 위, 같은 쪽에 둔다 — 좁은 화면에서 캡션과 겹치지 않게 */}
      {src && credit && creditLabel && (
        <p
          className={`absolute bottom-[22px] z-10 text-[10px] leading-none tracking-[0.04em] text-on-photo-soft ${
            captionSide === "right" ? "right-3" : "left-3"
          }`}
        >
          {creditLabel.split(/(\{author\}|\{source\})/).map((part) =>
            part === "{author}" ? (
              <CreditLink key={part} href={credit.author_url}>
                {credit.author}
              </CreditLink>
            ) : part === "{source}" ? (
              <CreditLink key={part} href={credit.source_url}>
                {credit.source}
              </CreditLink>
            ) : (
              part
            ),
          )}
        </p>
      )}
      {/* alt 가 같은 문장을 읽어 주므로 화면 읽기에서는 뺀다 */}
      <p
        aria-hidden="true"
        className={`absolute bottom-2 text-[10px] leading-none tracking-[0.08em] text-on-photo-soft uppercase ${
          captionSide === "right" ? "right-3" : "left-3"
        }`}
      >
        Photo — {caption}
      </p>
      {children}
    </div>
  );
}

function CreditLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-2 hover:text-on-photo"
    >
      {children}
    </a>
  );
}
