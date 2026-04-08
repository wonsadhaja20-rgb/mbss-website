import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import AuthNav from './AuthNav';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navbar}`}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image src="/logo.png" alt="MBSS Logo" width={50} height={50} className={styles.logoImage} />
            <div className={styles.logoTextWrapper}>
              <span className={styles.logoText}>MBSS</span>
              <span className={styles.universityText}>Mon Buddhist Students Society</span>
            </div>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link href="/about" className={styles.navLink}>About</Link></li>
            <li><Link href="/articles" className={styles.navLink}>Articles</Link></li>
            <li><Link href="/events" className={styles.navLink}>Events</Link></li>
            <li><Link href="/research" className={styles.navLink}>Research</Link></li>
            <li><Link href="/activities" className={styles.navLink}>Activities</Link></li>
            <li><Link href="/gallery" className={styles.navLink}>Gallery</Link></li>
            <li><Link href="/resources" className={styles.navLink}>Resources</Link></li>
          </ul>
          <AuthNav session={session} />
        </nav>
      </div>
    </header>
  );
}
