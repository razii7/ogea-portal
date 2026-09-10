import { motion } from 'motion/react'
import { memo, forwardRef } from 'react'

/**
 * Animated section wrapper with fade-in-up animation
 */
export const AnimatedSection = memo(forwardRef(({ 
  children, 
  className = '', 
  id,
  delay = 0,
  ...props 
}, ref) => (
  <motion.section
    ref={ref}
    id={id}
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{
      duration: 0.4,
      delay,
      ease: [0.25, 0.1, 0.25, 1]
    }}
    {...props}
  >
    {children}
  </motion.section>
)))

AnimatedSection.displayName = 'AnimatedSection'

/**
 * Animated container with scale animation
 */
export const AnimatedCard = memo(({ 
  children, 
  className = '', 
  delay = 0,
  ...props 
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    {...props}
  >
    {children}
  </motion.div>
))

AnimatedCard.displayName = 'AnimatedCard'

export default { AnimatedSection, AnimatedCard }
