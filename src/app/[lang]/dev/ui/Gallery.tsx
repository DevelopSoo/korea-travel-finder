"use client";

import { useState } from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import ChipLink from "@/components/ui/ChipLink";
import CtaBand from "@/components/ui/CtaBand";
import DaySteps from "@/components/ui/DaySteps";
import EmptyState from "@/components/ui/EmptyState";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ExperienceCardWide from "@/components/ui/ExperienceCardWide";
import Eyebrow from "@/components/ui/Eyebrow";
import FactGrid from "@/components/ui/FactGrid";
import FilterChip from "@/components/ui/FilterChip";
import PhotoFrame from "@/components/ui/PhotoFrame";
import PlaceCard from "@/components/ui/PlaceCard";
import SaveButton from "@/components/ui/SaveButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Select from "@/components/ui/Select";
import Tag from "@/components/ui/Tag";
import TextField from "@/components/ui/TextField";
import { Clock, Coins, Sun, Ticket, interestIcons } from "@/components/ui/icons";
import type { CardItem } from "@/lib/cards";
import { homePhotos } from "@/lib/homePhotos";
import { showNotice } from "@/lib/notice";
import { photoTones } from "@/lib/photoTone";
import type { Locale, Messages } from "@/messages";

type GalleryProps = {
  lang: Locale;
  messages: Messages;
  cards: CardItem[];
  places: CardItem[];
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-7 pb-3">
      <Eyebrow className="mb-4">{title}</Eyebrow>
      {children}
    </section>
  );
}

// 부품 모음 — 개발용. 화면을 만들기 전에 부품이 어떻게 보이는지 확인하는 곳
export default function Gallery({ lang, messages, cards, places }: GalleryProps) {
  const [chip, setChip] = useState("food");
  const [region, setRegion] = useState("all");
  const labels = {
    view: messages.common.viewExperience,
    save: messages.common.save,
  };
  const card = cards[0];

  return (
    <div className="mx-auto flex max-w-content flex-col gap-3 py-8 gutter">
      <h1 className="text-title">Design system</h1>

      <Block title="Color">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["paper", "bg-paper"],
            ["paper-2", "bg-paper-2"],
            ["paper-3", "bg-paper-3"],
            ["surface", "bg-surface"],
            ["ink", "bg-ink"],
            ["ink-2", "bg-ink-2"],
            ["ink-soft", "bg-ink-soft"],
            ["ink-mute", "bg-ink-mute"],
            ["accent", "bg-accent"],
            ["accent-press", "bg-accent-press"],
            ["accent-soft", "bg-accent-soft"],
            ["accent-soft-2", "bg-accent-soft-2"],
          ].map(([name, cls]) => (
            <div key={name}>
              <div className={`h-14 rounded-md border border-line ${cls}`} />
              <p className="mt-1 text-caption text-ink-soft">{name}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Type">
        <div className="flex flex-col gap-2">
          <p className="font-display text-hero">Hero 60</p>
          <p className="font-display text-display">Display 44</p>
          <p className="font-display text-title">Title 34</p>
          <p className="font-display text-section">Section 26</p>
          <p className="font-display text-card">Card 21</p>
          <p className="font-display text-lead">Lead 20</p>
          <p className="text-body">Body 16 — 본문은 Source Sans 3 로 적는다</p>
          <p className="text-small">Small 14</p>
          <p className="text-meta">Meta 13</p>
          <p className="text-caption">Caption 12</p>
          <Eyebrow>Eyebrow 11</Eyebrow>
        </div>
      </Block>

      <Block title="Photo tones">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(photoTones).map(([name, value]) => (
            <div key={name}>
              <div
                className="aspect-square rounded-sm"
                style={{ background: value }}
              />
              <p className="mt-1 text-caption text-ink-soft">{name}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Buttons & links">
        <div className="flex flex-wrap items-center gap-4">
          <ButtonPrimary href="#" arrow>
            Primary
          </ButtonPrimary>
          <ButtonPrimary href="#" pill arrow>
            Primary pill
          </ButtonPrimary>
          <ButtonSecondary href="#" arrow>
            Secondary
          </ButtonSecondary>
          <ButtonPrimary disabled>Disabled</ButtonPrimary>
          {card && (
            <SaveButton
              slug={card.slug}
              saveLabel={messages.common.save}
              savedLabel={messages.common.saved}
            />
          )}
          <ArrowLink href="#">Underlined link</ArrowLink>
          <ArrowLink href="#" variant="plain" accent>
            Plain accent link
          </ArrowLink>
        </div>
      </Block>

      <Block title="Chips & select">
        <div className="flex flex-wrap items-center gap-3">
          {(["food", "nature", "local"] as const).map((key) => {
            const Icon = interestIcons[key];
            return (
              <FilterChip
                key={key}
                label={messages.results.summary.interest[key]}
                active={chip === key}
                onClick={() => setChip(chip === key ? "" : key)}
                icon={Icon ? <Icon /> : undefined}
              />
            );
          })}
          <FilterChip label="Small" size="sm" active={false} onClick={() => {}} />
          <ChipLink
            href={`/${lang}/experiences?i=food`}
            label="Chip link"
            icon={interestIcons.food?.({})}
          />
          <Select
            label="Region"
            value={region}
            options={[
              { value: "all", label: "All regions" },
              { value: "gangneung", label: "Gangneung" },
            ]}
            onChange={setRegion}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>slow</Tag>
          <Tag>local style</Tag>
          <Tag>sea</Tag>
        </div>
      </Block>

      <Block title="Text field">
        <div className="grid max-w-[27rem] gap-5">
          <TextField label="Email" name="demo-email" type="email" />
          <TextField
            label="Password"
            name="demo-password"
            type="password"
            hint="At least 8 characters."
            invalid
          />
        </div>
      </Block>

      {/* 알림줄은 레이아웃에 하나만 있다 — 여기서는 띄우기만 한다 */}
      <Block title="Notice">
        <div className="flex flex-wrap gap-3">
          <ButtonSecondary onClick={() => showNotice("saveFailed", () => {})}>
            Save failed
          </ButtonSecondary>
          <ButtonSecondary onClick={() => showNotice("removed", () => {})}>
            Removed
          </ButtonSecondary>
        </div>
      </Block>

      <Block title="Headings & breadcrumb">
        <Breadcrumb
          items={[{ label: "Home", href: "#" }, { label: "Experiences" }]}
        />
        <div className="mt-3">
          <SectionHeading
            eyebrow={<Eyebrow spacing="wide">Find your kind of Korea</Eyebrow>}
            title="What would you love to do?"
            lead="Discover small moments beyond the familiar."
            action={<ArrowLink href="#">See all</ArrowLink>}
          />
        </div>
      </Block>

      <Block title="Photo frame">
        <div className="grid gap-4 sm:grid-cols-3">
          <PhotoFrame src={null} caption="Gangneung · 06:20" seed="a" ratio="card" />
          <PhotoFrame src={null} caption="Seoul · 19:40" seed="b" ratio="16:9" />
          <PhotoFrame src={null} caption="Jumunjin · 05:40" seed="c" ratio="3:2" />
        </div>
        {/* 사진이 있을 때: 출처는 캡션 바로 위 (photos.md §3-6) */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <PhotoFrame
            src={homePhotos.hero.src}
            caption="Anmok Beach, Gangneung · 06:20"
            credit={homePhotos.hero.credit}
            creditLabel={messages.photo.credit}
            captionSide="right"
            seed="d"
            ratio="16:9"
          />
          <PhotoFrame
            src={homePhotos.season.src}
            caption="Sogeumgang Valley, Gangneung · 16:30"
            seed="e"
            ratio="16:9"
          />
        </div>
      </Block>

      <Block title="Cards">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.slice(0, 3).map((item) => (
            <ExperienceCard
              key={item.slug}
              item={item}
              showRegion
              labels={labels}
            />
          ))}
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {cards.slice(0, 2).map((item) => (
            <ExperienceCardWide key={item.slug} item={item} labels={labels} />
          ))}
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((item) => (
            <PlaceCard key={item.slug} item={item} />
          ))}
        </div>
      </Block>

      <Block title="Fact grid & day steps">
        <FactGrid
          facts={[
            { icon: <Clock />, title: "Time", desc: "1–2 hours" },
            { icon: <Coins />, title: "Price", desc: "Inexpensive" },
            { icon: <Sun />, title: "Best time", desc: "Year-round, 05:00–07:00" },
            { icon: <Ticket />, title: "Booking", desc: "Just turn up" },
          ]}
        />
        <div className="mt-7 max-w-md">
          <DaySteps
            steps={[
              { title: "Start at the harbor", desc: "Busiest before seven." },
              { title: "Coffee on the beach road", desc: "Take the slow one." },
              { title: "Walk the pine trail", desc: "An hour, flat the whole way." },
            ]}
          />
        </div>
      </Block>

      <Block title="Band & empty">
        <CtaBand
          title="Something caught your eye?"
          body="Save your favorite experiences for your next Korea trip."
          action={<ArrowLink href="#" accent>View saved experiences</ArrowLink>}
        />
        <div className="mt-6 rounded-xl bg-paper-2">
          <EmptyState
            title="Nothing saved here yet — explore and bookmark what you love."
            action={<ButtonPrimary href="#" arrow>Explore experiences</ButtonPrimary>}
          />
        </div>
      </Block>
    </div>
  );
}
