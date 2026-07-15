import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase.client';

function requireSupabase() {
  if (!supabase) throw new Error('Supabase 환경변수가 설정되지 않았습니다. .env.local을 확인하세요.');
  return supabase;
}

export async function signUp(email: string, password: string, metadata: { display_name: string; phone?: string }): Promise<User> {
  const client = requireSupabase();
  const { data, error } = await client.auth.signUp({ email, password, options: { data: metadata } });
  if (error) throw error;
  if (!data.user || !data.session) {
    throw new Error('회원가입 세션을 만들지 못했습니다. Supabase 이메일 공급자 설정에서 Confirm email을 꺼주세요.');
  }
  return data.user;
}

export async function signIn(email: string, password: string): Promise<User> {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw error ?? new Error('로그인에 실패했습니다.');
  return data.user;
}

export async function signOut(): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getSession(): Promise<{ user: User | null; session: Session | null }> {
  if (!supabase) return { user: null, session: null };
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return { user: data.session?.user ?? null, session: data.session };
}

export function subscribeToAuthChanges(onChange: (user: User | null) => void): () => void {
  if (!supabase) return () => undefined;
  const { data } = supabase.auth.onAuthStateChange((_event, session) => onChange(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}
