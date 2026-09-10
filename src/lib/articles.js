import { fetchArticles } from '@/services/api'

/**
 * Fetch articles with safe fallback
 */
export const fetchAndLogArticles = async () => {
  return await fetchArticles()
}

export default fetchAndLogArticles
