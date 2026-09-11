"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ChoiceButton from "@/components/ui/ChoiceButton";
import Progress from "@/components/ui/Progress";
import {
  interests,
  MAX_INTERESTS,
  resultsQuery,
  styles,
  visits,
  type Interest,
  type Style,
  type Visit,
} from "@/lib/questions";
import type { Locale, Messages } from "@/messages";

type QuestionsProps = {
  lang: Locale;
  t: Messages["find"];
  backLabel: string;
};

type Step = 1 | 2 | 3;

// 한 화면에 질문 하나 (structure.md §1-3 [2]).
// 질문 1: 최대 3개, 4번째를 누르면 첫 번째가 풀린다. Next 로 넘어간다.
// 질문 2·3: 누르면 바로 다음. 질문 3을 누르면 결과 주소로 이동
export default function Questions({ lang, t, backLabel }: QuestionsProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [picked, setPicked] = useState<Interest[]>([]);
  const [visit, setVisit] = useState<Visit | null>(null);
  const [style, setStyle] = useState<Style | null>(null);

  const toggleInterest = (tag: Interest) =>
    setPicked((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag].slice(-MAX_INTERESTS),
    );

  const chooseVisit = (value: Visit) => {
    setVisit(value);
    setStep(3);
  };

  const chooseStyle = (value: Style) => {
    setStyle(value);
    // 질문 3에 왔다면 질문 2 답은 있다
    if (visit === null) return;
    router.push(
      `/${lang}/results?${resultsQuery({ interests: picked, visit, style: value })}`,
    );
  };

  // 질문 1의 뒤로는 첫 화면, 나머지는 앞 질문 (고른 답은 남겨 둔다)
  const back =
    step === 1
      ? { href: `/${lang}` }
      : { onClick: () => setStep((step - 1) as Step) };

  return (
    <div className="flex flex-col gap-lg py-md">
      <Progress current={step} total={3} back={back} backLabel={backLabel} />

      {step === 1 && (
        <Question title={t.interest.question} hint={t.interest.hint}>
          {interests.map((tag) => (
            <ChoiceButton
              key={tag}
              selected={picked.includes(tag)}
              onClick={() => toggleInterest(tag)}
            >
              {t.interest.options[tag]}
            </ChoiceButton>
          ))}
        </Question>
      )}

      {step === 2 && (
        <Question title={t.visit.question}>
          {visits.map((value) => (
            <ChoiceButton
              key={value}
              selected={visit === value}
              onClick={() => chooseVisit(value)}
            >
              {t.visit.options[value]}
            </ChoiceButton>
          ))}
        </Question>
      )}

      {step === 3 && (
        <Question title={t.style.question}>
          {styles.map((value) => (
            <ChoiceButton
              key={value}
              selected={style === value}
              onClick={() => chooseStyle(value)}
            >
              {t.style.options[value]}
            </ChoiceButton>
          ))}
        </Question>
      )}

      {step === 1 && (
        <ButtonPrimary disabled={picked.length === 0} onClick={() => setStep(2)}>
          {t.next}
        </ButtonPrimary>
      )}
    </div>
  );
}

function Question({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-lg">
      <div className="flex flex-col gap-xs">
        <h1 className="font-display text-display font-semibold text-ink">
          {title}
        </h1>
        {hint && <p className="text-small text-ink-soft">{hint}</p>}
      </div>
      {/* 선택 버튼 2열, 사이 8px */}
      <div className="grid grid-cols-2 gap-sm">{children}</div>
    </section>
  );
}
