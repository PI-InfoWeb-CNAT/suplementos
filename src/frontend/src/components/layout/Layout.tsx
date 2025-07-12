'use client'

import { usePathname } from 'next/navigation';

import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'
import { useMenu } from '@/context/MenuContext';
import { pageList } from '@/types/index';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { menuOpen, setMenuOpen } = useMenu();
  const pathname = usePathname();
  const pageName = pageList[pathname] || 'Página Inicial';

  return (
    <div className='flex flex-col'>
      <div className="relative flex gap-15 dt:px-48 nt-lg:px-24 tb:px-15 mb-lg:px-8 px-5 dt:py-16 py-12">
        <Sidebar />

        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-2 nt-sm:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <div className="relative z-1 flex-1 flex flex-col gap-15">
          <Topbar page={pageName} />
          <main className="flex-1 flex flex-col mb-sm:gap-10 gap-7">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
