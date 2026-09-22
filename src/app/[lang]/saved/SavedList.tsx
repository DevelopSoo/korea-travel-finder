"use client";

import { useEffect, useState } from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import EmptyState from "@/components/ui/EmptyState";
import ExperienceCardWide from "@/components/ui/ExperienceCardWide";
import FilterChip from "@/components/ui/FilterChip";
import { Bookmark } from "@/components/ui/icons";
import type { CardItem } from "@/lib/cards";
import { useSaved } from "@/lib/useSaved";

export type SavedItem = CardItem & {
  regionSlug: string;
  regionName: string;
  placeHref: string | null;
};

type SavedListProps = {
  // 모든 경험. 이 중 저장된 것만 골라 지역별로 묶는다
  items: SavedItem[];
  labels: {
    all: string;
    heading: string;
    countLabel: string;
    regionGuide: string;
    empty: string;
    view: string;
    save: string;
    remove: string;
  };
};

// 저장 목록은 브라우저에만 있으므로 서버에서 미리 그릴 수 없다.
// 첫 그림에서는 아무것도 없다가 브라우저에서 채워진다 — 그래서 빈 상태가 잠깐 보인다
export default function SavedList({ items, labels }: SavedListProps) {
  const { slugs, remove } = useSaved();
  const [region, setRegion] = useState("all");

  // 목록에서 사라진 경험(비공개로 바뀐 것)이 남아 있으면 머리의 숫자만 늘어난다.
  // 이 화면이 전체 목록을 아는 유일한 곳이라 여기서 지운다
  useEffect(() => {
    const known = new Set(items.map((item) => item.slug));
    for (const slug of slugs) {
      if (!known.has(slug)) remove(slug);
    }
  }, [items, slugs, remove]);

  const saved = items.filter((item) => slugs.includes(item.slug));
  const regions = [...new Set(saved.map((item) => item.regionSlug))];
  const shown =
    region === "all"
      ? saved
      : saved.filter((item) => item.regionSlug === region);

  const groups = regions
    .filter((r) => region === "all" || r === region)
    .map((r) => ({
      slug: r,
      name: saved.find((item) => item.regionSlug === r)?.regionName ?? r,
      href: saved.find((item) => item.regionSlug === r)?.placeHref ?? null,
      items: shown.filter((item) => item.regionSlug === r),
    }));

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold">{labels.heading}</span>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-lg bg-paper-3 px-1.5 text-meta font-semibold">
            {saved.length}
          </span>
        </div>
        {regions.length > 1 && (
          <div className="flex flex-wrap gap-2.5">
            <FilterChip
              label={labels.all}
              size="sm"
              active={region === "all"}
              onClick={() => setRegion("all")}
            />
            {regions.map((r) => (
              <FilterChip
                key={r}
                size="sm"
                label={
                  saved.find((item) => item.regionSlug === r)?.regionName ?? r
                }
                active={region === r}
                onClick={() => setRegion(region === r ? "all" : r)}
              />
            ))}
          </div>
        )}
      </div>

      {saved.length === 0 ? (
        <EmptyState title={labels.empty} />
      ) : (
        groups.map((group) => (
          <section key={group.slug} className="pt-10">
            <div className="mb-5.5 flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3.5">
                <h2 className="text-title">{group.name}</h2>
                <span className="text-small text-ink-soft">
                  {labels.countLabel.replace(
                    "{count}",
                    String(group.items.length),
                  )}
                </span>
              </div>
              {group.href && (
                <ArrowLink href={group.href} variant="plain" accent>
                  {labels.regionGuide}
                </ArrowLink>
              )}
            </div>

            <div className="grid gap-6.5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <ExperienceCardWide
                  key={item.slug}
                  item={item}
                  labels={{ view: labels.view, save: labels.save }}
                  // 저장 화면에서는 책갈피가 늘 채워져 있다 — 누르는 자리가 아니다
                  saveMark={
                    <span className="absolute top-3 right-3 z-10 inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-accent text-on-photo">
                      <Bookmark className="h-4 w-3.5" filled />
                    </span>
                  }
                  footer={
                    <div className="flex items-center justify-between gap-3">
                      <ArrowLink href={item.href} variant="plain" accent>
                        {labels.view}
                      </ArrowLink>
                      <button
                        type="button"
                        onClick={() => remove(item.slug)}
                        className="cursor-pointer p-0.5 text-meta text-ink-soft underline hover:text-ink"
                      >
                        {labels.remove}
                      </button>
                    </div>
                  }
                />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
