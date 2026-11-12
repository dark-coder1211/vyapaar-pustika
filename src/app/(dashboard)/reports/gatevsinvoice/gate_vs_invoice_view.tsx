'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { GateVsInvoiceFilters, GateVsInvoiceInterface } from './GateVsInvoice_modal'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { GateVsInvoiceColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useParams } from '@/context/paramcontext'
import { GateVsInvoiceReports } from './GateVsInvoice_action'
import GateVsInvoiceFilter from '@/components/GateVsInvoiceFilter.tsx/page'

const RenderStats = () => {
  const [myData, setMyData] = useState<GateVsInvoiceInterface[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<GateVsInvoiceFilters>({
    FromDate: '',
    ToDate: '',
    Site_Name: '',
    Site_Code: '',
    PartyCode: '',
    PartyName: '',
    DealerCode: '',
    DealerName: '',
    ConsigneeCode: '',
    ConsigneeName: '',
    VoucherType: '',
    VoucherName: '',
    ReportFor: '',
    ReportForName: '',
    SaleTypeCode: '',
    SaleTypeName: ''
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

  const handleApplyFilter = (newFilters: GateVsInvoiceFilters) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await GateVsInvoiceReports(
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

  const totalInvoiceWt = myData.reduce((acc, item) => acc + (item.Invoiceweight ?? 0), 0)
  const totalGateOutWt = myData.reduce((acc, item) => acc + (item.GateOutWeight ?? 0), 0)
  const totalDiffWt = myData.reduce((acc, item) => acc + (item.DiffrenceWeight ?? 0), 0)

  const formattedTotalInvoiceWt = totalInvoiceWt.toFixed(2)
  const formattedTotalGateOutWt = totalGateOutWt.toFixed(2)
  const formattedTotalDifftWt = totalDiffWt.toFixed(2)

  const filterLabels = {
    FromDate: 'From Date',
    ToDate: 'To Date',
    Site_Name: 'Site',
    PartyName: 'Party Name',
    DealerName: 'Dealer Name',
    ConsigneeName: 'Consignee Name',
    VoucherName: 'Voucher Type',
    ReportForName: 'Report For',
    SaleTypeName: 'Sale Type'
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
      {isFilterVisible && <GateVsInvoiceFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <TableComponent
        data={myData}
        columns={GateVsInvoiceColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='GateVsInVoiceReport'
        totals={[
          { label: 'Total Invoice Weight', value: formattedTotalInvoiceWt },
          { label: 'Total Gate Out Weight', value: formattedTotalGateOutWt },
          { label: 'Total Difference Weight', value: formattedTotalDifftWt }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='GateVsInVoiceReport'
        reportTitle='Gate Vs Invoice Report'
      />
    </>
  )
}

const GateVsInvoiceReport = () => {
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
            title='Gate Vs Invoice Report'
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

export default GateVsInvoiceReport
