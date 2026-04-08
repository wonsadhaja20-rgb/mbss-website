'use client';

import { useState, useEffect } from 'react';
import styles from '../adminForms.module.css';
import { getAllResearchPapers, approveResearchPaper, deleteResearchPaper } from '@/app/actions/resources';
import { format } from 'date-fns';

export default function ManageResearch() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState('');

  const loadPapers = async () => {
    setLoading(true);
    const data = await getAllResearchPapers();
    setPapers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPapers();
  }, []);

  const handleApprove = async (id) => {
    setActionStatus('Approving paper...');
    const result = await approveResearchPaper(id);
    if (result.success) {
      setActionStatus('✅ Thesis approved and published.');
      loadPapers();
    } else {
      setActionStatus(`❌ Error approving: ${result.error}`);
    }
    setTimeout(() => setActionStatus(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this research paper?')) return;
    setActionStatus('Deleting paper...');
    const result = await deleteResearchPaper(id);
    if (result.success) {
      setActionStatus('✅ Paper deleted.');
      loadPapers();
    } else {
      setActionStatus(`❌ Error deleting: ${result.error}`);
    }
    setTimeout(() => setActionStatus(''), 3000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Manage Research & Theses</h1>
          <p>Review student submissions and manage published academic papers.</p>
        </div>
      </header>

      {actionStatus && (
        <div className={styles.successMessage} style={{ backgroundColor: actionStatus.includes('❌') ? '#fee2e2' : undefined, color: actionStatus.includes('❌') ? '#991b1b' : undefined}}>
          {actionStatus}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading papers...</div>
      ) : (
        <div className={styles.listContainer}>
          {papers.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No research papers found.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {papers.map(paper => (
                  <tr key={paper.id}>
                    <td>
                      <strong>{paper.title}</strong>
                      <div style={{fontSize: '0.85rem', color: '#666'}}><a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a></div>
                    </td>
                    <td>{paper.author}</td>
                    <td>
                      <span style={{
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        backgroundColor: paper.status === 'PUBLISHED' ? '#dcfce7' : '#fef08a',
                        color: paper.status === 'PUBLISHED' ? '#166534' : '#854d0e'
                      }}>
                        {paper.status}
                      </span>
                    </td>
                    <td>{format(new Date(paper.createdAt), 'MMM dd, yyyy')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {paper.status === 'PENDING' && (
                          <button onClick={() => handleApprove(paper.id)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                            Approve
                          </button>
                        )}
                        <button onClick={() => handleDelete(paper.id)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', backgroundColor: '#fee2e2', color: '#991b1b' }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
