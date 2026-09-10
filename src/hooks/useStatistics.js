import { useState, useEffect } from 'react'
import { fetchStatistics } from '@/services/api'
import { MOCK_STATISTICS } from '@/lib/mockData'

/**
 * Custom hook to fetch statistics from API or fallback
 * @returns {Object} - { loading, stats, error }
 */
export const useStatistics = () => {
  const [data, setData] = useState({ 
    loading: true, 
    stats: MOCK_STATISTICS, 
    error: null 
  })

  useEffect(() => {
    let isMounted = true

    const loadStats = async () => {
      try {
        const stats = await fetchStatistics()
        if (isMounted) {
          setData({ loading: false, stats, error: null })
        }
      } catch (err) {
        if (isMounted) {
          setData({ loading: false, stats: MOCK_STATISTICS, error: err.message })
        }
      }
    }

    loadStats()

    return () => {
      isMounted = false
    }
  }, [])

  return data
}

export default useStatistics
