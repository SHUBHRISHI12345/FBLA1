/**
 * Report Service
 * Handles report generation and export functionality
 */

import type { BusinessCategory, SortOption } from '../types';
import { businessService } from './businessService';

/**
 * ReportService class
 * Provides methods for generating business reports
 */
class ReportService {
  /**
   * Generates a text report of businesses
   * @param category - Optional category filter
   * @param sortOption - Sort option to apply
   * @returns Formatted text report
   */
  generateTextReport(category: BusinessCategory | null = null, sortOption: SortOption = 'name-asc'): string {
    let businesses = businessService.getAllBusinesses();
    
    // Apply filters
    businesses = businessService.filterByCategory(businesses, category);
    businesses = businessService.sortBusinesses(businesses, sortOption);

    let report = 'BUSINESS BOOST REPORT\n';
    report += '='.repeat(50) + '\n\n';
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Total Businesses: ${businesses.length}\n`;
    if (category) {
      report += `Category: ${category}\n`;
    }
    report += '\n' + '='.repeat(50) + '\n\n';

    businesses.forEach((business, index) => {
      report += `${index + 1}. ${business.name}\n`;
      report += `   Category: ${business.category}\n`;
      report += `   Rating: ${business.averageRating.toFixed(1)}/5.0 (${business.reviewCount} reviews)\n`;
      report += `   Address: ${business.address}\n`;
      if (business.phone) {
        report += `   Phone: ${business.phone}\n`;
      }
      report += `   Description: ${business.description}\n`;
      report += `   Active Deals: ${business.deals.filter(d => d.active).length}\n`;
      report += '\n';
    });

    return report;
  }

  /**
   * Generates a CSV report of businesses
   * @param category - Optional category filter
   * @param sortOption - Sort option to apply
   * @returns CSV formatted report
   */
  generateCSVReport(category: BusinessCategory | null = null, sortOption: SortOption = 'name-asc'): string {
    let businesses = businessService.getAllBusinesses();
    
    // Apply filters
    businesses = businessService.filterByCategory(businesses, category);
    businesses = businessService.sortBusinesses(businesses, sortOption);

    let csv = 'Name,Category,Rating,Review Count,Address,Phone,Active Deals\n';
    
    businesses.forEach(business => {
      const name = `"${business.name.replace(/"/g, '""')}"`;
      const category = business.category;
      const rating = business.averageRating.toFixed(1);
      const reviewCount = business.reviewCount;
      const address = `"${business.address.replace(/"/g, '""')}"`;
      const phone = business.phone ? `"${business.phone}"` : '';
      const activeDeals = business.deals.filter(d => d.active).length;
      
      csv += `${name},${category},${rating},${reviewCount},${address},${phone},${activeDeals}\n`;
    });

    return csv;
  }

  /**
   * Exports report to a downloadable file
   * @param content - Report content
   * @param filename - Name of the file
   * @param mimeType - MIME type of the file
   */
  exportReport(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance
export const reportService = new ReportService();

