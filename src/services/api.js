import axios from 'axios'
import { MOCK_ARTICLES, MOCK_ACHIEVEMENTS, MOCK_STATISTICS } from '@/lib/mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.chsoutreach.live/api/v1'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
})

/**
 * Fetch all articles from API with fallback to mock data
 */
export const fetchArticles = async () => {
  try {
    const response = await axiosClient.get('/articles')
    const articles = response.data?.articles || response.data?.data?.articles || response.data
    if (Array.isArray(articles) && articles.length > 0) {
      return articles
    }
    return MOCK_ARTICLES
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetchArticles failed, using fallback mock data:', error.message)
    }
    return MOCK_ARTICLES
  }
}

/**
 * Fetch single article by ID with fallback
 */
export const fetchArticleById = async (articleId) => {
  try {
    const response = await axiosClient.get(`/articles/${articleId}`)
    const article = response.data?.article || response.data?.data?.article || response.data
    if (article) return article
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetchArticleById for ${articleId} failed, checking mock data:`, error.message)
    }
  }
  const found = MOCK_ARTICLES.find(
    (a) => String(a._id) === String(articleId) || String(a.id) === String(articleId)
  )
  if (found) return found
  throw new Error('Article not found')
}

/**
 * Fetch articles by category
 */
export const fetchArticlesByCategory = async (category) => {
  try {
    const response = await axiosClient.get('/articles', {
      params: { category }
    })
    const articles = response.data?.articles || response.data?.data?.articles || response.data
    if (Array.isArray(articles) && articles.length > 0) {
      return articles
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`API fetchArticlesByCategory for ${category} failed, using mock data:`, error.message)
    }
  }
  return MOCK_ARTICLES.filter(
    (a) => !category || category === 'all' || a.category?.toLowerCase() === category?.toLowerCase()
  )
}

/**
 * Fetch statistics with fallback
 */
export const fetchStatistics = async () => {
  try {
    const response = await axiosClient.get('/statistics')
    const stats = response.data?.data?.statistics?.[0] || response.data?.statistics?.[0] || response.data
    if (stats) {
      return {
        totalCount: stats.totalCount ?? stats.total ?? MOCK_STATISTICS.totalCount,
        inkspireCount: stats.inkspireCount ?? stats.penreachCount ?? MOCK_STATISTICS.inkspireCount,
        scholarcraftCount: stats.scholarcraftCount ?? stats.paperpathCount ?? MOCK_STATISTICS.scholarcraftCount,
        talentpulseCount: stats.talentpulseCount ?? stats.talenttideCount ?? MOCK_STATISTICS.talentpulseCount,
        ...stats,
      }
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetchStatistics failed, using fallback statistics:', error.message)
    }
  }
  return MOCK_STATISTICS
}

/**
 * Fetch images / achievements with fallback
 */
export const fetchImages = async () => {
  try {
    const response = await axiosClient.get('/upload/images')
    if (response.data?.status === 'success' && Array.isArray(response.data?.data?.images)) {
      const sorted = response.data.data.images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      if (sorted.length > 0) return sorted
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('API fetchImages failed, using fallback achievements data:', error.message)
    }
  }
  return MOCK_ACHIEVEMENTS
}

// Export for backwards compatibility
export const fetchAndLogArticles = fetchArticles

export default {
  fetchArticles,
  fetchArticleById,
  fetchArticlesByCategory,
  fetchStatistics,
  fetchImages,
  fetchAndLogArticles,
}
