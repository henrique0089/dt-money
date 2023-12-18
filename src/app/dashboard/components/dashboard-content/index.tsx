'use client'

export function DashboardContent() {
  return (
    <div className="mx-auto my-16 w-full max-w-[70rem] px-6">
      <SearchForm />

      <TransactionsTable />

      <div className="mx-auto mt-10">
        <Pagination totalCount={20} perPage={10} currentPage={15} />
      </div>
    </div>
  )
}
