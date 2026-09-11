import en from "./en.json";

// 언어를 추가할 때는 es.json 을 만들고 여기에 한 줄 더한다 (PRD §8).
const messages = { en };

export type Locale = keyof typeof messages;
export type Messages = typeof en;

export const locales = Object.keys(messages) as Locale[];

export const hasLocale = (locale: string): locale is Locale =>
  locale in messages;

export const getMessages = (locale: Locale): Messages => messages[locale];
