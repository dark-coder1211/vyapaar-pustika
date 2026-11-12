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
import type { SaleOrderListInterface } from './SaleOrderEntryList_modal'
import { useParams } from '@/context/paramcontext'
import { DeleteSaleOrderAction, getSaleListAction } from './SaleOrderEntryList_action'
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa'
import { handleGateEntryDocPrint } from '../gateEntry/GateEntry_action'


/* ===========================================================
   🔥 RENDER STATS COMPONENT
   =========================================================== */

interface RenderStatsProps {
  searchTerm: string
  fromDate: string
  toDate: string
}

const RenderStats = ({ searchTerm, fromDate, toDate }: RenderStatsProps) => {
  const [myData, setMyData] = useState<SaleOrderListInterface[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedVisitor, setSelectedVisitor] = useState<SaleOrderListInterface | null>(null)
  const router = useRouter() // Initialize the useRouter hook
  const [open, setOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)

  const { Site_Code, companyid, UserName, bu } = useParams()

  const ITEMS_PER_PAGE = 10

  const filteredData = Array.isArray(myData)
    ? myData.filter(row => row.RecId.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (event: any, page: number) => setCurrentPage(page)

  const fetchData = async () => {
    const result = await getSaleListAction(Site_Code!, companyid!, fromDate, toDate, bu!)
    // console.log('sale List Data:', result)
    if (result) {
      setMyData(result)
    }
  }

  useEffect(() => {
    if (UserName && Site_Code && companyid && fromDate && toDate) fetchData()
  }, [UserName, Site_Code, companyid, fromDate, toDate])

  const handleGateOutClick = (visitor: SaleOrderListInterface) => {
    setSelectedVisitor(visitor)
    setOpenDialog(true)
  }

  const getCurrentDate = () => new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5) // HH:MM

  // const handleConfirmGateOut = async () => {
  //   if (!selectedVisitor) return

  //   try {
  //     const SE: GateEntryOutDetail = {
  //       strDocId: selectedVisitor.DocID,
  //       strOutDate: getCurrentDate(),
  //       StrOutTime: getCurrentTime(),
  //       StrOutByUser: UserName!,
  //       StrGateOutSlipNo: ''
  //     }

  //     const res = await SaveGateEntryOutDetail(SE, UserName!, Site_Code!, companyid!)

  //     if (res.success) {
  //       toast.success(res.message)

  //       // ✅ Update local state directly without refetch
  //       setMyData(prevData =>
  //         prevData.map(visitor =>
  //           visitor.RecId === selectedVisitor.RecId
  //             ? { ...visitor, GateOut: true } // mark as Gate Out
  //             : visitor
  //         )
  //       )
  //     } else {
  //       toast.error(res.error)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     toast.error('Something went wrong!')
  //   } finally {
  //     setOpenDialog(false)
  //   }
  // }

  const handleCancelGateOut = () => setOpenDialog(false)

  const handleEditView = (DocId: string) => {
    router.push(`/saleOrderEntry/?DocId=${DocId}`)
  }

  /* ===========================================================
       🎯 ALWAYS SHOW HEADER — IF NO RECORD, SHOW SINGLE "NO RECORD" ROW
       =========================================================== */
  const isEmpty = filteredData.length === 0

  function handleDelete(StrDocID: string) {
    const FDelete = async () => {
      try {
        const response = await DeleteSaleOrderAction(
          StrDocID,
          UserName as string,
          Site_Code as string,
          companyid as string,
          bu as string
        )
        console.log('Delete Response:', response)
        if (response.success) {
          toast.success('Sale Order Data deleted successfully')

          // 🟢 Remove entry from list immediately
          setMyData(prev => prev.filter(item => item.DocID !== StrDocID))
        } else {
          toast.error('Failed to delete Sale Order Data: '+ response.error)
        }
      } catch (error: any) {
        toast.error('Error deleting Sale Order Data: ' + error.message)
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
    link.download = 'GatePass.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000)
  }
  
  const orderTypeLabel: Record<string, string> = {
  S: 'Sheet',
  R: 'Reel',
  O: 'Other',
  N: 'Notebook',
  C: 'Copier',
}

  return (
    <>
      {/* =============== Desktop View =============== */}
      <div className='font-[sans-serif] overflow-x-auto w-full max-h-96 hidden md:block lg:block mt-2'>
        <table className='min-w-full bg-white table-fixed'>
          <thead className='bg-[#7367F0] sticky top-0 z-10'>
            <tr>
              <th className='p-3 text-center text-sm font-bold text-white rounded-tl-lg w-32'>S.No.</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Verify</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Sale Order No.</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Sale Order Date</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Party Name</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Consignee Name</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Order Qty.</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>Order Type</th>
              <th className='p-3 text-center text-sm font-bold text-white w-32'>To Place</th>
              {/* <th className='p-3 text-center text-sm font-bold text-white w-32'>Approval Status</th> */}
              <th className='p-3 text-center text-sm font-bold text-white w-32 rounded-tr-lg'>Action</th>
            </tr>
          </thead>

          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={16} className='text-center py-6 text-gray-600 font-semibold'>
                  No Record Found
                </td>
              </tr>
            ) : (
              currentItems.map((data: SaleOrderListInterface, index: number) => (
                <tr key={index} className='even:bg-blue-50'>
                  <td className='p-2 text-sm text-center'>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className='p-2 text-sm text-center'>
                    <Checkbox
                      checked={
                        // data.GateOut === 
                        false}
                      // onChange={() => handleGateOutClick(data)}
                      // disabled={data.GateOut === true}
                    />
                  </td>
                  <td className='p-2 text-xs text-black text-center w-32'>{data.RecId}</td>
                  <td className='p-2 text-xs text-black text-center w-32'>{data.V_Date}</td>
                  <td className='p-2 text-xs text-black text-center w-32'>{data.CustName}</td>
                  <td className='p-2 text-xs text-black text-center w-32'>{data.ConsigneeName}</td>
                  <td className='p-2 text-xs text-black text-center w-32'>{data.Qty}</td>
                  <td className='p-2 text-xs text-black text-center w-24 min-w-24 max-w-24 whitespace-normal break-words'> {orderTypeLabel[data.OrderType] ?? data.OrderType}</td>
                  <td className='p-2 text-xs text-black text-center w-32'>{data.CityName}</td>
                  <td className='p-2'>
                    <div className='flex items-center space-x-3'>
                      <IconButton
                        color='primary'
                        aria-label='edit'
                        className='hover:bg-blue-100'
                        sx={{ fontSize: 18, padding: '4px' }}
                        onClick={() => {
                          handleEditView(data.DocID)
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
                          setSelectedDocId(data.DocID)
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
                          const printData = await handleGateEntryDocPrint(
                            Site_Code as string,
                            companyid as string,
                            UserName as string,
                            bu as string,
                            data.DocID
                          )
                          console.log('Print Data:', printData)
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
                <span className='text-xl font-bold text-cyan-900'>Sale Order No:</span>
                <span className='text-lg font-semibold text-cyan-800'>{data.RecId}</span>
              </div>

              <div className='mt-2 space-y-1 text-sm text-gray-700 break-words'>
                <div>
                  <b>Sale Order Date:</b> {data.V_Date}
                </div>
                <div>
                  <b>Party Name:</b> {data.CustName}
                </div>
                <div>
                  <b>Consignee Name:</b> {data.ConsigneeName}
                </div>
                <div>
                  <b>Order Qty.:</b> {data.Qty}
                </div>
                <div>
                  <b>Order Type:</b> {data.OrderType}
                </div>
                <div>
                  <b>To Place:</b> {data.CityName}
                </div>
                <div className='flex items-center justify-between mt-4'>
                  {/* === LEFT: Gate Out === */}
                  <div className='flex items-center space-x-2'>
                    <span className='font-semibold text-gray-600'>Gate Out:</span>
                    <Checkbox
                      checked={
                        // data.GateOut === 
                        false}
                      // onChange={() => handleGateOutClick(data)}
                      // disabled={data.GateOut === true}
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
                        handleEditView(data.DocID)
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
                        setSelectedDocId(data.DocID)
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
                        const printData = await handleGateEntryDocPrint(
                          Site_Code as string,
                          companyid as string,
                          UserName as string,
                          bu as string,
                          data.DocID
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
            Are you sure you want to mark this as Gate Out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#7367F0', color: 'white' }} >
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
const SaleList = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchVisible, setSearchVisible] = useState(false)
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)
    const firstDay = startOfMonth.toISOString().split('T')[0]
    const lastDay = today.toISOString().split('T')[0]

    setFromDate(firstDay)
    setToDate(lastDay)
  }, [])

  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
  }

  function handleClick() {
    router.push('/saleOrderEntry/')
  }

  function handleChange() {
    router.push('/dashboardpage/')
  }

  return (
    <>
      <HeadingTab
        TitleIcon={BsFillDoorOpenFill}
        Title='Sales'
        RoutingIcon={SiHomebridge}
        routingPath='/dashboardpage/'
      />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <ToastContainer position='top-center' autoClose={5000} theme='light' />
          <CardHeader
            title='Sale Order List'
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
                  + Sale Order
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

export default SaleList
