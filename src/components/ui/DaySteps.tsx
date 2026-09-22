export type DayStep = { title: string; desc: string };

// 하루 흐름 (components.md §4-10). 번호 동그라미를 세로 선으로 잇는다.
// 마지막 칸 밑에는 선이 없다
export default function DaySteps({ steps }: { steps: DayStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-meta font-semibold text-on-photo">
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span className="my-1 w-px flex-1 bg-line-strong" />
            )}
          </div>
          <div className="pb-[18px]">
            <p className="font-display font-semibold text-ink">{step.title}</p>
            <p className="mt-0.5 text-meta text-ink-soft">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
