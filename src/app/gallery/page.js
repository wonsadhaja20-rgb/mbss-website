import styles from './page.module.css';

export const metadata = {
  title: "Media Gallery | Mon Buddhist Students Society",
  description: "View photos and videos from recent MBSS activities, events, and gatherings.",
};

const placeholderImages = [
  { id: 1, title: 'Annual Meditation Retreat 2023', type: 'image' },
  { id: 2, title: 'Mon Cultural Exhibition', type: 'image' },
  { id: 3, title: 'Volunteer Work at the Local Temple', type: 'video' },
  { id: 4, title: 'Freshman Welcome Ceremony', type: 'image' },
  { id: 5, title: 'Academic Seminar on Theravada Buddhism', type: 'image' },
  { id: 6, title: 'Dhamma Talk by Guest Speakers', type: 'image' }
];

export default function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Media Gallery</h1>
          <p className={styles.pageSubtitle}>A visual journey of our community and events.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.galleryGrid}>
            {placeholderImages.map((media) => (
              <div key={media.id} className={styles.mediaItem}>
                <div className={styles.imagePlaceholder}>
                   {media.type === 'video' ? '▶️ Video' : '📷 Image'}
                </div>
                <div className={styles.mediaCaption}>
                  {media.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
