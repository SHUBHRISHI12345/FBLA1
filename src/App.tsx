/**
 * Main App Component
 * Sets up routing and application structure
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import { LoadingSpinner } from './components/ui';
// Authentication removed - not required for FBLA competition

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const BusinessDetailPage = lazy(() => import('./pages/BusinessDetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
import { storageService } from './services/storageService';
import styles from './styles/App.module.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * App component
 * Main application component with routing setup
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on component mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await storageService.initializeData();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={styles.app}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className={styles.main} tabIndex={-1}>
            {isLoading ? (
              <div className={styles.loading}>
                <div style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  border: '4px solid #e5e7eb',
                  borderTopColor: '#2563eb',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <p>Loading...</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className={styles.loading}>
                    <LoadingSpinner size="lg" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/business/:id" element={<BusinessDetailPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  {/* Profile and Admin routes removed - not required for FBLA */}
                </Routes>
              </Suspense>
            )}
          </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#111827',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.75rem',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </QueryClientProvider>
    );
  }

export default App;
