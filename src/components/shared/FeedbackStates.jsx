import { memo } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

/**
 * Reusable error message component
 */
export const ErrorMessage = memo(({ 
  message = 'Something went wrong', 
  onRetry,
  className = '' 
}) => (
  <div className={`bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center max-w-2xl mx-auto ${className}`}>
    <div className="flex items-center justify-center gap-2 mb-2">
      <AlertCircle className="w-5 h-5" />
      <span className="font-medium">Error</span>
    </div>
    <p>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    )}
  </div>
))

ErrorMessage.displayName = 'ErrorMessage'

/**
 * Empty state component
 */
export const EmptyState = memo(({ 
  title = 'No data found',
  description,
  action,
  actionLabel = 'Take action',
  className = ''
}) => (
  <div className={`text-center py-12 ${className}`}>
    <p className="text-gray-500 text-xl">{title}</p>
    {description && (
      <p className="text-gray-400 mt-2">{description}</p>
    )}
    {action && (
      <button
        onClick={action}
        className="mt-4 px-4 py-2 text-sm bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
))

EmptyState.displayName = 'EmptyState'

export default { ErrorMessage, EmptyState }
