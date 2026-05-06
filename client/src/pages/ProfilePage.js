import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();
  const isOwn = !userId || userId === user?.id;

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', bio: '' });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('published');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchRoadmaps();
    if (isOwn && user) setProfileForm({ name: user.name, bio: user.bio || '' });
  }, [userId, isOwn]);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const res = isOwn
        ? await api.get('/roadmap/my')
        : await api.get(`/roadmap/user/${userId}`);
      setRoadmaps(res.data.roadmaps);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await api.put('/auth/profile', profileForm);
      updateUser(res.data.user);
      setEditing(false);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/roadmap/${id}`);
      setRoadmaps(prev => prev.filter(r => r._id !== id));
      setDeleteConfirm(null);
    } catch (err) { console.error(err); }
  };

  const handlePublishToggle = async (roadmap) => {
    try {
      const res = await api.put(`/roadmap/${roadmap._id}`, { isPublic: !roadmap.isPublic });
      setRoadmaps(prev => prev.map(r => r._id === roadmap._id ? res.data.roadmap : r));
    } catch (err) { console.error(err); }
  };

  const published = roadmaps.filter(r => r.isPublic);
  const drafts = roadmaps.filter(r => !r.isPublic);
  const displayed = isOwn ? (activeTab === 'published' ? published : drafts) : roadmaps;

  const displayName = isOwn ? user?.name : (roadmaps[0]?.createdBy?.name || 'User');
  const displayAvatar = isOwn ? user?.avatar : roadmaps[0]?.createdBy?.avatar;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Dashboard
        </button>
      </div>

      <div className={styles.profileSection}>
        {displayAvatar ? (
          <img src={displayAvatar} alt={displayName} className={styles.avatarLarge} style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
        ) : (
          <div className={styles.avatarLarge}>{displayName?.[0]?.toUpperCase()}</div>
        )}

        {editing ? (
          <div className={styles.editForm}>
            <input className={styles.input} value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" />
            <textarea className={styles.textarea} value={profileForm.bio} onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself..." rows={3} />
            <div className={styles.editActions}>
              <button className={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSaveProfile} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        ) : (
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{displayName}</h1>
            {isOwn && <span className={styles.roleBadge}>{user?.role === 'admin' ? '👑 Admin' : '👤 Member'}</span>}
            {(isOwn ? user?.bio : roadmaps[0]?.createdBy?.bio) && (
              <p className={styles.bio}>{isOwn ? user?.bio : roadmaps[0]?.createdBy?.bio}</p>
            )}
            <div className={styles.stats}>
              <div className={styles.stat}><span className={styles.statNum}>{isOwn ? published.length : roadmaps.length}</span><span className={styles.statLabel}>Published</span></div>
              {isOwn && <div className={styles.stat}><span className={styles.statNum}>{drafts.length}</span><span className={styles.statLabel}>Drafts</span></div>}
            </div>
            {isOwn && (
              <div className={styles.profileActions}>
                <button className={styles.editBtn} onClick={() => setEditing(true)}>✏️ Edit Profile</button>
                {user?.role === 'admin' && (
                  <button className={styles.adminBtn} onClick={() => navigate('/admin')}>🛡️ Admin Panel</button>
                )}
                <button className={styles.createBtn} onClick={() => navigate('/create-roadmap')}>+ Create Roadmap</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.content}>
        {isOwn && (
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === 'published' ? styles.activeTab : ''}`} onClick={() => setActiveTab('published')}>
              🌐 Published ({published.length})
            </button>
            <button className={`${styles.tab} ${activeTab === 'drafts' ? styles.activeTab : ''}`} onClick={() => setActiveTab('drafts')}>
              📝 Drafts ({drafts.length})
            </button>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : displayed.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🗺️</div>
            <p>{isOwn ? `No ${activeTab === 'published' ? 'published roadmaps' : 'drafts'} yet.` : 'No public roadmaps yet.'}</p>
            {isOwn && <button className={styles.createBtn} onClick={() => navigate('/create-roadmap')}>Create your first roadmap</button>}
          </div>
        ) : (
          <div className={styles.grid}>
            {displayed.map(r => (
              <div key={r._id} className={styles.card}>
                {r.thumbnail && <img src={r.thumbnail} alt="" className={styles.thumb} />}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={`${styles.badge} ${styles['diff' + r.difficulty?.replace(' ', '')]}`}>{r.difficulty}</span>
                    <span className={styles.catBadge}>{r.category}</span>
                    {r.isDraft && <span className={styles.draftBadge}>Draft</span>}
                    {r.forkedFrom && <span className={styles.forkBadge}>🍴 Fork</span>}
                  </div>
                  <h3 className={styles.cardTitle} onClick={() => navigate(`/community/roadmap/${r._id}`)}>{r.title}</h3>
                  <p className={styles.cardDesc}>{r.description.substring(0, 100)}...</p>
                  <div className={styles.cardStats}>
                    <span>📚 {r.steps.length} steps</span>
                    <span>❤️ {r.likes?.length || 0}</span>
                    <span>💬 {r.comments?.length || 0}</span>
                  </div>
                  {isOwn && (
                    <div className={styles.cardActions}>
                      <button className={styles.editCardBtn} onClick={() => navigate(`/edit-roadmap/${r._id}`)}>✏️ Edit</button>
                      <button className={styles.toggleBtn} onClick={() => handlePublishToggle(r)}>
                        {r.isPublic ? '🔒 Unpublish' : '🌐 Publish'}
                      </button>
                      <button className={styles.delCardBtn} onClick={() => setDeleteConfirm(r._id)}>🗑️</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>Delete this roadmap?</h3>
            <p>This cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className={styles.delBtn} onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
