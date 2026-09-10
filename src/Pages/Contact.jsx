import React from 'react'
import details from '@/lib/details'
import { motion } from "motion/react"
import { Mail } from 'lucide-react'

const Contact = () => {
  return (
    <motion.section
      id='contact'
      className='py-24 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center min-h-[70vh]'
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
          <Mail className="w-3.5 h-3.5" />
          Reach Out
        </div>
        <h2 className='font-bold text-4xl md:text-5xl text-gray-900 mb-5 tracking-tight'>
          Get in Touch
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#0f2545] to-[#c99a3c] mx-auto rounded-full mb-5" />
        <p className='text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed'>
          Have questions? Want to collaborate? We&apos;d love to hear from you!
        </p>
      </div>
      {/* Details Section */}
      <article className='max-w-4xl mx-auto w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className='flex flex-col items-center text-center space-y-4 bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300'
            >
              <div className={`w-14 h-14 ${detail.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <detail.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>{detail.method}</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>{detail.info}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </article>
    </motion.section>
  )
}

export default Contact