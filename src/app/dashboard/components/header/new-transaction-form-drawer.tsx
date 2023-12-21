/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabaseClient } from '@/lib/suabase'
import { Transaction, useTransactionsStore } from '@/store/transactions-store'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ArrowDownCircle, ArrowUpCircle, Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Drawer } from 'vaul'
import { z } from 'zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.coerce.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputsType = z.infer<typeof newTransactionFormSchema>

export function NewTransactionFormDrawer() {
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

    const { error, data } = await supabase
      .from('transactions')
      .insert({
        'description': description,
        'type': type,
        'category': category,
        'price': price * 100,
        'user_id': userId,
      })
      .select('*')
      .single()

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
    <Drawer.Root open={open} onOpenChange={setOpen} shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button className="h-10 w-10 rounded-full p-0">
          <Plus />
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-zinc-800/80" />
        <Drawer.Content className="fixed hidden max-[500px]:flex bottom-0 left-0 right-0 z-40 flex-col rounded-t-2xl bg-zinc-700 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-foreground">
              Nova transação
            </h2>

            <Drawer.Close>
              <X className="stroke-zinc-500" />
            </Drawer.Close>
          </div>

          <form
            onSubmit={handleSubmit(handleCreateNewTransaction)}
            className="mt-8 flex flex-col gap-4"
          >
            <Input placeholder="Descrição" {...register('description')} className="h-[50px]" />
            <Input placeholder="Preço" type="number" {...register('price')} className="h-[50px]" />
            <Input placeholder="Categoria" {...register('category')} className="h-[50px]" />

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

            <Button disabled={isSubmitting} className="mt-10 h-[50px]">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
