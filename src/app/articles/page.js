import Link from 'next/link';
import styles from '../page.module.css';
import { getArticles } from '@/app/actions/articles';
import { format } from 'date-fns';

import SearchFilter from '@/components/SearchFilter';
import { Suspense } from 'react';

export const metadata = {
  title: 'Articles | Mon Buddhist Students Society',
  description: 'Read the latest articles on Buddhism, Mon culture, and education.',
};

export default async function ArticlesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q || '';
  const category = resolvedSearchParams?.category || 'All';

  const articles = await getArticles(q, category);

  const availableCategories = ['Buddhism', 'Mon Culture', 'Student Life', 'Education'];

  return (
    <div className={styles.main}>
      <header className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Articles & Publications</h1>
          <p className={styles.pageSubtitle}>
            Insights on Buddhism, Mon culture, modern education, and university student life.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto 2rem' }}>
          <Suspense fallback={<div>Loading filters...</div>}>
            <SearchFilter categories={availableCategories} />
          </Suspense>
        </div>
        <div className={`container ${styles.grid3}`}>
          {articles.length > 0 ? articles.map(article => (
            <div key={article.id} className={styles.contentCard}>
              {article.featuredImage && (
                <div 
                  className={styles.cardImage} 
                  style={{ backgroundImage: `url(${article.featuredImage})`, height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
              )}
              <div className={styles.cardBody}>
                <span className={styles.categoryTag}>{article.category}</span>
                <h3 className={styles.cardTitle}>
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className={styles.metaText}>
                  {format(new Date(article.publishDate), 'MMMM dd, yyyy')} | By {article.author}
                </p>
                <p className={styles.cardExcerpt}>
                  {article.content.replace(/<[^>]+>/g, '').substring(0, 120)}...
                </p>
                <Link href={`/articles/${article.slug}`} className={styles.readMore}>
                  Read Full Article →
                </Link>
              </div>
            </div>
          )) : (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0'}}>
              <h3>No articles published yet.</h3>
              <p>Check back later for updates from our community.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
