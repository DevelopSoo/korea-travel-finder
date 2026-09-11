import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import Photo from "@/components/ui/Photo";
import { getMessages, hasLocale } from "@/messages";

// 첫 화면 사진은 고정 1장 (design §7-3). 사진이 생기면 src 만 채운다
const hero = {
  src: null as string | null,
  caption: "Gangneung · 05:40",
};

// "그림자 없음" 규칙의 유일한 예외 (photos.md §3-4). 반투명 막·글자 배경 상자 금지
const photoTextShadow: CSSProperties = {
  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

// [1] 첫 화면 — 머리와 발 사이를 사진이 채우고, 아래쪽에 문구·버튼·캡션 (PRD §4 [1]: 발까지 한 화면)
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getMessages(lang).home;
  // 사진이 없으면 회색 네모 위 흰 글자가 안 보여 먹색으로 둔다 (Photo overlay 캡션과 같은 방식)
  const onPhoto = hero.src !== null;

  return (
    // 사진과 문구를 같은 칸에 겹쳐 쌓는다. 화면이 낮아 문구가 더 길면 칸이 늘어나
    // 글자가 머리를 덮지 않는다. 문구 칸은 relative 여야 사진(relative) 위에 그려진다.
    // 폰에서는 몸통 좌우 여백을 넘어 화면 폭 전체를 채운다
    <section className="-mx-md grid flex-1">
      <div className="col-start-1 row-start-1">
        <Photo
          src={hero.src}
          caption={hero.caption}
          ratio="full"
          captionPosition="none"
          sizes="(min-width: 640px) 640px, 100vw"
          preload
        />
      </div>
      <div
        className={`relative col-start-1 row-start-1 flex flex-col gap-md self-end px-md pt-xl pb-lg ${
          onPhoto ? "text-paper" : "text-ink"
        }`}
        style={onPhoto ? photoTextShadow : undefined}
      >
        <div className="flex flex-col gap-sm">
          <h1 className="font-display text-display font-semibold">
            {t.headline}
          </h1>
          <p className="text-body">{t.sub}</p>
        </div>
        <div className="flex flex-col gap-sm">
          {/* 버튼에는 그림자를 주지 않는다 */}
          <div style={{ textShadow: "none" }}>
            <ButtonPrimary href={`/${lang}/find`}>{t.cta}</ButtonPrimary>
          </div>
          <p className="text-small">{t.note}</p>
        </div>
        {/* alt 가 같은 문장을 읽어 주므로 화면 읽기에서는 뺀다 */}
        <p aria-hidden="true" className="font-mono text-caption">
          {hero.caption}
        </p>
      </div>
    </section>
  );
}
