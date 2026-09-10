import { memo } from 'react'
import { motion } from 'motion/react'
import { fadeInUpVariant } from '@/lib/constants'

/**
 * Reusable page header component with title, description, and divider
 */
export const PageHeader = memo(({ title, description, className = '' }) => {
  return (
    <motion.div 
      className={`text-center mb-12 ${className}`}
      {...fadeInUpVariant}
    >
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4">
        {title}
      </h1>
      <hr className="mx-auto text-gray-300 my-4 w-1/4" />
      {description && (
        <p className="text-gray-500 text-lg md:text-xl max-w-4xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
})

PageHeader.displayName = 'PageHeader'

export default PageHeader
