'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { StockValReportFilterData, StockValReportInterface } from './StockReportVal_modal'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { StockReportColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useParams } from '@/context/paramcontext'
import { StockReport } from './StockReportVal_action'
import StockValFilter from '@/components/StockValFilter/page'

const RenderStats = () => {
  const [myData, setMyData] = useState<StockValReportInterface[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<StockValReportFilterData>({
    FromDate: '',
    ToDate: '',
    ItemName: '',
    ItemCode: '',
    ItemGroupCode: '',
    ItemGroupName: '',
    GodownCode: '',
    GodownName: '',
    ItemCategoryCode: '',
    ItemCategoryName: '',
    Site_Code: '',
    Site_Name: '',
    Method: '',
    MethodName: '',
    Classification: '',
    ClassificationName: '',
    Variety: '',
    VarietyName: ''
  })

  const { Site_Code, companyid, UserName, bu } = useParams()

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
      FromDate: formatDate(firstDayOfMonth),
      ToDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleExportToExcel = useCallback((exportFn: () => void) => {
    exportFunctionRef.current = exportFn
  }, [])

  const handleApplyFilter = (newFilters: StockValReportFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await StockReport(
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

  if (loading) {
    return <Loading />
  }

  const totalOpenQty = myData.reduce((acc, item) => acc + (item.OpeningQty ?? 0), 0)
  const totalOpenVal = myData.reduce((acc, item) => acc + (item.OpeningValue ?? 0), 0)
  const totalRecQty = myData.reduce((acc, item) => acc + (item.RecieveQty ?? 0), 0)
  const totalRecVal = myData.reduce((acc, item) => acc + (item.RecieveValue ?? 0), 0)
  const totalCummlStock = myData.reduce((acc, item) => acc + (item.CommuQty ?? 0), 0)
  const totalCummlVal = myData.reduce((acc, item) => acc + (item.CommuValue ?? 0), 0)
  const totalIssQty = myData.reduce((acc, item) => acc + (item.IssueQty ?? 0), 0)
  const totalIssVal = myData.reduce((acc, item) => acc + (item.IssueValue ?? 0), 0)
  const totalCloQty = myData.reduce((acc, item) => acc + (item.ClosingQty ?? 0), 0)
  const totalCloVal = myData.reduce((acc, item) => acc + (item.ClosingValue ?? 0), 0)

  const formattedTotalOpenQty = totalOpenQty.toFixed(2)
  const formattedTotalOpenVal = totalOpenVal.toFixed(2)
  const formattedTotalRecQty = totalRecQty.toFixed(2)
  const formattedTotalRecVal = totalRecVal.toFixed(2)
  const formattedTotalCummlStock = totalCummlStock.toFixed(2)
  const formattedTotalCummlVal = totalCummlVal.toFixed(2)
  const formattedTotalIssQty = totalIssQty.toFixed(2)
  const formattedTotalIssVal = totalIssVal.toFixed(2)
  const formattedTotalCloQty = totalCloQty.toFixed(2)
  const formattedTotalCloVal = totalCloVal.toFixed(2)

  const filterLabels = {
    FromDate: 'From Date',
    ToDate: 'To Date',
    ItemName: 'Item Name',
    ItemGroupName: 'Item Group',
    GodownName: 'Godown',
    ItemCategoryName: 'Item Category',
    Site_Name: 'Site Name',
    MethodName: 'Method',
    ClassificationName: 'Classification',
    VarityName: 'Variety'
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
      {isFilterVisible && <StockValFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <TableComponent
        data={myData}
        columns={StockReportColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='StockReportValBased'
        totals={[
          { label: 'Total Opening Qty', value: formattedTotalOpenQty },
          { label: 'Total Opening Val', value: formattedTotalOpenVal },
          { label: 'Total Receive Qty', value: formattedTotalRecQty },
          { label: 'Total Receive Val', value: formattedTotalRecVal },
          { label: 'Total Cumml. Stock', value: formattedTotalCummlStock },
          { label: 'Total Cumml. Val', value: formattedTotalCummlVal },
          { label: 'Total Issue Qty', value: formattedTotalIssQty },
          { label: 'Total Issue Val', value: formattedTotalIssVal },
          { label: 'Total Closing Qty', value: formattedTotalCloQty },
          { label: 'Total Closing Val', value: formattedTotalCloVal }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='StockReportValBased'
        reportTitle='Stock Report (Value Based)'
      />
    </>
  )
}

const StockReportVal = () => {
  const router = useRouter()

  function handleChange() {
    router.push('/reports/stockreport/')
  }

  return (
    <>
      <HeadingTab TitleIcon={BsBank2} Title='Purchase' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Stock Report (Value Based)'
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

export default StockReportVal
