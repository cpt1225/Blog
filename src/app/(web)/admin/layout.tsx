import React from 'react'
import { auth } from '@/lib/auth'

const Layout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = await auth();
  if(!session || !session.user?.name) {
    return <>notFound</>
  }
  return (
   <>{children}</>
  )
}

export default Layout