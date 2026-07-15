import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { getSession, signIn, signOut, signUp, subscribeToAuthChanges } from '../../services/supabase/auth.service';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: { display_name: string; phone?: string }) => Promise<{ sessionCreated: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; void getSession().then(({ user: currentUser }) => { if (active) setUser(currentUser); }).finally(() => { if (active) setLoading(false); }); const unsubscribe = subscribeToAuthChanges(setUser); return () => { active = false; unsubscribe(); }; }, []);
  const value = useMemo<AuthContextValue>(() => ({ user, loading, signUp: async (email, password, metadata) => { const result = await signUp(email, password, metadata); setUser(result.session?.user ?? null); return { sessionCreated: Boolean(result.session) }; }, signIn: async (email, password) => { setUser(await signIn(email, password)); }, signOut: async () => { await signOut(); setUser(null); } }), [loading, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('AuthProvider가 필요합니다.'); return value; }
