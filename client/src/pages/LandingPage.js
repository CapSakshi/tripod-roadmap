import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LandingPage.module.css';

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Curated Learning Roadmaps',
    description: 'Follow structured, step-by-step paths built by experts. From frontend to AI/ML, every roadmap guides you through the essentials with hand-picked resources.',
    accent: '#f59e0b',
    tag: 'ROADMAPS',
  },
  {
    icon: '📝',
    title: 'Checkpoint Quizzes',
    description: 'Test your understanding at every milestone. Our intelligent quizzes adapt to the domain you\'re studying — no generic questions, just real assessments.',
    accent: '#22c55e',
    tag: 'QUIZZES',
  },
  {
    icon: '📊',
    title: 'Progress Tracking Dashboard',
    description: 'Visualize your learning journey with real-time progress bars, completion percentages, and a personal dashboard that keeps you motivated.',
    accent: '#6366f1',
    tag: 'PROGRESS',
  },
  {
    icon: '🌐',
    title: 'Community Explore Hub',
    description: 'Browse, like, and fork roadmaps created by other learners. Discover new paths, share your own, and learn from the community.',
    accent: '#ec4899',
    tag: 'COMMUNITY',
  },

  {
    icon: '🎨',
    title: 'Custom Roadmap Builder',
    description: 'Design your own learning paths with our intuitive builder. Add steps, resources, and categories, then share with the world.',
    accent: '#f97316',
    tag: 'BUILDER',
  },
];

const STATS = [
  { number: '10+', label: 'Expert Roadmaps', sub: 'across all domains', color: '#f59e0b' },
  { number: '500+', label: 'Learning Steps', sub: 'with curated resources', color: '#22c55e' },
  { number: '10+', label: 'Tech Domains', sub: 'from Web Dev to AI/ML', color: '#6366f1' },
  { number: '94%', label: 'Completion Rate', sub: 'among active learners', color: '#ec4899' },
];

const MARQUEE_ITEMS = [
  'React', 'Node.js', 'Python', 'Data Science', 'Machine Learning',
  'DevOps', 'Cybersecurity', 'Flutter', 'Blockchain', 'System Design',
  'TypeScript', 'Docker', 'Kubernetes', 'AWS', 'MongoDB',
  'PostgreSQL', 'GraphQL', 'Next.js', 'TensorFlow', 'Rust',
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Redirect logged-in users
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  // Auto-slider
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % FEATURES.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying]);

  // Scroll-based nav effect
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % FEATURES.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + FEATURES.length) % FEATURES.length);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.landing}>
      {/* ─── Navbar ─── */}
      <nav className={`${styles.nav} ${navScrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>⚡</span>
            <span className={styles.brandText}>Tripod</span>
            <span className={styles.brandSub}>Roadmap</span>
          </div>
          <div className={styles.navLinks}>
            <button className={styles.navLink} onClick={() => scrollTo('features')}>Features</button>
            <button className={styles.navLink} onClick={() => scrollTo('how-it-works')}>How it works</button>
            <button className={styles.navLink} onClick={() => scrollTo('stats')}>Stats</button>
          </div>
          <div className={styles.navRight}>
            <button className={styles.loginBtn} onClick={() => navigate('/login')}>Log in</button>
            <button className={styles.ctaBtn} onClick={() => navigate('/signup')}>
              Get started <span className={styles.ctaArrow}>→</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
          <div className={styles.heroGrid} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              STRUCTURED LEARNING PLATFORM
            </div>
            <h1 className={styles.heroTitle}>
              Your roadmap,
              <br />
              <span className={styles.heroHighlight}>your progress.</span>
              <br />
              Your career.
            </h1>
            <p className={styles.heroSubtitle}>
              Stop wandering through random tutorials. Start following structured,
              expert-curated paths that track your progress and prove your skills.
            </p>
            <div className={styles.heroCtas}>
              <button className={styles.heroPrimaryBtn} onClick={() => navigate('/signup')}>
                Start learning <span>→</span>
              </button>
              <button className={styles.heroSecondaryBtn} onClick={() => scrollTo('features')}>
                See features <span>→</span>
              </button>
            </div>

          </div>
          <div className={styles.heroRight}>
            <div className={styles.dashboardPreview}>
              <div className={styles.previewHeader}>
                <span className={styles.previewLabel}>LIVE DASHBOARD PREVIEW</span>
                <span className={styles.previewBadge}>⚡ Profile strength: High</span>
              </div>
              <h3 className={styles.previewTitle}>Your Performance Cockpit</h3>
              <div className={styles.previewChart}>
                {[35, 45, 30, 55, 65, 80, 90].map((h, i) => (
                  <div key={i} className={styles.chartBar} style={{
                    height: `${h}%`,
                    background: i >= 4 ? 'linear-gradient(to top, #6366f1, #a78bfa)' : 'rgba(99, 102, 241, 0.3)',
                    animationDelay: `${i * 0.1}s`
                  }} />
                ))}
              </div>
              <div className={styles.previewStats}>
                <div className={styles.previewStat}>
                  <div className={styles.previewStatLabel}>Roadmaps</div>
                  <div className={styles.previewStatValue}>12</div>
                </div>
                <div className={styles.previewStat}>
                  <div className={styles.previewStatLabel}>Completed</div>
                  <div className={styles.previewStatValue}>8</div>
                </div>
              </div>
              <div className={styles.previewActivity}>
                <span>🏆 Web Development Roadmap</span>
                <span className={styles.previewWinner}>Completed</span>
              </div>
              <div className={styles.previewSkill}>
                <span>🔥 Active streak: 14 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Scrolling Marquee ─── */}
      <div className={styles.marqueeSection}>
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeDot} style={{ background: FEATURES[i % FEATURES.length].accent }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Stats Section ─── */}
      <section className={styles.statsSection} id="stats">
        <div className={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statNumber} style={{ color: stat.color }}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statSub} style={{ color: stat.color }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Feature Cards Section ─── */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>WHAT YOU GET</span>
          <h2 className={styles.sectionTitle}>Everything to master your tech journey</h2>
          <p className={styles.sectionSubtitle}>
            Not just another tutorial site. Proof-based, structured, and built for serious learners.
          </p>
        </div>
        <div className={styles.featureCards}>
          {FEATURES.slice(0, 3).map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureCardTag}>{`0${i + 1} · ${f.tag}`}</div>
              <div className={styles.featureCardIcon} style={{ background: `${f.accent}20`, color: f.accent }}>
                {f.icon}
              </div>
              <h3 className={styles.featureCardTitle}>{f.title}</h3>
              <p className={styles.featureCardDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Auto-Slider Section ─── */}
      <section className={styles.sliderSection} id="slider">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>PLATFORM FEATURES</span>
          <h2 className={styles.sectionTitle}>Explore all our powerful features</h2>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.sliderTrack}>
            <div className={styles.slideContent}>
              <div className={styles.slideLeft}>
                <div className={styles.slideTag} style={{ color: FEATURES[currentSlide].accent }}>
                  {FEATURES[currentSlide].tag}
                </div>
                <h3 className={styles.slideTitle}>{FEATURES[currentSlide].title}</h3>
                <p className={styles.slideDesc}>{FEATURES[currentSlide].description}</p>
                <div className={styles.slideProgress}>
                  {FEATURES.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.slideDot} ${i === currentSlide ? styles.slideDotActive : ''}`}
                      onClick={() => goToSlide(i)}
                      aria-label={`Go to feature ${i + 1}`}
                    >
                      <span
                        className={styles.slideDotFill}
                        style={{
                          background: i === currentSlide ? FEATURES[currentSlide].accent : 'transparent',
                          width: i === currentSlide ? '100%' : '0%',
                          transition: i === currentSlide ? 'width 4s linear' : 'none',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.slideRight}>
                <div className={styles.slideVisual} style={{ borderColor: `${FEATURES[currentSlide].accent}40` }}>
                  <div className={styles.slideIcon} style={{ background: `${FEATURES[currentSlide].accent}15` }}>
                    <span style={{ fontSize: 48 }}>{FEATURES[currentSlide].icon}</span>
                  </div>
                  <div className={styles.slideFeaturePreview}>
                    <div className={styles.slidePreviewBar} style={{ background: `${FEATURES[currentSlide].accent}30` }}>
                      <div className={styles.slidePreviewFill} style={{
                        background: FEATURES[currentSlide].accent,
                        width: '68%',
                        animation: 'slideBarFill 2s ease forwards'
                      }} />
                    </div>
                    <div className={styles.slidePreviewBar} style={{ background: `${FEATURES[currentSlide].accent}30` }}>
                      <div className={styles.slidePreviewFill} style={{
                        background: FEATURES[currentSlide].accent,
                        width: '85%',
                        animation: 'slideBarFill 2s ease 0.3s forwards'
                      }} />
                    </div>
                    <div className={styles.slidePreviewBar} style={{ background: `${FEATURES[currentSlide].accent}30` }}>
                      <div className={styles.slidePreviewFill} style={{
                        background: FEATURES[currentSlide].accent,
                        width: '52%',
                        animation: 'slideBarFill 2s ease 0.6s forwards'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.sliderControls}>
            <button className={styles.sliderArrow} onClick={prevSlide} aria-label="Previous feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <span className={styles.sliderCount}>
              {String(currentSlide + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
            </span>
            <button className={styles.sliderArrow} onClick={nextSlide} aria-label="Next feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className={styles.howSection} id="how-it-works">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>HOW IT WORKS</span>
          <h2 className={styles.sectionTitle}>Start learning in 3 simple steps</h2>
        </div>
        <div className={styles.howSteps}>
          <div className={styles.howStep}>
            <div className={styles.howStepNum}>01</div>
            <div className={styles.howStepIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>🎯</div>
            <h4 className={styles.howStepTitle}>Pick a Roadmap</h4>
            <p className={styles.howStepDesc}>Choose from 10+ expert-curated roadmaps spanning Web Dev, AI/ML, DevOps, and more.</p>
          </div>
          <div className={styles.howConnector}>
            <svg width="60" height="2" viewBox="0 0 60 2"><line x1="0" y1="1" x2="60" y2="1" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 4" /></svg>
          </div>
          <div className={styles.howStep}>
            <div className={styles.howStepNum}>02</div>
            <div className={styles.howStepIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)' }}>📚</div>
            <h4 className={styles.howStepTitle}>Learn & Complete Steps</h4>
            <p className={styles.howStepDesc}>Follow curated resources, mark steps complete, and take quizzes to validate your understanding.</p>
          </div>
          <div className={styles.howConnector}>
            <svg width="60" height="2" viewBox="0 0 60 2"><line x1="0" y1="1" x2="60" y2="1" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 4" /></svg>
          </div>
          <div className={styles.howStep}>
            <div className={styles.howStepNum}>03</div>
            <div className={styles.howStepIcon} style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>🏆</div>
            <h4 className={styles.howStepTitle}>Track & Share Progress</h4>
            <p className={styles.howStepDesc}>Monitor your dashboard, celebrate milestones, and share your achievements with your profile.</p>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg}>
          <div className={styles.ctaOrb1} />
          <div className={styles.ctaOrb2} />
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to master your tech career?</h2>
          <p className={styles.ctaSubtitle}>
            Join hundreds of learners already using Tripod Roadmap to build real skills.
          </p>
          <button className={styles.ctaButton} onClick={() => navigate('/signup')}>
            Get started for free <span>→</span>
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.brandIcon}>⚡</span>
            <span className={styles.brandText}>Tripod</span>
            <span className={styles.brandSub}>Roadmap</span>
          </div>
          <p className={styles.footerCopy}>© 2026 Tripod Roadmap. Built for learners, by learners.</p>
        </div>
      </footer>
    </div>
  );
}
