import { useEffect, useState, useMemo } from 'react'
import ArticleCard from '../components/custom/articlecard/ArticleCard'
import { Skeleton } from '../components/ui/skeleton'
import { fetchArticles } from '../services/api'
import { worksCategories } from '../lib/categories'
import { BATCH_LIST, MOCK_ARTICLES } from '../lib/mockData'
import { Search, BookOpen, Sparkles, Filter } from 'lucide-react'

const Works = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterBatch, setFilterBatch] = useState('all')

  const loadArticles = async () => {
    try {
      setLoading(true)
      const data = await fetchArticles()
      const articlesData = data?.articles || data?.data?.articles || data || []
      if (Array.isArray(articlesData) && articlesData.length > 0) {
        setArticles(articlesData)
      } else {
        setArticles(MOCK_ARTICLES)
      }
      setError(null)
    } catch (err) {
      console.error('Failed to load articles, using fallback:', err)
      setArticles(MOCK_ARTICLES)
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  // Filtered articles based on search, category, and batch
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const q = searchTerm.toLowerCase().trim()
      const matchesSearch =
        !q ||
        article.title?.toLowerCase().includes(q) ||
        article.writer?.toLowerCase().includes(q) ||
        article.category?.toLowerCase().includes(q) ||
        article.content?.toLowerCase().includes(q)

      const matchesCategory =
        filterCategory === 'all' ||
        article.category?.toLowerCase() === filterCategory.toLowerCase()

      const matchesBatch =
        filterBatch === 'all' ||
        (article.batch && article.batch.toLowerCase() === filterBatch.toLowerCase())

      return matchesSearch && matchesCategory && matchesBatch
    })
  }, [articles, searchTerm, filterCategory, filterBatch])

  const categoryCounts = useMemo(() => {
    const counts = { all: articles.length }
    worksCategories.forEach((cat) => {
      counts[cat] = articles.filter(
        (a) => a.category?.toLowerCase() === cat.toLowerCase()
      ).length
    })
    return counts
  }, [articles])

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0f2545] text-xs font-semibold mb-4 border border-blue-100">
          <BookOpen className="w-3.5 h-3.5" />
          Campus Intellectual & Creative Repository
        </div>
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-5 tracking-tight">
          Literary Works
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-[#0f2545] to-[#c99a3c] mx-auto rounded-full mb-5" />
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
          Explore scholarly treatises, creative stories, poetry, critical reviews, and seminar papers authored by our students.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto mb-10 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 space-y-4">
          
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-[#0f2545] text-white shadow-md shadow-slate-300/40'
                  : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              All Works ({categoryCounts.all || 0})
            </button>

            {worksCategories.map((cat) => {
              const count = categoryCounts[cat] || 0
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm capitalize font-medium transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#0f2545] text-white shadow-sm'
                      : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  {cat} {count > 0 && <span className="opacity-75 text-xs">({count})</span>}
                </button>
              )
            })}
          </div>

          {/* Search and Batch Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-2 border-t border-gray-100">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="search"
                type="text"
                placeholder="Search by title, author, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              />
            </div>

            {/* Batch Filter Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-xl focus:ring-slate-500 focus:border-slate-500 p-2 font-medium"
              >
                <option value="all">All Batches (36 - 42)</option>
                {BATCH_LIST.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-gray-500 px-2">
          <span>
            Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'publication' : 'publications'}
          </span>
          {(searchTerm || filterCategory !== 'all' || filterBatch !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterCategory('all')
                setFilterBatch('all')
              }}
              className="text-slate-600 hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 space-y-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State (only if error and no articles) */}
      {error && !loading && articles.length === 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* Articles Grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article._id || article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 max-w-md mx-auto">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">No articles match your filters</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try searching for another topic or selecting a different category or batch.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterCategory('all')
                  setFilterBatch('all')
                }}
                className="px-4 py-2 text-sm bg-[#0f2545] text-white rounded-xl hover:bg-[#1a3561] transition-colors font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Works