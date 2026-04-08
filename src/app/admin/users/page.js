'use client';

import { useState, useEffect } from 'react';
import styles from '../adminForms.module.css';
import { getUsers, updateUserRole, deleteUser } from '@/app/actions/users';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
    setLoading(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    setStatus('Updating role...');
    const result = await updateUserRole(userId, newRole);
    if (result.success) {
      setStatus('✅ Role updated successfully!');
      fetchUsers(); // Refresh the list
    } else {
      setStatus(`❌ Error: ${result.error}`);
    }
    
    // Clear status after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  const handleDelete = async (userId, userName) => {
    if (confirm(`Are you sure you want to delete the user account for ${userName}?`)) {
      setStatus('Deleting user...');
      const result = await deleteUser(userId);
      if (result.success) {
        setStatus('✅ User deleted successfully!');
        fetchUsers(); // Refresh the list
      } else {
        setStatus(`❌ Error: ${result.error}`);
      }
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Registered Users</h1>
        <p>View accounts and manage their administrative roles.</p>
      </header>

      {status && (
        <div className={styles.successMessage} style={{ backgroundColor: status.includes('❌') ? '#fee2e2' : '#ecfdf5', color: status.includes('❌') ? '#991b1b' : '#065f46', marginBottom: '1rem' }}>
          {status}
        </div>
      )}

      <div className={styles.formCard}>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '1rem', color: '#555' }}>Name</th>
                  <th style={{ padding: '1rem', color: '#555' }}>Email</th>
                  <th style={{ padding: '1rem', color: '#555' }}>Date Joined</th>
                  <th style={{ padding: '1rem', color: '#555' }}>Role</th>
                  <th style={{ padding: '1rem', color: '#555', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{user.name || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{user.email}</td>
                    <td style={{ padding: '1rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem' }}>
                      <select 
                        value={user.role} 
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={styles.select}
                        style={{ margin: 0, padding: '0.4rem', width: 'auto' }}
                      >
                        <option value="USER">USER</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDelete(user.id, user.name || user.email)}
                        className="btn btn-secondary" 
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', fontSize: '0.85rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
