import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'DT Money',
  description: 'Financial app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          card: 'rounded-xl border bg-transparent text-card-foreground shadow border-zinc-600 p-6',
          headerTitle: 'text-muted',
          headerSubtitle: 'text-zinc-400',
          dividerLine: 'bg-zinc-600',
          dividerText: 'text-muted-foreground',
          formFieldLabelRow: 'mb-2',
          formFieldLabel:
            'text-sm text-muted font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          formFieldInput:
            'flex h-9 w-full rounded-md border border-zinc-600 bg-transparent px-3 py-1 text-sm text-muted shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted disabled:cursor-not-allowed disabled:opacity-50',
          formButtonPrimary:
            'inline-flex normal-case tracking-normal bg-muted text-zinc-900 shadow hover:bg-muted/90 h-9 px-4 py-2 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          socialButtonsBlockButton:
            'tracking-normal text-zinc-400 normal-case border border-zinc-600 bg-transparent shadow-sm hover:text-muted h-8 rounded-md px-3 text-xs inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted disabled:pointer-events-none disabled:opacity-50',
          footerActionText: 'text-zinc-400',
          footerActionLink: 'text-muted hover:text-muted hover:underline',
          formFieldWarningText: 'text-xs text-zinc-400',
          formFieldSuccessText: 'text-xs text-zinc-400',
        },
      }}
    >
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
