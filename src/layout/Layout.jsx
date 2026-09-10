import React from 'react'
import { Analytics } from "@vercel/analytics/react"
import { Outlet } from 'react-router-dom'
import Header from '../components/custom/header/Header'
import Footer from '@/components/custom/footer/Footer'

const Layout = () => {
  return (
    <>
      {/* <CustomCursor /> */}
      <section className="header">
        <Header />
      </section>
      <main className='lg:px-6 md:px-4 px-2'>
        <Analytics />
        <Outlet />
      </main>
      <section>
        <Footer />
      </section>
    </>
  )
}

export default Layout