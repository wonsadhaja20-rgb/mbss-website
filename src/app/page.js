import Link from 'next/link';
import styles from './page.module.css';
import { getSiteSettings } from '@/app/actions/settings';
import { getArticles } from '@/app/actions/articles';
import { getEvents } from '@/app/actions/events';
import { format } from 'date-fns';

export default async function Home() {
  const settings = await getSiteSettings();
  const allArticles = await getArticles();
  const allEvents = await getEvents();

  // Get top 2 articles and events for the homepage
  const recentArticles = allArticles.slice(0, 2);
  const upcomingEvents = allEvents.filter(e => e.status === 'UPCOMING').slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <section 
        className={styles.hero}
        style={{
          backgroundImage: `url('${settings.heroImage || '/hero.webp'}')`
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>{settings.heroTitle}</h1>
          <p className={styles.heroSubtitle}>
            {settings.heroDescription}
          </p>
          <div className={styles.heroActions}>
            <Link href="/about" className="btn btn-primary">Discover Our History</Link>
            <Link href="/register" className={`btn btn-secondary ${styles.marginLeft}`}>Join Us</Link>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Section if Admin configures it */}
      <section style={{ backgroundColor: 'var(--color-maroon)', color: 'white', padding: '2rem 0', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{settings.statsNumbers?.members || 0}+</h3>
            <p>Active Students</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{settings.statsNumbers?.events || 0}+</h3>
            <p>Annual Events</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{settings.statsNumbers?.years || 0}</h3>
            <p>Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* Welcome / Intro */}
      <section className="section">
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <h2>{settings.welcomeTitle || 'Welcome to MBSS'}</h2>
              <div style={{ whiteSpace: 'pre-line', color: '#444', lineHeight: '1.8' }}>
                {settings.welcomeText || (
                  <p>
                    The Mon Buddhist Students Society (MBSS) is an academic and cultural organization 
                    representing Mon Buddhist students studying at Mahachulalongkornrajavidyalaya University. 
                    Founded on the principles of Dhamma, we strive to foster a supportive community that 
                    emphasizes education, preserves Mon culture, and encourages academic research.
                    <br/><br/>
                    Since 2015, we have been organizing events ranging from meditation retreats to cultural 
                    exhibitions, ensuring our heritage and Buddhist values thrive within the university environment.
                  </p>
                )}
              </div>
              <Link href="/about" className="btn btn-primary" style={{marginTop: '1.5rem'}}>Read Full Mission</Link>
            </div>
            {settings.welcomeImage ? (
              <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src={settings.welcomeImage} alt="Welcome to MBSS" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ) : (
              <div className={styles.introImagePlaceholder}>
                <span>MBSS Community Photo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Articles & Events */}
      <section className="section section-bg-light">
        <div className="container">
          <div className={styles.twoColumnGrid}>
            <div>
              <h2>Latest Articles</h2>
              <div className={styles.cardList}>
                {recentArticles.length > 0 ? recentArticles.map((article) => (
                  <div key={article.id} className={styles.card}>
                    <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
                    <p className={styles.meta}>
                      Published: {format(new Date(article.publishDate), 'MMM dd, yyyy')} | By {article.author}
                    </p>
                    {/* Strip HTML tags for preview snippet */}
                    <p>{article.content.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
                  </div>
                )) : (
                  <p>No articles published yet.</p>
                )}
              </div>
              <Link href="/articles" className="btn btn-secondary" style={{marginTop: '1.5rem'}}>View All Articles</Link>
            </div>
            
            <div>
              <h2>Upcoming Events</h2>
              <div className={styles.cardList}>
                {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                  <div key={event.id} className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventMonth}>{format(new Date(event.date), 'MMM').toUpperCase()}</span>
                      <span className={styles.eventDay}>{format(new Date(event.date), 'dd')}</span>
                    </div>
                    <div className={styles.eventDetails}>
                      <h3><Link href={`/events/${event.id}`}>{event.title}</Link></h3>
                      <p>{event.location} • {format(new Date(event.date), 'h:mm a')}</p>
                    </div>
                  </div>
                )) : (
                  <p>No upcoming events currently scheduled.</p>
                )}
              </div>
              <Link href="/events" className="btn btn-secondary" style={{marginTop: '1.5rem'}}>View All Events</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
