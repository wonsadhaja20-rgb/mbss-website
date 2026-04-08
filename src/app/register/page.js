'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/adminForms.module.css';
import { registerUser } from '@/app/actions/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const res = await registerUser(formData);

    if (res.success) {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError(res.error || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div className={styles.formCard} style={{ width: '100%', maxWidth: '400px', margin: '0 1rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-maroon)' }}>Join MBSS</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Create an account to access student resources and events.</p>
        </header>

        {error && <div className={styles.error} style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        {success && <div className={styles.success} style={{ color: '#059669', backgroundColor: '#d1fae5', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input type="text" name="name" className={styles.input} required placeholder="Phra John Doe" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" name="email" className={styles.input} required placeholder="student@mcu.ac.th" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input type="password" name="password" className={styles.input} required placeholder="••••••••" minLength="6" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input type="password" name="confirmPassword" className={styles.input} required placeholder="••••••••" minLength="6" />
          </div>

          <button type="submit" disabled={loading} className={`btn btn-primary ${styles.submitBtn}`} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>Log In</Link>
        </div>
      </div>
    </div>
  );
}
