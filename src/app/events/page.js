import styles from '../page.module.css';
import { getEvents } from '@/app/actions/events';
import { format } from 'date-fns';

export const metadata = {
  title: 'Events | Mon Buddhist Students Society',
  description: 'Upcoming meetings, Dhamma talks, and cultural events.',
};

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter(e => e.status === 'UPCOMING');
  const pastEvents = events.filter(e => e.status === 'PAST');

  return (
    <div className={styles.main}>
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Upcoming Events</h1>
          <p className={styles.pageSubtitle}>
            Join our community gatherings, Dhamma sessions, and cultural exhibitions.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
            <div key={event.id} className={styles.eventRow} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: 'var(--color-maroon)', color: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '150px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{format(new Date(event.date), 'MMMM').toUpperCase()}</span>
                <span style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 }}>{format(new Date(event.date), 'dd')}</span>
              </div>
              <div style={{ padding: '2rem', flex: 1 }}>
                <h2 style={{ color: 'var(--color-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{event.title}</h2>
                <div style={{ color: '#666', marginBottom: '1rem', fontSize: '0.95rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span><strong>Time:</strong> {format(new Date(event.date), 'h:mm a')}</span>
                  <span><strong>Location:</strong> {event.location}</span>
                </div>
                <p style={{ lineHeight: 1.6 }}>{event.description}</p>

                {event.coverImage && (
                  <a href={event.coverImage} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    View Event Flyer
                  </a>
                )}
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '8px' }}>
               <h3>No upcoming events right now.</h3>
               <p style={{marginTop: '1rem'}}>Stay tuned or subscribe to our newsletter to be notified of the next MBSS gathering!</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
