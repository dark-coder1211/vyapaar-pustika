'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useEffect, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import { OrderTrack, OrderTrackData, SOFilterData } from '@/components/interfaces/page'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { OrderColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { OrderTrackingDisplay } from '@/app/action/saleAction'
import SOTrackingFilter from '@/components/SOTrackingFilter/page'
import { toast } from 'react-toastify'

const RenderStats = () => {
  const [myData, setMyData] = useState<OrderTrackData[]>([])
  const [loading, setLoading] = useState(true)
  const [exportFunction, setExportFunction] = useState<() => void>(() => () => {})
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

  useEffect(() => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const financialYearStart = currentYear - (currentYear % 2 === 0 ? 0 : 1)
    const formattedDate = `${financialYearStart}-04-01`

    setFilters(prevFilters => ({
      ...prevFilters,
      StrfromDate: formattedDate,
      StrToDate: today.toISOString().split('T')[0]
    }))
  }, [])

  const handleApplyFilter = (newFilters: SOFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result: OrderTrack | undefined = await OrderTrackingDisplay(filters)
      if (result?.success) {
        setMyData(result.data) // Set the fetched data
      } else {
        // If there is an error, log the error message
        const errorMessage = result?.error || 'Unknown error'
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
        setMyData([])
      }
      setLoading(false) // Set loading state to false
    }

    if (filters.StrfromDate || filters.StrToDate) {
      fetchData() // Only fetch if any filter is set
    }
  }, [filters]) // Re-fetch data whenever the filters change

  if (loading) {
    return <Loading />
  }

  const totalOrdQty = myData.reduce((acc, item) => acc + (Number(item.SaleOrderWeight) || 0), 0)
  const totalWOQty = myData.reduce((acc, item) => acc + (Number(item.WorkOrderWeight) || 0), 0)

  const totalProdRec = myData.reduce((acc, item) => acc + (Number(item.ProductionWeight) || 0), 0)
  const totalDisQty = myData.reduce((acc, item) => acc + (Number(item.dispatchWeight) || 0), 0)

  const totalDisBal = myData.reduce((acc, item) => acc + (Number(item.dispatchBalance) || 0), 0)

  const formattedTotalOrdQty = totalOrdQty.toFixed(2)
  const formattedTotalWOQty = totalWOQty.toFixed(2)
  const formattedTotalProdRec = totalProdRec.toFixed(2)
  const formattedTotalDisQty = totalDisQty.toFixed(2)
  const formattedTotalDisBal = totalDisBal.toFixed(2)

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
    const selectedFilters: string[] = []

    for (const [key, value] of Object.entries(filters)) {
      if (value && filterLabels.hasOwnProperty(key)) {
        const label = filterLabels[key as keyof typeof filterLabels]
        selectedFilters.push(`${label}: ${value}`)
      }
    }

    return selectedFilters.length > 0 ? (
      <div className='my-6 p-5 bg-white shadow-lg rounded-lg border-l-4 border-cyan-600'>
        <h4 className='text-xl font-semibold text-cyan-800 mb-2'>Selected Filters</h4>
        <div className='text-sm text-slate-700 font-medium overflow-x-auto whitespace-nowrap'>
          {selectedFilters.map((filter, index) => {
            // Split only at the first occurrence of ": " so the full value is preserved
            const [name, ...valueParts] = filter.split(': ')
            const value = valueParts.join(': ').trim() // Join parts again if value has multiple parts
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

  const handleExportToExcel = (exportToExcel: () => void) => {
    setExportFunction(() => exportToExcel)
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

        {/* <ExportToExcel data={myData}/> */}
        <IconButton
          onClick={() => exportFunction()}
          size='small'
          aria-label='settings'
          className='card-more-options'
          sx={{ color: '#047857', fontSize: '30px' }}
        >
          <RiFileExcel2Fill />
        </IconButton>
      </div>

      {isFilterVisible && <SOTrackingFilter onApplyFilter={handleApplyFilter} filterData={filters} />}

      <div>{renderSelectedFilters()}</div>

      <TableComponent
        data={myData}
        columns={OrderColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='SaleOrderTrackingDisplay'
        totals={[
          { label: 'Order Weight', value: formattedTotalOrdQty },
          { label: 'Work Order Qty', value: formattedTotalWOQty },
          { label: 'Production Rec. Qty', value: formattedTotalProdRec },
          { label: 'Dispatch Qty', value: formattedTotalDisQty },
          { label: 'Balance From Dispatch', value: formattedTotalDisBal }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='SaleOrderTrackingDisplay'
        reportTitle='Sale Order Tracking Display'
      />
    </>
  )
}

const SaleOrderTrackingDisplay = () => {
  const router = useRouter()

  function handleChange() {
    router.push('/reports/')
  }

  return (
    <>
      <HeadingTab TitleIcon={BsBank2} Title='Sale' RoutingIcon={SiHomebridge} routingPath='/home/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Sale Order Tracking Display'
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

export default SaleOrderTrackingDisplay
