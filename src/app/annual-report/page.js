import Link from 'next/link';
import styles from '../page.module.css';
import { getPublications } from '@/app/actions/resources';
import { format } from 'date-fns';

export const metadata = {
  title: 'Annual Reports | MBSS',
  description: 'Download the MBSS Annual Reports summarizing yearly activities, financials, and achievements.',
};

export default async function AnnualReportPage() {
  // Annual reports are stored as publications with a specific description pattern or we can just fetch all publications
  const publications = await getPublications();
  
  // Try to just show publications since they share the same schema for now
  // In a real app we might filter by category if added to Publication model

  return (
    <div className={styles.main}>
      <header className={styles.pageHeader} style={{ backgroundColor: 'var(--color-blue)' }}>
        <div className="container">
          <h1 className={styles.pageTitle} style={{ color: 'white' }}>Annual Reports</h1>
          <p className={styles.pageSubtitle} style={{ color: '#e5e7eb' }}>
            Comprehensive reviews of MBSS activities, financials, and achievements.
          </p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.grid3}`}>
          
          {publications.length > 0 ? publications.map(pub => (
            <div key={pub.id} className={styles.contentCard} style={{ borderTop: '4px solid var(--color-blue)' }}>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{pub.title}</h3>
                <p className={styles.metaText}>
                  Published: {format(new Date(pub.publishDate), 'MMMM yyyy')}
                </p>
                <p className={styles.cardExcerpt}>
                  {pub.description || 'Official MBSS Annual Report'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.readMore} style={{ color: 'var(--color-blue)', fontWeight: 'bold' }}>
                    Open PDF Report ⤓
                  </a>
                  <a href={`/api/download?file=${encodeURIComponent(pub.pdfUrl)}&title=${encodeURIComponent(pub.title + '_MBSS_Annual_Report')}`} download={`${pub.title.replace(/[^a-zA-Z0-9\-_]/g, '_')}_MBSS_Annual_Report.pdf`} target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Download
                  </a>
                </div>
              </div>
            </div>
          )) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0'}}>
              <h3>No Annual Reports Available</h3>
              <p>Reports will be uploaded here by the administration team at the end of the academic year.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
