'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.column}>
          <h3 className={styles.heading}>Mon Buddhist Students Society</h3>
          <p className={styles.description}>
            Representing Buddhist students studying at Mahachulalongkornrajavidyalaya University. 
            Dedicated to education, culture, research, and community activities since 2015.
          </p>
        </div>
        
        <div className={styles.column}>
          <h4 className={styles.subHeading}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/annual-report">Annual Report</Link></li>
            <li><Link href="/publications">Publications</Link></li>
            <li><Link href="/register">Member Registration</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.subHeading}>Admin Access</h4>
          <ul className={styles.linkList}>
            <li><Link href="/admin">Dashboard</Link></li>
          </ul>
        </div>
        
        <div className={styles.column}>
          <h4 className={styles.subHeading}>Newsletter</h4>
          <p className={styles.description}>Stay updated with our latest news and events.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" className={styles.input} />
            <button type="submit" className={styles.button}>Subscribe</button>
          </form>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {currentYear} Mon Buddhist Students Society. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
