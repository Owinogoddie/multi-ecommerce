import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { Inter } from 'next/font/google'
import React from 'react'

const inter=Inter({subsets:["latin"]})
const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    
    <html lang='en'>
        <body className={inter.className}>
        <ToastProvider/>
        <ModalProvider/>
            {children}
        </body>
    </html>
  )
}

export default Layout