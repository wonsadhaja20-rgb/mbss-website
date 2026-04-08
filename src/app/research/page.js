import styles from '../page.module.css';
import { getResearchPapers } from '@/app/actions/resources';
import { format } from 'date-fns';

import Link from 'next/link';

export const metadata = {
  title: 'Research Database | MBSS',
  description: 'Academic research papers on Buddhism, Mon history, and linguistics.',
};

export default async function ResearchPage() {
  const papers = await getResearchPapers();

  return (
    <div className={styles.main}>
      <header className={styles.pageHeader}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className={styles.pageTitle}>Research Database</h1>
            <p className={styles.pageSubtitle}>
              Enhancing academic excellence through Buddhist research and Mon historical studies.
            </p>
          </div>
          <Link href="/research/submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold' }}>
            Submit Your Thesis
          </Link>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.grid2}>
            
            {papers.length > 0 ? papers.map(paper => (
              <div key={paper.id} style={{ display: 'flex', border: '1px solid #eaeaea', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {paper.category}
                  </span>
                  <h3 style={{ margin: '0.5rem 0', color: 'var(--color-black)', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
                    {paper.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Author: <strong>{paper.author}</strong> • Published {format(new Date(paper.publishDate), 'yyyy')}
                  </p>
                  
                  {paper.abstract && (
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {paper.abstract}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className={`btn btn-secondary`} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                      Read PDF Document
                    </a>
                    <a href={`/api/download?file=${encodeURIComponent(paper.pdfUrl)}&title=${encodeURIComponent(paper.title + '_MBSS')}`} download={`${paper.title.replace(/[^a-zA-Z0-9\-_]/g, '_')}_MBSS.pdf`} target="_blank" rel="noopener noreferrer" className={`btn`} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#eaeaea', color: '#333' }}>
                      Download
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0'}}>
                <h3>No Research Papers Found</h3>
                <p>Check back later for new academic publications.</p>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
