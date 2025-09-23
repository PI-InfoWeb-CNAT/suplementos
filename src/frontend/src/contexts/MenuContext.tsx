'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { MenuContextType } from '@/types/index'

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenu deve ser usado dentro de MenuProvider')

  return context
}