'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>MBSS Admin</h2>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/admin" className={`${styles.navLink} ${isActive('/admin') ? styles.active : ''}`}>
                Dashboard Home
              </Link>
            </li>
            <li>
              <Link href="/admin/articles" className={`${styles.navLink} ${isActive('/admin/articles') ? styles.active : ''}`}>
                Manage Articles
              </Link>
            </li>
            <li>
              <Link href="/admin/events" className={`${styles.navLink} ${isActive('/admin/events') ? styles.active : ''}`}>
                Manage Events
              </Link>
            </li>
            <li>
              <Link href="/admin/research" className={`${styles.navLink} ${isActive('/admin/research') ? styles.active : ''}`}>
                Manage Research
              </Link>
            </li>
            <li>
              <Link href="/admin/files" className={`${styles.navLink} ${isActive('/admin/files') ? styles.active : ''}`}>
                File & Image Uploads
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className={`${styles.navLink} ${isActive('/admin/users') ? styles.active : ''}`}>
                Manage Users
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className={`${styles.navLink} ${isActive('/admin/settings') ? styles.active : ''}`}>
                Global Site Settings
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.navLinkHome}>
                &larr; Back to Website
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
