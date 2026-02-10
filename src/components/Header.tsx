/**
 * Header Component
 * Application header with logo and navigation
 */

import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import HelpMenu from './HelpMenu';
import styles from '../styles/App.module.css';

/**
 * Header component
 * Displays the application header with logo and navigation menu
 * Authentication removed - not required for FBLA competition
 */
export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logoLink}>
          <h1 className={styles.logo}>Byte-Sized Business Boost</h1>
        </Link>
        <Navigation />
        <div className={styles.headerActions}>
          <HelpMenu />
        </div>
      </div>
    </header>
  );
}


