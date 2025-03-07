import React from 'react'
import { auth } from '@/lib/auth'
import Sidebar from '@/components/Layout/Sidebar'

const Layout = async ({
  children,                
}: {
  children: React.ReactNode
}) => {
  const session = await auth();
  if (!session || !session.user?.name) {
    return <>notFound</>
  }
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="w-full flex-none md:w-64">
      <Sidebar />
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  </div>
  )
}

export default Layout