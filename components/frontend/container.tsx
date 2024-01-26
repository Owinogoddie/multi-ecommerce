import React from 'react'


export const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='mx-auto max-w-7xl' >
        {children}
    </div>
  )
}