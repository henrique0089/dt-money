import { ReactNode } from 'react'

interface CardProps {
  variant?: 'zinc' | 'green'
  children: ReactNode
}

export function Card({ variant = 'zinc', children }: CardProps) {
  return (
    <div
      data-variant={variant}
      className="data-[variant=green]:bg-brand-1 rounded-md p-8 data-[variant=zinc]:bg-zinc-700"
    >
      {children}
    </div>
  )
}

export function CardHeader({ children }: CardProps) {
  return (
    <header className="flex items-center justify-between text-zinc-300">
      {children}
    </header>
  )
}
