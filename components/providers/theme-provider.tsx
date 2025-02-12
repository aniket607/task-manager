'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/store/theme-store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  useEffect(() => {
    // Remove both classes first
    document.documentElement.classList.remove('light', 'dark')

    if (theme === 'system') {
      // Handle system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      // Initial setup
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.add('light')
      }

      // Listen for system theme changes
      const listener = (e: MediaQueryListEvent) => {
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(e.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    } else {
      // Add the selected theme
      document.documentElement.classList.add(theme)
    }
  }, [theme])

  // Add data-theme attribute for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className={theme}>
      {children}
    </div>
  )
} 