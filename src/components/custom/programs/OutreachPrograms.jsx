import { useState, useMemo, useEffect } from 'react'
import { motion } from 'motion/react'
import { 
  Calendar, 
  ArrowUpRight, 
  Award, 
  Sparkles, 
  Compass, 
  Users2,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPrograms } from '@/lib/programsStore'

const getStatusBadge = (status) => {
  if (status === 'Open Applications' || status === 'Active') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
  if (status === 'Upcoming') {
    return 'bg-amber-50 text-amber-700 border-amber-200'
  }
  return 'bg-slate-50 text-slate-600 border-slate-200'
}

const getWingBadge = (wing) => {
  if (wing === 'inkspire') return 'bg-amber-50 text-amber-800 border border-amber-100'
  if (wing === 'scholarcraft') return 'bg-teal-50 text-teal-800 border border-teal-100'
  if (wing === 'talentpulse') return 'bg-emerald-50 text-emerald-800 border border-emerald-100'
  return 'bg-slate-50 text-slate-800 border border-slate-100'
}

const OutreachPrograms = ({ onOpenReview }) => {
  const [selectedWing, setSelectedWing] = useState('all')
  const [allPrograms, setAllPrograms] = useState([])

  useEffect(() => {
    setAllPrograms(getPrograms())
  }, [])

  const filteredPrograms = useMemo(() => {
    if (selectedWing === 'all') return allPrograms
    return allPrograms.filter((p) => p.wing === selectedWing)
  }, [selectedWing, allPrograms])

  return (
    <section id="programs" className="py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0f2545] text-xs font-semibold mb-4 border border-blue-100">
            <Compass className="w-3.5 h-3.5" />
            Active Outreach Management
          </div>
          <h2 className="font-bold text-4xl md:text-5xl text-gray-900 tracking-tight mb-5">
            Outreach Programs & Opportunities
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0f2545] to-[#c99a3c] mx-auto rounded-full mb-5" />
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Directly coordinate and participate in academic fellowships, research symposia, publication drives, and state championships.
          </p>
        </div>

        {/* Wing Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'inkspire', label: 'InkSpire (Publications)' },
            { id: 'scholarcraft', label: 'ScholarCraft (Research)' },
            { id: 'talentpulse', label: 'TalentPulse (Spotlights)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedWing(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedWing === tab.id
                  ? 'bg-[#0f2545] text-white shadow-md shadow-slate-300/40'
                  : 'bg-slate-50 text-gray-600 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Thumbnail / Poster Image Header */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                {prog.posterUrl ? (
                  <img
                    src={prog.posterUrl}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0f2545]/10 to-[#c99a3c]/10 flex items-center justify-center">
                    <Compass className="w-10 h-10 text-slate-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-md ${getWingBadge(prog.wing)}`}>
                    {prog.wingLabel}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${getStatusBadge(prog.status)}`}>
                    {prog.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0f2545] transition-colors leading-snug">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>

                  {/* Program Details List */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        Deadline:
                      </span>
                      <span className="font-semibold text-gray-800">{prog.deadline}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Users2 className="w-3.5 h-3.5" />
                        Eligibility:
                      </span>
                      <span className="font-semibold text-gray-800">{prog.eligibility}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Award className="w-3.5 h-3.5" />
                        Quota:
                      </span>
                      <span className="font-semibold text-gray-800">{prog.seats}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={prog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0f2545] hover:bg-[#1a3561] text-white rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm"
                  >
                    <span>Apply & Guidelines</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {onOpenReview && (
                    <Button
                      onClick={() => onOpenReview(prog.wing)}
                      variant="outline"
                      className="text-xs px-3 py-2.5 rounded-xl border-slate-200 hover:bg-slate-50 text-gray-600 cursor-pointer"
                      title="Provide feedback or peer review on this program"
                    >
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Drive Participation Banner */}
        <div className="navy-surface rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-300/20">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#c99a3c] text-xs font-semibold border border-white/10">
              <Sparkles className="w-3 h-3" />
              Central Operations Drive
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Access Full Program Dossiers & Guidelines
            </h3>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Download application templates, evaluation rubrics, presentation slide masters, and guidelines directly from the official OGEA Google Drive repository.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#c99a3c] hover:bg-[#b8892e] text-white font-semibold text-sm shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>Open Google Drive</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {onOpenReview && (
              <Button
                onClick={() => onOpenReview('portal')}
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white font-medium text-sm rounded-xl cursor-pointer"
              >
                Submit Feedback
              </Button>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

export default OutreachPrograms
