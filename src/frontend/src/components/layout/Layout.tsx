'use client'

import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col'>
      <div className="relative flex gap-15 bodyPadding min-h-screen items-stretch dt:py-16 py-12">
        <Sidebar />
        <div className="relative z-1 flex-1 flex flex-col gap-15">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
