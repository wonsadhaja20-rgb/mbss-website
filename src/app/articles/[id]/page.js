import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../page.module.css';
import { getArticleBySlug } from '@/app/actions/articles';
import { format } from 'date-fns';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getArticleBySlug(id);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | MBSS Content`,
    description: article.content.replace(/<[^>]+>/g, '').substring(0, 150),
  };
}

export default async function ArticleDetail({ params }) {
  // We use params.id because the folder is [id]. The dynamic param actually expects a slug.
  const { id } = await params;
  const article = await getArticleBySlug(id);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.main}>
      <header className={styles.articleHeader} style={{ 
        backgroundImage: article.featuredImage ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${article.featuredImage})` : 'var(--color-maroon)',
        color: '#fff',
        padding: '6rem 1rem 4rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span className={styles.categoryTag} style={{ marginBottom: '1rem', display: 'inline-block', backgroundColor: 'var(--color-gold)', color: 'black' }}>
            {article.category}
          </span>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            By {article.author} | Published {format(new Date(article.publishDate), 'MMMM dd, yyyy')}
          </p>
        </div>
      </header>

      <div className="container" style={{ maxWidth: '800px', padding: '4rem 1rem' }}>
        <div 
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{
            lineHeight: 1.8,
            fontSize: '1.1rem',
            color: '#333'
          }}
        />

        <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid #eee' }}>
          <Link href="/articles" className="btn btn-secondary">
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </article>
  );
}
