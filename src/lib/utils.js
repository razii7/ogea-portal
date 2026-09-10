import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Merge class names with Tailwind CSS support
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Decode HTML entities and strip HTML tags
 */
export function decodeHtml(html) {
  if (!html) return '';

  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  let decoded = txt.value;

  // Remove HTML tags
  decoded = decoded.replace(/<[^>]*>/g, '');

  // Decode unicode escapes
  decoded = decoded.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });

  // Clean up extra whitespace
  decoded = decoded.replace(/\s+/g, ' ').trim();

  return decoded;
}

/**
 * Decode HTML entities while preserving HTML structure
 */
export function decodeHtmlPreserveStructure(html) {
  if (!html) return '';

  let decoded = html;

  // Decode unicode escapes
  decoded = decoded.replace(/\\u[\dA-F]{4}/gi, (match) => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });

  // Decode HTML entities
  const txt = document.createElement('textarea');
  txt.innerHTML = decoded;
  return txt.value;
}

/**
 * Format date to human-readable string
 */
export function formatDate(dateString, options = {}) {
  const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 120) {
  const cleanText = decodeHtml(text);
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength) + '...';
}

/**
 * Debounce function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate a unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if a value is empty (null, undefined, empty string, or empty array)
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

