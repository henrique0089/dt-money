import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { UserNav } from './user-nav'

export async function Header() {
  return (
    <header className="h-[212px] bg-zinc-900 px-6 pt-6">
      <div className="flex justify-center">
        <Image src="/short-logo.svg" alt="" width={40} height={38} />
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-[70rem] items-center justify-between px-6">
        <Button>
          <Plus />
          Nova transação
        </Button>

        <UserNav />
      </div>
    </header>
  )
}
