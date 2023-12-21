import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2 max-[500px]:grid-cols-1">
      <div className="flex items-center justify-center bg-zinc-900 max-[500px]:hidden">
        <Image src="/short-logo.svg" alt="" width={100} height={100} />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-4 px-10">
        <Image
          src="/short-logo.svg"
          alt=""
          width={40}
          height={40}
          className="absolute left-10 top-10"
        />

        <Button asChild className="w-full">
          <Link href="/sign-in">Entrar</Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link
            href="/sign-up"
            className="text-brand-1 hover:text-primary-foreground"
          >
            Criar Conta
          </Link>
        </Button>
      </div>
    </main>
  )
}
