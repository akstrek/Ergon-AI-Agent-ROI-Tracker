import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ergon',
  description: 'Every Agent. Measured.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
