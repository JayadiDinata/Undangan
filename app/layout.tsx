import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://undangan.applab.my.id'),
  title: 'Pernikahan Sarah & Ryan',
  description:
    'Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan Sarah & Ryan.',
  openGraph: {
    title: 'Undangan Pernikahan: Sarah & Ryan',
    description:
      'Sabtu, 11 Juli 2026 - Klik untuk melihat detail acara dan memberikan doa restu.',
    url: 'https://undangan.applab.my.id',
    siteName: 'Pernikahan Sarah & Ryan',
    images: [
      {
        url: '/img/SR.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sarah & Ryan',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undangan Pernikahan: Sarah & Ryan',
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
  themeColor: '#0A2F1F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
