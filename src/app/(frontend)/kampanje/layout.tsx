import React from 'react'
import KampanjeTabs from './KampanjeTabs'

export default function KampanjeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KampanjeTabs />
      {children}
    </>
  )
}
