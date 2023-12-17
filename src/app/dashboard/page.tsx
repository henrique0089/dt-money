import { Header } from './components/header'
import { SearchForm } from './components/search-form'
import { Summary } from './components/summary'
import { TransactionsTable } from './components/transactions-table'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-zinc-800">
      <Header />
      <Summary />

      <div className="mx-auto my-16 w-full max-w-[70rem] px-6">
        <SearchForm />

        <TransactionsTable />
      </div>
    </main>
  )
}
