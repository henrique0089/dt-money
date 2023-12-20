/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { supabaseClient } from '@/lib/suabase'
import { Transaction, useTransactionsStore } from '@/store/transactions-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ArrowDownCircle, ArrowUpCircle, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputsType = z.infer<typeof newTransactionFormSchema>

export function NewTransactionDialog() {
  const [open, setOpen] = useState(false)
  const { addTransaction } = useTransactionsStore()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionFormInputsType>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  const { userId, getToken } = useAuth()

  async function handleCreateNewTransaction({
    description,
    category,
    price,
    type,
  }: newTransactionFormInputsType) {
    const token = await getToken({ template: 'dtmoney-supabase' })

    if (!token) return

    const supabase = await supabaseClient(token)

    const { error, data } = await supabase.from('transactions').insert({
      'description': description,
      'type': type,
      'category': category,
      'price': price * 100,
      'user_id': userId,
    }).select('*').single()

    if (error) {
      console.log(error)
    }

    if (!data) return

    const transaction = data as Transaction

    addTransaction(transaction)

    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Nova transação
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-700">
        <DialogHeader className="stroke-muted text-muted">
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateNewTransaction)}
          className="mt-8 flex flex-col gap-4"
        >
          <Input placeholder="Descrição" {...register('description')} />
          <Input placeholder="Preço" type="number" {...register('price')} />
          <Input placeholder="Categoria" {...register('category')} />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-2 grid grid-cols-2 gap-4"
                >
                  <RadioGroup.Item
                    value="income"
                    className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-600 p-4 text-zinc-300 transition-colors data-[state=checked]:bg-brand-1 data-[state=checked]:text-muted data-[state=unchecked]:hover:bg-zinc-600/80"
                  >
                    <ArrowUpCircle className="stroke-brand-1 group-data-[state=checked]:stroke-muted" />
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value="outcome"
                    className="group flex cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-600 p-4 text-zinc-300 transition-colors data-[state=checked]:bg-red-700 data-[state=checked]:text-muted data-[state=unchecked]:hover:bg-zinc-600/80"
                  >
                    <ArrowDownCircle className="stroke-red-700 group-data-[state=checked]:stroke-muted" />
                    Saída
                  </RadioGroup.Item>
                </RadioGroup.Root>
              )
            }}
          />

          <Button disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Cadastrar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
