'use client'

import { useTransactionsStore } from '@/store/transactions-store'
import { formatPrice } from '@/utils/format-price'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'
import { useMemo } from 'react'
import { Card, CardHeader } from './card'

export function Summary() {
  const { allTransactions: transactions } = useTransactionsStore()

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return (
    <section className="mx-auto -mt-12 grid w-full max-w-[70rem] grid-cols-3 gap-8 px-6">
      <Card>
        <CardHeader>
          <span>Entradas</span>
          <ArrowUpCircle className="stroke-brand-2" />
        </CardHeader>

        <strong className="mt-4 block text-[2rem] text-muted">
          {formatPrice(summary.income)}
        </strong>
      </Card>

      <Card>
        <CardHeader>
          <span>Saídas</span>
          <ArrowDownCircle className="stroke-red-700" />
        </CardHeader>

        <strong className="mt-4 block text-[2rem] text-muted">
          {formatPrice(summary.outcome)}
        </strong>
      </Card>

      <Card variant="green">
        <CardHeader>
          <span>Total</span>
          <DollarSign className="stroke-muted" />
        </CardHeader>

        <strong className="mt-4 block text-[2rem] text-muted">
          {formatPrice(summary.total)}
        </strong>
      </Card>
    </section>
  )
}
