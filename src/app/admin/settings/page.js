'use client';

import { useState, useEffect } from 'react';
import styles from '../adminForms.module.css';
import { getSiteSettings, updateSiteSettings } from '@/app/actions/settings';
import { uploadFile } from '@/app/actions/upload';

export default function GlobalSettings() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroDescription: '',
    heroImage: '',
    welcomeTitle: '',
    welcomeText: '',
    welcomeImage: '',
    aboutHistory: '',
    aboutMission: '',
    aboutVision: '',
    statsNumbers: { members: 0, events: 0, years: 0 }
  });

  useEffect(() => {
    async function load() {
      const current = await getSiteSettings();
      setFormData({
        heroTitle: current.heroTitle || '',
        heroDescription: current.heroDescription || '',
        heroImage: current.heroImage || '',
        welcomeTitle: current.welcomeTitle || '',
        welcomeText: current.welcomeText || '',
        welcomeImage: current.welcomeImage || '',
        aboutHistory: current.aboutHistory || '',
        aboutMission: current.aboutMission || '',
        aboutVision: current.aboutVision || '',
        statsNumbers: current.statsNumbers || { members: 0, events: 0, years: 0 }
      });
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('stat_')) {
      const key = name.replace('stat_', '');
      setFormData(prev => ({
        ...prev,
        statsNumbers: { ...prev.statsNumbers, [key]: parseInt(value) || 0 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('Saving settings...');

    const formDomData = new FormData(e.target);
    
    // Check and upload Hero Image
    const heroFile = formDomData.get('heroImageFile');
    let uploadedHeroUrl = formData.heroImage;
    if (heroFile && heroFile.size > 0) {
      setStatus('Uploading hero image...');
      const uploadData = new FormData();
      uploadData.append('file', heroFile);
      const res = await uploadFile(uploadData);
      if (res.success) {
        uploadedHeroUrl = res.url;
        setFormData(prev => ({ ...prev, heroImage: res.url }));
      } else {
        setStatus(`Hero Upload Error: ${res.error}`);
        setSaving(false); return;
      }
    }

    // Check and upload Welcome Image
    const welcomeFile = formDomData.get('welcomeImageFile');
    let uploadedWelcomeUrl = formData.welcomeImage;
    if (welcomeFile && welcomeFile.size > 0) {
      setStatus('Uploading welcome image...');
      const uploadData = new FormData();
      uploadData.append('file', welcomeFile);
      const res = await uploadFile(uploadData);
      if (res.success) {
        uploadedWelcomeUrl = res.url;
        setFormData(prev => ({ ...prev, welcomeImage: res.url }));
      } else {
        setStatus(`Welcome Upload Error: ${res.error}`);
        setSaving(false); return;
      }
    }

    setStatus('Updating database...');
    const dataToSave = {
      heroTitle: formData.heroTitle,
      heroDescription: formData.heroDescription,
      heroImage: uploadedHeroUrl,
      welcomeTitle: formData.welcomeTitle,
      welcomeText: formData.welcomeText,
      welcomeImage: uploadedWelcomeUrl,
      aboutHistory: formData.aboutHistory,
      aboutMission: formData.aboutMission,
      aboutVision: formData.aboutVision,
      statsNumbers: JSON.stringify(formData.statsNumbers)
    };

    const result = await updateSiteSettings(dataToSave);

    if (result.success) {
      setStatus('✅ Global Site Settings updated successfully! Changes are live on the website.');
    } else {
      setStatus(`❌ Error updating settings: ${result.error}`);
    }

    setSaving(false);
    setTimeout(() => setStatus(''), 4000);
  };

  if (loading) return <div className={styles.container} style={{padding: '4rem', textAlign: 'center'}}>Loading Site Configurations...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Global Site Settings</h1>
        <p>Edit global text blocks that appear on the main MBSS landing and about pages.</p>
      </header>

      {status && (
        <div className={styles.successMessage} style={{ backgroundColor: status.includes('❌') ? '#fee2e2' : '#ecfdf5', color: status.includes('❌') ? '#991b1b' : '#065f46', marginBottom: '1rem' }}>
          {status}
        </div>
      )}

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} action={handleSubmit}>
          
          <h2 style={{fontSize: '1.25rem', color: 'var(--color-blue)', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Homepage Hero Details</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Main Website Title (Hero)</label>
            <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Main Homepage Subtitle</label>
            <textarea name="heroDescription" value={formData.heroDescription} onChange={handleChange} className={styles.textarea} required style={{minHeight: '80px'}}></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Dynamic Hero Background Image</label>
            {formData.heroImage && (
              <div style={{marginBottom: '0.5rem'}}>
                <img src={formData.heroImage} alt="Current Hero Background" style={{height: '100px', borderRadius: '4px', border: '1px solid #ccc', objectFit: 'cover'}} />
                <p style={{fontSize: '0.85rem', color: '#666', marginTop: '0.2rem'}}>Current Image</p>
              </div>
            )}
            <input type="file" name="heroImageFile" accept="image/*" className={styles.fileInput} />
            <p style={{fontSize: '0.8rem', color: '#666', marginTop: '0.2rem'}}>Upload a high-resolution dark image for best readability. A dark gradient overlay will be applied automatically.</p>
          </div>

          <h2 style={{fontSize: '1.25rem', color: 'var(--color-blue)', margin: '2rem 0 1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Homepage Welcome Section</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Welcome Title</label>
            <input type="text" name="welcomeTitle" value={formData.welcomeTitle} onChange={handleChange} className={styles.input} placeholder="Welcome to MBSS" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Welcome Text Content</label>
            <textarea name="welcomeText" value={formData.welcomeText} onChange={handleChange} className={styles.textarea} style={{minHeight: '120px'}} placeholder="The Mon Buddhist Students Society (MBSS) is..."></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Welcome Section Image</label>
            {formData.welcomeImage && (
              <div style={{marginBottom: '0.5rem'}}>
                <img src={formData.welcomeImage} alt="Current Welcome" style={{height: '80px', borderRadius: '4px', border: '1px solid #ccc'}} />
                <p style={{fontSize: '0.85rem', color: '#666', marginTop: '0.2rem'}}>Current Image</p>
              </div>
            )}
            <input type="file" name="welcomeImageFile" accept="image/*" className={styles.fileInput} />
          </div>

          <h2 style={{fontSize: '1.25rem', color: 'var(--color-blue)', margin: '2rem 0 1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>Homepage Statistics Banner</h2>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
               <label className={styles.label}>Active Students Count</label>
               <input type="number" name="stat_members" value={formData.statsNumbers?.members || 0} onChange={handleChange} className={styles.input} />
            </div>
            <div style={{ flex: 1 }}>
               <label className={styles.label}>Annual Events Count</label>
               <input type="number" name="stat_events" value={formData.statsNumbers?.events || 0} onChange={handleChange} className={styles.input} />
            </div>
            <div style={{ flex: 1 }}>
               <label className={styles.label}>Years of Excellence</label>
               <input type="number" name="stat_years" value={formData.statsNumbers?.years || 0} onChange={handleChange} className={styles.input} />
            </div>
          </div>

          <h2 style={{fontSize: '1.25rem', color: 'var(--color-blue)', margin: '2rem 0 1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>About Page Details</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Our History</label>
            <textarea name="aboutHistory" value={formData.aboutHistory} onChange={handleChange} className={styles.textarea} style={{minHeight: '150px'}} placeholder="The Mon Buddhist Students Society (MBSS) was established in 2015..."></textarea>
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label}>Our Mission</label>
            <textarea name="aboutMission" value={formData.aboutMission} onChange={handleChange} className={styles.textarea} style={{minHeight: '100px'}}></textarea>
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label}>Our Vision</label>
            <textarea name="aboutVision" value={formData.aboutVision} onChange={handleChange} className={styles.textarea} style={{minHeight: '100px'}}></textarea>
          </div>

          <button type="submit" disabled={saving} className={`btn btn-primary ${styles.submitBtn}`} style={{marginTop: '2rem'}}>
            {saving ? 'Saving...' : 'Update All Settings'}
          </button>
        </form>
      </div>
    </div>
  );
}
