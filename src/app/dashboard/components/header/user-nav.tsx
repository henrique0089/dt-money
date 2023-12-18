'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useClerk, useUser } from '@clerk/nextjs'
import { Power, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserNav() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { push } = useRouter()

  async function handleSignOut() {
    await signOut()

    push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            <User2 className="h-5 w-5 stroke-zinc-600" />
          </AvatarFallback>
          <AvatarImage src={user?.imageUrl} alt={String(user?.firstName)} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-zinc-600 bg-zinc-700">
        <DropdownMenuLabel className="font-normal text-muted">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName}
            </p>
            <p className="text-xs leading-none text-zinc-400">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-600" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-zinc-400 hover:bg-zinc-900 focus:bg-zinc-800 focus:text-muted"
          >
            Sair
            <DropdownMenuShortcut>
              <Power className="h-5 w-5" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
