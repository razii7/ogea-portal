import { memo } from 'react'
import logoImg from '../../../assets/banners/baaner.jpg'
import { motion } from "motion/react"
import { Eye } from 'lucide-react'

const About = memo(() => {
    return (
        <motion.section
            id='about'
            className='py-24 px-4 md:px-8 lg:px-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {/* Main Title */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0f2545] text-xs font-semibold mb-4 border border-blue-100">
                    <Eye className="w-3.5 h-3.5" />
                    Who We Are
                </div>
                <h2 className='font-bold text-4xl md:text-5xl text-gray-900 mb-5 tracking-tight'>
                    About OGEA
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#0f2545] to-[#c99a3c] mx-auto rounded-full mb-5" />
                <p className='text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed'>
                    Where innovation meets creativity, and dreams transform into reality
                </p>
            </div>

            {/* Vision Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content - Our Vision */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className='w-1 h-8 bg-gradient-to-b from-[#c99a3c] to-[#0f2545] rounded-full flex-shrink-0'></div>
                        <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>
                            Our Vision
                        </h3>
                    </div>

                    <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
                        The Office of Guidance and External Activities (OGEA) serves as a key link between the campus and the outside world. It guides students in career planning, higher studies, and personal growth. The office organizes workshops, seminars, and training sessions, helps students secure internships and placements, and builds partnerships with industries and institutions. Through its initiatives, OGEA ensures students are well-prepared to face real-world challenges and explore new opportunities beyond academics.
                    </p>
                </div>

                {/* Right Content - Image */}
                <div className="flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md">
                        {/* <div className='rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-400'>
                            {/* <img src={logoImg} alt="OGEA Banner" className="w-full h-full object-cover" /> */}
                        </div> */}
                        {/* Decorative accent */}
                        <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-[#c99a3c]/20 to-[#0f2545]/10 rounded-2xl -z-10" />
                    </div>
                </div>
            </div>
        </motion.section>
    )
})

About.displayName = 'About'

export default About
