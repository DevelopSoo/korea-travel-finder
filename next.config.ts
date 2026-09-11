import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // 쿼리(?src=tiktok)는 그대로 넘어간다. 언어 추가 후 목적지가 바뀔 수 있어 임시(307)로 둔다.
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
