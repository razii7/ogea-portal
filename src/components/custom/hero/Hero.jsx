import { motion } from "motion/react"
import heroImg from '../../../assets/banners/bannerrrr.jpg'

const Hero = () => {
  return (
    <motion.div
      className='relative max-h-[60vw] lg:max-h-[80vh] mx-auto w-full lg:w-[92%] rounded-2xl flex items-center justify-center overflow-hidden shadow-xl mt-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <img 
        src={heroImg} 
        alt="OGEA – Office of Guidance & External Activities – 150 Milestone" 
        className='object-cover w-full h-full rounded-2xl'
        loading="eager"
      />
      {/* Subtle gradient overlay at bottom for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
    </motion.div>
  )
}

export default Hero
