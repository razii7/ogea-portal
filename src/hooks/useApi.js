import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Generic API hook for fetching data
 * @param {string} endpoint - API endpoint (relative to base URL)
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useApi = (endpoint, options = {}) => {
  const {
    immediate = true,
    initialData = null,
    transform = (data) => data,
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const fetchData = useCallback(async (params = {}) => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params,
        signal: abortControllerRef.current.signal,
      })

      const transformedData = transform(response.data)
      setData(transformedData)
      onSuccess?.(transformedData)
      return transformedData
    } catch (err) {
      if (axios.isCancel(err)) return
      
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint, transform, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [immediate, fetchData])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Simple fetch hook using native fetch API
 * @param {string} url - Full URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const { immediate = true, initialData = null } = options
  
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [immediate, fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default useApi
