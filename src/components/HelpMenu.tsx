/**
 * HelpMenu Component
 * Interactive help menu with searchable Q&A functionality
 * Provides users with guidance on using the application features
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import Modal from './ui/Modal';
import Input from './ui/Input';
import styles from './HelpMenu.module.css';

/**
 * Q&A item interface
 */
interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: 'getting-started' | 'reviews' | 'favorites' | 'deals' | 'reports' | 'shortcuts';
  keywords: string[];
}

/**
 * Q&A data
 */
const qaData: QAItem[] = [
  // Getting Started
  {
    id: 'gs-1',
    question: 'How do I browse businesses?',
    answer: 'On the home page, you can see all available businesses in a grid layout. Each business card shows the name, category, average rating, and number of reviews. Click on any business card to view more details.',
    category: 'getting-started',
    keywords: ['browse', 'view', 'list', 'businesses', 'home'],
  },
  {
    id: 'gs-2',
    question: 'How do I filter businesses by category?',
    answer: 'Use the category filter buttons at the top of the home page. Click "Food", "Retail", or "Services" to show only businesses in that category. Click "All" to show all businesses again.',
    category: 'getting-started',
    keywords: ['filter', 'category', 'food', 'retail', 'services'],
  },
  {
    id: 'gs-3',
    question: 'How do I sort businesses?',
    answer: 'Use the "Sort by" dropdown on the home page. You can sort by rating (high to low or low to high), number of reviews (most or fewest), or name (A to Z or Z to A).',
    category: 'getting-started',
    keywords: ['sort', 'order', 'rating', 'reviews', 'name'],
  },
  // Reviews & Ratings
  {
    id: 'rev-1',
    question: 'How do I leave a review?',
    answer: 'Navigate to a business detail page and scroll to the review form. Enter your name, select a star rating (1-5), and write your review comment. Click "Submit Review" and complete the verification to prevent bots.',
    category: 'reviews',
    keywords: ['review', 'rating', 'submit', 'comment', 'feedback'],
  },
  {
    id: 'rev-2',
    question: 'What is the verification step?',
    answer: 'Before submitting a review, you\'ll be asked to solve a simple math problem. This verification step prevents automated bot submissions and ensures reviews are from real users.',
    category: 'reviews',
    keywords: ['verification', 'bot', 'math', 'prevent', 'spam'],
  },
  {
    id: 'rev-3',
    question: 'Can I edit or delete my review?',
    answer: 'Currently, reviews cannot be edited or deleted after submission. Please make sure your review is accurate before submitting. This helps maintain the integrity of the review system.',
    category: 'reviews',
    keywords: ['edit', 'delete', 'remove', 'change', 'update'],
  },
  // Favorites
  {
    id: 'fav-1',
    question: 'How do I save a business to favorites?',
    answer: 'On any business detail page, click the "Add to Favorites" button. The button will change to "Favorited" to confirm. You can view all your favorite businesses on the Favorites page.',
    category: 'favorites',
    keywords: ['favorite', 'save', 'bookmark', 'add', 'star'],
  },
  {
    id: 'fav-2',
    question: 'How do I view my favorite businesses?',
    answer: 'Click "Favorites" in the main navigation menu. This will show all businesses you have saved. You can click on any business card to view its details or remove it from favorites.',
    category: 'favorites',
    keywords: ['view', 'favorites', 'saved', 'list', 'bookmarks'],
  },
  {
    id: 'fav-3',
    question: 'How do I remove a business from favorites?',
    answer: 'Go to the business detail page and click the "Favorited" button again, or visit the Favorites page and click the button on the business card you want to remove.',
    category: 'favorites',
    keywords: ['remove', 'delete', 'unfavorite', 'unsave'],
  },
  // Deals & Coupons
  {
    id: 'deal-1',
    question: 'How do I view deals and coupons?',
    answer: 'Deals and coupons are displayed on each business detail page in the "Special Deals & Coupons" section. Only active deals are shown. Each deal card displays the title, description, discount, coupon code (if available), and expiry date.',
    category: 'deals',
    keywords: ['deal', 'coupon', 'discount', 'offer', 'promotion'],
  },
  {
    id: 'deal-2',
    question: 'How do I use a coupon code?',
    answer: 'When viewing a business deal, note the coupon code displayed on the deal card. Present this code to the business when making a purchase. Each business will have their own process for redeeming coupon codes.',
    category: 'deals',
    keywords: ['use', 'redeem', 'code', 'coupon', 'apply'],
  },
  {
    id: 'deal-3',
    question: 'What if a deal has expired?',
    answer: 'Expired deals are automatically hidden from view. Only active deals with valid expiry dates are displayed on business pages. Check back regularly for new deals and promotions.',
    category: 'deals',
    keywords: ['expired', 'expiry', 'valid', 'active', 'date'],
  },
  // Reports
  {
    id: 'rep-1',
    question: 'How do I generate a report?',
    answer: 'Navigate to the Reports page using the main navigation. Optionally select a category filter and sort option. Click "Generate Report" to preview the report, then export it as a TXT or CSV file.',
    category: 'reports',
    keywords: ['report', 'generate', 'export', 'download', 'data'],
  },
  {
    id: 'rep-2',
    question: 'What information is included in reports?',
    answer: 'Reports include business name, category, average rating, review count, address, phone number, description, and number of active deals. You can filter and sort the data before generating the report.',
    category: 'reports',
    keywords: ['information', 'data', 'content', 'details', 'include'],
  },
  {
    id: 'rep-3',
    question: 'What file formats are available?',
    answer: 'Reports can be exported in two formats: TXT (plain text) for easy reading, and CSV (comma-separated values) for use in spreadsheet applications like Excel or Google Sheets.',
    category: 'reports',
    keywords: ['format', 'txt', 'csv', 'file', 'export'],
  },
  // Keyboard Shortcuts
  {
    id: 'ks-1',
    question: 'What keyboard shortcuts are available?',
    answer: 'Tab: Navigate between interactive elements. Enter/Space: Activate buttons and links. Escape: Close modals and dialogs. Arrow keys can be used in some components. All features are fully keyboard accessible.',
    category: 'shortcuts',
    keywords: ['keyboard', 'shortcut', 'hotkey', 'navigate', 'accessibility'],
  },
  {
    id: 'ks-2',
    question: 'How do I navigate without a mouse?',
    answer: 'Use the Tab key to move forward through interactive elements, Shift+Tab to move backward. Press Enter or Space to activate buttons and links. The Escape key closes modals. Focus indicators show which element is currently selected.',
    category: 'shortcuts',
    keywords: ['navigate', 'keyboard', 'tab', 'mouse', 'accessibility'],
  },
];

/**
 * Category labels
 */
const categoryLabels: Record<QAItem['category'], string> = {
  'getting-started': 'Getting Started',
  'reviews': 'Reviews & Ratings',
  'favorites': 'Favorites',
  'deals': 'Deals & Coupons',
  'reports': 'Reports',
  'shortcuts': 'Keyboard Shortcuts',
};

/**
 * HelpMenu component
 */
export default function HelpMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter Q&A based on search query
  const filteredQA = useMemo(() => {
    if (!searchQuery.trim()) {
      return qaData;
    }

    const query = searchQuery.toLowerCase();
    return qaData.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.keywords.some((keyword) => keyword.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Group filtered Q&A by category
  const groupedQA = useMemo(() => {
    const groups: Record<string, QAItem[]> = {};
    filteredQA.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredQA]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle toggle expand
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Highlight search terms in text
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {/* Help Button */}
      <button
        className={styles.helpButton}
        onClick={() => setIsOpen(true)}
        aria-label="Open help menu"
        aria-expanded={isOpen}
        title="Help & Support"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          <text
            x="10"
            y="14"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="currentColor"
          >
            ?
          </text>
        </svg>
        <span className="sr-only">Help</span>
      </button>

      {/* Help Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSearchQuery('');
          setExpandedItems(new Set());
        }}
        title="Help & Support"
        size="lg"
      >
        <div className={styles.helpContent}>
          {/* Search Box */}
          <div className={styles.searchSection}>
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              aria-label="Search help topics"
            />
            {searchQuery && (
              <p className={styles.resultCount}>
                {filteredQA.length} {filteredQA.length === 1 ? 'result' : 'results'} found
              </p>
            )}
          </div>

          {/* Q&A Sections */}
          {Object.keys(groupedQA).length > 0 ? (
            <div className={styles.qaSections}>
              {Object.entries(groupedQA).map(([category, items]) => (
                <div key={category} className={styles.categorySection}>
                  <h3 className={styles.categoryTitle}>{categoryLabels[category as QAItem['category']]}</h3>
                  <div className={styles.qaList}>
                    {items.map((item) => {
                      const isExpanded = expandedItems.has(item.id);
                      return (
                        <div key={item.id} className={styles.qaItem}>
                          <button
                            id={`question-${item.id}`}
                            className={styles.questionButton}
                            onClick={() => toggleExpand(item.id)}
                            aria-expanded={isExpanded}
                            aria-controls={`answer-${item.id}`}
                          >
                            <span className={styles.questionText}>
                              {highlightText(item.question, searchQuery)}
                            </span>
                            <svg
                              className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 6L8 10L12 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          {isExpanded && (
                            <div
                              id={`answer-${item.id}`}
                              className={styles.answer}
                              role="region"
                              aria-labelledby={`question-${item.id}`}
                            >
                              <p>{highlightText(item.answer, searchQuery)}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No results found for "{searchQuery}"</p>
              <p className={styles.noResultsHint}>
                Try searching with different keywords or clear your search to see all topics.
              </p>
            </div>
          )}

          {/* Keyboard Shortcuts Table */}
          <div className={styles.shortcutsSection}>
            <h3 className={styles.categoryTitle}>Keyboard Shortcuts</h3>
            <div className={styles.shortcutsTable} role="table">
              <div className={styles.shortcutsRow} role="row">
                <div className={styles.shortcutsKey} role="cell">
                  <kbd>Tab</kbd>
                </div>
                <div className={styles.shortcutsDescription} role="cell">
                  Navigate forward through interactive elements
                </div>
              </div>
              <div className={styles.shortcutsRow} role="row">
                <div className={styles.shortcutsKey} role="cell">
                  <kbd>Shift</kbd> + <kbd>Tab</kbd>
                </div>
                <div className={styles.shortcutsDescription} role="cell">
                  Navigate backward through interactive elements
                </div>
              </div>
              <div className={styles.shortcutsRow} role="row">
                <div className={styles.shortcutsKey} role="cell">
                  <kbd>Enter</kbd> / <kbd>Space</kbd>
                </div>
                <div className={styles.shortcutsDescription} role="cell">
                  Activate buttons and links
                </div>
              </div>
              <div className={styles.shortcutsRow} role="row">
                <div className={styles.shortcutsKey} role="cell">
                  <kbd>Esc</kbd>
                </div>
                <div className={styles.shortcutsDescription} role="cell">
                  Close modals and dialogs
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

