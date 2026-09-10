import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, UserRoundPen, Clock } from 'lucide-react'
import { Badge } from '../../ui/badge'
import { decodeHtml, formatDate, truncateText } from '@/lib/utils'

const ArticleCard = memo(({ article }) => {
  const { _id, title, content, writer, category, batch, readTime, createdAt } = article

  return (
    <article className="h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg hover:shadow-slate-100/60 transition-all duration-300 border border-slate-100 hover:border-slate-200 overflow-hidden group font-manjari">
      <Link 
        to={`/works/${_id}`} 
        className="flex flex-col h-full p-6"
        aria-label={`Read article: ${decodeHtml(title)}`}
      >
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {category && (
            <Badge variant="default" className="bg-[#0f2545] hover:bg-[#1a3561] capitalize text-xs font-semibold">
              {category}
            </Badge>
          )}

          {batch && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
              {batch}
            </span>
          )}
        </div>

        {/* Title */}
        <header className="mb-3">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#0f2545] transition-colors duration-200 line-clamp-2 break-words font-manjari leading-snug">
            {decodeHtml(title)}
          </h2>
        </header>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-4 font-sans">
          {truncateText(content)}
        </p>

        {/* Footer - Author, Batch and Date */}
        <footer className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto font-sans">
          <div className="flex items-center gap-1.5 font-medium text-gray-800" aria-label={`Written by ${writer}`}>
            <UserRoundPen className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" aria-hidden="true" />
            <span className="truncate">{writer}</span>
          </div>

          <div className="flex items-center gap-3">
            {readTime && (
              <span className="hidden sm:inline-flex items-center gap-1 text-gray-400">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            )}
            {createdAt && (
              <time 
                className="flex items-center gap-1 text-gray-500" 
                dateTime={createdAt}
                aria-label={`Published on ${formatDate(createdAt)}`}
              >
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{formatDate(createdAt)}</span>
              </time>
            )}
          </div>
        </footer>
      </Link>
    </article>
  )
})

ArticleCard.displayName = 'ArticleCard'

export default ArticleCard