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
// import { DeleteReqAction, getReqList, handleReqDocPrint } from '@/app/action/storeAction'
import { DeleteReqAction, getReqList, handleReqDocPrint } from './Requisition_List_action'
import Loading from '@/components/Loading'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPrint } from 'react-icons/fa6'
import Pagination from '@mui/material/Pagination'
import SearchBar from '@/components/SearchBar'
import { MdOutlineFindInPage } from 'react-icons/md'
import ExitToApp from '@/components/ExitToApp'
import type { ReqInterface } from './Requisition_List_modal'
import { useParams } from '@/context/paramcontext'

interface RenderStatsProps {
  searchTerm: string
  fromDate: string
  toDate: string
}

const RenderStats = ({ searchTerm, fromDate, toDate }: RenderStatsProps) => {
  const [myData, setMyData] = useState<ReqInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter() // Initialize the useRouter hook

  const ITEMS_PER_PAGE = 5

  const filteredData = Array.isArray(myData)
    ? myData.filter(row =>
        String(row.strRecId || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : []

  const totalItems = myData.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = myData.slice(indexOfFirstItem, indexOfLastItem)
  const { Site_Code, companyid, bu, UserName } = useParams()

  const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getReqList(Site_Code as string, companyid as string, bu as string, fromDate, toDate)
      if (result && result.success) {
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

  function handleDelete(StrDocID: string) {
    const FDelete = async () => {
      try {
        const response = await DeleteReqAction(
          StrDocID,
          Site_Code as string,
          UserName as string,
          companyid as string,
          bu as string
        )
        if (response?.status === 200) {
          toast.success('Requisition deleted successfully')

          // ✅ Filter out the deleted item from the local state
          setMyData(prevData => prevData.filter(item => item.strDocId !== StrDocID))
        } else {
          toast.error('Failed to delete Requisition')
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error('Error deleting Requisition: ' + error.message)
        } else {
          toast.error('Unknown error occurred.')
        }
      }
    }

    FDelete()
  }

  const handleEditView = (Docid: string) => {
    router.push(`/reqEntry/?Docid=${Docid}`)
  }

  function triggerDownloadFromBytes(base64Data: string) {
    const byteCharacters = atob(base64Data)
    const byteArrays = new Uint8Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i)
    }

    const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' })
    const pdfUrl = URL.createObjectURL(pdfBlob)

    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `Requisition.pdf`

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
              <th className='p-3 text-left text-sm font-bold text-white rounded-tl-lg'>S.No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Req. No.</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Req. Date</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Department</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Requisition By</th>
              <th className='p-3 text-left text-sm font-bold text-white'>Designation</th>
              <th className='p-3 text-left text-sm font-bold text-white rounded-tr-lg'>Actions</th>
            </tr>
          </thead>

          {filteredData.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={7} // 👈 number of table columns
                  className='text-center align-middle'
                >
                  <Typography variant='body2'>No Record</Typography>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className='whitespace-nowrap overflow-y-auto max-h-[calc(100vh-200px)]'>
              {searchTerm
                ? filteredData.map((data: ReqInterface, index: number) => (
                    <tr key={index} className='even:bg-blue-50'>
                      <td className='p-2 text-sm text-black'>{(currentPage - 1) * ITEMS_PER_PAGE + (index + 1)}</td>
                      <td className='p-2 text-sm text-black'>{data.strRecId}</td>
                      <td className='p-2 text-sm text-black'>{data.strV_Date}</td>
                      <td className='p-2 text-sm text-black'>{data.strDepartment}</td>
                      <td className='p-2 text-sm text-black'>{data.strReqBy}</td>
                      <td className='p-2 text-sm text-black'>{data.strDesignation}</td>
                      <td className='p-2'>
                        <IconButton
                          color='primary'
                          aria-label='edit'
                          className='hover:bg-blue-100'
                          sx={{ fontSize: 16 }}
                          onClick={() => {
                            handleEditView(data.strDocId ?? '')
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
                            setSelectedDocId(data.strDocId ?? '')
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
                          onClick={async () => {
                            const printData = await handleReqDocPrint(
                              Site_Code as string,
                              companyid as string,
                              UserName as string,
                              bu as string,
                              data.strDocId
                            )
                            if (printData?.FileBytes) {
                              triggerDownloadFromBytes(printData.FileBytes)
                            } else {
                              toast.error('Failed to generate PDF')
                            }
                          }}
                        >
                          <FaPrint />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                : currentItems.map((data, index) => (
                    <tr key={index} className='even:bg-blue-50'>
                      <td className='p-2 text-sm text-black'>{(currentPage - 1) * ITEMS_PER_PAGE + (index + 1)}</td>
                      <td className='p-2 text-sm text-black'>{data.strRecId}</td>
                      <td className='p-2 text-sm text-black'>{data.strV_Date}</td>
                      <td className='p-2 text-sm text-black'>{data.strDepartment}</td>
                      <td className='p-2 text-sm text-black'>{data.strReqBy}</td>
                      <td className='p-2 text-sm text-black'>{data.strDesignation}</td>
                      <td className='p-2'>
                        <IconButton
                          color='primary'
                          aria-label='edit'
                          className='hover:bg-blue-100'
                          sx={{ fontSize: 16 }}
                          onClick={() => {
                            handleEditView(data.strDocId ?? '')
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
                            setSelectedDocId(data.strDocId ?? '')
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
                          onClick={async () => {
                            const printData = await handleReqDocPrint(
                              Site_Code as string,
                              companyid as string,
                              UserName as string,
                              bu as string,
                              data.strDocId
                            )
                            if (printData?.FileBytes) {
                              triggerDownloadFromBytes(printData.FileBytes)
                            } else {
                              toast.error('Failed to generate PDF')
                            }
                          }}
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
                  <span className='text-xl font-bold text-cyan-900'>Req. No:</span>
                  <span className='text-lg font-semibold text-cyan-800 '>{data.strRecId}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Req. Date:</span>
                  <span className='text-sm text-gray-700 '>{data.strV_Date}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Department:</span>
                  <span className='text-sm text-gray-700 '>{data.strDepartment}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Requisition By:</span>
                  <span className='text-sm text-gray-700 '>{data.strReqBy}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-semibold text-gray-600 '>Designation:</span>
                  <span className='text-sm text-gray-700 '>{data.strDesignation}</span>
                </div>
              </div>

              <div className='flex justify-right mt-4'>
                <IconButton
                  color='primary'
                  aria-label='edit'
                  className='hover:bg-blue-100'
                  sx={{ fontSize: 18 }}
                  onClick={() => {
                    handleEditView(data.strDocId ?? '')
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
                    setSelectedDocId(data.strDocId ?? '') // Set the selected Docid
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
                  onClick={async () => {
                    const printData = await handleReqDocPrint(
                      Site_Code as string,
                      companyid as string,
                      UserName as string,
                      bu as string,
                      data.strDocId
                    )
                    if (printData?.FileBytes) {
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

const RequisitionList = () => {
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
    router.push('/reqEntry')
  }

  function handleChange() {
    router.push('/dashboardpage/')
  }

  return (
    <>
      <HeadingTab TitleIcon={BsBank2} Title='Purchase' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
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
            title='Requisition List'
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
                  + Requisition
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
          <CardContent sx={{ padding: '10px' }}>{RenderStats({ searchTerm, fromDate, toDate })}</CardContent>
        </Card>
      </div>
    </>
  )
}

export default RequisitionList
