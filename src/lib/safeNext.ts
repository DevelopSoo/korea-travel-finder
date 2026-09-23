// 로그인 뒤 돌아갈 주소. 사이트 안 경로만 받는다 — 외부 주소로 튕기는 것을 막는다.
// "//evil.com", "/\evil.com", 탭·줄바꿈이 섞인 값은 브라우저가 외부 주소로 읽을 수 있어서
// 직접 문자열을 검사하지 않고 URL 로 풀어 본 뒤 같은 출처인지 확인한다.
const ORIGIN = "http://internal.invalid";

export function safeNext(value: unknown, lang: string): string {
  const fallback = `/${lang}`;
  if (typeof value !== "string" || !value.startsWith("/")) return fallback;

  let url: URL;
  try {
    url = new URL(value, ORIGIN);
  } catch {
    return fallback;
  }
  if (url.origin !== ORIGIN) return fallback;

  // 로그인 페이지로 돌아가면 제자리를 돈다
  if (url.pathname === `/${lang}/login`) return fallback;

  return `${url.pathname}${url.search}${url.hash}`;
}
