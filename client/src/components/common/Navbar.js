import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/dashboard" className={styles.brand}>
          <span className={styles.brandIcon}>⚡</span>
          <span className={styles.brandText}>Tripod</span>
          <span className={styles.brandSub}>Roadmap</span>
        </Link>

        <div className={styles.links}>
          <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link to="/explore" className={styles.navLink}>🌐 Explore</Link>
          <Link to="/create-roadmap" className={styles.navLink}>+ Create</Link>
        </div>

        <div className={styles.right}>
          <div className={styles.userMenu} onClick={() => setMenuOpen(m => !m)}>
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name} className={styles.avatar} referrerPolicy="no-referrer" />
            ) : (
              <div className={styles.avatar}>{initials}</div>
            )}
            <span className={styles.userName}>{user?.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'none' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          {menuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownUser}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.name} className={styles.dropdownAvatar} referrerPolicy="no-referrer" />
                ) : (
                  <div className={styles.dropdownAvatar}>{initials}</div>
                )}
                <div>
                  <div className={styles.dropdownName}>{user?.name}</div>
                  <div className={styles.dropdownEmail}>{user?.email}</div>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={() => { navigate('/profile'); setMenuOpen(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                My Profile
              </button>
              <button className={styles.dropdownItem} onClick={() => { navigate('/explore'); setMenuOpen(false); }}>
                🌐 Explore Roadmaps
              </button>
              <div className={styles.dropdownDivider} />
              <button className={styles.dropdownItem} onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
