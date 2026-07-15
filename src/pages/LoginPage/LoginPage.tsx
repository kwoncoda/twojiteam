import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(''); setBusy(true);
    try { await signIn(email, password); navigate('/'); } catch (caught) { setError(caught instanceof Error ? caught.message : '로그인에 실패했습니다.'); } finally { setBusy(false); }
  };
  return (
    <div className={styles.wrap}>
      <form className={styles.card} onSubmit={submit}>
        <img src="/logo.png" alt="TRAVEL PICK" className={styles.logoImg} />
        <p className={styles.sub}>국내 여행지를 취향에 맞게 골라보세요</p>

        <label className={styles.field} htmlFor="login-email">이메일
          <input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="username" />
        </label>
        <label className={styles.field} htmlFor="login-password">비밀번호
          <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호" autoComplete="current-password" />
        </label>
        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" className={`button button-primary ${styles.submit}`} disabled={busy}>{busy ? '로그인 중...' : '로그인'}</button>

        <div className={styles.divider}>또는</div>

        <div className={styles.social}>
          <button type="button" className={`${styles.socialBtn} ${styles.apple}`} aria-label="Apple로 로그인">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.51 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
          </button>
          <button type="button" className={`${styles.socialBtn} ${styles.naver}`} aria-label="네이버로 로그인">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 12.6 8.2 2H2v20h6.4V11.4L15.8 22H22V2h-6.4z" /></svg>
          </button>
          <button type="button" className={`${styles.socialBtn} ${styles.kakao}`} aria-label="카카오톡으로 로그인">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.2 4.8 6.6-.2.7-.7 2.6-.8 3-.1.4.2.4.3.3.2-.1 2.8-1.9 3.9-2.7.6.1 1.2.1 1.8.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" /></svg>
          </button>
        </div>

        <p className={styles.signup}>아직 회원이 아니신가요? <Link to="/signup">회원가입</Link></p>
        <span className={styles.mockTag}>Supabase 이메일 인증</span>
      </form>
    </div>
  );
}
