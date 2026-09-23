import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 공개 콘텐츠(경험·지역) 전용. 로그인과 무관하므로 쿠키를 읽지 않는다.
// 쿠키를 읽으면 'use cache' 안에서 쓸 수 없고, 페이지가 요청마다 새로 그려진다.
export const createPublicClient = () =>
  createClient<Database>(supabaseUrl!, supabaseKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
