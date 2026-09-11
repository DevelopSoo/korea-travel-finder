// 질문 3개의 내부 값 (PRD §4 [2]). 결과 주소 ?i=…&v=…&s=… 에 그대로 쓴다
export const interests = [
  "nature",
  "local",
  "food",
  "history",
  "kculture",
  "sea",
] as const;
export const visits = ["first", "once", "many"] as const;
export const styles = ["slow", "active", "local_style", "easy"] as const;

export type Interest = (typeof interests)[number];
export type Visit = (typeof visits)[number];
export type Style = (typeof styles)[number];

// 질문 1은 최대 3개 (PRD 미결 6번 임시 결정)
export const MAX_INTERESTS = 3;

export type Answers = {
  interests: Interest[];
  visit: Visit | null;
  style: Style | null;
};

const isOneOf =
  <T extends string>(list: readonly T[]) =>
  (value: string | undefined): value is T =>
    value !== undefined && (list as readonly string[]).includes(value);

const isInterest = isOneOf(interests);
const isVisit = isOneOf(visits);
const isStyle = isOneOf(styles);

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

// 주소의 답을 읽는다. 모르는 값은 버린다
export function parseAnswers(searchParams: SearchParams): Answers {
  const picked = first(searchParams.i)?.split(",").filter(isInterest) ?? [];
  const v = first(searchParams.v);
  const s = first(searchParams.s);

  return {
    interests: [...new Set(picked)].slice(0, MAX_INTERESTS),
    visit: isVisit(v) ? v : null,
    style: isStyle(s) ? s : null,
  };
}

// 쉼표를 %2C 로 바꾸지 않으려고 직접 잇는다 (structure.md §1-1 주소 모양)
export function resultsQuery(answers: {
  interests: Interest[];
  visit: Visit;
  style: Style;
}) {
  return `i=${answers.interests.join(",")}&v=${answers.visit}&s=${answers.style}`;
}
