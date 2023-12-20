'use client'

import { useTransactionsStore } from '@/store/transactions-store'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationLink } from './pagination-link'

interface PagninationProps {
  perPage?: number
  currentPage?: number
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  perPage = 10,
  currentPage = 1,
}: PagninationProps) {
  const { total } = useTransactionsStore()

  const lastPage = Math.ceil(total / perPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <div className="flex items-center gap-2">
      {currentPage > 1 ? (
        <PaginationLink
          href={`/dashboard?page=${currentPage - 1}`}
          className="bg-transparent"
        >
          <ChevronLeft className="h-6 w-6 stroke-brand-1" />
        </PaginationLink>
      ) : (
        <button
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent"
        >
          <ChevronLeft className="h-6 w-6 stroke-zinc-600" />
        </button>
      )}

      {currentPage > 2 && (
        <>
          <PaginationLink href={'/dashboard?page=1'}>1</PaginationLink>

          {currentPage > 3 && (
            <p className="w-8 text-center text-zinc-400">...</p>
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => (
          <PaginationLink
            href={`/dashboard?page=${page}`}
            key={page}
            active={Number(currentPage) === page}
          >
            {page}
          </PaginationLink>
        ))}

      <PaginationLink href={`/dashboard?page=${currentPage}`} active>
        {currentPage}
      </PaginationLink>

      {nextPages.length > 0 &&
        nextPages.map((page) => (
          <PaginationLink
            href={`/dashboard?page=${page}`}
            key={page}
            active={Number(currentPage) === page}
          >
            {page}
          </PaginationLink>
        ))}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <p className="w-8 text-center text-zinc-400">...</p>
          )}

          <PaginationLink href={`/dashboard?page=${lastPage}`} key={lastPage}>
            {lastPage}
          </PaginationLink>
        </>
      )}

      {currentPage < lastPage ? (
        <PaginationLink
          href={`/dashboard?page=${currentPage + 1}`}
          className="bg-transparent"
        >
          <ChevronRight className="h-6 w-6 stroke-brand-1" />
        </PaginationLink>
      ) : (
        <button
          disabled
          className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent"
        >
          <ChevronRight className="h-6 w-6 stroke-zinc-600" />
        </button>
      )}
    </div>
  )
}
