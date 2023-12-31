'use client'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { supabaseClient } from '@/lib/suabase'
import { Transaction, useTransactionsStore } from '@/store/transactions-store'
import { formatPrice } from '@/utils/format-price'
import { useAuth } from '@clerk/nextjs'
import dayjs from 'dayjs'
import { useEffect } from 'react'

interface TransactionsTableProps {
  perPage?: number
  currentPage?: number
}

export function TransactionsTable({
  perPage = 5,
  currentPage = 1,
}: TransactionsTableProps) {
  const { transactions, setTransactions, setTotal, setAllTransactions } =
    useTransactionsStore()

  const { getToken, userId } = useAuth()

  useEffect(() => {
    async function loadTransactions() {
      const token = await getToken({ template: 'dtmoney-supabase' })

      if (!token) return

      const supabase = await supabaseClient(token)

      const from = (currentPage - 1) * perPage

      const to = from + perPage

      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      const transactions = data?.slice(from, to) as Transaction[]
      setTotal(data?.length ?? 0)

      setAllTransactions(data as Transaction[])
      setTransactions(transactions)
    }

    loadTransactions()
  }, [
    currentPage,
    getToken,
    perPage,
    setAllTransactions,
    setTotal,
    setTransactions,
    userId,
  ])

  return (
    <Table className="mt-6">
      <TableBody>
        {transactions.map((t) => (
          <TableRow key={t.id}>
            <TableCell>
              <div className="max-[500px]:w-60">{t.description}</div>
            </TableCell>
            <TableCell
              data-type={t.type}
              className="data-[type=income]:text-brand-1 data-[type=outcome]:text-red-700"
            >
              <div className="max-[500px]:w-32">
                {t.type === 'income'
                  ? formatPrice(t.price)
                  : `- ${formatPrice(t.price)}`}
              </div>
            </TableCell>
            <TableCell>
              <div className="max-[500px]:w-32">{t.category}</div>
            </TableCell>
            <TableCell>{dayjs(t.createdAt).format('DD/MM/YYYY')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
