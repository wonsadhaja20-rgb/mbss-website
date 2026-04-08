'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import styles from './Navbar.module.css';

export default function AuthNav({ session }) {
  if (session?.user) {
    return (
      <div className={styles.authNav}>
        <span className={styles.welcomeText}>Hi, {session.user.name.split(' ')[0]}</span>
        {session.user.role === 'ADMIN' && (
          <Link href="/admin" className={styles.dashboardLink}>Dashboard</Link>
        )}
        <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.signOutBtn}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authNav}>
      <Link href="/login" className={styles.navLink}>Log In</Link>
      <Link href="/register" className={styles.registerBtn}>Join Us</Link>
    </div>
  );
}
