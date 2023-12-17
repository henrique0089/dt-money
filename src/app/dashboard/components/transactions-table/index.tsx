import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function TransactionsTable() {
  return (
    <Table className="mt-6">
      <TableBody>
        <TableRow>
          <TableCell>Desenvolvimento de site</TableCell>
          <TableCell className="text-brand-1">R$ 12.000,00</TableCell>
          <TableCell>Venda</TableCell>
          <TableCell>16/12/2023</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Desenvolvimento de site</TableCell>
          <TableCell className="text-red-600">- R$ 59,00</TableCell>
          <TableCell>Venda</TableCell>
          <TableCell>16/12/2023</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Desenvolvimento de site</TableCell>
          <TableCell className="text-red-600">- R$ 1.200,00</TableCell>
          <TableCell>Venda</TableCell>
          <TableCell>16/12/2023</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Desenvolvimento de site</TableCell>
          <TableCell className="text-brand-1">R$ 12.000,00</TableCell>
          <TableCell>Venda</TableCell>
          <TableCell>16/12/2023</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Desenvolvimento de site</TableCell>
          <TableCell className="text-brand-1">R$ 12.000,00</TableCell>
          <TableCell>Venda</TableCell>
          <TableCell>16/12/2023</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Desenvolvimento de site</TableCell>
          <TableCell className="text-brand-1">R$ 12.000,00</TableCell>
          <TableCell>Venda</TableCell>
          <TableCell>16/12/2023</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
