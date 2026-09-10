import React from 'react'
import Swiper from '../components/custom/hero/Hero'
import About from '../components/custom/about/About'
import Contact from './Contact'
import Stats from '@/components/custom/stats/Stats'
import UpcomingPrograms from '@/components/custom/programs/UpcomingPrograms'
import OutreachPrograms from '@/components/custom/programs/OutreachPrograms'

const Home = () => {
  return (
    <section>
      <Swiper />
      <Stats />
      <UpcomingPrograms />
      <OutreachPrograms />
      <About />
      <Contact />
    </section>
  )
}

export default Home