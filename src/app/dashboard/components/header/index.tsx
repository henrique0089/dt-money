import Image from 'next/image'
import { NewTransactionDialog } from './new-transaction-dialog'
import { NewTransactionFormDrawer } from './new-transaction-form-drawer'
import { UserNav } from './user-nav'

export async function Header() {
  return (
    <header className="h-[212px] bg-zinc-900 px-6 pt-6">
      <div className="flex justify-center max-[500px]:items-center max-[500px]:justify-between">
        <div className="hidden max-[500px]:block">
          <NewTransactionFormDrawer />
        </div>

        <Image src="/short-logo.svg" alt="" width={40} height={38} />

        <div className="hidden max-[500px]:block">
          <UserNav />
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-[70rem] items-center justify-between px-6 max-[500px]:hidden">
        <NewTransactionDialog />

        <UserNav />
      </div>
    </header>
  )
}
