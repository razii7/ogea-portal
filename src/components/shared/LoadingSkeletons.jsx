import { memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Reusable loading skeleton for article cards
 */
export const ArticleCardSkeleton = memo(() => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 space-y-4">
    <Skeleton className="h-6 w-20 rounded-full" />
    <Skeleton className="h-6 w-full" />
    <Skeleton className="h-6 w-3/4" />
    <div className="space-y-2 pt-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="flex items-center justify-between pt-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-28" />
    </div>
  </div>
))

ArticleCardSkeleton.displayName = 'ArticleCardSkeleton'

/**
 * Grid of loading skeletons
 */
export const ArticleGridSkeleton = memo(({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ArticleCardSkeleton key={i} />
    ))}
  </div>
))

ArticleGridSkeleton.displayName = 'ArticleGridSkeleton'

/**
 * Loading skeleton for article detail page
 */
export const ArticleDetailSkeleton = memo(() => (
  <div className="min-h-screen py-10 px-4 md:px-8 lg:px-20 mx-auto max-w-4xl">
    <Skeleton className="h-6 w-24 mb-4" />
    <Skeleton className="h-12 w-3/4 mb-4" />
    <Skeleton className="h-6 w-1/3 mb-8" />
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === 2 ? 'w-5/6' : i === 4 ? 'w-4/5' : 'w-full'}`} 
        />
      ))}
    </div>
  </div>
))

ArticleDetailSkeleton.displayName = 'ArticleDetailSkeleton'

/**
 * Image grid skeleton for achievements page
 */
export const ImageGridSkeleton = memo(({ count = 9 }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className="aspect-[4/5] rounded-xl" />
    ))}
  </>
))

ImageGridSkeleton.displayName = 'ImageGridSkeleton'

/**
 * Full page loading fallback
 */
export const PageLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
))

PageLoader.displayName = 'PageLoader'

export default {
  ArticleCardSkeleton,
  ArticleGridSkeleton,
  ArticleDetailSkeleton,
  ImageGridSkeleton,
  PageLoader,
}

