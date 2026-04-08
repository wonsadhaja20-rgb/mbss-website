'use client';

import { useState } from 'react';
import { submitThesis } from '@/app/actions/resources';
import { uploadFile } from '@/app/actions/upload';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function SubmitThesisPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Users must be authenticated to submit
  if (sessionStatus === 'loading') {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading authentication...</div>;
  }

  if (sessionStatus === 'unauthenticated') {
    return (
      <div style={{ padding: '6rem 1rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Authentication Required</h2>
        <p style={{ margin: '1rem 0' }}>You must be a registered member to submit a thesis or research paper.</p>
        <Link href="/login?callbackUrl=/research/submit" className="btn btn-primary">Login or Register here</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Uploading PDF...');

    const formData = new FormData(e.target);
    const file = formData.get('pdfFile');

    if (!file || file.size === 0) {
      setStatus('❌ Error: Please attach your thesis PDF.');
      setLoading(false);
      return;
    }

    // 1. Upload the PDF
    const uploadData = new FormData();
    uploadData.append('file', file);
    const uploadRes = await uploadFile(uploadData);
    
    if (uploadRes.success) {
      // 2. Submit the Thesis Details with the returned URL
      formData.append('pdfUrl', uploadRes.url);
      const res = await submitThesis(formData);

      if (res.success) {
        setSuccess(true);
        setStatus('✅ Thesis Submitted Successfully!');
      } else {
        setStatus(`❌ Error submitting data: ${res.error}`);
      }
    } else {
      setStatus(`❌ Document Upload Error: ${uploadRes.error}`);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ padding: '6rem 1rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ color: '#166534', fontSize: '2rem' }}>Submission Received!</h2>
        <p style={{ maxWidth: '600px', margin: '1.5rem auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Thank you for contributing to the MBSS academic database. Your research has been successfully uploaded and is currently marked as <strong>Pending</strong>.
        </p>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#666' }}>
          An administrator will review your submission shortly. Once approved, it will be published to the public Research Database.
        </p>
        <Link href="/research" className="btn btn-primary">Return to Research Database</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: 'var(--color-maroon)', padding: '2rem', color: 'white', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Submit Academic Thesis</h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Add your research to the MBSS digital library.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {status && (
            <div style={{ 
              padding: '1rem', 
              marginBottom: '1.5rem', 
              borderRadius: '8px', 
              backgroundColor: status.includes('❌') ? '#fee2e2' : '#ecfdf5', 
              color: status.includes('❌') ? '#991b1b' : '#065f46',
              fontWeight: 500
            }}>
              {status}
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Thesis/Paper Title</label>
            <input type="text" name="title" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Author(s)</label>
            <input type="text" name="author" required placeholder="e.g. Ven. Aggadhammo or John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Abstract Document Summary</label>
            <textarea name="abstract" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', minHeight: '120px', fontFamily: 'inherit', fontSize: '1rem' }}></textarea>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>Briefly summarize the methodologies and findings of your paper.</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Upload PDF Document</label>
            <input type="file" name="pdfFile" accept="application/pdf" required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px dashed #aaa', backgroundColor: '#fdfdfd' }} />
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>Only .pdf files are accepted. Max size 20MB.</p>
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <Link href="/research" className="btn" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f1f1f1', color: '#333' }}>Cancel</Link>
            <button type="submit" disabled={loading} className="btn btn-secondary" style={{ padding: '0.75rem 2rem', fontSize: '1.05rem' }}>
              {loading ? 'Processing...' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
