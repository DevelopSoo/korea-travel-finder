// 사진이 아직 없을 때 쓰는 자리 표시 그라데이션 (photos.md §3-5).
// 실제 사진이 들어오면 이 장치는 쓰이지 않는다 — 임시 장치다.
// 톤은 여섯 개뿐이고, 무엇을 쓸지는 slug 로 정해진다(새로고침해도 같은 색).

export type PhotoTone =
  | "sea"
  | "pine"
  | "dusk"
  | "harvest"
  | "mist"
  | "market";

export const photoTones: Record<PhotoTone, string> = {
  sea: "linear-gradient(in oklch 165deg,oklch(0.80 0.05 230) 0%,oklch(0.66 0.10 235) 45%,oklch(0.50 0.09 240) 75%,oklch(0.42 0.06 160) 100%)",
  pine: "linear-gradient(in oklch 160deg,oklch(0.72 0.09 150) 0%,oklch(0.58 0.09 155) 50%,oklch(0.42 0.06 140) 100%)",
  dusk: "linear-gradient(in oklch 150deg,oklch(0.68 0.11 55) 0%,oklch(0.52 0.12 32) 45%,oklch(0.36 0.07 25) 100%)",
  harvest:
    "linear-gradient(in oklch 160deg,oklch(0.82 0.07 75) 0%,oklch(0.68 0.09 70) 50%,oklch(0.52 0.07 80) 100%)",
  mist: "linear-gradient(in oklch 120deg,oklch(0.88 0.03 230) 0%,oklch(0.78 0.05 225) 55%,oklch(0.68 0.06 160) 100%)",
  market:
    "linear-gradient(in oklch 160deg,oklch(0.74 0.06 80) 0%,oklch(0.56 0.07 62) 55%,oklch(0.38 0.05 50) 100%)",
};

// 그라데이션 하나만 깔면 색종이처럼 보인다. 빛이 한쪽에서 드는 것처럼
// 둥근 밝은 자리와 어두운 자리를 얹어 사진의 깊이를 흉내 낸다
export const photoGlow =
  "radial-gradient(120% 90% at 78% 18%, oklch(0.92 0.05 90 / 0.45) 0%, transparent 55%)," +
  "radial-gradient(90% 70% at 12% 100%, oklch(0.25 0.05 150 / 0.55) 0%, transparent 60%)";

const order: PhotoTone[] = ["sea", "pine", "dusk", "harvest", "mist", "market"];

// 같은 seed 는 늘 같은 톤. 서버와 브라우저가 다른 색을 그리면 안 된다
export function toneFor(seed: string): PhotoTone {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100003;
  }
  return order[hash % order.length];
}
