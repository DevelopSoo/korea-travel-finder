-- rls_auto_enable() 은 이벤트 트리거 ensure_rls 전용이다 (새 public 표에 RLS 자동 켜기).
-- SECURITY DEFINER 인데 누구나 실행할 수 있어 advisors 가 경고한다.
-- 직접 불러도 바뀌는 것은 없지만, 경고를 없애 진짜 경고가 묻히지 않게 한다.
-- anon·authenticated 는 PUBLIC 에서 권한을 물려받으므로 PUBLIC 에서도 거둔다.
-- 트리거는 함수 주인(postgres) 권한으로 계속 동작한다 (2026-09-23 확인).
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
