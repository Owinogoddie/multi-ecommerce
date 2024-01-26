import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <body >
        
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        
        </body>
    </html>
    </ClerkProvider>
  )
}
