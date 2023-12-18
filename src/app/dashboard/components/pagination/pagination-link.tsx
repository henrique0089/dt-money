import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

interface PaginationLinkProps extends ComponentProps<'a'> {
  active?: boolean
}

export function PaginationLink({
  active = false,
  className,
  ...rest
}: PaginationLinkProps) {
  return (
    <a
      data-active={active}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-md bg-zinc-600 text-[#8D8D99] transition-colors hover:bg-zinc-600/90 data-[active=true]:bg-brand-1 data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-brand-1/75',
        className,
      )}
      {...rest}
    />
  )
}
