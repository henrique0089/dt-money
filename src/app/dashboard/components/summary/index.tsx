import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'
import { Card, CardHeader } from './card'

export function Summary() {
  return (
    <section className="mx-auto -mt-12 grid w-full max-w-[70rem] grid-cols-3 gap-8 px-6">
      <Card>
        <CardHeader>
          <span>Entradas</span>
          <ArrowUpCircle className="stroke-brand-2" />
        </CardHeader>

        <strong className="text-muted mt-4 block text-[2rem]">
          R$ 17.400,00
        </strong>
      </Card>

      <Card>
        <CardHeader>
          <span>Saídas</span>
          <ArrowDownCircle className="stroke-red-700" />
        </CardHeader>

        <strong className="text-muted mt-4 block text-[2rem]">
          R$ 1.259,00
        </strong>
      </Card>

      <Card variant="green">
        <CardHeader>
          <span>Total</span>
          <DollarSign className="stroke-muted" />
        </CardHeader>

        <strong className="text-muted mt-4 block text-[2rem]">
          R$ 16.141,00
        </strong>
      </Card>
    </section>
  )
}
