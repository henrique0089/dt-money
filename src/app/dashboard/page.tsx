import { Header } from './components/header'
import { Pagination } from './components/pagination'
import { SearchForm } from './components/search-form'
import { Summary } from './components/summary'
import { TransactionsTable } from './components/transactions-table'

export default function Dashboard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams?.page ? Number(searchParams.page) : 1

  return (
    <main className="min-h-screen">
      <Header />
      <Summary />

      <div className="mx-auto my-16 w-full max-w-[70rem] px-6">
        <SearchForm />

        <TransactionsTable />

        <div className="mx-auto mt-10 w-fit">
          <Pagination totalCount={200} perPage={10} currentPage={page} />
        </div>
      </div>
    </main>
  )
}
