import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, MapPin, ExternalLink, Sparkles, Users2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getUpcomingPrograms } from '@/lib/programsStore'

const UpcomingPrograms = () => {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    setPrograms(getUpcomingPrograms())
  }, [])

  if (programs.length === 0) return null

  const [featured, ...rest] = programs

  return (
    <section id="upcoming" className="py-24 px-4 md:px-8 lg:px-16 navy-surface text-white rounded-3xl mx-2 md:mx-4 lg:mx-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c99a3c] text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Upcoming Programs
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4">
            What&apos;s Coming Up Next
          </h2>
          <div className="w-16 h-1 gold-divider mx-auto rounded-full" />
        </div>

        {/* Featured program with poster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[340px_1fr] gap-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <div className="relative h-64 md:h-full">
            <img
              src={featured.posterUrl}
              alt={`${featured.title} poster`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 md:hidden" />
          </div>
          <div className="p-7 md:p-9 flex flex-col justify-center gap-4">
            <span className="inline-flex w-fit items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-[#c99a3c]/15 text-[#c99a3c] border border-[#c99a3c]/30">
              {featured.wingLabel}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold leading-snug">{featured.title}</h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300 pt-1">
              <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-[#c99a3c]" /> {featured.eventDate}</span>
              <span className="flex items-center gap-1.5"><Users2 className="w-4 h-4 text-[#c99a3c]" /> {featured.eligibility}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#c99a3c]" /> {featured.seats}</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c99a3c] hover:bg-[#b8892e] text-white font-semibold text-sm transition-all duration-200"
              >
                Official Details <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 font-semibold text-sm transition-all duration-200"
              >
                Apply via Student Portal
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Other upcoming programs */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/8 transition-all duration-300 flex flex-col group"
              >
                {p.posterUrl && (
                  <div className="relative h-36 w-full overflow-hidden shrink-0 bg-black/20">
                    <img
                      src={p.posterUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-[#c99a3c] border border-white/10 backdrop-blur-md">
                      {p.wingLabel}
                    </span>
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {!p.posterUrl && <span className="text-xs font-bold text-[#c99a3c]">{p.wingLabel}</span>}
                    <h4 className="font-semibold text-sm leading-snug text-white group-hover:text-amber-200 transition-colors">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#c99a3c]" /> {p.eventDate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default UpcomingPrograms
