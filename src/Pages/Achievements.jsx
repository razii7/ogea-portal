import { memo, useState, useEffect, useMemo } from 'react'
import { Trophy, Award, Search, Calendar, Users, Sparkles, Filter } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { fetchImages } from '@/services/api'
import { BATCH_LIST, MOCK_ACHIEVEMENTS } from '@/lib/mockData'

const CATEGORY_TABS = [
  { id: 'all', label: 'All Achievements' },
  { id: 'inkspire', label: 'InkSpire' },
  { id: 'scholarcraft', label: 'ScholarCraft' },
  { id: 'talentpulse', label: 'TalentPulse' },
]

const getCategoryColor = (category = '') => {
  const cat = category.toLowerCase()
  if (cat.includes('inkspire') || cat.includes('penreach')) {
    return 'bg-amber-100 text-amber-800 border-amber-200'
  }
  if (cat.includes('scholarcraft') || cat.includes('paperpath')) {
    return 'bg-amber-100 text-amber-800 border-amber-200'
  }
  if (cat.includes('talentpulse') || cat.includes('talenttide')) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
  return 'bg-slate-100 text-slate-800 border-slate-200'
}

const getCategoryLabel = (category = '') => {
  const cat = category.toLowerCase()
  if (cat.includes('inkspire') || cat.includes('penreach')) return 'InkSpire'
  if (cat.includes('scholarcraft') || cat.includes('paperpath')) return 'ScholarCraft'
  if (cat.includes('talentpulse') || cat.includes('talenttide')) return 'TalentPulse'
  return 'Honors'
}

const Achievements = memo(() => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBatch, setSelectedBatch] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchImages()
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setAchievements(data)
          } else {
            setAchievements(MOCK_ACHIEVEMENTS)
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch achievements, using fallback:', err)
          setAchievements(MOCK_ACHIEVEMENTS)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // Filtered achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      // Category match
      const cat = (item.category || '').toLowerCase()
      const matchesCat =
        selectedCategory === 'all' ||
        cat === selectedCategory ||
        (selectedCategory === 'inkspire' && (cat === 'inkspire' || cat === 'penreach')) ||
        (selectedCategory === 'scholarcraft' && (cat === 'scholarcraft' || cat === 'paperpath')) ||
        (selectedCategory === 'talentpulse' && (cat === 'talentpulse' || cat === 'talenttide'))

      // Batch match
      const matchesBatch =
        selectedBatch === 'all' ||
        (item.batch && item.batch.toLowerCase() === selectedBatch.toLowerCase())

      // Search match
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.recipient && item.recipient.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.batch && item.batch.toLowerCase().includes(q))

      return matchesCat && matchesBatch && matchesSearch
    })
  }, [achievements, selectedCategory, selectedBatch, searchQuery])

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-4 border border-amber-100">
            <Trophy className="w-3.5 h-3.5" />
            Student Hall of Fame
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight mb-5">
            Student Achievements
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0f2545] to-[#c99a3c] mx-auto rounded-full mb-5" />
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            Celebrating academic milestones, creative publications, research awards, and premier honors accomplished by our students.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#0f2545] text-white shadow-md shadow-slate-300/40'
                      : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Batch Dropdown & Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Batch Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 p-2 font-medium"
                >
                  <option value="all">All Batches (36 - 42)</option>
                  {BATCH_LIST.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 text-gray-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm p-4 space-y-4">
                <Skeleton className="w-full aspect-[16/10] rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item, idx) => {
              const imageSrc = item.image || item.url || item.secure_url
              const catLabel = getCategoryLabel(item.category)
              const catColor = getCategoryColor(item.category)

              return (
                <div
                  key={item._id || item.publicId || idx}
                  onClick={() => setSelectedAchievement(item)}
                  className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Card Media Preview */}
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.title || "Achievement"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-slate-100 text-slate-600">
                        <Trophy className="w-12 h-12 stroke-1" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border shadow-sm ${catColor}`}>
                        {catLabel}
                      </span>
                    </div>
                    {item.batch && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/70 text-white backdrop-blur-sm">
                          {item.batch}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-slate-600 transition-colors line-clamp-2 mb-2">
                      {item.title || item.filename}
                    </h3>

                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                        {item.description}
                      </p>
                    )}

                    {/* Card Footer Details */}
                    <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between text-xs text-gray-500">
                      {item.recipient ? (
                        <div className="flex items-center gap-1.5 font-medium text-gray-700 truncate">
                          <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span className="truncate">{item.recipient}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                          <span>OGEA Initiative</span>
                        </div>
                      )}

                      {item.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 max-w-lg mx-auto">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No achievements found</h3>
            <p className="text-sm text-gray-500 mb-4">
              Try selecting another category, changing the batch filter, or adjusting your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedBatch('all')
                setSearchQuery('')
              }}
              className="px-4 py-2 bg-[#0f2545] text-white text-sm font-semibold rounded-xl hover:bg-[#1a3561] transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal / Detail View for selected achievement */}
        {selectedAchievement && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] bg-black">
                {selectedAchievement.image || selectedAchievement.url ? (
                  <img
                    src={selectedAchievement.image || selectedAchievement.url}
                    alt={selectedAchievement.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Trophy className="w-16 h-16" />
                  </div>
                )}
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white rounded-full p-2 text-sm transition"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex gap-2">
                    <Badge className={getCategoryColor(selectedAchievement.category)}>
                      {getCategoryLabel(selectedAchievement.category)}
                    </Badge>
                    {selectedAchievement.batch && (
                      <Badge variant="outline" className="font-semibold">
                        {selectedAchievement.batch}
                      </Badge>
                    )}
                  </div>
                  {selectedAchievement.date && (
                    <span className="text-xs text-gray-500">
                      {new Date(selectedAchievement.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedAchievement.title || selectedAchievement.filename}
                </h2>

                {selectedAchievement.recipient && (
                  <div className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>Conferred to: <strong>{selectedAchievement.recipient}</strong></span>
                  </div>
                )}

                {selectedAchievement.description && (
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {selectedAchievement.description}
                  </p>
                )}

                {selectedAchievement.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedAchievement.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
})

Achievements.displayName = 'Achievements'

export default Achievements