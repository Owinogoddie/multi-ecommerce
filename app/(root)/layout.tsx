import Footer from '@/components/frontend/footer'
import Navbar from '@/components/frontend/navbar'
import ModalProvider from '@/components/providers/modal-provider'
import ToastProvider from '@/components/providers/toast-provider'
import { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import React from 'react'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store',
}

const FrontLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <body className={urbanist.className}>
        <Navbar/>
        <ModalProvider/>
        <ToastProvider/>
        {children}
        <Footer/>        
        </body>
  )
}

export default FrontLayout