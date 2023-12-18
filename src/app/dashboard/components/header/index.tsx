import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs'
import { Plus, User2 } from 'lucide-react'
import Image from 'next/image'

export async function Header() {
  const user = await currentUser()

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

        <Avatar>
          <AvatarFallback>
            <User2 className="h-5 w-5 stroke-zinc-600" />
          </AvatarFallback>
          <AvatarImage src={user?.imageUrl} alt={String(user?.firstName)} />
        </Avatar>
      </div>
    </header>
  )
}
