import styles from './page.module.css';
import { getSiteSettings } from '@/app/actions/settings';

export const metadata = {
  title: "About Us | Mon Buddhist Students Society",
  description: "Learn about the history, mission, and vision of the Mon Buddhist Students Society.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className={styles.aboutPage}>
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>About MBSS</h1>
          <p className={styles.pageSubtitle}>Our history, mission, and the community we serve.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              <h2>Our History</h2>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', color: '#333' }}>
                {settings.aboutHistory || (
                  <p>
                    The Mon Buddhist Students Society (MBSS) was established in 2015 by a dedicated group of 
                    Mon monks and students at Mahachulalongkornrajavidyalaya University.
                  </p>
                )}
              </div>

              <h2 style={{marginTop: '2.5rem'}}>Mission & Vision</h2>
              <div className={styles.boxes}>
                <div className={styles.box}>
                  <h3>Our Mission</h3>
                  <div style={{ whiteSpace: 'pre-line', color: '#555' }}>
                    {settings.aboutMission || 'To provide academic, spiritual, and social support to Mon Buddhist students.'}
                  </div>
                </div>
                <div className={styles.box}>
                  <h3>Our Vision</h3>
                  <div style={{ whiteSpace: 'pre-line', color: '#555' }}>
                    {settings.aboutVision || 'A vibrant and united Mon student community that preserves our cultural heritage.'}
                  </div>
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarWidget}>
                <h3>Advisory Board</h3>
                <ul className={styles.personList}>
                  <li>
                    <strong>Ven. Prof. Dr. Phra Rajapariyatkavi</strong>
                    <span>Senior Advisor</span>
                  </li>
                  <li>
                    <strong>Ven. Dr. Ashin Kumara</strong>
                    <span>Academic Advisor</span>
                  </li>
                </ul>
              </div>
              
              <div className={styles.sidebarWidget} style={{marginTop: '2rem'}}>
                <h3>Committee Members (2023-2024)</h3>
                <ul className={styles.personList}>
                  <li>
                    <strong>Ashin Vimala</strong>
                    <span>President</span>
                  </li>
                  <li>
                    <strong>Ashin Tejavanta</strong>
                    <span>Vice President</span>
                  </li>
                  <li>
                    <strong>Ashin Indaka</strong>
                    <span>Secretary</span>
                  </li>
                  <li>
                    <strong>Ashin Pannyobhasa</strong>
                    <span>Treasurer</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
