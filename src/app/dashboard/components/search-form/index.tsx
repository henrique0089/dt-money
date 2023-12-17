'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchForm() {
  return (
    <form className="flex gap-4">
      <Input placeholder="Busque uma transação" className="flex-1" />
      <Button variant="outline" className="group">
        <Search className="stroke-brand-1 group-hover:stroke-primary-foreground h-5 w-5" />
        <span className="text-brand-1 group-hover:text-primary-foreground">
          Buscar
        </span>
      </Button>
    </form>
  )
}
