'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, CircularProgress, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import React, { useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { LedgerFilters, LedgerData, GenericOrder } from './Ledger_modal'
import { RiFilePdf2Fill } from 'react-icons/ri'
import { useParams } from '@/context/paramcontext'
import { LedgerReports, PrintPDF } from './Ledger_action'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import LedgerFilter from '@/components/LedgerFilter/page'

const RenderStats = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredfinancialdata, setFilteredFinancialData] = useState<LedgerData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [financialdata, setFinancialData] = useState<LedgerData[]>([])

  const [filters, setFilters] = useState<LedgerFilters>({
    StrFromDate: '',
    StrToDate: '',
    Site_Name: '',
    Site_Code: '',
    StrDistributorCode: '',
    StrDistributorName: '',
    AccountCode: '',
    AccountName: '',
    AccountGroupCode: '',
    AccountGroupName: ''
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
        const pName = client.PName || 'Unknown' // Default to 'Unknown' if PName is missing
        if (!acc[pName]) {
          acc[pName] = []
        }
        acc[pName].push(client)
        return acc
      },
      {} as { [key: string]: any[] }
    )
  }

  const handlePrintPdfView = async () => {
    // setIsLoading(true)
    try {
      const data = await PrintPDF(filters, Site_Code as string, companyid as string, UserName as string, bu as string)

      
      // Decode Base64 and trigger download (runs on the client)
      const byteCharacters = atob(data.FileBytes)
      const byteArrays = new Uint8Array(byteCharacters.length)

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i)
      }

      const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' })
      const pdfUrl = URL.createObjectURL(pdfBlob)

      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = 'Ledger.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000)
    } catch (error) {
      console.error('Error fetching PDF:', error)
      openModal()
    }
  }

  useEffect(() => {
    const today = new Date()

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const formatDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      StrFromDate: formatDate(firstDayOfMonth),
      StrToDate: today.toISOString().split('T')[0]
    }))
  }, [])

  // const handleExportToExcel = useCallback((exportFn: () => void) => {
  //   exportFunctionRef.current = exportFn
  // }, [])

  const handleApplyFilter = (newFilters: LedgerFilters) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await LedgerReports(
  //       filters,
  //       Site_Code as string,
  //       companyid as string,
  //       UserName as string,
  //       bu as string
  //     )

  //     if (result) {
  //       setMyData(result.data)
  //       console.log('Fetched ledger Data:', result)
  //     }
  //     setLoading(false)
  //   }

  //   if (filters.StrFromDate || filters.StrToDate) {
  //     fetchData()
  //   }
  // }, [filters])

  useEffect(() => {
    const fetchorderdata = async () => {
      setIsLoading(true)
      try {
        const response = await LedgerReports(
          filters,
          Site_Code as string,
          companyid as string,
          UserName as string,
          bu as string
        )
        if (response?.success) {
          setFinancialData(response.data)
          setFilteredFinancialData(response.data)
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
          setFinancialData([])

          setFilteredFinancialData([])
        }
      } catch (error: any) {
        console.error('Error fetching order status:', error)
      } finally {
        // ✅ Hide loading spinner after data is fetched or fails
        setIsLoading(false)
      }
    }

    if (filters.StrFromDate || filters.StrToDate) {
      fetchorderdata()
    }
  }, [filters])

  // if (loading) {
  //   return <Loading />
  // }

  const filterLabels = {
    StrFromDate: 'From Date',
    StrToDate: 'To Date',
    Site_Name: 'Site',
    StrDistributorName: 'Distributor',
    AccountName: 'Account Name',
    AccountGroupName: 'Account Group Name'
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
          title='Export as PDF'
          onClick={() => handlePrintPdfView()}
          size='small'
          aria-label='settings'
          className='card-more-options'
          sx={{ color: '#955E42', fontSize: '30px' }}
        >
          <RiFilePdf2Fill size={32} />
        </IconButton>
      </div>
      {isFilterVisible && <LedgerFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <div className='hidden max-h-115 overflow-y-auto md:block lg:block'>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-purple-400  text-left'>
                <th className='px-4 py-2 text-white'>Party Name</th>
                <th className='px-4 py-2 text-white'>Date</th>
                <th className='px-4 py-2 text-white'>VType</th>
                <th className='px-4 py-2 text-white'>Vr. No.</th>
                <th className='hidden px-4 py-2 lg:table-cell text-white'>Narration</th>
                <th className='px-4 py-2 text-white'>Debit</th>
                <th className='px-4 py-2 text-white'>Credit</th>
                <th className='px-4 py-2 text-white'>Balance</th>
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
                  let totalDebit = 0
                  let totalCredit = 0

                  return (
                    <React.Fragment key={pName}>
                      {clients.map((client: LedgerData, index: number) => {
                        const debitAmount = client.AmtDr || 0 // Use 0 if AmtDr is not a valid number
                        const creditAmount = client.AmtCr || 0 // Use 0 if AmtCr is not a valid number
                        totalDebit += debitAmount
                        totalCredit += creditAmount

                        return (
                          <tr key={client.V_Sno + client.docid} className='border-gray-300 border-b text-sm'>
                            {index === 0 ? (
                              <td
                                className='whitespace-nowrap border-r px-4 py-2 text-sm lg:w-1'
                                rowSpan={clients.length}
                              >
                                <small className='font-semibold '>{pName}</small>
                              </td>
                            ) : null}

                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-500 font-semibold '>{client.V_Date}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-500 font-semibold '>{client.V_Type}</small>
                            </td>
                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-900 font-semibold '>{client.V_No}</small>
                            </td>
                            <td className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.Narration}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{debitAmount.toFixed(2)}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{creditAmount.toFixed(2)}</small>
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'>
                              <small className='text-gray-700 font-semibold '>{client.CumulativeBalance}</small>
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
                        <td className='px-4 py-1 text-black'>{totalDebit.toFixed(2)}</td>
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
            let totaldebit = 0
            let totalcredit = 0

            groupedClients.forEach((client: LedgerData) => {
              totaldebit += client.AmtDr || 0
              totalcredit += client.AmtCr || 0
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
                        <span className='text-gray-800  text-sm font-semibold'>Debit</span>
                        <span className='text-gray-700  text-sm font-medium'>{totaldebit.toFixed(2)}</span>
                      </div>

                      <div className='flex flex-col items-center md:items-start'>
                        <span className='text-gray-800  text-sm font-semibold'>Credit</span>
                        <span className='text-gray-700  text-sm font-medium'>{totalcredit.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {groupedClients.map((client: LedgerData, index: number) => {
                    const rowBackground = index % 2 === 0 ? 'bg-cyan-50' : 'bg-white'
                    const borderColor = index % 2 === 0 ? 'border-cyan-200 border-2' : 'border-white-200' // Conditionally set border color

                    return (
                      <div
                        key={`${client.V_Sno}-${client.docid}`}
                        className={`mb-4 ${rowBackground} ${borderColor} `} // Apply border color class
                        style={{ padding: '10px', borderRadius: '10px' }}
                      >
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Vr. No.:</span>
                          <span className='text-gray-700  text-sm'>{client.V_No}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>VType:</span>
                          <span className='text-gray-700  text-sm'>{client.V_Type}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Date:</span>
                          <span className='text-gray-700  text-sm'>{client.V_Date}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Narration:</span>
                          <span className='text-gray-700  text-sm'>{client.Narration}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Debit:</span>
                          <span className='text-gray-700  text-sm'>{client.AmtDr}</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Credit:</span>
                          <span className='text-gray-700  text-sm'>{client.AmtCr}</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <span className='text-gray-600  text-sm font-semibold'>Balance:</span>
                          <span className='text-gray-700  text-sm'>{client.CumulativeBalance}</span>
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
            title='Ledger Report'
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
