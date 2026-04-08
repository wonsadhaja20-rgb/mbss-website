import styles from './page.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Welcome to the MBSS Content Management System.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Articles</h3>
          <div className={styles.statValue}>24</div>
        </div>
        <div className={styles.statCard}>
          <h3>Upcoming Events</h3>
          <div className={styles.statValue}>5</div>
        </div>
        <div className={styles.statCard}>
          <h3>Registered Members</h3>
          <div className={styles.statValue}>142</div>
        </div>
        <div className={styles.statCard}>
          <h3>Files Uploaded</h3>
          <div className={styles.statValue}>38</div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <ul className={styles.activityList}>
          <li>
            <strong>New Member Registered for Newsletter:</strong> student@mcu.ac.th
            <span className={styles.timeInfo}> - 2 hours ago</span>
          </li>
          <li>
            <strong>Article Published:</strong> "The Role of Meditation in Modern Education"
            <span className={styles.timeInfo}> - 1 day ago</span>
          </li>
          <li>
            <strong>File Uploaded:</strong> impact-theravada-mon.pdf
            <span className={styles.timeInfo}> - 3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
