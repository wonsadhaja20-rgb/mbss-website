import styles from './page.module.css';

export const metadata = {
  title: "Student Activities | Mon Buddhist Students Society",
  description: "Explore the various activities organized by MBSS, including meditation, culture, and volunteer work.",
};

const activities = [
  {
    title: 'Meditation Practice',
    description: 'Weekly Vipassana meditation sessions led by experienced monks to cultivate mindfulness and inner peace.',
    icon: '🧘'
  },
  {
    title: 'Cultural Events',
    description: 'Celebrating traditional Mon festivals, food, and arts to preserve our profound heritage.',
    icon: '🌸'
  },
  {
    title: 'Volunteer Work',
    description: 'Engaging in community service around the campus and local temples to practice Metta (loving-kindness) in action.',
    icon: '🤝'
  },
  {
    title: 'Educational Discussions',
    description: 'Academic seminars and Dhamma talks bridging ancient Buddhist philosophy with modern education.',
    icon: '📚'
  }
];

export default function ActivitiesPage() {
  return (
    <div className={styles.activitiesPage}>
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Student Activities</h1>
          <p className={styles.pageSubtitle}>Developing the mind, preserving culture, and serving the community.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.activityGrid}>
             {activities.map((activity, index) => (
                <div key={index} className={styles.activityCard}>
                  <div className={styles.icon}>{activity.icon}</div>
                  <h2 className={styles.cardTitle}>{activity.title}</h2>
                  <p className={styles.cardDescription}>{activity.description}</p>
                </div>
             ))}
          </div>

          <div className={styles.joinSection}>
            <h2>Get Involved</h2>
            <p>Ready to participate in our upcoming activities? Register as a member to stay updated.</p>
            <a href="/register" className="btn btn-primary" style={{marginTop: '1rem'}}>Join Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
