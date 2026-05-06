import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPanel.module.css';

const CATEGORIES = ['Web Dev', 'Data Science', 'Mobile Dev', 'DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain', 'Other'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const emptyForm = {
  title: '', description: '', category: 'Web Dev', difficulty: 'Beginner',
  steps: [{ title: '', description: '', resources: [''] }], thumbnail: null
};

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchRoadmaps = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/roadmaps');
      setRoadmaps(res.data.roadmaps);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load roadmaps');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRoadmaps(); }, [fetchRoadmaps]);

  const handleEdit = (roadmap) => {
    setEditingId(roadmap._id);
    setForm({
      title: roadmap.title,
      description: roadmap.description,
      category: roadmap.category,
      difficulty: roadmap.difficulty,
      steps: roadmap.steps.map(s => ({
        title: s.title, description: s.description,
        resources: s.resources.length ? s.resources : ['']
      })),
      thumbnail: null
    });
    setView('form');
    setError(''); setSuccess('');
  };

  const handleNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setView('form');
    setError(''); setSuccess('');
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/roadmap/${id}`);
      setRoadmaps(prev => prev.filter(r => r._id !== id));
      setSuccess('Roadmap deleted successfully');
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleStepChange = (idx, field, val) => {
    setForm(prev => {
      const steps = [...prev.steps];
      steps[idx] = { ...steps[idx], [field]: val };
      return { ...prev, steps };
    });
  };

  const handleResourceChange = (stepIdx, resIdx, val) => {
    setForm(prev => {
      const steps = [...prev.steps];
      const resources = [...steps[stepIdx].resources];
      resources[resIdx] = val;
      steps[stepIdx] = { ...steps[stepIdx], resources };
      return { ...prev, steps };
    });
  };

  const addResource = (stepIdx) => {
    setForm(prev => {
      const steps = [...prev.steps];
      steps[stepIdx] = { ...steps[stepIdx], resources: [...steps[stepIdx].resources, ''] };
      return { ...prev, steps };
    });
  };

  const removeResource = (stepIdx, resIdx) => {
    setForm(prev => {
      const steps = [...prev.steps];
      const resources = steps[stepIdx].resources.filter((_, i) => i !== resIdx);
      steps[stepIdx] = { ...steps[stepIdx], resources: resources.length ? resources : [''] };
      return { ...prev, steps };
    });
  };

  const addStep = () => setForm(prev => ({
    ...prev, steps: [...prev.steps, { title: '', description: '', resources: [''] }]
  }));

  const removeStep = (idx) => setForm(prev => ({
    ...prev, steps: prev.steps.filter((_, i) => i !== idx)
  }));

  const moveStep = (idx, dir) => {
    setForm(prev => {
      const steps = [...prev.steps];
      const target = idx + dir;
      if (target < 0 || target >= steps.length) return prev;
      [steps[idx], steps[target]] = [steps[target], steps[idx]];
      return { ...prev, steps };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('difficulty', form.difficulty);
      formData.append('steps', JSON.stringify(form.steps));
      if (form.thumbnail) formData.append('thumbnail', form.thumbnail);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      let res;
      if (editingId) {
        res = await api.put(`/admin/roadmap/${editingId}`, formData, config);
        setRoadmaps(prev => prev.map(r => r._id === editingId ? res.data.roadmap : r));
        setSuccess('Roadmap updated successfully!');
      } else {
        res = await api.post('/admin/roadmap', formData, config);
        setRoadmaps(prev => [res.data.roadmap, ...prev]);
        setSuccess('Roadmap created successfully!');
      }
      setView('list');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>🗺️ Tripod</div>
          <div className={styles.adminBadge}>Admin Panel</div>
        </div>
        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${view !== 'form' ? styles.active : ''}`} onClick={() => setView('list')}>
            📋 Roadmaps
          </button>
          <button className={`${styles.navItem} ${view === 'form' && !editingId ? styles.active : ''}`} onClick={handleNew}>
            ➕ New Roadmap
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.adminInfo}>
            <div className={styles.adminAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div className={styles.adminName}>{user?.name}</div>
              <div className={styles.adminRole}>Administrator</div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/login'); }}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>
            {view === 'form' ? (editingId ? '✏️ Edit Roadmap' : '➕ Create Roadmap') : '📋 All Roadmaps'}
          </h1>
          {view !== 'form' && (
            <button className={styles.btnPrimary} onClick={handleNew}>+ New Roadmap</button>
          )}
          {view === 'form' && (
            <button className={styles.btnSecondary} onClick={() => setView('list')}>← Back to List</button>
          )}
        </div>

        {error && <div className={styles.alert + ' ' + styles.alertError}>{error}</div>}
        {success && <div className={styles.alert + ' ' + styles.alertSuccess}>{success}</div>}

        {/* List View */}
        {view === 'list' && (
          <div className={styles.listView}>
            {loading ? (
              <div className={styles.loadingState}>Loading roadmaps...</div>
            ) : roadmaps.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🗺️</div>
                <p>No roadmaps yet. Create your first one!</p>
                <button className={styles.btnPrimary} onClick={handleNew}>Create Roadmap</button>
              </div>
            ) : (
              <div className={styles.roadmapGrid}>
                {roadmaps.map(r => (
                  <div key={r._id} className={styles.roadmapCard}>
                    {r.thumbnail && <img src={r.thumbnail} alt={r.title} className={styles.cardThumb} />}
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={`${styles.badge} ${styles['badge' + r.difficulty]}`}>{r.difficulty}</span>
                        <span className={styles.badgeCategory}>{r.category}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{r.title}</h3>
                      <p className={styles.cardDesc}>{r.description.substring(0, 100)}...</p>
                      <div className={styles.cardStats}>
                        <span>📚 {r.steps.length} steps</span>
                        <span>👤 {r.createdBy?.name}</span>
                      </div>
                      <div className={styles.cardActions}>
                        <button className={styles.btnEdit} onClick={() => handleEdit(r)}>✏️ Edit</button>
                        <button className={styles.btnDelete} onClick={() => setDeleteConfirm(r._id)}>🗑️ Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Form View */}
        {view === 'form' && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Title *</label>
                <input className={styles.input} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Complete Web Development Roadmap" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select className={styles.input} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Difficulty *</label>
                <select className={styles.input} value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))}>
                  {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Thumbnail Image</label>
                <input type="file" className={styles.input} accept="image/*" onChange={e => setForm(p => ({ ...p, thumbnail: e.target.files[0] }))} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description *</label>
              <textarea className={styles.textarea} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe what learners will achieve..." rows={4} required />
            </div>

            <div className={styles.stepsSection}>
              <div className={styles.stepsSectionHeader}>
                <h3>Steps ({form.steps.length})</h3>
                <button type="button" className={styles.btnAddStep} onClick={addStep}>+ Add Step</button>
              </div>

              {form.steps.map((step, idx) => (
                <div key={idx} className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>Step {idx + 1}</span>
                    <div className={styles.stepControls}>
                      <button type="button" onClick={() => moveStep(idx, -1)} disabled={idx === 0} title="Move up">↑</button>
                      <button type="button" onClick={() => moveStep(idx, 1)} disabled={idx === form.steps.length - 1} title="Move down">↓</button>
                      <button type="button" className={styles.removeBtn} onClick={() => removeStep(idx)} disabled={form.steps.length === 1}>✕</button>
                    </div>
                  </div>
                  <input className={styles.input} value={step.title} onChange={e => handleStepChange(idx, 'title', e.target.value)} placeholder="Step title" required />
                  <textarea className={styles.textarea} value={step.description} onChange={e => handleStepChange(idx, 'description', e.target.value)} placeholder="Step description" rows={3} required />
                  <div className={styles.resourcesSection}>
                    <label className={styles.label}>Resources (links)</label>
                    {step.resources.map((res, ri) => (
                      <div key={ri} className={styles.resourceRow}>
                        <input className={styles.input} value={res} onChange={e => handleResourceChange(idx, ri, e.target.value)} placeholder="https://..." />
                        <button type="button" className={styles.removeBtn} onClick={() => removeResource(idx, ri)}>✕</button>
                      </div>
                    ))}
                    <button type="button" className={styles.btnAddResource} onClick={() => addResource(idx)}>+ Add Resource</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.btnSecondary} onClick={() => setView('list')}>Cancel</button>
              <button type="submit" className={styles.btnPrimary} disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update Roadmap' : 'Create Roadmap'}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Roadmap?</h3>
            <p>This action cannot be undone. Are you sure?</p>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className={styles.btnDelete} onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
