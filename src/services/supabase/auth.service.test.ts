import type { Session, User } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ signUp: vi.fn() }));

vi.mock('./supabase.client', () => ({
  supabase: { auth: { signUp: mocks.signUp } },
}));

import { signUp } from './auth.service';

const email = 'traveler@example.com';
const password = 'password123';
const metadata = { display_name: '여행자', phone: '010-1234-5678' };

describe('Supabase sign up', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('이메일 리다이렉트 없이 가입하고 즉시 생성된 사용자를 반환한다', async () => {
    const user = { id: 'user-id' } as User;
    const session = { user } as Session;
    mocks.signUp.mockResolvedValue({ data: { user, session }, error: null });

    await expect(signUp(email, password, metadata)).resolves.toBe(user);
    expect(mocks.signUp).toHaveBeenCalledWith({
      email,
      password,
      options: { data: metadata },
    });
  });

  it('즉시 로그인 세션이 없으면 이메일 확인 설정 오류로 처리한다', async () => {
    const user = { id: 'user-id' } as User;
    mocks.signUp.mockResolvedValue({ data: { user, session: null }, error: null });

    await expect(signUp(email, password, metadata)).rejects.toThrow('Confirm email');
  });
});
