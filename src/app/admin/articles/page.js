'use client';

import { useState } from 'react';
import styles from '../adminForms.module.css';
import { createArticle } from '@/app/actions/articles';
import { uploadFile } from '@/app/actions/upload';

export default function ManageArticles() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Processing...');

    const formData = new FormData(e.target);
    const file = formData.get('featuredImageFile');
    
    if (file && file.size > 0) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      const uploadRes = await uploadFile(uploadData);
      
      if (uploadRes.success) {
        formData.append('featuredImage', uploadRes.url);
      } else {
        setStatus(`Upload Error: ${uploadRes.error}`);
        setLoading(false);
        return;
      }
    }

    const res = await createArticle(formData);
    
    if (res.success) {
      setStatus('✅ Article published successfully and is now active on the public site!');
      e.target.reset();
    } else {
      setStatus(`❌ Error: ${res.error}`);
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Publish New Article</h1>
        <p>Create and format a new blog post for the MBSS website.</p>
      </header>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Article Title</label>
            <input type="text" name="title" className={styles.input} required placeholder="Enter an engaging title" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Author Name</label>
            <input type="text" name="author" className={styles.input} required placeholder="Your name or Ven. name" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select name="category" className={styles.select}>
              <option value="Buddhism">Buddhism</option>
              <option value="Mon Culture">Mon Culture</option>
              <option value="Student Life">Student Life</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Featured Image</label>
            <input type="file" name="featuredImageFile" accept="image/*" className={styles.fileInput} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Article Content (Rich Text)</label>
            <textarea name="content" className={styles.textarea} required placeholder="Write your article here. HTML tags are supported for formatting..."></textarea>
          </div>

          <button type="submit" disabled={loading} className={`btn btn-primary ${styles.submitBtn}`}>
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>

          {status && (
             <div className={styles.successMessage} style={{ backgroundColor: status.includes('❌') ? '#fee2e2' : undefined, color: status.includes('❌') ? '#991b1b' : undefined}}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
