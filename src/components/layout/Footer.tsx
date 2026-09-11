import type { Messages } from "@/messages";

type FooterProps = {
  messages: Messages;
};

// 발: 글자 링크 3개 한 줄, 위쪽 1px line 구분선 (tokens.md §2-4, patterns.md 22번)
// 링크 주소는 임시 # — 계정·개인정보 페이지가 생기면 교체
export default function Footer({ messages }: FooterProps) {
  const links = [
    messages.footer.instagram,
    messages.footer.tiktok,
    messages.footer.privacy,
  ];

  return (
    <footer className="border-t border-line">
      <ul className="mx-auto flex w-full max-w-content gap-md px-md py-lg text-small text-ink-soft">
        {links.map((label) => (
          <li key={label}>
            <a href="#">{label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
