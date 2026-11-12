'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, CircularProgress, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import React, { useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { BillWiseLedgerData, BillWiseLedgerFilters, GenericOrder } from './BillWiseLedger_modal'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useParams } from '@/context/paramcontext'
import { BillWiseLedgerReports } from './BillWiseLedger_action'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import BillWiseLedgerFilter from '@/components/BillWiseLedgerFilter/page'
import ExcelJS from 'exceljs'

const RenderStats = () => {
  const [exportFunction, setExportFunction] = useState<() => void>(() => () => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredfinancialdata, setFilteredFinancialData] = useState<BillWiseLedgerData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  // const [financialdata, setFinancialData] = useState<BillWiseLedgerData[]>([])

  const [filters, setFilters] = useState<BillWiseLedgerFilters>({
    AsOnDate: '',
    Site_Name: '',
    Site_Code: '',
    DistributorCode: '',
    DistributorName: '',
    AccountCode: '',
    AccountName: '',
    AccountGroupCode: '',
    AccountGroupName: '',
    ReportOn: '',
    ReportOnName: ''
  })

  const { Site_Code, companyid, UserName, bu } = useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const usePagination = <T extends GenericOrder>(
    data: T[],
    perPage: number,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
  ) => {
    const numPages = Math.ceil(data.length / perPage)
    const pagesList = Array.from({ length: numPages }, (_, index) => index)

    const paginatedData = data.slice(perPage * currentPage, perPage * (currentPage + 1))

    return { numPages, pagesList, paginatedData, setCurrentPage }
  }

  const perPage = 10
  const { numPages, paginatedData } = usePagination(filteredfinancialdata, perPage, currentPage, setCurrentPage)

  const groupByPName = (data: any[]) => {
    return data.reduce(
      (acc, client) => {
        const pName = client.PartyName || 'Unknown' // Default to 'Unknown' if PName is missing
        if (!acc[pName]) {
          acc[pName] = []
        }
        acc[pName].push(client)
        return acc
      },
      {} as { [key: string]: any[] }
    )
  }

  useEffect(() => {
    const today = new Date()

    setFilters(prevFilters => ({
      ...prevFilters,
      AsOnDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleExportExcel = async (): Promise<void> => {
    try {
      if (!filteredfinancialdata || filteredfinancialdata.length === 0) {
        openModal()
        return
      }

      const grouped = groupByPName(filteredfinancialdata)
      const workbook = new ExcelJS.Workbook()
      const sheet = workbook.addWorksheet('BillWiseLedger')

      // Define columns
      sheet.columns = [
        { header: 'Party Name', key: 'party', width: 30 },
        { header: 'Bill No.', key: 'billNo', width: 18 },
        { header: 'Bill Date', key: 'billDate', width: 15 },
        { header: 'Ref No.', key: 'refNo', width: 15 },
        { header: 'Ref Date', key: 'refDate', width: 15 },
        { header: 'Bill Amount', key: 'billAmount', width: 15 },
        { header: 'Net Receiveable', key: 'netReceive', width: 18 },
        { header: 'Credit Days', key: 'creditDays', width: 12 },
        { header: 'Due Date', key: 'dueDate', width: 15 },
        { header: 'Over Due Days', key: 'overDue', width: 12 }
      ]

      let currentRow = 1

      const titleRow = sheet.getRow(currentRow)
      titleRow.getCell(1).value = 'Bill Wise Ledger Report'
      titleRow.font = { bold: true, size: 16 }
      titleRow.alignment = { horizontal: 'center' }
      sheet.mergeCells(`A${currentRow}:J${currentRow}`)
      currentRow += 2

      const filterLabels: Record<string, string> = {
        AsOnDate: 'As On Date',
        Site_Name: 'Site',
        DistributorName: 'Distributor',
        AccountName: 'Account Name',
        AccountGroupName: 'Account Group Name',
        ReportOnName: 'Report On'
      }

      const appliedFilters = Object.entries(filters)
        .filter(([key, value]) => value && filterLabels[key])
        .map(([key, value]) => `${filterLabels[key]}: ${value}`)

      if (appliedFilters.length > 0) {
        const filterRow = sheet.getRow(currentRow)
        filterRow.getCell(1).value = `Applied Filters: ${appliedFilters.join(', ')}`
        filterRow.font = { italic: true, color: { argb: '555555' } }
        filterRow.alignment = { wrapText: true }
        sheet.mergeCells(`A${currentRow}:J${currentRow}`)
        currentRow += 2
      }

      // === 3️⃣ Header Row (only once) ===
      const headerRow = sheet.getRow(currentRow)
      headerRow.values = sheet.columns.map(c => c.header as ExcelJS.CellValue)
      headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' } // blue
      }
      headerRow.alignment = { horizontal: 'center' }
      currentRow++

      // === 4️⃣ Data Section (grouped by Party) ===
      for (const pName of Object.keys(grouped)) {
        const clients = grouped[pName]

        // Party header row
        const partyRow = sheet.getRow(currentRow)
        partyRow.getCell(1).value = pName
        partyRow.font = { bold: true, color: { argb: '004085' } }
        currentRow++

        let totalBillAmount = 0
        let totalNetReceive = 0
        let totalCredit = 0

        clients.forEach((client: BillWiseLedgerData) => {
          const billAmount = client.BillAmount || 0
          const netReceive = client.NetReceiveable || 0
          const credit = Math.abs(client.NetReceiveable >= 0 ? 0 : client.NetReceiveable)

          totalBillAmount += billAmount
          totalNetReceive += netReceive
          totalCredit += credit

          const row = sheet.getRow(currentRow)
          row.getCell(1).value = client.PartyName || ''
          row.getCell(2).value = client.BillNo || ''
          row.getCell(3).value = client.BillDate || ''
          row.getCell(4).value = client.RefNo || ''
          row.getCell(5).value = client.RefDate || ''
          row.getCell(6).value = billAmount
          row.getCell(7).value = netReceive
          row.getCell(8).value = client.CreditDays || ''
          row.getCell(9).value = client.PaymentDueDate || ''
          row.getCell(10).value = client.OverDueDays || ''

          row.getCell(6).numFmt = '#,##0.00'
          row.getCell(7).numFmt = '#,##0.00'
          currentRow++
        })

        // Totals per party
        const totalRow = sheet.getRow(currentRow)
        totalRow.getCell(5).value = 'Total:'
        totalRow.getCell(6).value = totalBillAmount
        totalRow.getCell(7).value = totalNetReceive
        totalRow.getCell(8).value = 'On Credit:'
        totalRow.getCell(9).value = totalCredit
        totalRow.font = { bold: true }
        totalRow.getCell(6).numFmt = '#,##0.00'
        totalRow.getCell(7).numFmt = '#,##0.00'
        totalRow.getCell(9).numFmt = '#,##0.00'
        currentRow += 2
      }

      // === 5️⃣ Format Enhancements ===
      sheet.views = [{ state: 'frozen', ySplit: currentRow > 3 ? 3 : 1 }] // freeze title + headers
      sheet.autoFilter = { from: 'A4', to: 'J4' } // adjust based on title/filter lines

      // === 6️⃣ Download Excel ===
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `BillWiseLedger_${filters.AsOnDate || new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export error', err)
      toast.error('Failed to export data')
    }
  }

  // wire exporter to your existing exportFunction/ref so your IconButton triggers it
  useEffect(() => {
    setExportFunction(() => () => handleExportExcel())
  }, [filteredfinancialdata, filters])

  const handleApplyFilter = (newFilters: BillWiseLedgerFilters) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  useEffect(() => {
    const fetchorderdata = async () => {
      setIsLoading(true)
      try {
        const response = await BillWiseLedgerReports(
          filters,
          Site_Code as string,
          companyid as string,
          UserName as string,
          bu as string
        )
        console.log('Fetched Ledger Data:', response)
        if (response?.success) {

          // setFinancialData(response.data)

          setFilteredFinancialData(response.data)

          // setIsClicked(false)

        } else {
          // If there is an error, log the error message
          const errorMessage = response?.error || 'Unknown error'
          console.error('Error:', errorMessage)
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })

          setFilteredFinancialData([])
        }
      } catch (error: any) {
        console.error('Error fetching order status:', error)
      } finally {
        // ✅ Hide loading spinner after data is fetched or fails
        setIsLoading(false)
      }
    }

    if (filters.AsOnDate) {
      fetchorderdata()
    }
  }, [filters])

  // if (loading) {
  //   return <Loading />
  // }

  const filterLabels = {
    AsOnDate: 'As On Date',
    Site_Name: 'Site',
    DistributorName: 'Distributor',
    AccountName: 'Account Name',
    AccountGroupName: 'Account Group Name',
    ReportOnName: 'Report On'
  }

  const renderSelectedFilters = () => {
    const selectedFilters: string[] = []

    // Check each filter field and add it to the list if it's not empty
    for (const [key, value] of Object.entries(filters)) {
      if (value && filterLabels.hasOwnProperty(key)) {
        const label = filterLabels[key as keyof typeof filterLabels]
        selectedFilters.push(`${label}: ${value}`)
      }
    }

    // If selected filters exist, render them
    return selectedFilters.length > 0 ? (
      <div className='my-6 p-5 bg-white shadow-lg rounded-lg border-l-4 border-cyan-600'>
        <h4 className='text-xl font-semibold text-cyan-800 mb-2'>Selected Filters</h4>
        <div className='text-sm text-slate-700 font-medium overflow-x-auto whitespace-nowrap'>
          {selectedFilters.map((filter, index) => {
            const [name, ...valueParts] = filter.split(': ')
            const value = valueParts.join(': ').trim()
            return (
              <span key={index} className='inline-block mr-2'>
                <span className='font-semibold text-cyan-800'>{name}:</span>
                <span className='font-medium text-slate-700'>{value}</span>
                {index < selectedFilters.length - 1 && <span className='mx-1'>,</span>}
              </span>
            )
          })}
        </div>
      </div>
    ) : null
  }

  return (
    <>
      <div className='flex flex-row sm:flex-row justify-between'>
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className='px-6 lg:px-5 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition sm:mt-0 sm:ml-4'
        >
          {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>

        <IconButton
          onClick={() => exportFunction()}
          title='Export as PDF'
          size='small'
          aria-label='settings'
          className='card-more-options'
          sx={{ color: '#047857', fontSize: '30px' }}
        >
          <RiFileExcel2Fill />
        </IconButton>
      </div>
      {isFilterVisible && <BillWiseLedgerFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <div className='hidden max-h-115 overflow-y-auto md:block lg:block'>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-purple-400  text-left'>
                <th className='px-4 py-2 text-white'>Party Name</th>
                <th className='px-4 py-2 text-white'>Bill No.</th>
                <th className='px-4 py-2 text-white'>Bill Date</th>
                <th className='px-4 py-2 text-white'>Ref No.</th>
                <th className='px-4 py-2 text-white'>Ref Date</th>
                <th className='px-4 py-2 text-white'>Bill Amount</th>
                <th className='px-4 py-2 text-white'>Net Receiveable</th>
                <th className='px-4 py-2 text-white'>Credit Days</th>
                <th className='px-4 py-2 text-white'>Due Date</th>
                <th className='px-4 py-2 text-white'>Over Due Days</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={11} style={{ padding: '40px 0' }} className='text-center'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div className='text-gray-500'>
                        <CircularProgress />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                Object.keys(groupByPName(paginatedData)).map(pName => {
                  const clients = groupByPName(paginatedData)[pName]
                  let totalBillAmount = 0
                  let totalNetReceive = 0
                  let totalCredit = 0

                  return (
                    <React.Fragment key={pName}>
                      {clients.map((client: BillWiseLedgerData, index: number) => {
                        const billAmount = client.BillAmount || 0 // Use 0 if AmtDr is not a valid number
                        const netReceive = client.NetReceiveable || 0 // Use 0 if AmtCr is not a valid number
                        const credit = Math.abs(client.NetReceiveable >= 0 ? 0 : client.NetReceiveable)
                        totalBillAmount += billAmount
                        totalNetReceive += netReceive
                        totalCredit += credit

                        return (
                          <tr key={client.DocId} className='border-gray-500 border-b text-sm'>
                            {index === 0 ? (
                              <td
                                className='whitespace-nowrap border-r px-4 py-2 text-sm lg:w-1'
                                rowSpan={clients.length}
                              >
                                <small className='font-semibold '>{pName}</small>
                              </td>
                            ) : null}

                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.BillNo}</small>
                            </td>
                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.BillDate}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.RefNo}</small>
                            </td>
                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.RefDate}</small>
                            </td>
                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{billAmount.toFixed(2)}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{netReceive.toFixed(2)}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.CreditDays}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.PaymentDueDate}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.OverDueDays}</small>
                            </td>
                          </tr>
                        )
                      })}

                      {/* Group Totals */}
                      <tr className='bg-gray-200 border-b text-xs font-bold'>
                        <td className='px-4 py-1'></td>
                        <td className='px-4 py-1'></td>
                        <td className='px-4 py-1'></td>
                        <td className='px-4 py-1'></td>
                        <td colSpan={1} className='px-4 py-1 text-black'>
                          Total:
                        </td>
                        <td className='px-4 py-1 text-black'>{totalBillAmount.toFixed(2)}</td>
                        <td className='px-4 py-1 text-black'>{totalNetReceive.toFixed(2)}</td>
                        <td colSpan={1} className='px-4 py-1 text-black'>
                          On Credit:
                        </td>
                        <td className='px-4 py-1 text-black'>{totalCredit.toFixed(2)}</td>
                      </tr>
                    </React.Fragment>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={11} className='py-5 text-center'>
                    <div className='text-gray-500 mr-20 text-center  sm:text-center'>No data found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-4 max-h-96 overflow-y-auto bg-cyan-50 px-4 sm:px-6 md:hidden'>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <CircularProgress />
          </div>
        ) : paginatedData.length > 0 ? (
          Object.keys(groupByPName(paginatedData)).map(pName => {
            const groupedClients = groupByPName(paginatedData)[pName]

            // Calculate totals for this group
            let totalBillAmount = 0
            let totalNetReceive = 0
            let totalCredit = 0

            groupedClients.forEach((client: BillWiseLedgerData) => {
              const billAmount = client.BillAmount || 0
              const netReceive = client.NetReceiveable || 0
              const credit = Math.abs(client.NetReceiveable >= 0 ? 0 : client.NetReceiveable)
              totalBillAmount += billAmount
              totalNetReceive += netReceive
              totalCredit += credit
            })

            return (
              <div key={pName} className='mb-4 rounded bg-white p-4 shadow-md '>
                <div className='flex flex-col space-y-2'>
                  <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                    <span className='text-xl font-bold dark:text-gray'>{pName}</span>
                  </div>
                  <div className='flex flex-wrap justify-between space-y-4 pt-2 md:space-y-0'>
                    <div className='flex w-full justify-between md:w-1/2'>
                      <div className='flex flex-col items-center md:items-start'>
                        <span className='text-gray-800  text-sm font-semibold'>Total Bill Amt</span>
                        <span className='text-gray-700  text-sm font-medium'>{totalBillAmount.toFixed(2)}</span>
                      </div>

                      {/* <div className='flex flex-col items-center md:items-start'>
                        <span className='text-gray-800  text-sm font-semibold'>On Credit</span>
                        <span className='text-gray-700  text-sm font-medium'>{totalCredit.toFixed(2)}</span>
                      </div> */}

                      <div className='flex flex-col items-center md:items-start'>
                        <span className='text-gray-800  text-sm font-semibold'>Total Net Receive</span>
                        <span className='text-gray-700  text-sm font-medium'>{totalNetReceive.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {groupedClients.map((client: BillWiseLedgerData, index: number) => {
                    const rowBackground = index % 2 === 0 ? 'bg-cyan-50' : 'bg-white'
                    const borderColor = index % 2 === 0 ? 'border-cyan-200 border-2' : 'border-white-200' // Conditionally set border color

                    return (
                      <div
                        key={`${client.DocId}`}
                        className={`mb-4 ${rowBackground} ${borderColor} `} // Apply border color class
                        style={{ padding: '10px', borderRadius: '10px' }}
                      >
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Bill No.:</span>
                          <span className='text-gray-700  text-sm'>{client.BillNo}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Bill Date:</span>
                          <span className='text-gray-700  text-sm'>{client.BillDate}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Ref No.:</span>
                          <span className='text-gray-700  text-sm'>{client.RefNo}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Ref Date:</span>
                          <span className='text-gray-700  text-sm'>{client.RefDate}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Bill Amt.:</span>
                          <span className='text-gray-700  text-sm'>{client.BillAmount}</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Net Receiveable:</span>
                          <span className='text-gray-700  text-sm'>{client.NetReceiveable}</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Credit Days:</span>
                          <span className='text-gray-700  text-sm'>{client.CreditDays}</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Due Date:</span>
                          <span className='text-gray-700  text-sm'>{client.PaymentDueDate}</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Overdue Days:</span>
                          <span className='text-gray-700  text-sm'>{client.OverDueDays}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        ) : (
          <div className='py-5 text-center'>
            <p className='text-gray-500 text-center sm:text-center'>No data found</p>
          </div>
        )}
      </div>
      <div className=' border-gray-100 border-t p-3 dark:border-slate-800 lg:px-6'>
        <div className='flex flex-col items-center justify-between py-3 md:flex-row md:justify-between md:py-0 '>
          <div className='flex gap-52 md:gap-10'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
              Previous
            </button>

            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === numPages - 1}>
              Next
            </button>
          </div>
          <small className='mt-6 md:mt-0'>
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
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
    </>
  )
}

const PendingPOReport = () => {
  const router = useRouter()

  function handleChange() {
    router.push('/dashboardpage/')
  }

  return (
    <>
      <HeadingTab TitleIcon={BsBank2} Title='Purchase' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Bill Wise Ledger Report'
            action={
              <div style={{ display: 'flex' }}>
                <IconButton
                  onClick={handleChange}
                  size='small'
                  aria-label='settings'
                  className='card-more-options'
                  sx={{ color: 'text.secondary' }}
                >
                  <ExitToApp />
                </IconButton>
              </div>
            }
          />
          <Divider variant='middle' />
          <CardContent sx={{ padding: '10px' }}>
            <RenderStats />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default PendingPOReport
