'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { OrderTrack, OrderTrackData, SOFilterData } from './SOTrackingDisplay_modal'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { OrderColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { OrderTrackingDisplay } from './SOTrackingDisplay_action'
import SOTrackingFilter from '@/components/SOTrackingFilter/page'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from '@/context/paramcontext'

const RenderStats = () => {
  const [myData, setMyData] = useState<OrderTrackData[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<SOFilterData>({
    StrfromDate: '',
    StrToDate: '',
    StrSaleOrderNo: '',
    StrOrderNoValue: '',
    StrPartyCode: '',
    StrPartyName: '',
    StrDealerCode: '',
    StrDealerName: '',
    StrConsigneeCode: '',
    StrConsigneeName: '',
    StrItemCode: '',
    StrItemName: '',
    StrBFCode: '',
    StrBFName: '',
    StrGSMCode: '',
    StrGSMName: '',
    StrWidth: '',
    StrLength: ''
  })
  const { Site_Code, companyid } = useParams()

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
      StrfromDate: formatDate(firstDayOfMonth),
      StrToDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleApplyFilter = (newFilters: SOFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }
  const handleExportToExcel = useCallback((exportFn: () => void) => {
    exportFunctionRef.current = exportFn
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result: OrderTrack | undefined = await OrderTrackingDisplay(
        filters,
        Site_Code as string,
        companyid as string
      )

      if (result?.success) {
        setMyData(result.data)
      } else {
        const errorMessage = result?.error || 'Unknown error'
        console.error('Error:', errorMessage)
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setMyData([])
      }

      setLoading(false)
    }

    if (filters.StrfromDate || filters.StrToDate) {
      fetchData()
    }
  }, [filters])

  if (loading) {
    return <Loading />
  }

  const transformedData = myData.map(row => ({
    ...row,
    Size: row.SizeHeight && row.SizeHeight > 0 ? `${row.SizeReel} X ${row.SizeHeight}` : `${row.SizeReel}`
  }))

  // Totals
  const totalOrdQty = myData.reduce((acc, item) => acc + (Number(item.SaleOrderWeight) || 0), 0)
  const totalWOQty = myData.reduce((acc, item) => acc + (Number(item.WorkOrderWeight) || 0), 0)
  const totalProdRec = myData.reduce((acc, item) => acc + (Number(item.ProductionWeight) || 0), 0)
  const totalDisQty = myData.reduce((acc, item) => acc + (Number(item.dispatchWeight) || 0), 0)
  const totalDisBal = myData.reduce((acc, item) => acc + (Number(item.dispatchBalance) || 0), 0)

  const formattedTotals = {
    OrderWeight: totalOrdQty.toFixed(2),
    WorkOrderQty: totalWOQty.toFixed(2),
    ProductionQty: totalProdRec.toFixed(2),
    DispatchQty: totalDisQty.toFixed(2),
    DispatchBalance: totalDisBal.toFixed(2)
  }

  const filterLabels = {
    StrfromDate: 'From Date',
    StrToDate: 'To Date',
    StrOrderNoValue: 'Order No.',
    StrPartyName: 'Party Name',
    StrDealerName: 'Dealer Name',
    StrConsigneeName: 'Consignee Name',
    StrItemName: 'Item Name',
    StrBFName: 'BF',
    StrGSMName: 'GSM',
    StrWidth: 'Width',
    StrLength: 'Length'
  }

  const renderSelectedFilters = () => {
    const selectedFilters = Object.entries(filters)
      .filter(([key, value]) => value && filterLabels.hasOwnProperty(key))
      .map(([key, value]) => {
        const label = filterLabels[key as keyof typeof filterLabels]
        return `${label}: ${value}`
      })

    return selectedFilters.length > 0 ? (
      <div className='my-6 p-5 bg-white shadow-lg rounded-lg border-l-4 border-cyan-600'>
        <h4 className='text-xl font-semibold text-cyan-800 mb-2'>Selected Filters</h4>
        <div className='text-sm text-slate-700 font-medium overflow-x-auto whitespace-nowrap'>
          {selectedFilters.map((filter, index) => {
            const [label, ...valParts] = filter.split(': ')
            const value = valParts.join(': ')
            return (
              <span key={index} className='inline-block mr-2'>
                <span className='font-semibold text-cyan-800'>{label}:</span>
                <span className='font-medium text-slate-700'>{value}</span>
                {index < selectedFilters.length - 1 && <span className='mx-1'>,</span>}
              </span>
            )
          })}
        </div>
      </div>
    ) : null
  }

  //   const handleExportToExcel = (exportFn: () => void) => {
  //     setExportFunction(() => exportFn)
  //   }

  return (
    <>
      <div className='flex flex-row sm:flex-row justify-between mb-4'>
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className='px-6 lg:px-5 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition'
        >
          {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>

        <IconButton
          onClick={() => exportFunctionRef.current()}
          size='small'
          aria-label='export to excel'
          sx={{ color: '#047857', fontSize: '30px' }}
        >
          <RiFileExcel2Fill />
        </IconButton>
      </div>

      {isFilterVisible && <SOTrackingFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      {renderSelectedFilters()}

      <TableComponent
        data={transformedData}
        columns={OrderColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='SaleOrderTrackingDisplay'
        totals={[
          { label: 'Order Weight', value: formattedTotals.OrderWeight },
          { label: 'Work Order Qty', value: formattedTotals.WorkOrderQty },
          { label: 'Production Rec. Qty', value: formattedTotals.ProductionQty },
          { label: 'Dispatch Qty', value: formattedTotals.DispatchQty },
          { label: 'Balance From Dispatch', value: formattedTotals.DispatchBalance }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='SaleOrderTrackingDisplay'
        reportTitle='Sale Order Tracking Display'
      />
    </>
  )
}

const PendingSaleOrderReport = () => {
  const router = useRouter()

  const handleBack = () => {
    router.push('/dashboardpage/')
  }

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <HeadingTab TitleIcon={BsBank2} Title='Sale' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div className='mt-2'>
        <Card>
          <CardHeader
            title='Sale Order Tracking Display'
            action={
              <IconButton onClick={handleBack} size='small' aria-label='go back' sx={{ color: 'text.secondary' }}>
                <ExitToApp />
              </IconButton>
            }
          />
          <Divider />
          <CardContent sx={{ padding: '10px' }}>
            <RenderStats />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default PendingSaleOrderReport
