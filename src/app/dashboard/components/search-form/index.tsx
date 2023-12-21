'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabaseClient } from '@/lib/suabase'
import { Transaction, useTransactionsStore } from '@/store/transactions-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchFormSchema = z.object({
  search: z.string(),
})

type searchFormData = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { setTransactions, setTotal } = useTransactionsStore()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<searchFormData>({
    resolver: zodResolver(searchFormSchema),
  })

  const { getToken } = useAuth()

  async function handleSearch({ search }: searchFormData) {
    const token = await getToken({ template: 'dtmoney-supabase' })

    if (!token) return

    const supabase = await supabaseClient(token)

    const { error, data } = await supabase
      .from('transactions')
      .select('*')
      .ilike('description', `%${search}%`)

    if (error) console.log(error)

    setTransactions(data as Transaction[])
    if (data) setTotal(data.length)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex gap-4">
      <Input
        placeholder="Busque uma transação"
        {...register('search')}
        className="flex-1"
      />
      <Button variant="outline" disabled={isSubmitting} className="group">
        {isSubmitting ? (
          <Loader2 className="animate-spin stroke-primary-foreground" />
        ) : (
          <>
            <Search className="h-5 w-5 stroke-brand-1 group-hover:stroke-primary-foreground" />
            <span className="text-brand-1 group-hover:text-primary-foreground max-[500px]:hidden">
              Buscar
            </span>
          </>
        )}
      </Button>
    </form>
  )
}
