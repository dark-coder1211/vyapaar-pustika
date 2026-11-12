import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { HeaderOHColumnsConfig } from '../Structure/page'
import type { clsDMSSordOHHeader, OHHeaderProps } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'

// Format value helpers
const formatValue = (value: number, format: string): string => {
  switch (format) {
    case '0.000000':
      return value.toFixed(6)
    case '0':
      return Math.round(value).toString()
    case '0.00':
      return value.toFixed(2)
    default:
      return value.toString()
  }
}

const formatValueIfNeeded = (field: string, value: any): string => {
  if (value == null) return ''
  if (field === 'dblAmount' || field === 'dblPer') {
    const num = typeof value === 'number' ? value : parseFloat(value)
    if (isNaN(num)) return ''
    return formatValue(num, '0.00')
  }
  return String(value)
}

const HeaderOHComp = <T,>({ ohHeaderList }: OHHeaderProps<T>) => {
  // console.log('ohHeader', ohHeaderList)

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 295,
        zIndex: 0,
        borderRadius: '10px',
        overflowY: 'auto',
        position: 'relative',
        border: '0.5px solid #ccc'
      }}
    >
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            {HeaderOHColumnsConfig.filter(col => col.visible).map(col => (
              <TableCell
                key={String(col.index)}
                sx={{ p: 0.5, textAlign: col.align, fontSize: 13, fontWeight: 600 }}
                width={col.width}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ohHeaderList.map((item, idx) => (
            <TableRow key={idx} hover>
              {HeaderOHColumnsConfig.filter(col => col.visible).map(col => {
                const field = col.field as keyof clsDMSSordOHHeader
                return (
                  <TableCell key={String(col.field)} align={col.align} sx={{ p: 0.5, fontSize: 11 }}>
                    {formatValueIfNeeded(field as string, item[field])}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HeaderOHComp
