'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { PendingSaleOrderColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from '@/context/paramcontext'
import type { PendingOrder, PendingOrderData, PSOFilterData } from './PendingSOReport_modal'
import { pendingOrderAction } from './PendingSOReport_action'
import PendingSOFilter from '@/components/PendingSOFilter/page'

const RenderStats = () => {
  const [myData, setMyData] = useState<PendingOrderData[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<PSOFilterData>({
    StrVDate: '',
    StrSaleOrderNo: '',
    StrOrderNoValue: '',
    StrPartyCode: '',
    StrPartyName: '',
    StrDealerCode: '',
    StrDealerName: '',
    StrConsignee: '',
    StrConsigneeName: '',
    StrItemCode: '',
    StrItemName: '',
    StrBFCode: '',
    StrBFName: '',
    StrGSMCode: '',
    StrGSMName: '',
    StrZoneF: '',
    StrZoneValue: '',
    StrStatus: '',
    StrStatusValue: '',
    StrReportFor: '',
    StrReportForValue: '',
    StrOrderStatus: '',
    StrOrderStatusValue: '',
    StrSizeUnit: '',
    StrSizeUnitValue: '',
    StrOrderType: '',
    StrOrderTypeValue: '',
    StrTransactionType: '',
    StrTransactionTypeValue: '',
    StrSiteName: '',
    StrSiteNameValue: '',
    StrWidth: ''
  })
  const { Site_Code, companyid, bu, UserName } = useParams()

  useEffect(() => {
    const today = new Date()

    // const currentYear = today.getFullYear()
    // const financialYearStart = currentYear - (currentYear % 2 === 0 ? 0 : 1)
    // const formattedDate = `${financialYearStart}-04-01`

    setFilters(prevFilters => ({
      ...prevFilters,

      // StrfromDate: formattedDate,
      // StrToDate: today.toISOString().split('T')[0],

      StrVDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleApplyFilter = (newFilters: PSOFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }

  const handleExportToExcel = useCallback((exportFn: () => void) => {
    exportFunctionRef.current = exportFn
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result: PendingOrder | null = await pendingOrderAction(
        Site_Code as string,
        companyid as string,
        UserName as string,
        'Employee',
        bu as string,
        filters
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

    if (filters.StrVDate) {
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
  const totalOrdQty = myData.reduce((acc, item) => acc + (Number(item.SO_Weight) || 0), 0)
  const totalOrdQtyReel = myData.reduce((acc, item) => acc + (Number(item.SO_Reel) || 0), 0)
  const totalSaleQty = myData.reduce((acc, item) => acc + (Number(item.Sale_Weight) || 0), 0)
  const totalSaleQtyReel = myData.reduce((acc, item) => acc + (Number(item.Sale_Reel) || 0), 0)
  const totalPenQty = myData.reduce((acc, item) => acc + (Number(item.PendingWeight) || 0), 0)
  const totalPenQtyReel = myData.reduce((acc, item) => acc + (Number(item.PendingReel) || 0), 0)

  const formattedTotals = {
    OrdQty: totalOrdQty.toFixed(2),
    OrdQtyReel: totalOrdQtyReel.toFixed(2),
    SaleQty: totalSaleQty.toFixed(2),
    SaleQtyReel: totalSaleQtyReel.toFixed(2),
    PenQty: totalPenQty.toFixed(2),
    PenQtyReel: totalPenQtyReel.toFixed(2)
  }

  const filterLabels = {
    StrVDate: 'As On Date',
    StrOrderNoValue: 'Order No.',
    StrPartyName: 'Party Name',
    StrDealerName: 'Dealer Name',
    StrConsigneeName: 'Consignee Name',
    StrItemName: 'Item Name',
    StrBFName: 'BF',
    StrGSMName: 'GSM',
    StrZoneValue: 'Zone',
    StrStatusValue: 'Status',
    StrOrderTypeValue: 'Order Type',
    StrReportForValue: 'Report For',
    StrWidth: 'Width',
    StrSizeUnitValue: 'Size Unit',
    StrTransactionTypeValue: 'Transaction Type'
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

      {isFilterVisible && <PendingSOFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      {renderSelectedFilters()}

      <TableComponent
        data={transformedData}
        columns={PendingSaleOrderColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='PendingSaleOrderReport'
        totals={[
          { label: 'Order Qty', value: formattedTotals.OrdQty },
          { label: 'Order Qty Reels', value: formattedTotals.OrdQtyReel },
          { label: 'Sale Qty', value: formattedTotals.SaleQty },
          { label: 'Sale Qty Reels', value: formattedTotals.SaleQtyReel },
          { label: 'Pending Qty', value: formattedTotals.PenQty },
          { label: 'Pending Qty Reels', value: formattedTotals.PenQtyReel }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='PendingSaleOrderReport'
        reportTitle='Pending Sale Order Report'
      />
    </>
  )
}

const PendingSOReport = () => {
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
            title='Pending Sale Order Report'
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

export default PendingSOReport
