/**
 * Navigation Component
 * Main navigation menu for the application
 */

import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/App.module.css';

/**
 * Navigation component
 * Displays the main navigation links with active state highlighting
 */
export default function Navigation() {
  const location = useLocation();

  return (
    <nav aria-label="Main navigation">
      <ul className={styles.nav}>
        <li>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/favorites" 
            className={`${styles.navLink} ${location.pathname === '/favorites' ? styles.navLinkActive : ''}`}
            aria-current={location.pathname === '/favorites' ? 'page' : undefined}
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link 
            to="/reports" 
            className={`${styles.navLink} ${location.pathname === '/reports' ? styles.navLinkActive : ''}`}
            aria-current={location.pathname === '/reports' ? 'page' : undefined}
          >
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
}


