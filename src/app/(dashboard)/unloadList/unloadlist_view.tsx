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
  Button,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import { FaEdit, FaTrash } from 'react-icons/fa' // Importing action icons
// import { handleIndDocPrint,getIndentList, DeleteIndentAction } from '@/app/action/purchaseAction'
import { getUnloadingList, DeleteUnloadingAction } from './UnloadList_action'
import Loading from '@/components/Loading'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPrint } from 'react-icons/fa6'
import Pagination from '@mui/material/Pagination'
import SearchBar from '@/components/SearchBar'
import { MdOutlineFindInPage } from 'react-icons/md'
import ExitToApp from '@/components/ExitToApp'
import type { UnloadingListInterface } from './UnloadList_modal'
import { useParams } from '@/context/paramcontext'

interface RenderStatsProps {
  searchTerm: string
  fromDate: string
  toDate: string
}

const RenderStats = ({ searchTerm, fromDate, toDate }: RenderStatsProps) => {
  const [myData, setMyData] = useState<UnloadingListInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [selectedV_SNo, setSelectedV_SNo] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter() // Initialize the useRouter hook
  const { Site_Code, companyid, UserName, bu } = useParams()

  const ITEMS_PER_PAGE = 10

  const filteredData = Array.isArray(myData)
    ? myData.filter(row => row.StrItemName.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const totalItems = myData.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = myData.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUnloadingList(bu as string, Site_Code as string, companyid as string, fromDate, toDate)
      if (result) {
        setMyData(result.data)
      }
      setLoading(false)
    }
    if (Site_Code && companyid && fromDate && toDate) {
      fetchData()
    }
  }, [Site_Code, companyid, fromDate, toDate])

  if (loading) {
    return <Loading />
  }

  function handleDelete(StrDocID: string, V_Sno: number) {
    const FDelete = async () => {
      try {
        const response = await DeleteUnloadingAction(
          StrDocID,
          Site_Code as string,
          companyid as string,
          UserName as string,
          V_Sno as number,
          bu as string
        ) // Calling the delete action
        if (response.success) {
          toast.success('Unloading data deleted successfully')

          // ✅ Remove the deleted item from the state
          setMyData(prevData => prevData.filter(item => item.strDocId !== StrDocID))
        } else {
          toast.error(response.error || 'Failed to delete unloading data')
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error('Error deleting data: ' + error.message)
        } else {
          toast.error('Unknown error occurred.')
        }
      }
    }
    FDelete()
  }

  const handleEditView = (Docid: string, V_SNo: string) => {
    // console.log({V_SNo})
    router.push(`/unloadEntry?Docid=${Docid}&V_SNo=${V_SNo}`)
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
    link.download = 'Indent.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000)
  }

  return (
    <>
      {/* Desktop View */}
      <div className='font-[sans-serif] overflow-x-auto max-h-96 hidden md:block lg:block mt-2'>
        <table className='min-w-full bg-white'>
          <thead className='bg-[#7367F0] whitespace-nowrap sticky top-0 z-10'>
            <tr>
              <th className='p-2 text-center text-sm font-bold text-white rounded-tl-lg'>Gate No.</th>
              <th className='p-3 text-center text-sm font-bold text-white'>S. No.</th>
              <th className='p-3 text-center text-sm font-bold text-white'>Order No.</th>
              <th className='p-3 text-center text-sm font-bold text-white'>Item</th>
              <th className='p-3 text-center text-sm font-bold text-white'>Change Item</th>
              <th className='p-3 text-center text-sm font-bold text-white'>Weighment</th>
              <th className='p-3 text-center text-sm font-bold text-white rounded-tr-lg'>Actions</th>
            </tr>
          </thead>

          {filteredData.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <div className='flex items-center justify-center w-full h-full py-4'>
                    <Typography variant='body2' className='text-center'>
                      No Record
                    </Typography>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className='whitespace-nowrap overflow-y-auto max-h-[calc(100vh-200px)]'>
              {searchTerm
                ? filteredData.map((data: UnloadingListInterface, index: number) => (
                    <tr key={index} className='even:bg-blue-50'>
                      <td className='p-2 text-sm text-black text-center'>{data.StrGateInNo}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.IntV_SNo}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrOrdNo}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrItemName}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrComponentName}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrWeightmentNo}</td>
                      <td className='p-2 text-center'>
                        <IconButton
                          color='primary'
                          aria-label='edit'
                          className='hover:bg-blue-100'
                          sx={{ fontSize: 16 }}
                          onClick={() => {
                            handleEditView(data.strDocId, data.IntV_SNo.toString())
                          }}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          color='error'
                          aria-label='delete'
                          className='hover:bg-red-100'
                          sx={{ fontSize: 16 }}
                          onClick={() => {
                            setSelectedDocId(data.strDocId)
                            setSelectedV_SNo(data.IntV_SNo)
                            setOpen(true)
                          }}
                        >
                          <FaTrash />
                        </IconButton>
                        <IconButton
                          color='warning'
                          aria-label='view'
                          className='hover:bg-yellow-100'
                          sx={{ fontSize: 16 }}

                          // onClick={async () => {
                          //   const printData = await handleIndDocPrint(
                          //     Site_Code as string,
                          //     companyid as string,
                          //     UserName as string,
                          //     bu as string,
                          //     data.strDocId
                          //   )
                          //   if (printData && printData.FileBytes) {
                          //     triggerDownloadFromBytes(printData.FileBytes)
                          //   } else {
                          //     toast.error('Failed to generate PDF')
                          //   }
                          // }}
                        >
                          <FaPrint />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                : currentItems.map((data: UnloadingListInterface, index) => (
                    <tr key={index} className='even:bg-blue-50'>
                      <td className='p-2 text-sm text-black text-center'>{data.StrGateInNo}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.IntV_SNo}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrOrdNo}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrItemName}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrComponentName}</td>
                      <td className='p-2 text-sm text-black text-center'>{data.StrWeightmentNo}</td>
                      <td className='p-2 text-center'>
                        <IconButton
                          color='primary'
                          aria-label='edit'
                          className='hover:bg-blue-100'
                          sx={{ fontSize: 16 }}
                          onClick={() => {
                            handleEditView(data.strDocId, data.IntV_SNo.toString())
                          }}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          color='error'
                          aria-label='delete'
                          className='hover:bg-red-100'
                          sx={{ fontSize: 16 }}
                          onClick={() => {
                            setSelectedDocId(data.strDocId)
                            setSelectedV_SNo(data.IntV_SNo)
                            setOpen(true)
                          }}
                        >
                          <FaTrash />
                        </IconButton>
                        <IconButton
                          color='warning'
                          aria-label='view'
                          className='hover:bg-yellow-100'
                          sx={{ fontSize: 16 }}

                          // onClick={async () => {
                          //   const printData = await handleIndDocPrint(
                          //     Site_Code as string,
                          //     companyid as string,
                          //     UserName as string,
                          //     bu as string,
                          //     data.strDocId
                          //   )
                          //   if (printData && printData.FileBytes) {
                          //     triggerDownloadFromBytes(printData.FileBytes)
                          //   } else {
                          //     toast.error('Failed to generate PDF')
                          //   }
                          // }}
                        >
                          <FaPrint />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
            </tbody>
          )}
        </table>

        <div className='flex justify-center mt-4 sticky bottom-0 bg-white z-10 py-2'>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
        </div>
      </div>

      {/* Mobile View with White Background and Actions */}
      {filteredData.length === 0 ? (
        <div className='flex items-center justify-center w-full h-full md:hidden'>
          <Typography variant='body2' className='text-center'>
            No Record
          </Typography>
        </div>
      ) : (
        <div className='overflow-y-auto max-h-full md:hidden mt-4 px-4 sm:px-6 bg-cyan-50'>
          {filteredData.map((data, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-lg mb-6 p-6  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out mt-7'
            >
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                  <span className='text-xl font-bold text-cyan-900'>Gate No:</span>
                  <span className='text-lg font-semibold text-cyan-800 '>{data.StrGateInNo}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>S. No.:</span>
                  <span className='text-sm text-gray-700 '>{data.IntV_SNo}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Order No.:</span>
                  <span className='text-sm text-gray-700 '>{data.IntOrdV_SNo}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Item:</span>
                  <span className='text-sm text-gray-700 '>{data.StrItemName}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Change Item:</span>
                  <span className='text-sm text-gray-700 '>{data.StrComponentName}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Weighment:</span>
                  <span className='text-sm text-gray-700 '>{data.StrWeightmentNo}</span>
                </div>
              </div>

              <div className='flex justify-right mt-4'>
                <IconButton
                  color='primary'
                  aria-label='edit'
                  className='hover:bg-blue-100'
                  sx={{ fontSize: 18 }}
                  onClick={() => {
                    handleEditView(data.strDocId, data.IntV_SNo.toString())
                  }}
                >
                  <FaEdit />
                </IconButton>
                <IconButton
                  color='error'
                  aria-label='delete'
                  className='hover:bg-red-100'
                  sx={{ fontSize: 18 }}
                  onClick={() => {
                    setSelectedDocId(data.strDocId) // Set the selected Docid
                    setSelectedV_SNo(data.IntV_SNo)
                    setOpen(true) // Open the delete confirmation dialog
                  }}
                >
                  <FaTrash />
                </IconButton>
                <IconButton
                  color='warning'
                  aria-label='view'
                  className='hover:bg-yellow-100'
                  sx={{ fontSize: 18 }}

                  // onClick={async () => {
                  //   const printData = await handleIndDocPrint(
                  //     Site_Code as string,
                  //     companyid as string,
                  //     UserName as string,
                  //     bu as string,
                  //     data.strDocId
                  //   )
                  //   if (printData && printData.FileBytes) {
                  //     triggerDownloadFromBytes(printData.FileBytes)
                  //   } else {
                  //     toast.error('Failed to generate PDF')
                  //   }
                  // }}
                >
                  <FaPrint />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
            Are you sure you want to delete this Indent?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: '#7367F0', // Yes button color
              color: 'white' // Text color
            }}
            onClick={() => {
              if (selectedDocId && selectedV_SNo) {
                handleDelete(selectedDocId, selectedV_SNo) // Pass the Docid to handleDelete
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

const UnloadingList = () => {
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

  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
  }

  function handleClick() {
    router.push('/unloadEntry/')
  }

  function handleChange() {
    router.push('/dashboardpage/')
  }

  return (
    <>
      <HeadingTab TitleIcon={BsBank2} Title='Gate' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
          <CardHeader
            title='Unloading List'
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
                  + Unloading
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
            {/* Conditionally render the TextField based on searchVisible state */}
            {/* {searchVisible && <SearchBar onSearch={term => setSearchTerm(term)} />} */}
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

export default UnloadingList
