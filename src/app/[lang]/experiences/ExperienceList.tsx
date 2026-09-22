"use client";

import { useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import ExperienceCard from "@/components/ui/ExperienceCard";
import FilterChip from "@/components/ui/FilterChip";
import Select from "@/components/ui/Select";
import type { CardItem } from "@/lib/cards";

// 카드 한 장이 거르기에 쓰는 값. 페이지(서버)에서 미리 붙여 넘긴다
export type ListItem = CardItem & {
  interests: string[];
  regionSlug: string;
  duration: string;
};

type ExperienceListProps = {
  items: ListItem[];
  // 알약 필터 — 취향
  interests: { value: string; label: string }[];
  regions: { value: string; label: string }[];
  durations: { value: string; label: string }[];
  // 첫 화면 칩에서 넘어왔을 때 미리 골라 둘 취향
  initialInterest: string;
  labels: {
    all: string;
    region: string;
    time: string;
    count: string;
    view: string;
    save: string;
    empty: string;
  };
};

// [4] 경험 목록 — 알약으로 취향을 하나 고르고, 드롭다운으로 지역·시간을 좁힌다.
// 거르기는 주소를 바꾸지 않는다: 이 화면에서 바로 결과가 바뀐다
export default function ExperienceList({
  items,
  interests,
  regions,
  durations,
  initialInterest,
  labels,
}: ExperienceListProps) {
  const [interest, setInterest] = useState(initialInterest);
  const [region, setRegion] = useState("all");
  const [duration, setDuration] = useState("all");

  const shown = items.filter(
    (item) =>
      (interest === "all" || item.interests.includes(interest)) &&
      (region === "all" || item.regionSlug === region) &&
      (duration === "all" || item.duration === duration),
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3.5">
        <FilterChip
          label={labels.all}
          active={interest === "all"}
          onClick={() => setInterest("all")}
        />
        {interests.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            active={interest === option.value}
            onClick={() =>
              setInterest(interest === option.value ? "all" : option.value)
            }
          />
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 pb-5">
        <div className="flex flex-wrap items-center gap-7">
          <Select
            label={labels.region}
            value={region}
            options={regions}
            onChange={setRegion}
          />
          <Select
            label={labels.time}
            value={duration}
            options={durations}
            onChange={setDuration}
          />
        </div>
        <span className="text-small text-ink-soft" aria-live="polite">
          {labels.count.replace("{count}", String(shown.length))}
        </span>
      </div>

      {shown.length === 0 ? (
        <EmptyState title={labels.empty} />
      ) : (
        <div className="grid gap-7 pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <ExperienceCard
              key={item.slug}
              item={item}
              showRegion
              labels={{ view: labels.view, save: labels.save }}
            />
          ))}
        </div>
      )}
    </>
  );
}
