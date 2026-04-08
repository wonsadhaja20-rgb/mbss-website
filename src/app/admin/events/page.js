'use client';

import { useState } from 'react';
import styles from '../adminForms.module.css';
import { createEvent } from '@/app/actions/events';
import { uploadFile } from '@/app/actions/upload';

export default function ManageEvents() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Processing...');

    const formData = new FormData(e.target);
    const file = formData.get('coverImageFile');

    if (file && file.size > 0) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      const uploadRes = await uploadFile(uploadData);
      
      if (uploadRes.success) {
        formData.append('coverImage', uploadRes.url);
      } else {
        setStatus(`Upload Error: ${uploadRes.error}`);
        setLoading(false);
        return;
      }
    }

    const res = await createEvent(formData);

    if (res.success) {
      setStatus('✅ Event scheduled successfully!');
      e.target.reset();
    } else {
      setStatus(`❌ Error: ${res.error}`);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Schedule New Event</h1>
        <p>Add an upcoming Dhamma talk, cultural meeting, or volunteer event.</p>
      </header>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Event Title</label>
            <input type="text" name="title" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Date and Time</label>
            <input type="datetime-local" name="date" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Location</label>
            <input type="text" name="location" className={styles.input} required placeholder="e.g. Main Hall, MCU Campus" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Event Image/Flyer (Optional)</label>
            <input type="file" name="coverImageFile" accept="image/*" className={styles.fileInput} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Event Description</label>
            <textarea name="description" className={styles.textarea} required style={{minHeight: '120px'}}></textarea>
          </div>

          <button type="submit" disabled={loading} className={`btn btn-primary ${styles.submitBtn}`}>
            {loading ? 'Scheduling...' : 'Add Event to Calendar'}
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
