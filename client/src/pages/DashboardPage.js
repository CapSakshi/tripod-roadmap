import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import api from '../utils/api';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [rmRes, pgRes] = await Promise.all([
          api.get('/roadmaps'),
          api.get('/progress')
        ]);
        setRoadmaps(rmRes.data.roadmaps);
        const pgMap = {};
        pgRes.data.progress.forEach(p => { pgMap[p.roadmapId] = p; });
        setProgress(pgMap);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalCompleted = Object.values(progress).filter(p => p.percentage === 100).length;
  const overallPct = roadmaps.length
    ? Math.round(Object.values(progress).reduce((acc, p) => acc + (p.percentage || 0), 0) / roadmaps.length)
    : 0;

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.greeting}>
              <span className={styles.wave}>👋</span>
              Welcome back,
            </div>
            <h1 className={styles.heroTitle}>{user?.name?.split(' ')[0]}</h1>
            <p className={styles.heroSub}>Continue mastering your tech skills. Pick up where you left off.</p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <div className={styles.statNum}>{roadmaps.length}</div>
              <div className={styles.statLabel}>Roadmaps</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNum}>{totalCompleted}</div>
              <div className={styles.statLabel}>Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNum}>{overallPct}%</div>
              <div className={styles.statLabel}>Overall Progress</div>
            </div>
          </div>
        </section>

        {/* Overall progress bar */}
        {overallPct > 0 && (
          <div className={styles.overallBar}>
            <div className={styles.overallLabel}>
              <span>Overall Journey</span>
              <span>{overallPct}%</span>
            </div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        )}

        {/* Section header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Learning Paths</h2>
          <span className={styles.sectionCount}>{roadmaps.length} roadmaps</span>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className={styles.grid}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 200, borderRadius: 18 }} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {roadmaps.map((rm, i) => {
              const pg = progress[rm.id];
              const pct = pg?.percentage || 0;
              const completed = pg?.completedSteps?.length || 0;
              return (
                <div
                  key={rm.id}
                  className={styles.card}
                  style={{ '--card-color': rm.color, animationDelay: `${i * 0.05}s` }}
                  onClick={() => navigate(`/roadmap/${rm.id}`)}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon} style={{ background: `${rm.color}18`, border: `1px solid ${rm.color}30` }}>
                      {rm.icon}
                    </div>
                    {pct === 100 && <div className={styles.completeBadge}>✓ Done</div>}
                    {pct > 0 && pct < 100 && <div className={styles.inProgressBadge}>In Progress</div>}
                  </div>
                  <h3 className={styles.cardTitle}>{rm.title}</h3>
                  <p className={styles.cardDesc}>{rm.description}</p>
                  <div className={styles.cardMeta}>
                    <span>{rm.totalSteps} steps</span>
                    <span>{rm.estimatedHours}h</span>
                  </div>
                  <div className={styles.cardProgress}>
                    <div className={styles.cardProgressInfo}>
                      <span>{completed}/{rm.totalSteps} completed</span>
                      <span style={{ color: pct === 100 ? 'var(--success)' : 'var(--text-secondary)' }}>{pct}%</span>
                    </div>
                    <div className={styles.cardBar}>
                      <div className={styles.cardBarFill} style={{ width: `${pct}%`, background: rm.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
