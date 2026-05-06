import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CommunityRoadmapPage.module.css';

export default function CommunityRoadmapPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [liking, setLiking] = useState(false);
  const [forking, setForking] = useState(false);
  const [openStep, setOpenStep] = useState(null);

  useEffect(() => {
    api.get(`/roadmap/${id}`)
      .then(res => setRoadmap(res.data.roadmap))
      .catch(err => setError(err.response?.data?.message || 'Not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!user) return navigate('/login');
    setLiking(true);
    try {
      const res = await api.post(`/roadmap/${id}/like`);
      setRoadmap(prev => ({
        ...prev,
        likes: res.data.liked
          ? [...(prev.likes || []), user.id]
          : (prev.likes || []).filter(uid => uid !== user.id)
      }));
    } catch (err) { console.error(err); }
    setLiking(false);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (!comment.trim()) return;
    setCommenting(true);
    try {
      const res = await api.post(`/roadmap/${id}/comment`, { text: comment });
      setRoadmap(prev => ({ ...prev, comments: [...(prev.comments || []), res.data.comment] }));
      setComment('');
    } catch (err) { console.error(err); }
    setCommenting(false);
  };

  const handleFork = async () => {
    if (!user) return navigate('/login');
    setForking(true);
    try {
      const res = await api.post(`/roadmap/${id}/fork`);
      alert(`✅ ${res.data.message}`);
      navigate('/profile');
    } catch (err) { alert(err.response?.data?.message || 'Fork failed'); }
    setForking(false);
  };

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error) return <div className={styles.center}>{error}</div>;
  if (!roadmap) return null;

  const isLiked = user && roadmap.likes?.includes(user.id);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/explore')}>← Explore</button>
        <div className={styles.headerActions}>
          <button className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`} onClick={handleLike} disabled={liking}>
            {isLiked ? '❤️' : '🤍'} {roadmap.likes?.length || 0}
          </button>
          <button className={styles.forkBtn} onClick={handleFork} disabled={forking}>
            {forking ? 'Forking...' : '🍴 Fork'}
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.main}>
          {roadmap.thumbnail && <img src={roadmap.thumbnail} alt="" className={styles.banner} />}
          <div className={styles.titleSection}>
            <div className={styles.badges}>
              <span className={`${styles.badge} ${styles['diff' + roadmap.difficulty]}`}>{roadmap.difficulty}</span>
              <span className={styles.catBadge}>{roadmap.category}</span>
              {roadmap.forkedFrom && <span className={styles.forkBadge}>🍴 Forked</span>}
            </div>
            <h1 className={styles.title}>{roadmap.title}</h1>
            <p className={styles.description}>{roadmap.description}</p>
            <div className={styles.creator} onClick={() => navigate(`/profile/${roadmap.createdBy._id}`)}>
              <div className={styles.avatar}>{roadmap.createdBy.name?.[0]?.toUpperCase()}</div>
              <div>
                <div className={styles.creatorName}>{roadmap.createdBy.name}</div>
                <div className={styles.creatorBio}>{roadmap.createdBy.bio || 'Roadmap creator'}</div>
              </div>
            </div>
          </div>

          <div className={styles.stepsSection}>
            <h2 className={styles.sectionTitle}>📚 {roadmap.steps.length} Steps</h2>
            {roadmap.steps.map((step, i) => (
              <div key={step._id} className={styles.stepCard}>
                <div className={styles.stepHeader} onClick={() => setOpenStep(openStep === i ? null : i)}>
                  <div className={styles.stepLeft}>
                    <div className={styles.stepNum}>{i + 1}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                  </div>
                  <span className={styles.stepToggle}>{openStep === i ? '▲' : '▼'}</span>
                </div>
                {openStep === i && (
                  <div className={styles.stepBody}>
                    <p className={styles.stepDesc}>{step.description}</p>
                    {step.resources.filter(r => r.trim()).length > 0 && (
                      <div className={styles.resources}>
                        <strong>🔗 Resources</strong>
                        <ul>
                          {step.resources.filter(r => r.trim()).map((res, ri) => (
                            <li key={ri}><a href={res} target="_blank" rel="noreferrer">{res}</a></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.commentsSection}>
            <h2 className={styles.sectionTitle}>💬 Comments ({roadmap.comments?.length || 0})</h2>
            {user && (
              <form className={styles.commentForm} onSubmit={handleComment}>
                <div className={styles.commentAvatar}>{user.name?.[0]?.toUpperCase()}</div>
                <input className={styles.commentInput} value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
                <button className={styles.commentBtn} type="submit" disabled={commenting || !comment.trim()}>Post</button>
              </form>
            )}
            {roadmap.comments?.length === 0 ? (
              <p className={styles.noComments}>No comments yet. Be the first!</p>
            ) : (
              <div className={styles.commentsList}>
                {[...(roadmap.comments || [])].reverse().map((c) => (
                  <div key={c._id} className={styles.comment}>
                    <div className={styles.commentAvatar}>{c.user?.name?.[0]?.toUpperCase()}</div>
                    <div className={styles.commentBody}>
                      <div className={styles.commentAuthor}>{c.user?.name}</div>
                      <p className={styles.commentText}>{c.text}</p>
                      <div className={styles.commentTime}>{new Date(c.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
