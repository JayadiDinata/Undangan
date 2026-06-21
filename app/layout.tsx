import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://undangan.applab.my.id'),
  title: 'Pernikahan Sarah & Riad',
  description:
    'Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan Sarah & Riad.',
  openGraph: {
    title: 'Undangan Pernikahan: Sarah & Riad',
    description:
      'Sabtu, 11 Juli 2026 - Klik untuk melihat detail acara dan memberikan doa restu.',
    url: 'https://undangan.applab.my.id',
    siteName: 'Pernikahan Sarah & Riad',
    images: [
      {
        url: '/img/SR.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sarah & Riad',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undangan Pernikahan: Sarah & Riad',
    description:
      'Sabtu, 11 Juli 2026 - Klik untuk melihat detail acara dan memberikan doa restu.',
    images: ['/img/SR.jpeg'],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0d2818',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Meow+Script&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200&family=Scheherazade+New:wght@400;700"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
