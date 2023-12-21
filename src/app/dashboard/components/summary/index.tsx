'use client'

import { useMemo } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useTransactionsStore } from '@/store/transactions-store'
import { formatPrice } from '@/utils/format-price'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'
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
    <section className="mx-auto -mt-12 w-full max-w-[70rem] px-6 max-[500px]:-mt-20">
      <div className="hidden max-[500px]:block">
        <Swiper spaceBetween={16} slidesPerView={1.25}>
          <SwiperSlide>
            <Card>
              <CardHeader>
                <span>Entradas</span>
                <ArrowUpCircle className="stroke-brand-2" />
              </CardHeader>

              <strong className="mt-4 block text-[2rem] text-muted">
                {formatPrice(summary.income)}
              </strong>
            </Card>
          </SwiperSlide>

          <SwiperSlide>
            <Card>
              <CardHeader>
                <span>Saídas</span>
                <ArrowDownCircle className="stroke-red-700" />
              </CardHeader>

              <strong className="mt-4 block text-[2rem] text-muted">
                {formatPrice(summary.outcome)}
              </strong>
            </Card>
          </SwiperSlide>

          <SwiperSlide>
            <Card variant="green">
              <CardHeader>
                <span>Total</span>
                <DollarSign className="stroke-muted" />
              </CardHeader>

              <strong className="mt-4 block text-[2rem] text-muted">
                {formatPrice(summary.total)}
              </strong>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="grid grid-cols-3 gap-8 max-[500px]:hidden">
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
      </div>
    </section>
  )
}
