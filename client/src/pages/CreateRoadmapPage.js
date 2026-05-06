import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreateRoadmapPage.module.css';

const CATEGORIES = ['Web Dev', 'Data Science', 'Mobile Dev', 'DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain', 'Other'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const emptyStep = () => ({ title: '', description: '', resources: [''] });

export default function CreateRoadmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '', description: '', category: 'Web Dev', difficulty: 'Beginner',
    steps: [emptyStep()], isPublic: false
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/roadmap/${id}`).then(res => {
        const r = res.data.roadmap;
        setForm({
          title: r.title, description: r.description, category: r.category,
          difficulty: r.difficulty, steps: r.steps.map(s => ({
            title: s.title, description: s.description,
            resources: s.resources.length ? s.resources : ['']
          })), isPublic: r.isPublic
        });
      }).catch(() => navigate('/profile'));
    }
  }, [id, isEdit, navigate]);

  const updateStep = (idx, field, val) => setForm(p => {
    const steps = [...p.steps];
    steps[idx] = { ...steps[idx], [field]: val };
    return { ...p, steps };
  });

  const updateResource = (si, ri, val) => setForm(p => {
    const steps = [...p.steps];
    const resources = [...steps[si].resources];
    resources[ri] = val;
    steps[si] = { ...steps[si], resources };
    return { ...p, steps };
  });

  const addResource = (si) => setForm(p => {
    const steps = [...p.steps];
    steps[si] = { ...steps[si], resources: [...steps[si].resources, ''] };
    return { ...p, steps };
  });

  const removeResource = (si, ri) => setForm(p => {
    const steps = [...p.steps];
    const resources = steps[si].resources.filter((_, i) => i !== ri);
    steps[si] = { ...steps[si], resources: resources.length ? resources : [''] };
    return { ...p, steps };
  });

  const addStep = () => setForm(p => ({ ...p, steps: [...p.steps, emptyStep()] }));
  const removeStep = (idx) => setForm(p => ({ ...p, steps: p.steps.filter((_, i) => i !== idx) }));

  const moveStep = (idx, dir) => setForm(p => {
    const steps = [...p.steps];
    const t = idx + dir;
    if (t < 0 || t >= steps.length) return p;
    [steps[idx], steps[t]] = [steps[t], steps[idx]];
    return { ...p, steps };
  });

  const handleSave = async (publish = false) => {
    if (!form.title.trim()) return setError('Roadmap title is required');
    if (form.title.trim().length < 3) return setError('Roadmap title must be at least 3 characters');
    if (!form.description.trim()) return setError('Roadmap description is required');
    if (form.description.trim().length < 10) return setError('Roadmap description must be at least 10 characters');
    
    // Validate steps
    if (form.steps.length === 0) return setError('At least one step is required');
    for (let i = 0; i < form.steps.length; i++) {
      const s = form.steps[i];
      if (!s.title.trim()) return setError(`Step ${i + 1} is missing a title.`);
      if (!s.description.trim()) return setError(`Step ${i + 1} is missing a description.`);
    }

    setSaving(true); setError('');
    try {
      const payload = { ...form, isPublic: publish };
      if (isEdit) {
        await api.put(`/roadmap/${id}`, payload);
      } else {
        await api.post('/roadmap/create', payload);
      }
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
        <h1 className={styles.title}>{isEdit ? '✏️ Edit Roadmap' : '🗺️ Create Roadmap'}</h1>
      </div>

      <div className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basic Info</h2>
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Title *</label>
              <input className={styles.input} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Full Stack React Developer" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <select className={styles.input} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Difficulty</label>
              <select className={styles.input} value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))}>
                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description *</label>
            <textarea className={styles.textarea} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What will learners achieve with this roadmap?" rows={4} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Steps ({form.steps.length})</h2>
            <button className={styles.addBtn} type="button" onClick={addStep}>+ Add Step</button>
          </div>
          <p className={styles.hint}>Drag to reorder • Add resources like articles, videos, and docs</p>

          {form.steps.map((step, si) => (
            <div key={si} className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepBadge}>Step {si + 1}</span>
                <div className={styles.stepBtns}>
                  <button type="button" onClick={() => moveStep(si, -1)} disabled={si === 0} className={styles.moveBtn}>↑</button>
                  <button type="button" onClick={() => moveStep(si, 1)} disabled={si === form.steps.length - 1} className={styles.moveBtn}>↓</button>
                  <button type="button" onClick={() => removeStep(si)} disabled={form.steps.length === 1} className={styles.delBtn}>✕ Remove</button>
                </div>
              </div>
              <input className={styles.input} value={step.title} onChange={e => updateStep(si, 'title', e.target.value)} placeholder="Step title, e.g. Learn HTML Basics" />
              <textarea className={styles.textarea} value={step.description} onChange={e => updateStep(si, 'description', e.target.value)} placeholder="Describe what to learn or do in this step..." rows={3} />
              <div>
                <label className={styles.label}>🔗 Resources</label>
                {step.resources.map((res, ri) => (
                  <div key={ri} className={styles.resRow}>
                    <input className={styles.input} value={res} onChange={e => updateResource(si, ri, e.target.value)} placeholder="https://..." />
                    <button type="button" className={styles.delBtn} onClick={() => removeResource(si, ri)}>✕</button>
                  </div>
                ))}
                <button type="button" className={styles.addResBtn} onClick={() => addResource(si)}>+ Add Link</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.draftBtn} onClick={() => handleSave(false)} disabled={saving}>
            {saving ? 'Saving...' : '💾 Save as Draft'}
          </button>
          <button className={styles.publishBtn} onClick={() => handleSave(true)} disabled={saving}>
            {saving ? 'Publishing...' : '🌐 Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
