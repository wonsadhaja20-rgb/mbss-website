import styles from '../page.module.css';
import { getResources } from '@/app/actions/resources';
import { format } from 'date-fns';

export const metadata = {
  title: 'Document Resources | MBSS',
  description: 'Downloadable forms, templates, and general resources.',
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className={styles.main}>
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Student Resources</h1>
          <p className={styles.pageSubtitle}>
            Download official society forms, guides, and study materials.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {resources.length > 0 ? resources.map(resource => (
              <div key={resource.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #eee', padding: '1.5rem', borderRadius: '4px' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-blue)', fontSize: '1.2rem' }}>
                    {resource.title}
                  </h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    {resource.description || 'General Resource File'} • Added: {format(new Date(resource.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    Read Form
                  </a>
                  <a href={`/api/download?file=${encodeURIComponent(resource.fileUrl)}&title=${encodeURIComponent(resource.title + '_MBSS')}`} download={`${resource.title.replace(/[^a-zA-Z0-9\-_]/g, '_')}_MBSS.pdf`} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#eaeaea', color: '#333' }}>
                    Download
                  </a>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <h3>No Resources Available</h3>
                <p>General downloadable documents will appear here once uploaded by the administration.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
