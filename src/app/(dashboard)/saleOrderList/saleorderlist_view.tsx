'use client'

import React, {useEffect, useState } from 'react'
import type {  Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import FilterComponent from '@/components/FilterComponent'
import orderStatusAction, { deleteOrderAction, fetchParties, fetchPdfDataForClient } from './SaleOrder_List_action'
import { GrView } from 'react-icons/gr'
import { useOrderState } from '@/components/states/useOrderState'
import ConfirmationPopup from '@/components/ConfirmationPopup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  handleCancel,
  handleCheckboxChange,
  handleConfirm,
  handleFromDateChange,
  handlePartyChange,
  handlePendingorderChange,
  handleSearchChange,
  handleToDateChange,
  handleVerifiedConfirm,
  usePagination
} from '@/components/Functions/SaleOrder/OrderStatus'

import type { PartyforSale } from './SaleOrder_List_modal'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { IoMdClose, IoMdPrint } from 'react-icons/io'
import VerifiedPopup from '@/components/VerifiedPopup'
import secureLocalStorage from 'react-secure-storage'
import { CircularProgress } from '@mui/material'
import { useParams } from '@/context/paramcontext'

const SaleOrderList = () => {
  const router = useRouter()
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [checked, setChecked] = useState<boolean>()
  const { Site_Code, companyid, bu, UserName } = useParams()

  const {
    orderdata,
    setOrderData,
    filteredOrderData,
    setFilteredOrderData,
    StrFromDate,
    setStrFromDate,
    StrToDate,
    setStrToDate,
    parties,
    setParties,
    searchTerm,
    setSearchTerm,
    selectedParty,
    setSelectedParty,
    selectedPendingorder,
    setSelectedPendingOrder,
    orderDocId,
    setOrderDocId,
    checkedClients,
    setCheckedClients,
    clientIdToCheck,
    setClientIdToCheck,
    isPopupVisible,
    setPopupVisible,
    currentPage,
    setCurrentPage,
    clientCode,
    LinkCode,
    StrToken,
  } = useOrderState()
  const [isClicked, setIsClicked] = useState<boolean>(true)
  const [popupAction, setPopupAction] = useState<'verify' | 'unverify'>('verify')
  const [verifiedpopupVisible, setVerifiedpopupVisible] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteClientId, setDeleteClientId] = useState<number | null>(null)
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDeleted, setIsDelete] = useState(false);

  useEffect(() => {
    const today = new Date()

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2)
    const strStartOfMonth = startOfMonth.toISOString().split('T')[0]
    const strEndOfMonth = today.toISOString().split('T')[0]

    setStrFromDate(strStartOfMonth)
    setStrToDate(strEndOfMonth)
  }, [])

  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true)
      try {
        const response = await orderStatusAction(
          { StrFromDate, StrToDate },
          Site_Code,
          companyid,
          UserName as string,
          bu
        )
        if (response === null) {
          throw new Error('Failed to fetch order status')
        }
        console.log("response", response);
        if (response.success) {
          setOrderData(response.data)
          setFilteredOrderData(response.data)
          setIsClicked(false)
        } else {
          const errorMessage = response?.error || 'Unknown error'
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
          setOrderData([])
          setFilteredOrderData([])
        }
      } catch (error) {
        console.error('Error fetching order status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (Site_Code && companyid && StrFromDate && StrToDate && isClicked && UserName) {
      fetchOrderData().catch(console.error)
    }
  }, [Site_Code, companyid, isClicked, StrFromDate, StrToDate, UserName])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let result = [...orderdata] // Make a copy of the original data to avoid mutation

    // Apply the search term filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase() // Convert searchTerm to lowercase
      result = result.filter(item => {
        const recIdLower = item.pOrderNo.toLowerCase() // Convert item.pOrderNo to lowercase
        return recIdLower.includes(searchTermLower)
      })
    }

    // Apply the party filter
    if (selectedParty) {
      result = result.filter(item => item.partyname === selectedParty)
    }

    // Apply the pending order filter
    if (selectedPendingorder === 'Pending') {
      result = result.filter(item => item.status === 'Open' || item.status === 'Hold')
    } else if (selectedPendingorder === 'Non Pending') {
      result = result.filter(item => item.status === 'Verified') // Filter for 'Verified' status only
    }

    // Set the filtered data and reset pagination
    setFilteredOrderData(result)
    setCurrentPage(0)
  }, [searchTerm, selectedParty, selectedPendingorder, orderdata])

  const handleAddOrder = () => {
    router.push('/saleOrderEntry/')
  }

  const perPage = 10
  const { numPages, paginatedData } = usePagination(filteredOrderData, perPage, currentPage, setCurrentPage)

  const onFilter = () => {
    setIsClicked(true)
    setCurrentPage(0)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result: PartyforSale = await fetchParties(
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      if (result.success) {
        setParties(result.data)
      } else {
        console.error(result.error)
      }
    }

    if (Site_Code && companyid && UserName && bu) {
      fetchData()
    }
  }, [Site_Code, companyid, UserName, bu])

  const handleDeleteHeaderAndDetail = async (clientId: number) => {
    const res = await deleteOrderAction({
      UserName,
      Site_Code,
      companyid,
      clientId,
      LinkCode,
      StrToken,
      clientCode,
      bu
    })
    console.log("res", res);
    if (res.success) {
      toast.success(res.responseText, {
        position: 'top-center',
        autoClose: 3000
      })

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      toast.error(res.error || 'Something went wrong', {
        position: 'top-center',
        autoClose: 3000
      })
    }
  }

  const handleEditView = (
    clientId: number,
    status: string,
    setVerifiedpopupVisible: Dispatch<SetStateAction<boolean>>
  ) => {
    secureLocalStorage.setItem('status', status)

    if (status == 'Verified') {
      setVerifiedpopupVisible(true)
      return
    }
    router.push(`/saleOrderEntry?clientId=${clientId}&status=${status}`)
  }

  const handlePrintPdfView = async (clientId: number) => {
    try {
      const data = await fetchPdfDataForClient(
        clientId,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      if (!data || !data.FileBytes) {
        console.error('No PDF data received')
        return
      }

      // Decode base64 and convert to Blob
      const byteCharacters = atob(data.FileBytes)
      const byteArrays = new Uint8Array(byteCharacters.length)

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i)
      }

      const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' })
      const pdfUrl = URL.createObjectURL(pdfBlob)

      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = `${clientId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000)
    } catch (error) {
      console.error('Error printing PDF:', error)
    }
  }

  return (
    <>
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

      <FilterComponent
        searchTerm={searchTerm}
        StrFromDate={StrFromDate}
        StrToDate={StrToDate}
        selectedParty={selectedParty}
        selectedPendingorder={selectedPendingorder}
        parties={parties}
        onSearchChange={handleSearchChange(setSearchTerm)}
        onFromDateChange={handleFromDateChange(setStrFromDate)}
        onToDateChange={handleToDateChange(setStrToDate)}
        onPartyChange={handlePartyChange(setSelectedParty)}
        onPendingOrderChange={handlePendingorderChange(setSelectedPendingOrder)}
        onFilter={onFilter}
        onAddOrder={handleAddOrder}
      />

      <ConfirmationPopup
        checked={checked}
        isVisible={isPopupVisible}
        onConfirm={() => {
          handleConfirm(
            orderDocId,
            clientIdToCheck,
            setCheckedClients,
            setPopupVisible,
            setClientIdToCheck,
            setOrderData,
            UserName as string,
            Site_Code as string,
            companyid as string,
            bu as string,
            setIsVerifying
          )
        }}
        onCancel={() => {
          handleCancel(setPopupVisible, setClientIdToCheck)
        }}
        action={popupAction}
      />

      <VerifiedPopup
        isVisible={verifiedpopupVisible}
        onConfirm={() => {
          handleVerifiedConfirm(setVerifiedpopupVisible)
        }}
      />

      <div className='hidden max-h-115 overflow-y-auto md:block lg:block '>
        <div className='overflow-x-auto '>
          <table className='w-full table-auto border-collapse'>
            <thead className=''>
              <tr className='bg-gray-200 text-left'>
                <th className='px-4 py-2'>SO No.</th>
                <th className='px-4 py-2'>SO Date</th>
                <th className='hidden px-4 py-2 lg:table-cell'>ERP Ref No./Date</th>
                <th className='px-4 py-2'>Party Name</th>
                <th className='hidden px-4 py-2 lg:table-cell'>Consignee Name</th>
                <th className='px-4 py-2'>Order Qty.</th>
                <th className='hidden px-4 py-2 lg:table-cell'>Notification</th>
                <th className='hidden px-4 py-2 lg:table-cell'>Noti. Date</th>
                <th className='px-4 py-2 lg:table-cell'>Order Type</th>
                <th className='px-4 py-2 lg:table-cell'>To Place</th>
                <th className='px-4 py-2'>Approval Status</th>
                <th className='flex justify-center px-4 py-2'>Action</th>
              </tr>
            </thead>

            <tbody style={{ borderTop: '2px solid blue' }}>
              {isLoading ? (
                <tr>
                  <td colSpan={11} style={{ padding: '40px 0' }} className='text-center'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div className='text-gray-500'>
                        <CircularProgress />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map(client => {
                  const extractDate = (dateString: string | null) => {
                    if (!dateString) {
                      return 'N/A' // Return a default value if dateString is null or undefined
                    }
                    const matches = dateString?.match(/\d+/)
                    if (matches) {
                      const date = new Date(parseInt(matches[0]))
                      const day = String(date.getDate()).padStart(2, '0')
                      const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
                      const year = date.getFullYear()
                      return `${day}/${month}/${year}` // Return formatted as dd/mm/yyyy
                    } else {
                      return 'N/A'
                    }
                  }

                  const pOdate = extractDate(client?.pOdate)
                  const erpRefDate = extractDate(client?.erpRefDate)
                  const notificationDate = extractDate(client?.notificationDate)

                  return (
                    <tr key={client.docid} className='border-gray-300  border-b text-sm'>
                      <td orderdata-label='SO No.' className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                        <small className='text-gray-900 text-sm font-semibold '>{client.pOrderNo}</small>
                      </td>

                      <td orderdata-label='SO Date' className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                        <small className='text-gray-500 font-semibold '>{pOdate}</small>
                      </td>

                      <td
                        orderdata-label='ERP Ref No./Date'
                        className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'
                      >
                        <small className='text-gray-500 font-semibold '>
                          {client.erpRefNo} /{erpRefDate}
                        </small>
                      </td>

                      <td orderdata-label='Party Name' className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                        <small className='text-gray-700 font-semibold '>{client.partyname}</small>
                      </td>

                      <td
                        orderdata-label='Consignee Name'
                        className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'
                      >
                        <small className='text-gray-500 font-semibold '>{client.ConsigneeName}</small>
                      </td>

                      <td orderdata-label='Order Qty.' className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                        <small className='text-gray-700 text-right font-semibold '>{client.ordqty}</small>
                      </td>

                      <td
                        orderdata-label='Notification'
                        className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'
                      >
                        <small className='text-gray-500 font-semibold '>{client.notification}</small>
                      </td>
                      <td
                        orderdata-label='Noti. Date'
                        className='hidden whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'
                      >
                        <small className='text-gray-500 font-semibold '>{notificationDate}</small>
                      </td>
                      <td
                        orderdata-label='Order Type'
                        className=' whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'
                      >
                        <small className='text-gray-500 font-semibold '>{client.orderType}</small>
                      </td>
                      <td
                        orderdata-label='To Place'
                        className=' whitespace-nowrap px-4 py-2 text-sm lg:table-cell lg:w-1'
                      >
                        <small className='text-gray-500 font-semibold '>{client.toPlace}</small>
                      </td>

                      <td orderdata-label='Approval Status' className='whitespace-nowrap px-4 py-2 text-sm lg:w-1'>
                        <small className='bg-cyan-600 hover:bg-cyan-800 rounded-lg px-2 py-1 text-xs font-semibold text-white transition-colors duration-200 ease-in-out '>
                          {client.status}
                        </small>
                      </td>

                      <td orderdata-label='Action' className='mt-3 whitespace-nowrap before:hidden  lg:w-1 '>
                        <div className='flex w-18 justify-between'>
                          {client.status !== 'Cancelled' && (
                            <div className='mt-1 h-4 w-3'>
                              <input
                                className='cursor-pointer'
                                type='checkbox'
                                disabled={isVerifying}
                                checked={client?.status === 'Verified'}
                                onChange={e => {
                                  handleCheckboxChange(
                                    client.docid,
                                    e.target.checked,
                                    setClientIdToCheck,
                                    setOrderDocId,
                                    setPopupVisible,
                                    setPopupAction,
                                    setChecked
                                  )
                                }}
                              />
                            </div>
                          )}

                          <div
                            className='mt-1'
                            onClick={() => {
                              handleEditView(client.docid, client.status, setVerifiedpopupVisible)
                            }}
                          >
                            <button>
                              {/* <span><MdModeEditOutline /></span> */}
                              <span>
                                <GrView className='text-blue-500 hover:text-blue-950' />
                              </span>
                            </button>
                          </div>

                          {client.status == 'Open' && (
                            <div
                              className='mt-1'
                              onClick={() => {
                                setDeleteClientId(client.docid)
                                setShowDeleteModal(true)
                              }}
                            >
                              <button
                                className='   rounded focus:outline-none focus:ring-2 '

                                // style={{ display: 'none' }}
                                
                                disabled={isDeleted}
                              >
                                <span>
                                  <MdDelete color='red' size={17} />
                                </span>
                              </button>
                            </div>
                          )}

                          <div
                            className='mt-1'
                            onClick={() => {
                              handlePrintPdfView(client.docid)
                            }}
                          >
                            <button className='rounded focus:outline-none focus:ring-2'>
                              <span className='text-yellow-500'>
                                <IoMdPrint />
                              </span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={11} className='py-5 text-center'>
                    <div className='text-gray-500 mr-20 text-center  sm:text-center'>No data found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-4 max-h-96 overflow-y-auto bg-cyan-50 px-4 sm:px-6 md:hidden'>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <CircularProgress />
          </div>
        ) : paginatedData.length > 0 ? (
          paginatedData.map((client, index) => {
            const extractDate = (dateString: string | null) => {
              if (!dateString) {
                return 'N/A' // Return a default value if dateString is null or undefined
              }
              const matches = dateString?.match(/\d+/)
              if (matches) {
                const date = new Date(parseInt(matches[0]))
                const day = String(date.getDate()).padStart(2, '0')
                const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
                const year = date.getFullYear()
                return `${day}/${month}/${year}` // Return formatted as dd/mm/yyyy
              } else {
                return 'N/A'
              }
            }

            const notificationDate = extractDate(client.notificationDate)

            const erpRefDate = extractDate(client.erpRefDate)
            const pOdate = extractDate(client?.pOdate)

            return (
              <div key={client.docid} className='mb-4 rounded bg-white p-4 shadow-md '>
                <div className='flex flex-col space-y-2'>
                  <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                    <span className='text-xl font-bold  '>SO No.:</span>
                    <span className='text-lg font-semibold '>{client.pOrderNo}</span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>SO Date:</span>
                    <span className='text-gray-700 -300 text-sm'>{pOdate}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>ERP Ref No./Date:</span>
                    <span className='text-gray-700 -300 text-sm'>
                      {client.erpRefNo} /{erpRefDate}
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>Party Name:</span>
                    <span className='text-gray-700 -300 text-sm'>{client.partyname}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>Consignee Name:</span>
                    <span className='text-gray-700 -300 text-sm'>{client.ConsigneeName}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>Order Qty.:</span>
                    <span className='text-gray-700 -300 text-sm'>{client.ordqty}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>Notification:</span>
                    <span className='text-gray-700 -300 text-sm'>{client.notification}</span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>Noti. Date:</span>
                    <span className='text-gray-700 -300 text-sm'>{notificationDate}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-600 -400 text-sm font-semibold'>Approval Status:</span>
                    <span className='text-gray-700 -300 text-sm'>{client.status}</span>
                  </div>

                  {activeCardId === `${index}` && (
                    <div className=''>
                      <form className='font-sans flex flex-col rounded-md md:flex-row'>
                        {/* Left */}
                        <div className=''>
                          <h1 className='text-2xl font-bold text-blue-400 '>Party Order Number</h1>
                          <div className='font-bold text-slate-600 '>{client.partyOrdNo}</div>
                          <h1 className='text-xl mt-2 font-bold text-slate-900 '>Place</h1>
                          <div className='font-bold text-slate-600 '>{client.toPlace}</div>
                          <h1 className='text-xl mt-2 font-bold text-slate-900 '>Status</h1>
                          <div className='text-sm font-bold text-slate-600 '>{client.status}</div>
                        </div>
                        {/* Right */}
                        <div className=''>
                          <h1 className='text-xl mt-2 font-bold text-slate-900 '>Order Type</h1>
                          <div className='text-sm font-bold text-slate-600 '>{client.orderType}</div>
                        </div>
                      </form>
                    </div>
                  )}
                  <div className='mt-3 flex items-center md:mt-0 md:flex-col'>
                    {client.status !== 'Cancelled' && (
                      <div className='mr-2'>
                        <input
                          className='cursor-pointer'
                          type='checkbox'
                          disabled={isVerifying}
                          checked={client?.status === 'Verified'}
                          onChange={e => {
                            handleCheckboxChange(
                              client.docid,
                              e.target.checked,
                              setClientIdToCheck,
                              setOrderDocId,
                              setPopupVisible,
                              setPopupAction,
                              setChecked
                            )
                          }}
                        />
                      </div>
                    )}

                    <div className='mr-2 '>
                      <button
                        className='rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onClick={() => {
                          handleEditView(client.docid, client.status, setVerifiedpopupVisible)
                        }}
                      >
                        <span className='text-purple-500'>
                          <MdModeEditOutline size={20} />
                        </span>
                      </button>
                    </div>

                    {client.status == 'Open' && (
                      <div className='mr-2'>
                        <button
                          className='rounded focus:outline-none focus:ring-2 '
                          disabled={isDeleted}
                          onClick={() => {
                            setDeleteClientId(client.docid)
                            setShowDeleteModal(true)
                          }}
                        >
                          <span>
                            <MdDelete color='red' size={17} />
                          </span>
                        </button>
                      </div>
                    )}
                    <div>
                      <button
                        className='rounded focus:outline-none focus:ring-2'
                        onClick={() => {
                          handlePrintPdfView(client.docid)
                        }}
                      >
                        <span className='text-yellow-500'>
                          <IoMdPrint />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <button
                      onClick={() => {
                        // Toggle between expanded and collapsed card
                        if (activeCardId === `${index}`) {
                          setActiveCardId(null) // Collapse card if it's already open
                        } else {
                          setActiveCardId(`${index}`) // Expand the card
                        }
                      }}
                      className='cursor-pointer hover:text-primary'
                    >
                      {/* Toggle between GrView and IoMdClose */}
                      {activeCardId === `${index}` ? (
                        <IoMdClose className='text-right text-rose-500 hover:text-orange-500' />
                      ) : (
                        <GrView className='text-right text-blue-700 hover:text-blue-950' />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className='py-5 text-center'>
            <p className='text-gray-500 text-center sm:text-center'>No data found</p>
          </div>
        )}
      </div>

      <div className=' border-gray-100 border-t p-3  lg:px-6'>
        <div className='flex flex-col items-center justify-between py-3 md:flex-row md:justify-between md:py-0 '>
          <div className='flex gap-52 md:gap-10'>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
              Previous
            </button>

            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === numPages - 1}>
              Next
            </button>
          </div>
          <small className='mt-6 md:mt-0'>
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>

      {showDeleteModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-sm rounded-lg bg-white p-6 shadow-lg'>
            <div className='mb-4 '>
              <p className='text-lg font-semibold'>Are you sure you want to delete this order?</p>
            </div>
            <div className='flex justify-end space-x-3'>
              <button
                className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                onClick={() => {
                  if (deleteClientId !== null) {
                    setIsDelete(true);
                    handleDeleteHeaderAndDetail(deleteClientId)
                    setShowDeleteModal(false)
                  }
                }}
              >
                OK
              </button>
              <button
                className='rounded bg-rose-500 px-4 py-2 text-white hover:bg-rose-600'
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SaleOrderList
