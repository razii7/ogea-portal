import { memo, useMemo } from 'react'
import { motion } from "motion/react"
import { Skeleton } from '../../ui/skeleton'
import { BookOpen, GraduationCap, PenBox, Library } from 'lucide-react'
import CountUp from '../countup/CountUp'
import useStatistics from '@/hooks/useStatistics'

// Stat items configuration template with new wing names
const STAT_CONFIG = [
  {
    label: 'Total',
    description: 'All Achievements',
    key: 'totalCount',
    fallbackKeys: ['totalCount', 'total'],
    icon: Library,
    color: 'navy',
  },
  {
    label: 'InkSpire',
    description: 'Publications',
    key: 'inkspireCount',
    fallbackKeys: ['inkspireCount', 'penreachCount'],
    icon: PenBox,
    color: 'gold',
  },
  {
    label: 'ScholarCraft',
    description: 'Seminar Papers',
    key: 'scholarcraftCount',
    fallbackKeys: ['scholarcraftCount', 'paperpathCount'],
    icon: BookOpen,
    color: 'teal',
  },
  {
    label: 'TalentPulse',
    description: 'Student Spotlights',
    key: 'talentpulseCount',
    fallbackKeys: ['talentpulseCount', 'talenttideCount'],
    icon: GraduationCap,
    color: 'emerald',
  },
]

const colorMap = {
  navy: { 
    bg: 'bg-[#0f2545]', 
    light: 'bg-blue-50', 
    text: 'text-[#0f2545]', 
    ring: 'ring-blue-100',
    gradient: 'from-[#0f2545] to-[#1e3a63]'
  },
  gold: { 
    bg: 'bg-[#c99a3c]', 
    light: 'bg-amber-50', 
    text: 'text-[#c99a3c]', 
    ring: 'ring-amber-100',
    gradient: 'from-amber-500 to-amber-600'
  },
  teal: { 
    bg: 'bg-teal-600', 
    light: 'bg-teal-50', 
    text: 'text-teal-600', 
    ring: 'ring-teal-100',
    gradient: 'from-teal-500 to-teal-600'
  },
  emerald: { 
    bg: 'bg-emerald-600', 
    light: 'bg-emerald-50', 
    text: 'text-emerald-600', 
    ring: 'ring-emerald-100',
    gradient: 'from-emerald-500 to-emerald-600'
  },
}

// Memoized StatCard component
const StatCard = memo(({ item, delay, index }) => {
  const Icon = item.icon
  const colors = colorMap[item.color]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${colors.gradient} rounded-2xl opacity-0 group-hover:opacity-[0.08] blur-sm transition-opacity duration-400`} />
      <div className="relative bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-300 cursor-default text-center">
        
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 ${colors.light} ${colors.text} rounded-2xl mb-6 ring-4 ${colors.ring} mx-auto`}>
          <Icon className="w-6 h-6" strokeWidth={1.8} />
        </div>
        
        {/* Value */}
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-5xl font-bold text-gray-900 tracking-tight">
            <CountUp to={item.value} duration={1.5} delay={delay} />
          </span>
          <span className={`text-2xl font-bold ${colors.text}`}>+</span>
        </div>
        
        {/* Label & Description */}
        <h3 className="text-base font-bold text-gray-900 mb-1 tracking-wide">{item.label}</h3>
        <p className="text-sm text-gray-400 font-medium">{item.description}</p>
      </div>
    </motion.div>
  )
})

StatCard.displayName = 'StatCard'

// Skeleton Card component
const SkeletonCard = memo(({ index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-2xl p-8 border border-slate-100 flex flex-col items-center text-center"
  >
    <Skeleton className="w-14 h-14 rounded-2xl mb-6" />
    <Skeleton className="h-12 w-24 mb-3" />
    <Skeleton className="h-5 w-20 mb-2" />
    <Skeleton className="h-4 w-28" />
  </motion.div>
))

SkeletonCard.displayName = 'SkeletonCard'

const Stats = () => {
  const { loading, stats } = useStatistics()

  // Build stat items from API / fallback data
  const statItems = useMemo(() => {
    return STAT_CONFIG.map(item => {
      let val = stats?.[item.key]
      if (val === undefined || val === null) {
        for (const fallbackKey of item.fallbackKeys) {
          if (stats?.[fallbackKey] !== undefined && stats?.[fallbackKey] !== null) {
            val = stats[fallbackKey]
            break
          }
        }
      }
      return {
        ...item,
        value: typeof val === 'number' ? val : 0
      }
    })
  }, [stats])

  return (
    <section
      id='stats'
      className='py-24 px-4 md:px-8 lg:px-16'
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0f2545] text-xs font-semibold mb-4 border border-blue-100">
            <Library className="w-3.5 h-3.5" />
            Our Impact
          </div>
          <h2 className='font-bold text-4xl md:text-5xl text-gray-900 mb-5 tracking-tight'>
            Statistics
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0f2545] to-[#c99a3c] mx-auto rounded-full mb-5" />
          <p className='text-gray-500 text-lg leading-relaxed'>
            Numbers that reflect the dedication and talent of our students
          </p>
        </motion.div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item, index) => (
              <StatCard key={item.label} item={item} delay={index * 0.1} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Stats