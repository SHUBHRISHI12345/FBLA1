/**
 * ReportsPage Component
 * Page for generating and exporting business reports
 */

import { useState } from 'react';
import type { BusinessCategory, SortOption } from '../types';
import { CATEGORIES, CATEGORY_NAMES, SORT_OPTIONS } from '../utils/constants';
import { reportService } from '../services/reportService';
import styles from '../styles/App.module.css';

/**
 * ReportsPage component
 * Allows users to generate and export business reports
 */
export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0].value);
  const [reportContent, setReportContent] = useState<string>('');

  const handleGenerateReport = () => {
    const report = reportService.generateTextReport(selectedCategory, sortOption);
    setReportContent(report);
  };

  const handleExportText = () => {
    const report = reportService.generateTextReport(selectedCategory, sortOption);
    reportService.exportReport(report, `business-report-${Date.now()}.txt`, 'text/plain');
  };

  const handleExportCSV = () => {
    const csv = reportService.generateCSVReport(selectedCategory, sortOption);
    reportService.exportReport(csv, `business-report-${Date.now()}.csv`, 'text/csv');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', color: '#111827' }}>
        Business Reports
      </h1>

      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#111827' }}>
          Report Options
        </h2>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="report-category" className={styles.label}>
              Filter by Category (Optional)
            </label>
            <select
              id="report-category"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value as BusinessCategory | null)}
              className={styles.select}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {CATEGORY_NAMES[category]}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="report-sort" className={styles.label}>
              Sort By
            </label>
            <select
              id="report-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className={styles.select}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={handleGenerateReport} className={styles.button}>
              Generate Report
            </button>
            <button onClick={handleExportText} className={styles.buttonSecondary}>
              Export as Text
            </button>
            <button onClick={handleExportCSV} className={styles.buttonSecondary}>
              Export as CSV
            </button>
          </div>
        </div>
      </div>

      {reportContent && (
        <div className={styles.card}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#111827' }}>
            Generated Report
          </h2>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              backgroundColor: '#f9fafb',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              maxHeight: '500px'
            }}
          >
            {reportContent}
          </pre>
        </div>
      )}
    </div>
  );
}

