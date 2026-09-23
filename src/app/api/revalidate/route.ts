import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

// 콘텐츠 캐시 비우기. Supabase Database Webhook 이 experiences·places 가 바뀔 때 부른다.
// 헤더 x-revalidate-secret 이 REVALIDATE_SECRET 과 같을 때만 비운다.
// 'max' = 다음 방문자는 이전 내용을 받고 그동안 새로 읽는다 → 새로고침 한두 번 안에 바뀐다
export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return Response.json(
      { ok: false, error: "REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!isSame(given, expected)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  revalidateTag("experiences", "max");
  revalidateTag("places", "max");
  return Response.json({ ok: true });
}

// 글자를 하나씩 비교하면 걸린 시간으로 비밀 값을 추측할 수 있어 한 번에 비교한다
function isSame(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
