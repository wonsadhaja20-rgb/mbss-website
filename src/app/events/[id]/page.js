import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../page.module.css';
import { getEventById } from '@/app/actions/events';
import { format } from 'date-fns';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title} | MBSS Events`,
    description: event.description.substring(0, 150),
  };
}

export default async function EventDetail({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <article className={styles.main}>
      <header className={styles.articleHeader} style={{ 
        backgroundColor: 'var(--color-blue)',
        color: '#fff',
        padding: '6rem 1rem 4rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className={styles.categoryTag} style={{ marginBottom: '1rem', display: 'inline-block', backgroundColor: 'var(--color-gold)', color: 'black' }}>
            Event Details
          </span>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            {event.title}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            {format(new Date(event.date), 'EEEE, MMMM dd, yyyy')} | {event.location} | {format(new Date(event.date), 'h:mm a')}
          </p>
        </div>
      </header>

      <div className="container" style={{ maxWidth: '800px', padding: '4rem 1rem' }}>
        
        {event.coverImage && (
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <img src={event.coverImage} alt={event.title} style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
          </div>
        )}

        <div 
          className={styles.articleContent}
          style={{
            lineHeight: 1.8,
            fontSize: '1.1rem',
            color: '#333',
            whiteSpace: 'pre-line' // Important for textarea non-rich text
          }}
        >
          {event.description}
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid #eee' }}>
          <Link href="/events" className="btn btn-secondary">
            ← Back to All Events
          </Link>
        </div>
      </div>
    </article>
  );
}
