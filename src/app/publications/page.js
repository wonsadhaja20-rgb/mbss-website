import Link from 'next/link';
import styles from '../page.module.css';
import { getPublications } from '@/app/actions/resources';
import { format } from 'date-fns';

export const metadata = {
  title: 'Annual Reports & Official Publications | MBSS',
  description: 'Browse the latest official publications and annual reports from MBSS.',
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className={styles.main}>
      <header className={styles.pageHeader} style={{ backgroundColor: '#1f2937' }}>
        <div className="container">
          <h1 className={styles.pageTitle} style={{ color: 'var(--color-gold)' }}>Official Publications</h1>
          <p className={styles.pageSubtitle} style={{ color: '#e5e7eb' }}>
            Quarterly newsletters, Annual Reports, and specialized Dhamma publications.
          </p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.grid3}`}>
          
          {publications.length > 0 ? publications.map(pub => (
            <div key={pub.id} className={styles.contentCard} style={{ borderTop: '4px solid var(--color-gold)' }}>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{pub.title}</h3>
                <p className={styles.metaText}>
                  Published: {format(new Date(pub.publishDate), 'MMMM yyyy')}
                </p>
                <p className={styles.cardExcerpt}>
                  {pub.description || 'Official MBSS Publication Document.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.readMore} style={{ color: 'var(--color-blue)', fontWeight: 'bold' }}>
                    Open PDF Document ⤓
                  </a>
                  <a href={`/api/download?file=${encodeURIComponent(pub.pdfUrl)}&title=${encodeURIComponent(pub.title + '_MBSS')}`} download={`${pub.title.replace(/[^a-zA-Z0-9\-_]/g, '_')}_MBSS.pdf`} target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Download
                  </a>
                </div>
              </div>
            </div>
          )) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0'}}>
              <h3>No Publications Found</h3>
              <p>Official publications like Annual Reports will be released here.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
