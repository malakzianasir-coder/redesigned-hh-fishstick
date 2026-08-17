import type { Metadata } from 'next'
import React from 'react'

import { LenisProvider } from '@/components/providers/LenisProvider'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { getSiteSettings } from '@/lib/content/loaders'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { LiveblocksContext } from '@/providers/LiveblocksContext'
import { FeedbackTools } from '@/components/feedback/FeedbackTools'
import { BrandLoader, PageProgress } from '@/components/BrandLoader'

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSiteSettings()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-white font-sans text-primary-blue antialiased">
        <Providers>
          {process.env.NEXT_PUBLIC_ENABLE_FEEDBACK === 'true' ? (
            <LiveblocksContext>
              <LenisProvider settings={settings.lenis}>
                <BrandLoader />
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
                <FeedbackTools />
                <PageProgress />
              </LenisProvider>
            </LiveblocksContext>
          ) : (
            <LenisProvider settings={settings.lenis}>
              <BrandLoader />
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <PageProgress />
            </LenisProvider>
          )}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Hijaz Hospital',
    template: '%s | Hijaz Hospital',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
