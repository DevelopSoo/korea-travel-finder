import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 콘텐츠를 'use cache' 로 캐시한다 (docs/plan/supabase-migration-plan.md 1단계)
  cacheComponents: true,
  // 사진은 DB 에 URL 로 둔다. Unsplash 사진은 Unsplash 서버에서 바로 받는다 (src/lib/imageLoader.ts)
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  async redirects() {
    return [
      // 쿼리(?src=tiktok)는 그대로 넘어간다. 언어 추가 후 목적지가 바뀔 수 있어 임시(307)로 둔다.
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
