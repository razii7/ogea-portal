import { useState, useEffect } from 'react'
import { worksCategories } from '@/lib/categories'

export const useStats = () => {
  const [stats, setStats] = useState({
    loading: true,
    totalArticles: 0,
    articles: 0,
    stories: 0,
    poems: 0,
    essays: 0,
    seminars: 0,
    reviews: 0,
    letters: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        console.log('🔧 API Base URL:', apiBaseUrl)
        
        // Define all categories to fetch
        
        // Fetch data for each category in parallel
        const fetchPromises = worksCategories.map(async (category) => {
          try {
            const url = `${apiBaseUrl}/articles?category=${category}`
            console.log(`📡 Fetching ${category} from:`, url)
            
            const response = await fetch(url)
            console.log(`📊 Response status for ${category}:`, response.status, response.statusText)
            
            if (!response.ok) {
              console.warn(`❌ Failed to fetch ${category}:`, response.statusText)
              return { category, count: 0 }
            }
            const data = await response.json()
            console.log(`📦 Raw data for ${category}:`, data)
            
            // Count the articles - handle multiple response formats
            let count = 0
            
            // Format 1: {results: number} - Your API format ✨
            if (typeof data.results === 'number') {
              count = data.results
              console.log(`✅ ${category}: Results property = ${count}`)
            }
            // Format 2: Simple array
            else if (Array.isArray(data)) {
              count = data.length
              console.log(`✅ ${category}: Array with ${count} items`)
            } 
            // Format 3: {data: {articles: [...]}}
            else if (data.data && data.data.articles && Array.isArray(data.data.articles)) {
              count = data.data.articles.length
              console.log(`✅ ${category}: Nested articles array with ${count} items`)
            }
            // Format 4: {data: [...]}
            else if (data.data && Array.isArray(data.data)) {
              count = data.data.length
              console.log(`✅ ${category}: Wrapped array with ${count} items`)
            } 
            // Format 5: {count: number}
            else if (typeof data.count === 'number') {
              count = data.count
              console.log(`✅ ${category}: Count property = ${count}`)
            } 
            // Format 6: {total: number}
            else if (typeof data.total === 'number') {
              count = data.total
              console.log(`✅ ${category}: Total property = ${count}`)
            } 
            else {
              console.warn(`⚠️ ${category}: Unknown data format, count = 0`, data)
            }
            
            return { category, count }
          } catch (error) {
            console.error(`❌ Error fetching ${category}:`, error)
            return { category, count: 0 }
          }
        })

        // Wait for all requests to complete
        const results = await Promise.all(fetchPromises)
        console.log('📋 All results:', results)
        
        // Build the stats object
        const articlesByType = {
          articles: 0,
          stories: 0,
          poems: 0,
          essays: 0,
          seminars: 0,
          reviews: 0,
          letters: 0,
        }

        results.forEach(({ category, count }) => {
          // Map singular category names to plural property names
          const categoryMap = {
            'article': 'articles',
            'story': 'stories',
            'poem': 'poems',
            'essay': 'essays',
            'seminar': 'seminars',
            'review': 'reviews',
            'letter': 'letters',
          }
          
          const propertyName = categoryMap[category]
          console.log(`🔄 Mapping ${category} → ${propertyName} = ${count}`)
          if (propertyName) {
            articlesByType[propertyName] = count
          }
        })

        const totalArticles = Object.values(articlesByType).reduce((sum, count) => sum + count, 0)
        
        console.log('📊 Final stats:', articlesByType)
        console.log('🎯 Total articles:', totalArticles)

        setStats({
          loading: false,
          totalArticles,
          ...articlesByType,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats(prev => ({
          ...prev,
          loading: false,
        }))
      }
    }

    fetchStats()
  }, [])

  return stats
}