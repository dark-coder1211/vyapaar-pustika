import React, { useState, useCallback, useEffect, useRef } from 'react'
import * as ExcelJS from 'exceljs'
import Pagination from '@mui/material/Pagination'
import type { POFilterData, PSOFilterData, SOFilterData, SOTrackingDispInterface, RRFilterData } from '../interfaces/page'
import  type { GateIn } from '@/app/(dashboard)/reports/gateinreport/GateInReport_modal'
import type { PendingIndentFilterData } from '@/app/(dashboard)/reports/pendingindent/PendingIndentReport_modal'
import type { StockValReportFilterData } from '@/app/(dashboard)/reports/stockreportval/StockReportVal_modal'
import type { StoreIssueReceiveFilterData } from '@/app/(dashboard)/reports/storeissuereceive/StoreIssueReceive_modal'
import type { FinishStockSummaryFilterData } from '@/app/(dashboard)/reports/finishstocksummary/FinishStock_modal'
import  type { GateVsInvoiceFilters } from '@/app/(dashboard)/reports/gatevsinvoice/GateVsInvoice_modal'
import type { StockQtyReportFilterData } from '@/app/(dashboard)/reports/stockreportqty/StockReportQty_modal'

interface Total {
  label: string
  value: string
}

interface TableComponentProps<T> {
  totals: Total[]
  onExportToExcel: (exportToExcel: () => void) => void
  filename: string
  filters: T
  filterLabels: Record<string, string>
  data: any[]
  columns: any[]
  sheetName?: string
  reportTitle: string
}

type FilterData =
  | POFilterData
  | PSOFilterData
  | SOTrackingDispInterface
  | SOFilterData
  | RRFilterData
  | GateIn
  | PendingIndentFilterData
  | StockValReportFilterData
  | StockQtyReportFilterData
  | StoreIssueReceiveFilterData
  | FinishStockSummaryFilterData
  | GateVsInvoiceFilters

const TableComponent = <T extends FilterData>({
  data,
  columns,
  totals,
  onExportToExcel,
  filename,
  filters,
  filterLabels,
  sheetName,
  reportTitle
}: TableComponentProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // const getVisibleColumns = () => columns.filter(column => column.visible)

  const getVisibleColumns = () => {
    const visibleCols = columns.filter(column => column.visible)

    // Add a default Serial No. column at the beginning
    return [
      {
        index: 1000,
        label: 'S.No',
        field: '__serial__', // dummy field name
        visible: true,
        align: 'center',
        width: 10
      },
      ...visibleCols
    ]
  }

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  const getCurrentPageData = () => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
    return data.slice(indexOfFirstItem, indexOfLastItem)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  // Memoize the exportToExcel function to avoid unnecessary re-renders
  const exportToExcel = useCallback(async () => {
    if (!data || data.length === 0) {
      openModal() // Open modal if there's no data
      return
    }

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(sheetName || 'Sheet1')

    const visibleColumns = getVisibleColumns()
    const totalColumns = visibleColumns.length

    // Title Row
    const titleRow = worksheet.addRow([reportTitle])
    worksheet.mergeCells(titleRow.number, 1, titleRow.number, totalColumns)
    titleRow.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } }
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF66BB6A' }
      }
    })
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Filter Row
    const filterHeadingRow = worksheet.addRow(['Selected Filters:'])
    filterHeadingRow.font = { bold: true }
    filterHeadingRow.eachCell(cell => {
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      }
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
    })

    const filterRow = []
    for (const [key, value] of Object.entries(filters)) {
      if (value && filterLabels.hasOwnProperty(key)) {
        const label = filterLabels[key]
        filterRow.push(`${label}: ${value}`)
      }
    }
    worksheet.addRow(filterRow)
    worksheet.addRow([])

    // Header Row
    const header = visibleColumns.map(column => column.label)
    const headerRow = worksheet.addRow(header)
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } }
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF66BB6A' }
      }
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
      }
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    })

    // Data Rows
    data.forEach((row, rowIndex) => {
      const rowData = visibleColumns.map(column => {
        if (column.field === '__serial__') {
          return rowIndex + 1 // serial number (starts at 1)
        }
        return row[column.field]
      })
      const rowInstance = worksheet.addRow(rowData)

      rowInstance.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        }
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
      })
    })

    worksheet.columns.forEach((col, index) => {
      let maxLength = 0
      worksheet.getColumn(index + 1).eachCell({ includeEmpty: true }, cell => {
        if (cell.value && cell.value.toString().length > maxLength) {
          maxLength = cell.value.toString().length
        }
      })

      col.width = Math.min(Math.max(maxLength + 2, 10), 20)
    })

    worksheet.getColumn(1).width = 30

    worksheet.views = [
      {
        zoomScale: 100,
        xSplit: 0,
        ySplit: 0,
        topLeftCell: 'A1'
      }
    ]

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.xlsx`
    link.click()
  }, [data, filters, filterLabels, filename, sheetName, reportTitle])

  // Use a ref to avoid unnecessary parent updates and infinite loop
  const lastExportFnRef = useRef<() => void>()
  useEffect(() => {
    if (lastExportFnRef.current !== exportToExcel) {
      onExportToExcel(exportToExcel)
      lastExportFnRef.current = exportToExcel
    }
  }, [exportToExcel])

  return (
    <div className='table-container'>
      {/* Table for Larger Screens */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='table-auto overflow-x-auto w-full border-collapse text-xs whitespace-nowrap'>
          <thead className='text-left bg-purple-400'>
            <tr className='text-white'>
              {getVisibleColumns().map(column => (
                <th
                  key={column.index}
                  className={`py-3 px-4 text-sm font-semibold ${column.className || ''}`}
                  style={{ width: column.width, textAlign: column.align }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={getVisibleColumns().length}
                  className='text-center py-4 text-slate-700 text-xl font-semibold'
                >
                  No records available
                </td>
              </tr>
            ) : (
              getCurrentPageData().map((row, rowIndex) => (
                <tr key={rowIndex} className='text-gray-800 even:bg-blue-50'>
                  {getVisibleColumns().map(column => (
                    <td
                      key={column.index}
                      className={`py-3 px-4 ${column.className || ''}`}
                      style={{ textAlign: column.align }}
                    >
                      {/* {row[column.field as keyof T] as React.ReactNode} */}
                      {column.field === '__serial__'
                        ? rowIndex + 1 + (currentPage - 1) * ITEMS_PER_PAGE
                        : (row[column.field as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* <div className='p-4 flex gap-x-10 text-slate-700  font-semibold'>
          {totals.map((total, index) => (
            <div key={index}>
              {total.label}: {total.value}
            </div>
          ))}
        </div> */}
        <div className='p-4 flex flex-wrap items-center justify-center gap-x-6 text-slate-700 font-semibold text-sm bg-white border-t border-gray-200'>
          {totals.map((total, index) => (
            <div key={index} className='flex items-center gap-x-3'>
              <span className='text-gray-500'>{total.label}:</span>
              <span className='text-slate-900'>{total.value}</span>
              {index !== totals.length - 1 && <span className='text-gray-300'>|</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className='overflow-y-auto max-h-full md:hidden mt-4 px-4 sm:px-6 bg-cyan-50'>
        {/* <div className='bg-white font-semibold rounded-xl shadow-lg mb-6 p-6 text-left text-cyan-800 sm:text-lg md:text-xl lg:text-2xl'>
          {totals.map((total, index) => (
            <div key={index} className='text-sm sm:text-base md:text-lg'>
              {total.label}: {total.value}
            </div>
          ))}
        </div> */}

        <div className='bg-white font-semibold rounded-xl shadow-lg mb-6 p-6 text-left text-cyan-800 sm:text-lg md:text-xl lg:text-2xl'>
          {totals.map((total, index) => (
            <div key={index} className='text-sm sm:text-base md:text-lg py-1'>
              <span className='text-black'>{total.label}:</span>{' '}
              <span className='text-green-800'>{total.value}</span>
            </div>
          ))}.

        </div>

        {data.length === 0 ? (
          <div className='bg-white font-semibold rounded-xl shadow-lg mb-6 p-6 text-center text-slate-700'>
            No records available


          </div>
        ) : (
          getCurrentPageData().map((row, rowindex) => (
            <div
              key={rowindex}
              className='bg-white rounded-xl shadow-lg mb-6 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out mt-7'
            >
              <div className='flex flex-col space-y-2'>
                {getVisibleColumns().map((column, colindex) => {
                  const isFirstColumn = colindex === 0
                  return (
                    <div
                      key={colindex}
                      className={`flex items-center space-x-2 ${isFirstColumn ? 'border-b-2 border-cyan-900 pb-2' : ''}`}
                    >
                      <span
                        className={`text-sm font-semibold ${isFirstColumn ? 'text-xl text-cyan-900 font-bold' : 'text-gray-600'}`}
                      >
                        {column.label}:
                      </span>
                      <span
                        className={`text-sm ${isFirstColumn ? 'text-xl text-cyan-800 font-semibold' : 'text-gray-700'}`}
                      >
                        {/* {row[column.field as keyof T] as React.ReactNode} */}
                        {column.field === '__serial__'
                          ? rowindex + 1 + (currentPage - 1) * ITEMS_PER_PAGE
                          : (row[column.field as keyof T] as React.ReactNode)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Component */}
      <div className='pagination-container flex justify-center py-4'>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn'>
          <div className='bg-white border-strokedark bg-boxdark p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-xl font-semibold text-gray-800 text-center mb-7'>No Data Available to Export</h2>
            <div className='flex justify-center'>
              <button
                onClick={closeModal}
                className='bg-blue-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition duration-200'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableComponent
