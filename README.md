# Byte-Sized Business Boost

A web application for discovering and supporting local businesses in your community. Built for the FBLA 2025-2026 Coding & Programming competition.

## Features

### Required Features (All Implemented)

1. ✅ **Sort businesses by category** - Filter businesses by Food, Retail, or Services
2. ✅ **Leave reviews or ratings** - Submit reviews with 1-5 star ratings
3. ✅ **Sort businesses by reviews or ratings** - Multiple sorting options available
4. ✅ **Save/bookmark favorite businesses** - Add businesses to favorites list
5. ✅ **Display special deals or coupons** - View active deals for each business
6. ✅ **Bot verification** - Math verification prevents automated submissions

### Additional Features

- **Interactive Help Menu** - Searchable Q&A with feature explanations and keyboard shortcuts
- Report generation with filtering and export (TXT/CSV)
- Responsive design for mobile and desktop
- Accessibility features (keyboard navigation, ARIA labels, screen reader support)
- Offline functionality (works without internet)
- Data persistence using localStorage

## Technology Stack

- **Frontend:** React.js with TypeScript
- **Styling:** CSS Modules
- **Build Tool:** Vite
- **Routing:** React Router
- **Data Storage:** localStorage (standalone, no backend required)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
business-boost/
├── public/
│   └── seed-data.json          # Initial business data
├── src/
│   ├── components/             # React components
│   │   ├── BusinessCard.tsx
│   │   ├── BusinessDetail.tsx
│   │   ├── ReviewForm.tsx
│   │   ├── ReviewList.tsx
│   │   ├── DealCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── SortControls.tsx
│   │   ├── FavoritesButton.tsx
│   │   ├── VerificationModal.tsx
│   │   ├── Navigation.tsx
│   │   ├── Header.tsx
│   │   └── HelpMenu.tsx
│   ├── pages/                  # Page components
│   │   ├── HomePage.tsx
│   │   ├── BusinessDetailPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   └── ReportsPage.tsx
│   ├── services/               # Business logic
│   │   ├── storageService.ts
│   │   ├── businessService.ts
│   │   └── reportService.ts
│   ├── utils/                  # Utility functions
│   │   ├── validation.ts
│   │   ├── verification.ts
│   │   └── constants.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── styles/                 # CSS modules
│   │   └── App.module.css
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## Usage

### Viewing Businesses

- Navigate to the home page to see all businesses
- Use category filters (Food, Retail, Services) to filter results
- Use the sort dropdown to sort by rating, reviews, or name

### Viewing Business Details

- Click on any business card to view full details
- See business information, active deals, and reviews
- Add the business to your favorites

### Submitting Reviews

1. Navigate to a business detail page
2. Fill out the review form with:
   - Your name
   - Star rating (1-5)
   - Review comment (minimum 10 characters)
3. Click "Submit Review"
4. Complete the math verification to prevent bots
5. Your review will be saved and displayed

### Managing Favorites

- Click the "Add to Favorites" button on any business detail page
- View all favorites on the Favorites page
- Remove favorites by clicking the button again

### Generating Reports

1. Navigate to the Reports page
2. Select optional category filter
3. Choose sort option
4. Click "Generate Report" to preview
5. Export as TXT or CSV file

### Getting Help

- Click the help icon (?) in the header to open the interactive help menu
- Search for topics or browse by category
- View keyboard shortcuts for efficient navigation
- Expand Q&A sections to learn about specific features

## Code Quality

- Well-commented code throughout
- Proper TypeScript typing
- Modular component structure
- Consistent naming conventions (camelCase for variables, PascalCase for components)
- Input validation on all forms
- Error handling for edge cases

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators for interactive elements
- Skip to main content link
- Semantic HTML structure
- High contrast colors
- Interactive help menu with searchable Q&A
- Comprehensive UX design documentation (see UX_DESIGN_RATIONALE.md)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project was created for the FBLA 2025-2026 Coding & Programming competition.
