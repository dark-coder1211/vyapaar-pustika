'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HeadingTab from '@/components/HeadingTab'
import { Card, CardContent, CardHeader, Divider, IconButton, Pagination } from '@mui/material'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { MdOutlineFindInPage } from 'react-icons/md'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SearchBar from '@/components/SearchBar'
import ExitToApp from '@/components/ExitToApp'
import { getgateentryoutlist } from './GateOut_action'
import { useParams } from '@/context/paramcontext'
import type { GateOutListInterface } from './GateOut_modal'

interface RenderStatsProps {
  searchTerm: string
  fromDate: string
  toDate: string
}

const RenderStats = ({ searchTerm, fromDate, toDate }: RenderStatsProps) => {
  const [myData, setMyData] = useState<GateOutListInterface[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const { Site_Code, companyid, UserName, bu } = useParams()

  const ITEMS_PER_PAGE = 5

  const filteredData = Array.isArray(myData)
    ? myData.filter(row => row.RecId.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (event: any, page: number) => setCurrentPage(page)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getgateentryoutlist(UserName!, Site_Code!, companyid!, bu!, fromDate, toDate)
      console.log('Result', result)
      if (result?.success) {
        setMyData(result.data)
      }
    }
    if (UserName && Site_Code && companyid && fromDate && toDate) fetchData()
  }, [UserName, Site_Code, companyid, bu, fromDate, toDate])

  /* ===========================================================
       🎯 ALWAYS SHOW HEADER — IF NO RECORD, SHOW SINGLE "NO RECORD" ROW
       =========================================================== */
  const isEmpty = filteredData.length === 0

  return (
    <>
      {/* =============== Desktop View =============== */}
      <div className='font-[sans-serif] overflow-x-auto max-h-96 hidden md:block lg:block mt-2'>
        <table className='min-w-full bg-white'>
          <thead className='bg-[#7367F0] sticky top-0 z-10'>
            <tr>
              <th className='p-3 text-left text-sm font-bold text-white rounded-tl-lg'>S.No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Entry No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Gate Out Date</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Gate Out Time</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Gate Out By</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Gate In Date</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Gate In Time</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Purpose</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Weighment</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Party</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Vehicle Type</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Vehicle No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Transporter</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Driver Name</th>
              <th className='p-3 text-left text-sm font-bold text-white rounded-tr-lg'>Remark</th>
            </tr>
          </thead>

          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={12} className='text-center py-6 text-gray-600 font-semibold'>
                  No Record Found
                </td>
              </tr>
            ) : (
              currentItems.map((data: GateOutListInterface, index: number) => (
                <tr key={index} className='even:bg-blue-50'>
                  <td className='p-2 text-xs'>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className='p-2 text-xs text-black'>{data.RecId}</td>
                  <td className='p-2 text-xs text-black'>{data.GateOutDate}</td>
                  <td className='p-2 text-xs text-black'>{data.GateOutTime}</td>
                  <td className='p-2 text-xs text-black'>{data.GateOutBy}</td>
                  <td className='p-2 text-xs text-black '>{data.V_Date}</td>
                  <td className='p-2 text-xs text-black'>{data.V_Time}</td>
                  <td className='p-2 text-xs text-black'>{data.LoadUnload === 'U' ? 'Unloading' : 'Loading'}</td>
                  <td className='p-2 text-xs text-black'>{data.WeighYN === 'Y' ? 'Yes' : 'No'}</td>
                  <td className='p-2 text-xs text-black'>{data.Supplier}</td>
                  <td className='p-2 text-xs text-black'>{data.VehicleType}</td>
                  <td className='p-2 text-xs text-black'>{data.VehicleNo}</td>
                  <td className='p-2 text-xs text-black'>{data.Transporter}</td>
                  <td className='p-2 text-xs text-black'>{data.Driver}</td>
                  <td className='p-2 text-xs text-black'>{data.Remark}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!isEmpty && (
          <div className='flex justify-center mt-4'>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
          </div>
        )}
      </div>

      {/* =============== Mobile View =============== */}
      <div className='overflow-y-auto md:hidden mt-4 px-4 bg-cyan-50'>
        {isEmpty ? (
          <div className='bg-white rounded-xl shadow-lg p-6 text-center text-gray-600 font-semibold mt-4'>
            No Record Found
          </div>
        ) : (
          filteredData.map((data, index) => (
            <div key={index} className='bg-white rounded-xl shadow-lg mb-6 p-6'>
              <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                <span className='text-xl font-bold text-cyan-900'>Entry No:</span>
                <span className='text-lg font-semibold text-cyan-800'>{data.RecId}</span>
              </div>

              <div className='mt-2 space-y-1 text-sm text-gray-700'>
                <div>
                  <b>Gate Out Date:</b> {data.GateOutDate}
                </div>
                <div>
                  <b>Gate Out Time:</b> {data.GateOutTime}
                </div>
                <div>
                  <b>Gate Out By:</b> {data.GateOutBy}
                </div>
                <div>
                  <b>Gate In Date:</b> {data.V_Date}
                </div>
                <div>
                  <b>Gate In Time:</b> {data.V_Time}
                </div>
                <div>
                  <b>Purpose:</b> {data.LoadUnload === 'U' ? 'Unloading' : 'Loading'}
                </div>
                <div>
                  <b>Weighment:</b> {data.WeighYN === 'Y' ? 'Yes' : 'No'}
                </div>
                <div>
                  <b>Party:</b> {data.Supplier}
                </div>
                <div>
                  <b>Vehicle Type:</b> {data.VehicleType}
                </div>
                <div>
                  <b>Vehicle No.:</b> {data.VehicleNo}
                </div>
                <div>
                  <b>Transporter:</b> {data.Transporter}
                </div>
                <div>
                  <b>Driver:</b> {data.Driver}
                </div>
                <div>
                  <b>Remark:</b> {data.Remark}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

const VGPOutList = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const firstDay = yesterday.toISOString().split('T')[0]
    const lastDay = today.toISOString().split('T')[0]

    setFromDate(firstDay)
    setToDate(lastDay)
  }, [])

  const toggleSearch = () => setSearchVisible(!searchVisible)
  const handleChange = () => router.push('/dashboardpage/')

  return (
    <>
      <HeadingTab
        TitleIcon={BsFillDoorOpenFill}
        Title='Gate'
        RoutingIcon={SiHomebridge}
        routingPath='/dashboardpage/'
      />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <ToastContainer position='top-center' autoClose={5000} theme='light' />
          <CardHeader
            title='Gate Out List'
            action={
              <div style={{ display: 'flex' }}>
                <IconButton
                  onClick={toggleSearch}
                  aria-label='toggle-search'
                  className='card-more-options pr-1 pl-1'
                  sx={{ color: '#7367F0' }}
                >
                  <MdOutlineFindInPage color='#7367F0' />
                </IconButton>
                <IconButton
                  onClick={handleChange}
                  size='small'
                  aria-label='settings'
                  className='card-more-options'
                  sx={{ color: '#7367F0' }}
                >
                  <ExitToApp />
                </IconButton>
              </div>
            }
          />
          <div>
            {searchVisible && (
              <div className='flex flex-col md:flex-row items-center gap-3 p-3'>
                {/* 🔍 Search Bar */}
                <SearchBar onSearch={term => setSearchTerm(term)} />

                {/* 📅 From Date */}
                <input
                  type='date'
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className='border p-2 rounded'
                />

                {/* 📅 To Date */}
                <input
                  type='date'
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className='border p-2 rounded'
                />
              </div>
            )}
          </div>
          <Divider variant='middle' />
          <CardContent sx={{ padding: '10px' }}>
            <RenderStats searchTerm={searchTerm} fromDate={fromDate} toDate={toDate} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default VGPOutList
