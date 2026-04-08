'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/adminForms.module.css';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      // Success. On load layout will read session, but let's push to the right place
      // Admins should go to /admin, others to /
      // NextAuth automatically exposes token.role if we fetch session, but let's just 
      // reload or push to root, and let the Navbar/middleware handle the rest.
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div className={styles.formCard} style={{ width: '100%', maxWidth: '400px', margin: '0 1rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-maroon)' }}>Welcome Back</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Log in to your MBSS account</p>
        </header>

        {error && (
          <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" name="email" className={styles.input} required placeholder="Enter your email" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input type="password" name="password" className={styles.input} required placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className={`btn btn-primary ${styles.submitBtn}`} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
