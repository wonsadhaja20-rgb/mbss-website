'use client';

import { useState } from 'react';
import styles from '../adminForms.module.css';
import { createResource } from '@/app/actions/resources';
import { uploadFile } from '@/app/actions/upload';

export default function ManageFiles() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Uploading and Processing...');

    const formData = new FormData(e.target);
    const file = formData.get('fileItem');

    if (!file || file.size === 0) {
      setStatus('❌ Error: Please select a file to upload.');
      setLoading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', file);
    const uploadRes = await uploadFile(uploadData);
    
    if (uploadRes.success) {
      formData.append('fileUrl', uploadRes.url);
      const res = await createResource(formData);

      if (res.success) {
        setStatus('✅ File uploaded, processed, and live on the respective public page!');
        e.target.reset();
      } else {
        setStatus(`❌ Error linking file: ${res.error}`);
      }
    } else {
      setStatus(`❌ Upload Error: ${uploadRes.error}`);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>File & Media Uploads</h1>
        <p>Upload Gallery Photos, Research PDFs, and Resource Documents without coding.</p>
      </header>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Target Destination</label>
            <select name="category" className={styles.select}>
              <option value="Research Papers (PDF)">Research Papers (PDF)</option>
              <option value="Downloadable Resources (PDF/DOCX)">Downloadable Resources (PDF/DOCX)</option>
              <option value="Annual Reports (PDF)">Annual Reports (PDF)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Document / Media Title</label>
            <input type="text" name="title" className={styles.input} required placeholder="Visual description or Document Title" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description (Optional)</label>
            <textarea name="description" className={styles.textarea} style={{minHeight: '80px'}}></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Select File</label>
            <input type="file" name="fileItem" className={styles.fileInput} required />
            <p style={{fontSize: '0.85rem', color: '#666', marginTop: '0.5rem'}}>
              Supported: PDF, DOCX, JPG, PNG (Max 100MB)
            </p>
          </div>

          <button type="submit" disabled={loading} className={`btn btn-secondary ${styles.submitBtn}`}>
            {loading ? 'Uploading...' : 'Upload File Securely'}
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
