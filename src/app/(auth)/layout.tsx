
import Ball from '@/components/Layout/Ball';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex w-full h-screen bg-[#f1f1f1]'>
      {children}
      <Ball />
    </div>
    
  )
}

export default layout