'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { FinishStockSummaryFilterData, FinishStockSummaryInterface } from './FinishStock_modal'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { FinishStockColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useParams } from '@/context/paramcontext'
import { FinishStockSummaryReport } from './FinishStock_action'
import FinishStockFilter from '@/components/FinishStockFilter/page'

const RenderStats = () => {
  const [myData, setMyData] = useState<FinishStockSummaryInterface[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<FinishStockSummaryFilterData>({
    FromDate: '',
    ToDate: '',
    ItemName: '',
    ItemCode: '',
    BFName: '',
    BFCode: '',
    GSMName: '',
    GSMCode: '',
    Width: '',
    WidthNo: '',
    Length: '',
    LengthNo: '',
    SizeUnit: '',
    SizeUnitName: '',
    Site_Name: '',
    Site_Code: '',
    Godown: '',
    GodownName: '',
    ItemGroupCode: '',
    ItemGroupName: ''
  })

  const { Site_Code, companyid, UserName, bu } = useParams()

  useEffect(() => {
    const today = new Date()

    // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    // const formatDate = (date: Date) => {
    //   const year = date.getFullYear()
    //   const month = String(date.getMonth() + 1).padStart(2, '0')
    //   const day = String(date.getDate()).padStart(2, '0')
    //   return `${year}-${month}-${day}`
    // }

    setFilters(prevFilters => ({
      ...prevFilters,
      FromDate: today.toISOString().split('T')[0],
      ToDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleExportToExcel = useCallback((exportFn: () => void) => {
    exportFunctionRef.current = exportFn
  }, [])

  const handleApplyFilter = (newFilters: FinishStockSummaryFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await FinishStockSummaryReport(
        filters,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      if (result) {
        setMyData(result.data)
      }
      setLoading(false)
    }

    if (filters.FromDate || filters.ToDate) {
      fetchData()
    }
  }, [filters])

  const transformedData = myData.map(row => ({
    ...row,
    Size: row.SizeHeight && row.SizeHeight > 0 ? `${row.SizeReel} X ${row.SizeHeight}` : `${row.SizeReel}`
  }))

  if (loading) {
    return <Loading />
  }

  const totalClosingQty = myData.reduce((acc, item) => acc + (item.ClosingQty ?? 0), 0)
  const totalOpeningQty = myData.reduce((acc, item) => acc + (item.OpeningQty ?? 0), 0)

  const formattedTotalClosingQty = totalClosingQty.toFixed(2)
  const formattedTotalOpeningQty = totalOpeningQty.toFixed(2)

  const filterLabels = {
    FromDate: 'From Date',
    ToDate: 'To Date',
    ItemName: 'Item',
    BFName: 'BF',
    GSMName: 'GSM',
    WidthNo: 'Width',
    LengthNo: 'Length',
    SizeUnit: 'Size Unit',
    Site_Name: 'Site',
    Godown: 'Godown',
    ItemGroupName: 'Item Group'
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
          onClick={() => exportFunctionRef.current()}
          size='small'
          aria-label='settings'
          className='card-more-options'
          sx={{ color: '#047857', fontSize: '30px' }}
        >
          <RiFileExcel2Fill />
        </IconButton>
      </div>
      {isFilterVisible && <FinishStockFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <TableComponent
        data={transformedData}
        columns={FinishStockColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='FinishStockSummary'
        totals={
          [
            { label: 'Total Opening Qty', value: formattedTotalOpeningQty },
            { label: 'Total Closing Qty', value: formattedTotalClosingQty }
          ]
        }
        filters={filters}
        filterLabels={filterLabels}
        sheetName='FinishStockSummary'
        reportTitle='Finish Stock Summary'
      />
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
            title='Finish Stock Summary'
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
