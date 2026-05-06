import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './ExplorePage.module.css';

const CATEGORIES = ['All', 'Web Dev', 'Data Science', 'Mobile Dev', 'DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain', 'Other'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ExplorePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [liking, setLiking] = useState({});
  const [forking, setForking] = useState({});

  const fetchRoadmaps = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page, limit: 12 });
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (difficulty !== 'All') params.append('difficulty', difficulty);
      const res = await api.get(`/roadmap/public?${params}`);
      setRoadmaps(res.data.roadmaps);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, difficulty, page]);

  useEffect(() => { fetchRoadmaps(); }, [fetchRoadmaps]);

  const handleSearch = (e) => { e.preventDefault(); setSearch(searchInput); setPage(1); };

  const handleLike = async (roadmapId) => {
    if (!user) return navigate('/login');
    setLiking(p => ({ ...p, [roadmapId]: true }));
    try {
      const res = await api.post(`/roadmap/${roadmapId}/like`);
      setRoadmaps(prev => prev.map(r => r._id === roadmapId
        ? { ...r, likes: res.data.liked ? [...r.likes, user.id] : r.likes.filter(id => id !== user.id) }
        : r
      ));
    } catch (err) { console.error(err); }
    setLiking(p => ({ ...p, [roadmapId]: false }));
  };

  const handleFork = async (roadmapId) => {
    if (!user) return navigate('/login');
    setForking(p => ({ ...p, [roadmapId]: true }));
    try {
      const res = await api.post(`/roadmap/${roadmapId}/fork`);
      alert(`✅ ${res.data.message} You can now edit it in your profile.`);
    } catch (err) { alert(err.response?.data?.message || 'Fork failed'); }
    setForking(p => ({ ...p, [roadmapId]: false }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6, verticalAlign: 'middle' }}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <h1 className={styles.heroTitle}>Explore Roadmaps</h1>
          <p className={styles.heroSub}>Discover community-created learning paths</p>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              className={styles.searchInput}
              placeholder="Search roadmaps..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>Search</button>
          </form>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              {CATEGORIES.map(c => (
                <button key={c} className={`${styles.filterChip} ${category === c ? styles.active : ''}`}
                  onClick={() => { setCategory(c); setPage(1); }}>{c}</button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              {DIFFICULTIES.map(d => (
                <button key={d} className={`${styles.filterChip} ${difficulty === d ? styles.active : ''}`}
                  onClick={() => { setDifficulty(d); setPage(1); }}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loadingState}>Loading roadmaps...</div>
        ) : roadmaps.length === 0 ? (
          <div className={styles.emptyState}>
            <div>🔍</div>
            <p>No roadmaps found. Try different filters!</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {roadmaps.map(r => (
                <div key={r._id} className={styles.card}>
                  {r.thumbnail && <img src={r.thumbnail} alt="" className={styles.cardThumb} />}
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.badge} ${styles['badge' + r.difficulty]}`}>{r.difficulty}</span>
                      <span className={styles.badgeCat}>{r.category}</span>
                      {r.forkedFrom && <span className={styles.badgeFork}>🍴 Fork</span>}
                    </div>
                    <h3 className={styles.cardTitle} onClick={() => navigate(`/community/roadmap/${r._id}`)}>{r.title}</h3>
                    <p className={styles.cardDesc}>{r.description.substring(0, 120)}...</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.creator} onClick={() => navigate(`/profile/${r.createdBy._id}`)}>
                        <div className={styles.avatar}>{r.createdBy.name?.[0]?.toUpperCase()}</div>
                        <span>{r.createdBy.name}</span>
                      </div>
                      <div className={styles.cardActions}>
                        <button className={`${styles.actionBtn} ${r.likes?.includes(user?.id) ? styles.liked : ''}`}
                          onClick={() => handleLike(r._id)} disabled={liking[r._id]}>
                          {r.likes?.includes(user?.id) ? '❤️' : '🤍'} {r.likes?.length || 0}
                        </button>
                        <button className={styles.actionBtn} onClick={() => navigate(`/community/roadmap/${r._id}`)}>
                          💬 {r.comments?.length || 0}
                        </button>
                        <button className={styles.forkBtn} onClick={() => handleFork(r._id)} disabled={forking[r._id]}>
                          {forking[r._id] ? '...' : '🍴 Fork'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button className={styles.pageBtn} onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>
                <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
                <button className={styles.pageBtn} onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next →</button>
              </div>
            )}
          </>
        )}
      </div>

      {user && (
        <button className={styles.createFab} onClick={() => navigate('/create-roadmap')}>
          + Create Roadmap
        </button>
      )}
    </div>
  );
}
