'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HeadingTab from '@/components/HeadingTab'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Checkbox
} from '@mui/material'
import { BsFillDoorOpenFill } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Pagination from '@mui/material/Pagination'
import SearchBar from '@/components/SearchBar'
import { MdOutlineFindInPage } from 'react-icons/md'
import ExitToApp from '@/components/ExitToApp'
import type { MTD, VisitorGateOutDetail } from './visitorGateInList_modal'
import { useParams } from '@/context/paramcontext'
import {
  DeleteVGPAction,
  getVistorGateInList,
  handleVisitorGateEntryDocPrint,
  SaveVisitorGatePassOutAction
} from './visitorGateInList_action'
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa'

/* ===========================================================
   🔥 RENDER STATS COMPONENT
   =========================================================== */

interface RenderStatsProps {
  searchTerm: string
  fromDate: string
  toDate: string
}

const RenderStats = ({ searchTerm, fromDate, toDate }: RenderStatsProps) => {
  const [myData, setMyData] = useState<MTD[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedVisitor, setSelectedVisitor] = useState<MTD | null>(null)
  const router = useRouter() // Initialize the useRouter hook
  const [open, setOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)

  const { Site_Code, companyid, UserName, bu } = useParams()

  const ITEMS_PER_PAGE = 5

  const filteredData = Array.isArray(myData)
    ? myData.filter(row => row.StrRecId.toLowerCase().includes(searchTerm.toLowerCase()) && !row.GateOut)
    : []

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (event: any, page: number) => setCurrentPage(page)

  const fetchData = async () => {
    const result = await getVistorGateInList(UserName!, Site_Code!, companyid!, bu!, fromDate, toDate)
    if (result?.success) {
      setMyData(result?.data)
    }
  }

  useEffect(() => {
    if (UserName && Site_Code && companyid && fromDate && toDate) fetchData()
  }, [UserName, Site_Code, companyid, bu, fromDate, toDate])

  const handleGateOutClick = (visitor: MTD) => {
    setSelectedVisitor(visitor)
    setOpenDialog(true)
  }

  const getCurrentDate = () => new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5) // HH:MM

  const handleConfirmGateOut = async () => {
    if (!selectedVisitor) return

    try {
      const SE: VisitorGateOutDetail = {
        strDocId: selectedVisitor.strDocId,
        strOutDate: getCurrentDate(),
        StrOutTime: getCurrentTime(),
        StrOutByUser: UserName!
      }

      const res = await SaveVisitorGatePassOutAction(SE, UserName!, Site_Code!, companyid!)

      if (res.success) {
        toast.success(res.message)

        // ✅ Update local state directly without refetch
        setMyData(prevData =>
          prevData.map(visitor =>
            visitor.StrRecId === selectedVisitor.StrRecId
              ? { ...visitor, GateOut: true } // mark as Gate Out
              : visitor
          )
        )
      } else {
        toast.error(res.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong!')
    } finally {
      setOpenDialog(false)
    }
  }

  const handleCancelGateOut = () => setOpenDialog(false)

  const handleEditView = (DocId: string) => {
    router.push(`/visitorGateInEntry/?DocId=${DocId}`)
  }

  /* ===========================================================
       🎯 ALWAYS SHOW HEADER — IF NO RECORD, SHOW SINGLE "NO RECORD" ROW
       =========================================================== */
  const isEmpty = filteredData.length === 0

  function handleDelete(StrDocID: string) {
    const FDelete = async () => {
      try {
        const response = await DeleteVGPAction(
          StrDocID,
          UserName as string,
          Site_Code as string,
          companyid as string,
          bu as string
        )

        if (response.success) {
          toast.success('Visitor Gate Pass deleted successfully')

          // 🟢 Remove entry from list immediately
          setMyData(prev => prev.filter(item => item.strDocId !== StrDocID))
        } else {
          toast.error('Failed to delete Visitor Gate Pass')
        }
      } catch (error: any) {
        toast.error('Error deleting Visitor Gate Pass: ' + error.message)
      }
    }

    FDelete()
  }

  const triggerDownloadFromBytes = (base64Data: string) => {
    const byteCharacters = atob(base64Data)
    const byteArrays = new Uint8Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i)
    }

    const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' })
    const pdfUrl = URL.createObjectURL(pdfBlob)

    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'VisitorGatePass.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000)
  }

  return (
    <>
      {/* =============== Desktop View =============== */}
      <div className='font-[sans-serif] overflow-x-auto max-h-96 hidden md:block lg:block mt-2'>
        <table className='min-w-full bg-white'>
          <thead className='bg-[#7367F0] sticky top-0 z-10'>
            <tr>
              <th className='p-3 text-left text-sm font-bold text-white rounded-tl-lg'>S.No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Gate Out</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Entry No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Entry Date</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Time</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Visitor Name</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Address</th>
              <th className='p-3 text-left text-sm font-bold text-white'>City</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Phone</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Vehicle</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Person To Meet</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Purpose</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Actions</th>
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
              currentItems.map((data: MTD, index: number) => (
                <tr key={index} className='even:bg-blue-50'>
                  <td className='p-2 text-sm'>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className='p-2 text-sm'>
                    <Checkbox
                      checked={data.GateOut === true}
                      onChange={() => handleGateOutClick(data)}
                      disabled={data.GateOut === true}
                    />
                  </td>
                  <td className='p-2 text-xs text-black'>{data.StrRecId}</td>
                  <td className='p-2 text-xs text-black'>{data.StrV_Date}</td>
                  <td className='p-2 text-xs text-black'>{data.StrInTime}</td>
                  <td className='p-2 text-xs text-black'>{data.StrName}</td>
                  <td className='p-2 text-xs text-black'>{data.StrAddress}</td>
                  <td className='p-2 text-xs text-black'>{data.StrCityName}</td>
                  <td className='p-2 text-xs text-black'>{data.StrPhMob}</td>
                  <td className='p-2 text-xs text-black'>{data.StrVehicle}</td>
                  <td className='p-2 text-xs text-black'>{data.StrPersonToMeet}</td>
                  <td className='p-2 text-xs text-black'>{data.StrPurpose}</td>
                  <td className='p-2'>
                    <div className='flex items-center space-x-3'>
                      <IconButton
                        color='primary'
                        aria-label='edit'
                        className='hover:bg-blue-100'
                        sx={{ fontSize: 18, padding: '4px' }}
                        onClick={() => {
                          handleEditView(data.strDocId)
                        }}
                      >
                        <FaEdit />
                      </IconButton>

                      <IconButton
                        color='error'
                        aria-label='delete'
                        className='hover:bg-red-100'
                        sx={{ fontSize: 18, padding: '4px' }}
                        onClick={() => {
                          setSelectedDocId(data.strDocId)
                          setOpen(true)
                        }}
                      >
                        <FaTrash />
                      </IconButton>

                      <IconButton
                        color='warning'
                        aria-label='view'
                        className='hover:bg-yellow-100'
                        sx={{ fontSize: 18, padding: '4px' }}
                        onClick={async () => {
                          const printData = await handleVisitorGateEntryDocPrint(
                            Site_Code as string,
                            companyid as string,
                            UserName as string,
                            bu as string,
                            data.strDocId
                          )
                          if (printData && printData.FileBytes) {
                            triggerDownloadFromBytes(printData.FileBytes)
                          } else {
                            toast.error('Failed to generate PDF')
                          }
                        }}
                      >
                        <FaPrint />
                      </IconButton>
                    </div>
                  </td>
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
                <span className='text-lg font-semibold text-cyan-800'>{data.StrRecId}</span>
              </div>

              <div className='mt-2 space-y-1 text-sm text-gray-700'>
                <div>
                  <b>Entry Date:</b> {data.StrV_Date}
                </div>
                <div>
                  <b>Time:</b> {data.StrInTime}
                </div>
                <div>
                  <b>Name:</b> {data.StrName}
                </div>
                <div>
                  <b>Address:</b> {data.StrAddress}
                </div>
                <div>
                  <b>City:</b> {data.StrCityName}
                </div>
                <div>
                  <b>Phone:</b> {data.StrPhMob}
                </div>
                <div>
                  <b>Vehicle:</b> {data.StrVehicle}
                </div>
                <div>
                  <b>Person To Meet:</b> {data.StrPersonToMeet}
                </div>
                <div>
                  <b>Purpose:</b> {data.StrPurpose}
                </div>
                <div className='flex items-center justify-between mt-4'>
                  {/* === LEFT: Gate Out === */}
                  <div className='flex items-center space-x-2'>
                    <span className='font-semibold text-gray-600'>Gate Out:</span>
                    <Checkbox
                      checked={data.GateOut === true}
                      onChange={() => handleGateOutClick(data)}
                      disabled={data.GateOut === true}
                    />
                  </div>

                  {/* === RIGHT: Actions === */}
                  <div className='flex items-center space-x-3'>
                    <IconButton
                      color='primary'
                      aria-label='edit'
                      className='hover:bg-blue-100'
                      sx={{ fontSize: 18, padding: '4px' }}
                      onClick={() => {
                        handleEditView(data.strDocId)
                      }}
                    >
                      <FaEdit />
                    </IconButton>

                    <IconButton
                      color='error'
                      aria-label='delete'
                      className='hover:bg-red-100'
                      sx={{ fontSize: 18, padding: '4px' }}
                      onClick={() => {
                        setSelectedDocId(data.strDocId)
                        setOpen(true)
                      }}
                    >
                      <FaTrash />
                    </IconButton>

                    <IconButton
                      color='warning'
                      aria-label='print'
                      className='hover:bg-yellow-100'
                      sx={{ fontSize: 18, padding: '4px' }}
                      onClick={async () => {
                        const printData = await handleVisitorGateEntryDocPrint(
                          Site_Code as string,
                          companyid as string,
                          UserName as string,
                          bu as string,
                          data.strDocId
                        )
                        if (printData && printData.FileBytes) {
                          triggerDownloadFromBytes(printData.FileBytes)
                        } else {
                          toast.error('Failed to generate PDF')
                        }
                      }}
                    >
                      <FaPrint />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* =============== Dialog Confirmation =============== */}
      <Dialog open={openDialog} onClose={handleCancelGateOut}>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
            Are you sure you want to mark this visitor as Gate Out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#7367F0', color: 'white' }} onClick={handleConfirmGateOut}>
            Yes
          </Button>
          <Button style={{ backgroundColor: '#EF5350', color: 'white' }} onClick={handleCancelGateOut}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
            Are you sure you want to delete this Record?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: '#7367F0', // Yes button color
              color: 'white' // Text color
            }}
            onClick={() => {
              if (selectedDocId) {
                handleDelete(selectedDocId) // Pass the Docid to handleDelete
                setOpen(false) // Close the dialog after deletion
              }
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: '#EF5350', // No button color
              color: 'white' // Text color
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

/* ===========================================================
   🔥 PAGE COMPONENT
   =========================================================== */
const VGPInList = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()

    // const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)

    const firstDay = today.toISOString().split('T')[0]
    const lastDay = today.toISOString().split('T')[0]

    setFromDate(firstDay)
    setToDate(lastDay)
  }, [])

  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
  }

  function handleClick() {
    router.push('/visitorGateInEntry/')
  }

  function handleChange() {
    router.push('/dashboardpage/')
  }

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
            title='Visitor Gate In List'
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
                <button
                  className='w-30 px-4 py-2 font-semibold text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300'
                  onClick={handleClick}
                >
                  + Visitor Gate In
                </button>
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

export default VGPInList
