"use client";

import { useState, type ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import ChoiceButton from "@/components/ui/ChoiceButton";
import EmailBox, { type EmailBoxStatus } from "@/components/ui/EmailBox";
import EmptyState from "@/components/ui/EmptyState";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ExperienceCardSmall from "@/components/ui/ExperienceCardSmall";
import InfoTable from "@/components/ui/InfoTable";
import Photo, { type PhotoRatio } from "@/components/ui/Photo";
import Progress from "@/components/ui/Progress";
import RegionBadge from "@/components/ui/RegionBadge";
import Stars from "@/components/ui/Stars";
import Tags from "@/components/ui/Tags";
import TextLink from "@/components/ui/TextLink";
import type { Experience, Score } from "@/lib/types";
import type { Locale, Messages } from "@/messages";

type GalleryProps = {
  lang: Locale;
  messages: Messages;
  experiences: Experience[];
};

// 가짜 전송 — 누르면 로딩 글자를 잠깐 보여 준다
async function fakeSend() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return true;
}

const noop = () => {};

const scores: Score[] = [1, 2, 3, 4, 5];
const ratios: Exclude<PhotoRatio, "full">[] = ["4:5", "3:2", "1:1"];
const captionPositions = ["below", "overlay", "none"] as const;
const emailStates: EmailBoxStatus[] = ["idle", "focus", "error", "failed", "sent"];

// 절 제목·상태 이름은 개발 화면 전용이라 en.json 에 넣지 않는다
function Section({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-md border-t border-line pt-lg">
      <h2 className="font-mono text-caption text-ink-soft">{name}</h2>
      {children}
    </section>
  );
}

function State({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-sm">
      <p className="font-mono text-caption text-ink-soft">{name}</p>
      {children}
    </div>
  );
}

export default function Gallery({ lang, messages, experiences }: GalleryProps) {
  const [picked, setPicked] = useState<string[]>(["nature"]);
  const t = messages.experience;
  const sample = experiences[0];
  // 글 길이가 가장 긴 경험 — 카드 높이가 달라지는지 본다 (patterns.md 24번)
  const longest = experiences.reduce((a, b) =>
    b.why_not_seoul_en.length + b.tagline_en.length >
    a.why_not_seoul_en.length + a.tagline_en.length
      ? b
      : a,
  );
  const href = (experience: Experience) =>
    `/${lang}/experiences/${experience.slug}`;
  const starsLabel = (value: Score) =>
    `${t.stars.englishName} ${t.stars.outOf.replace("{value}", String(value))}`;

  return (
    <div className="flex flex-col gap-xl py-lg">
      <h1 className="font-display text-title font-semibold text-ink">UI</h1>

      <Section name="Header">
        <div className="-mx-md">
          <Header lang={lang} messages={messages} />
        </div>
      </Section>

      <Section name="ButtonPrimary">
        <State name="link">
          <ButtonPrimary href={`/${lang}/find`}>{messages.home.cta}</ButtonPrimary>
        </State>
        <State name="button">
          <ButtonPrimary onClick={noop}>{messages.find.next}</ButtonPrimary>
        </State>
        <State name="disabled">
          <ButtonPrimary disabled>{messages.find.next}</ButtonPrimary>
        </State>
        <State name="loading">
          <ButtonPrimary loading loadingLabel={messages.common.sending}>
            {messages.email.submit}
          </ButtonPrimary>
        </State>
      </Section>

      <Section name="ButtonSecondary">
        <div className="flex flex-wrap gap-sm">
          <State name="link">
            <ButtonSecondary href={`/${lang}/privacy`}>
              {messages.footer.privacy}
            </ButtonSecondary>
          </State>
          <State name="external">
            <ButtonSecondary href={sample.map_url} external>
              {messages.detail.openMaps}
            </ButtonSecondary>
          </State>
          <State name="button">
            <ButtonSecondary onClick={noop}>{messages.common.back}</ButtonSecondary>
          </State>
        </div>
      </Section>

      <Section name="TextLink">
        <div className="flex gap-lg">
          <State name="href">
            <TextLink href={`/${lang}`}>{messages.results.startOver}</TextLink>
          </State>
          <State name="onClick">
            <TextLink onClick={noop} aria-label={messages.common.back}>
              ←
            </TextLink>
          </State>
        </div>
      </Section>

      <Section name="ChoiceButton">
        <State name="selected / not selected (tap to toggle)">
          <div className="grid grid-cols-2 gap-sm">
            {Object.entries(messages.find.interest.options).map(([key, label]) => (
              <ChoiceButton
                key={key}
                selected={picked.includes(key)}
                onClick={() =>
                  setPicked((prev) =>
                    prev.includes(key)
                      ? prev.filter((item) => item !== key)
                      : [...prev, key],
                  )
                }
              >
                {label}
              </ChoiceButton>
            ))}
          </div>
        </State>
      </Section>

      <Section name="Progress">
        <State name="1 / 3">
          <Progress current={1} total={3} back={{ href: `/${lang}` }} backLabel={messages.common.back} />
        </State>
        <State name="3 / 3">
          <Progress current={3} total={3} back={{ onClick: noop }} backLabel={messages.common.back} />
        </State>
      </Section>

      <Section name="RegionBadge">
        <div className="flex gap-lg">
          <RegionBadge region="gangneung" />
          <RegionBadge region="seoul" />
        </div>
      </Section>

      <Section name="Photo">
        {ratios.map((ratio) => (
          <div key={ratio} className="grid grid-cols-3 gap-sm">
            {captionPositions.map((position) => (
              <State key={position} name={`${ratio} ${position}`}>
                <Photo
                  src={null}
                  caption={sample.image_captions[0]}
                  ratio={ratio}
                  captionPosition={position}
                  sizes="200px"
                />
              </State>
            ))}
          </div>
        ))}
        <State name="full (parent sets height)">
          <div className="h-48">
            <Photo src={null} caption={sample.image_captions[0]} ratio="full" captionPosition="none" />
          </div>
        </State>
      </Section>

      <Section name="Stars">
        {scores.map((value) => (
          <div key={value} className="flex gap-lg">
            <Stars value={value} label={t.stars.english} ariaLabel={starsLabel(value)} />
            <Stars value={value} label={t.stars.local} ariaLabel={starsLabel(value)} />
          </div>
        ))}
      </Section>

      <Section name="Tags">
        <Tags
          label={t.goodFor}
          tags={[...new Set([...sample.interest_tags, ...sample.style_tags])]}
        />
      </Section>

      <Section name="ExperienceCard (height follows text)">
        <ExperienceCard experience={sample} href={href(sample)} messages={messages} />
        <ExperienceCard experience={longest} href={href(longest)} messages={messages} />
      </Section>

      <Section name="ExperienceCardSmall">
        <ul className="grid grid-cols-3 gap-sm">
          {experiences.slice(1, 4).map((experience) => (
            <li key={experience.slug}>
              <ExperienceCardSmall experience={experience} href={href(experience)} />
            </li>
          ))}
        </ul>
      </Section>

      <Section name="InfoTable">
        <InfoTable
          rows={[
            { label: messages.detail.info.time, value: messages.detail.durationLong[sample.duration] },
            { label: messages.detail.info.price, value: t.price[sample.price_level] },
            { label: messages.detail.info.best, value: sample.best_time },
            {
              label: messages.detail.info.english,
              value: <Stars value={sample.english_ease} label={t.stars.english} ariaLabel={starsLabel(sample.english_ease)} />,
            },
          ]}
        />
      </Section>

      <Section name="EmailBox">
        <State name="live (type to try)">
          <EmailBox messages={messages} onSend={fakeSend} />
        </State>
        {emailStates.map((status) => (
          <State key={status} name={status}>
            <EmailBox messages={messages} onSend={fakeSend} status={status} />
          </State>
        ))}
      </Section>

      <Section name="EmptyState">
        <State name="no results">
          <EmptyState
            title={messages.empty.noResults.title}
            body={messages.empty.noResults.body}
            action={{ label: messages.empty.noResults.action, href: `/${lang}` }}
          />
        </State>
        <State name="not found">
          <EmptyState
            title={messages.empty.notFound.title}
            action={{ label: messages.empty.notFound.action, href: `/${lang}/find` }}
          />
        </State>
      </Section>

      <Section name="Footer">
        <div className="-mx-md">
          <Footer lang={lang} messages={messages} />
        </div>
      </Section>
    </div>
  );
}
