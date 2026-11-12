'use client'

import HeadingTab from '@/components/HeadingTab'
import PendingPOFilter from '@/components/PendingPOFilter/page'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { POFilterData, POReportinterface } from './PendingOrderReport_modal'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { POColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { PendingPurchaseOrderReport } from './PendingOrderReport_action'
import { useParams } from '@/context/paramcontext'

const RenderStats = () => {
  const [myData, setMyData] = useState<POReportinterface[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<POFilterData>({
    StrOrderNo: '',
    StrOrderNoValue: '',
    StrPartyCode: '',
    StrPartyName: '',
    StrItemCode: '',
    StrItemName: '',
    StrItemGroup: '',
    StrItemGroupName: '',
    StrItemCat: '',
    StrItemCatName: '',
    StrTransactionType: '',
    StrTransactionTypeValue: '',
    StrSiteName: '',
    StrSiteNameValue: '',
    StrAsOnDate: ''
  })

  const { Site_Code, companyid } = useParams()

  useEffect(() => {
    const today = new Date()
    setFilters(prevFilters => ({
      ...prevFilters,
      StrAsOnDate: today.toISOString().split('T')[0]
    }))
  }, [])

  //   const handleExportToExcel = useCallback((exportFn: () => void) => {
  //     setExportFunction(() => exportFn)
  //   }, [])

  const handleExportToExcel = useCallback((exportFn: () => void) => {
    exportFunctionRef.current = exportFn
  }, [])

  const handleApplyFilter = (newFilters: POFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await PendingPurchaseOrderReport(filters, Site_Code as string, companyid as string)
      
      if (result) {
        setMyData(result)
      }
      setLoading(false)
    }

    if (filters.StrAsOnDate) {
      fetchData()
    }
  }, [filters])

  if (loading) {
    return <Loading />
  }

  const totalOrdQty = myData.reduce((acc, item) => acc + item.OrdQty, 0)
  const totalRecQty = myData.reduce((acc, item) => acc + item.RecQty, 0)
  const totalPendingQty = myData.reduce((acc, item) => acc + item.Pending, 0)

  const formattedTotalOrdQty = totalOrdQty.toFixed(2)
  const formattedTotalRecQty = totalRecQty.toFixed(2)
  const formattedTotalPendingQty = totalPendingQty.toFixed(2)

  const filterLabels = {
    StrAsOnDate: 'As On Date',
    StrOrderNoValue: 'Order No.',
    StrPartyName: 'Party Name',
    StrItemName: 'Item Name',
    StrItemGroupName: 'Item Group',
    StrItemCatName: 'Item Category',
    StrTransactionTypeValue: 'Transaction Type',
    StrSiteNameValue: 'Site Name'
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
      {isFilterVisible && <PendingPOFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <TableComponent
        data={myData}
        columns={POColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='PendingPurchaseOrderReport'
        totals={[
          { label: 'Order Qty', value: formattedTotalOrdQty },
          { label: 'Rec Qty', value: formattedTotalRecQty },
          { label: 'Pending Qty', value: formattedTotalPendingQty }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='PendingPurchaseOrderReport'
        reportTitle='Pending Purchase Order Report'
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
            title='Pending Purchase Order Report'
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
