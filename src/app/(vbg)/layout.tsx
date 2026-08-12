import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internal Status Report',
  robots: { index: false, follow: false },
}

export default function VbgLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400..600&family=Geist+Mono:wght@400..600&display=swap"
          rel="stylesheet"
        />
        <link href="https://vercel.com/geist/vercel-brand.css" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-board {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: var(--vbg-space-6);
            align-items: start;
            margin-top: var(--vbg-space-8);
          }
          @media (max-width: 768px) {
            .custom-board {
              grid-template-columns: 1fr;
            }
          }
          .custom-board-column {
            display: flex;
            flex-direction: column;
            gap: var(--vbg-space-4);
          }
          .custom-column-header {
            border-bottom: 1px solid var(--vbg-border-default);
            padding-bottom: var(--vbg-space-2);
            margin-bottom: var(--vbg-space-2);
          }
          .custom-card {
            border: 1px solid var(--vbg-border-default);
            border-radius: var(--vbg-radius-small);
            padding: var(--vbg-space-4);
            background: var(--vbg-surface-secondary);
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
            transition: transform 0.1s;
          }
          .custom-card:hover {
            transform: translateY(-2px);
            border-color: var(--vbg-border-strong);
          }
          .custom-company-name {
            font-family: "Geist Mono", monospace;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: -0.02em;
          }
          .mt-2 { margin-top: var(--vbg-space-2); }
        `}} />
      </head>
      <body className="vbg-report">
        {children}
      </body>
    </html>
  )
}
