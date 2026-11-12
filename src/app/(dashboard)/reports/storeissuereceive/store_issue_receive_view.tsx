'use client'

import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { useCallback, useEffect, useRef, useState } from 'react'
import ExitToApp from '@/components/ExitToApp'
import { useRouter } from 'next/navigation'
import type { StoreIssueReceiveFilterData, StoreIssueReceiveInterface } from './StoreIssueReceive_modal'
import Loading from '@/components/Loading'
import TableComponent from '@/components/TableComp/TableComp'
import { StoreIssueReceiveColumnsConfig } from '@/components/Structure/page'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { useParams } from '@/context/paramcontext'
import { StoreIssueReceiveReport } from './StoreIssueReceive.action'
import StoreIssueFilter from '@/components/StoreIssueReceiveFilter/page'

const RenderStats = () => {
  const [myData, setMyData] = useState<StoreIssueReceiveInterface[]>([])
  const [loading, setLoading] = useState(true)
  const exportFunctionRef = useRef<() => void>(() => {})
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [filters, setFilters] = useState<StoreIssueReceiveFilterData>({
    FromDate: '',
    ToDate: '',
    ItemName: '',
    ItemCode: '',
    ItemGroupCode: '',
    ItemGroupName: '',
    DepartmentCode: '',
    DepartmentName: '',
    CostCenterCode: '',
    CostCenterName: '',
    Site_Code: '',
    Site_Name: '',
    GodownCode: '',
    GodownName: ''
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

  const handleApplyFilter = (newFilters: StoreIssueReceiveFilterData) => {
    setFilters(newFilters)
    setIsFilterVisible(false) // Hide filter after apply
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await StoreIssueReceiveReport(
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

  const totalQty = myData.reduce((acc, item) => acc + (item.RQty ?? 0), 0)

  const formattedTotalQty = totalQty.toFixed(2)

  const filterLabels = {
    FromDate: 'From Date',
    ToDate: 'To Date',
    ItemName: 'Item',
    ItemGroupName: 'Item Group',
    DepartmentName: 'Department',
    CostCenterName: 'Cost Center',
    Site_Name: 'Site',
    GodownName: 'Godown'
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
      {isFilterVisible && <StoreIssueFilter onApplyFilter={handleApplyFilter} filterData={filters} />}
      <div>{renderSelectedFilters()}</div> {/* Selected filters displayed here */}
      <TableComponent
        data={myData}
        columns={StoreIssueReceiveColumnsConfig}
        onExportToExcel={handleExportToExcel}
        filename='StoreIssueReceiveRegister'
        totals={[
          { label: 'Total Qty', value: formattedTotalQty }
        ]}
        filters={filters}
        filterLabels={filterLabels}
        sheetName='StoreIssueReceiveReport'
        reportTitle='Store Issue Receive Register'
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
            title='Store Issue Receive Register'
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
