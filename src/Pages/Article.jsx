import { useCallback, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleView from '../components/custom/articleview/ArticleView'
import { ArticleDetailSkeleton } from '@/components/shared'
import { Badge } from '../components/ui/badge'
import { fetchArticleById } from '@/services/api'

// Error component
const ArticleError = ({ error, onBack }) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
    <Badge variant="destructive" className="mb-4">Error</Badge>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
    <p className="text-gray-600 mb-6 max-w-md text-center">{error || "The article you're looking for doesn't exist or could not be loaded."}</p>
    <button 
      onClick={onBack}
      className="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition font-medium cursor-pointer shadow-sm"
    >
      Back to Literary Works
    </button>
  </div>
)

const Article = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleBackToWorks = useCallback(() => navigate('/works'), [navigate])

  useEffect(() => {
    let isMounted = true

    const loadArticle = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchArticleById(articleId)
        if (isMounted) {
          setArticle(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Article could not be found')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (articleId) {
      loadArticle()
    }

    return () => {
      isMounted = false
    }
  }, [articleId])

  if (loading) return <ArticleDetailSkeleton />
  if (error || !article) return <ArticleError error={error} onBack={handleBackToWorks} />

  return <ArticleView article={article} />
}

export default Article