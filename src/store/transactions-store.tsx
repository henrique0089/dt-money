import { create } from 'zustand'

export type Transaction = {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface TransactionsStore {
  transactions: Transaction[]
  addTransaction(transaction: Transaction): void
  setTransactions(transactions: Transaction[]): void
  setTotal(value: number): void
  total: number
}

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  transactions: [],
  addTransaction(transaction: Transaction) {
    set((state) => ({ transactions: [transaction, ...state.transactions] }))
  },
  setTransactions(transactions: Transaction[]) {
    set(() => ({ transactions }))
  },
  total: 0,
  setTotal(value: number) {
    set(() => ({ total: value }))
  },
}))
