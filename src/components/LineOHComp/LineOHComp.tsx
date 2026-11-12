import React, { useMemo, useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Parser } from 'expr-eval'
import { LineOHColumnsConfig } from '../Structure/page'
import type { clsDMSSordOH, OHLineProps } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'

// ---------- Format Helpers ----------
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

const roundOff = (value: number, roundOffType?: string): number => {
  if (typeof value !== 'number' || !isFinite(value)) return 0
  switch ((roundOffType || '').toUpperCase()) {
    case 'Y':
      return Math.round(value)
    case 'H':
      return Math.ceil(value)
    case 'L':
      return Math.floor(value)
    case 'D':
    default:
      return parseFloat(value.toFixed(6))
  }
}

const convertSQLCaseToTernary = (formula: string): string => {
  const regex = /CASE\s+WHEN\s+(.*?)\s+THEN\s+(.*?)\s+ELSE\s+(.*?)\s+END/gi
  return formula.replace(regex, (_, cond, thenVal, elseVal) => {
    return `((${cond.trim()}) ? (${thenVal.trim()}) : (${elseVal.trim()}))`
  })
}

// ---------- Formula Evaluation ----------
const evaluateFormula = (item: clsDMSSordOH, OHList: clsDMSSordOH[], grossAmount: number): number => {
  let formula = item?.strFormulaString?.trim() || ''
  if (!formula) return 0

  formula = formula.replace(/\{(.*?)\}/g, '[$1]')

  for (const ref of OHList) {
    const code = ref.strExpShortCode?.toUpperCase()
    if (!code) continue

    let amt: number

    if (code === 'QTY') {
      amt = typeof ref.dblPer === 'string' ? parseFloat(ref.dblPer) : ref.dblPer ?? 0
    } else {
      amt = typeof ref.dblAmount === 'string' ? parseFloat(ref.dblAmount) : ref.dblAmount ?? 0
    }

    if (isNaN(amt)) amt = 0

    // Special case for IV (grossAmount)
    if (code === 'IV') amt = grossAmount

    formula = formula.replace(new RegExp(`\\[${code}\\]`, 'gi'), amt.toString())
  }

  formula = convertSQLCaseToTernary(formula)

  if (formula.match(/[\[\{].*?[\]\}]/)) {
    console.warn(`⚠️ Unresolved placeholders in formula: "${formula}" for ${item.strExpShortCode}`)
    return 0
  }

  try {
    const parser = new Parser()
    const result = parser.evaluate(formula)

    if (!isFinite(result)) {
      console.warn(`⚠️ Non-finite result (${result}) for ${item.strExpShortCode}`)
      return 0
    }

    if (item.FullValue !== 'Y') {
      const per = typeof item.dblPer === 'string' ? parseFloat(item.dblPer) : item.dblPer ?? 0
      if (isNaN(per)) return 0
      return (result * per) / 100
    }

    return result
  } catch (err) {
    console.error(`❌ Error in formula [${item.strExpShortCode}]:`, err)
    return 0
  }
}

// ---------- Helpers ----------
const FSetOHValue = (
  ExpShortCode: string,
  field: 'dblPer' | 'dblAmount',
  value: number,
  struct: clsDMSSordOH[]
): clsDMSSordOH[] =>
  struct.map(item =>
    item.strExpShortCode?.toUpperCase() === ExpShortCode.toUpperCase() ? { ...item, [field]: value } : item
  )

const isEqualList = (list1: clsDMSSordOH[], list2: clsDMSSordOH[]) => {
  if (list1.length !== list2.length) return false
  for (let i = 0; i < list1.length; i++) {
    const a = list1[i]
    const b = list2[i]
    if (a.dblAmount !== b.dblAmount || a.dblPer !== b.dblPer) return false
  }
  return true
}

// ---------- Business Logic Moved Out ----------
const calculateOHList = (
  inputList: clsDMSSordOH[],
  grossamount: number,
  Qty: number,
  igstper: number,
  cgstper: number,
  sgstper: number,
  rate: number,
  millrate: number
): clsDMSSordOH[] => {
  if (!Array.isArray(inputList) || inputList.length === 0) return []

  let updatedList = inputList.map(item => ({
    ...item,
    dblAmount: parseFloat(item.dblAmount as any) || 0,
    dblPer: parseFloat(item.dblPer as any) || 0
  }))

  updatedList = FSetOHValue('IGST', 'dblPer', igstper || 0, updatedList)
  updatedList = FSetOHValue('CGST', 'dblPer', cgstper || 0, updatedList)
  updatedList = FSetOHValue('SGST', 'dblPer', sgstper || 0, updatedList)

  updatedList = FSetOHValue('QTY', 'dblPer', Qty, updatedList)
  updatedList = FSetOHValue('RATE', 'dblAmount', rate, updatedList)
  updatedList = FSetOHValue('AGRRATE', 'dblAmount', millrate, updatedList)
  updatedList = FSetOHValue('AGRRATE', 'dblPer', millrate, updatedList)

  let changed = true
  let iteration = 0
  const maxIterations = 20

  while (changed && iteration < maxIterations) {
    iteration++
    changed = false

    updatedList = updatedList.map(item => {
      const code = item.strExpShortCode?.toUpperCase()
      if (!item.strFormulaString || ['RATE', 'AGRRATE'].includes(code)) return item

      const evaluated = evaluateFormula(item, updatedList, grossamount || 0)
      // const rounded = roundOff(evaluated, item.RoundOff)
      const rounded = evaluated

      if (rounded !== item.dblAmount) {
        changed = true
        return { ...item, dblAmount: rounded }
      }
      return item
    })
  }
  return updatedList
}

// ---------- Component ----------
interface LineOHCompProps extends OHLineProps {
  onUpdate: (list: clsDMSSordOH[]) => void
}

const LineOHComp: React.FC<LineOHCompProps> = ({
  ohList,
  grossamount,
  Qty,
  igstper,
  cgstper,
  sgstper,
  rate,
  millrate,
  onUpdate
}) => {
  console.log('ohList', ohList)
  const calculatedList = useMemo(() => {
    return calculateOHList(
      ohList,
      grossamount,
      parseFloat(Qty as any) || 0,
      igstper || 0,
      cgstper || 0,
      sgstper || 0,
      parseFloat(rate as any) || 0,
      parseFloat(millrate as any) || 0
    )
  }, [ohList, grossamount, Qty, igstper, cgstper, sgstper, rate, millrate])

  const [items, setItems] = useState<clsDMSSordOH[]>(calculatedList)

  // Sync local state when calculatedList changes (props changed)
  useEffect(() => {
    setItems(calculatedList)
  }, [calculatedList])

  // Keep track of previous list to avoid infinite updates
  const prevListRef = useRef<clsDMSSordOH[] | null>(null)

  // When items change, notify parent only if different
  useEffect(() => {
    if (!prevListRef.current || !isEqualList(prevListRef.current, items)) {
      prevListRef.current = items
      onUpdate(items)
    }
  }, [items, onUpdate])

  const handleBlur = (e: React.FocusEvent<HTMLTableCellElement>, idx: number, field: 'dblAmount' | 'dblPer') => {
    const text = e.currentTarget.textContent?.trim() ?? ''
    const newValue = text === '' ? 0 : parseFloat(text)

    if (!isNaN(newValue)) {
      setItems(prev => {
        const updated = [...prev]
        const oldValue = field === 'dblAmount' ? updated[idx].dblAmount : updated[idx].dblPer
        if (oldValue !== newValue) {
          updated[idx] = {
            ...updated[idx],
            [field]: newValue
          }
        }

        // Recalculate formulas after user edit
        const recalculated = calculateOHList(
          updated,
          grossamount,
          parseFloat(Qty as any) || 0,
          igstper || 0,
          cgstper || 0,
          sgstper || 0,
          parseFloat(rate as any) || 0,
          parseFloat(millrate as any) || 0
        )

        return recalculated
      })
    } else {
      // Revert to old value if invalid input
      e.currentTarget.textContent = String(field === 'dblAmount' ? items[idx].dblAmount : items[idx].dblPer ?? '')
    }
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 230,
        borderRadius: '10px',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #ccc',
        marginTop: '12px'
      }}
    >
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            {LineOHColumnsConfig.filter(col => col.visible).map(col => (
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
          {items.map((item, idx) => (
            <TableRow key={`${item.strExpShortCode}-${idx}`} hover>
              {LineOHColumnsConfig.filter(col => col.visible).map(col => {
                const field = col.field as keyof clsDMSSordOH
                const isAmountEditable = field === 'dblAmount' && item.AmtEditable?.toUpperCase() === 'Y'
                const isPerEditable = field === 'dblPer' && item.PerEditable?.toUpperCase() === 'Y'

                const isEditable = isAmountEditable || isPerEditable

                return (
                  <TableCell
                    key={String(col.field)}
                    align={col.align}
                    sx={{
                      p: 0.5,
                      fontSize: 11,
                      cursor: isEditable ? 'text' : 'default'
                    }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onFocus={e => {
                      const range = document.createRange()
                      range.selectNodeContents(e.currentTarget)
                      const sel = window.getSelection()
                      sel?.removeAllRanges()
                      sel?.addRange(range)
                    }}
                    onBlur={e =>
                      isAmountEditable
                        ? handleBlur(e, idx, 'dblAmount')
                        : isPerEditable
                          ? handleBlur(e, idx, 'dblPer')
                          : undefined
                    }
                  >
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

export default LineOHComp
