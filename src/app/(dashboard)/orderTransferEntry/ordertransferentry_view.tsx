'use client'

import ExitToApp from '@/components/ExitToApp'
import HeadingTab from '@/components/HeadingTab'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import Select, { MultiValue, SingleValue } from 'react-select'
import OrderTransferEntryDetail from './ordertransferentrydetail_view'
import VoucherTypeHelpComponent from '@/components/HelpBox/vouchertypehelp'
import { useParams } from '@/context/paramcontext'
import { RecidNOHelp } from './OrderTransafer_Entry_action'
import GodownHelpComponent from '@/components/HelpBox/godownhelp'
import TransferTypeHelpComponent from '@/components/HelpBox/transfertypehelp'

interface OrderTransferInterface {
  StrV_Type?: string
  StrDescription?: string
  order_Recid?: string
  order_GodCode?: string
  order_GodName?: string
  order_TransferType_Code?: string
  order_TransferType_Name?: string
}

export interface RecidInterface {
  success: boolean
  data: string
  error: string
}

const RenderStats = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [isModalvalidate, setIsModalvalidate] = useState(false)
  const [isAddModalActive, setIsAddModalActive] = useState(false)
  const [isEditModalActive, setIsEditModalActive] = useState(false)
  const [orderTransfer, setOrderTransfer] = useState<OrderTransferInterface[]>([])
  const [orderNumber, setOrderNumber] = useState('')
  const { Site_Code, companyid, UserName, bu } = useParams()
  const [loading, setLoading] = useState(false)

  const formatDate = (date: string | Date, format: 'input' | 'display' = 'input'): string => {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''

    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')

    if (format === 'display') {
      return `${day}/${month}/${year}` // For UI display
    }

    return `${year}-${month}-${day}` // For <input type="date">
  }

  const handleChange = async <K extends keyof OrderTransferInterface>(key: K, value: OrderTransferInterface[K]) => {
    let updatedOrderTransfer: OrderTransferInterface

    setOrderTransfer(prev => {
      const updated = [...prev]
      if (updated.length === 0) {
        updatedOrderTransfer = { [key]: value } as OrderTransferInterface
        updated.push(updatedOrderTransfer)
      } else {
        updatedOrderTransfer = { ...updated[0], [key]: value }
        updated[0] = updatedOrderTransfer
      }
      return updated
    })
  }

  useEffect(() => {
    async function getOrderTransferNumber() {
      const res: RecidInterface = await RecidNOHelp(
        formatDate(new Date()),
        'OTRFR',
        'OrderTransfer',
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      if (res?.success) {
        setOrderNumber(res?.data) // Set state if data is not null
      } else {
        // If there is an error, log the error message
        const errorMessage = res.error || 'Unknown error'
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    }
    if (Site_Code && companyid && UserName) {
      getOrderTransferNumber()
    }
  }, [setOrderNumber, Site_Code, companyid, UserName])

  useEffect(() => {
    console.log('OrderTransfer', orderTransfer)
  }, [orderTransfer])
  // const handleChange = async <K extends keyof OrderTransferInterface>(
  //   key: K,
  //   value: OrderTransferInterface[K] | null
  // ) => {
  //   let updatedOrderTransfer: OrderTransferInterface
  //   // Handle null (cleared selection)
  //   if (value === null) {
  //     setOrderTransfer(prev => {
  //       const updated = [...prev]
  //       if (updated.length > 0) {
  //         updated[0] = {
  //           ...updated[0],
  //           [key]: undefined,
  //           ...(key === 'order_entry_type' || key === 'order_entry_desc' ? { order_Recid: undefined } : {})
  //         }
  //       }
  //       return updated
  //     })
  //     return
  //   }

  //   // Set updated field
  //   setOrderTransfer(prev => {
  //     const updated = [...prev]

  //     if (updated.length === 0) {
  //       updatedOrderTransfer = {
  //         order_entry_type: '',
  //         order_entry_desc: '',
  //         order_Recid: '',
  //         [key]: value
  //       }
  //       updated.push(updatedOrderTransfer)
  //     } else {
  //       updatedOrderTransfer = { ...updated[0], [key]: value }
  //       updated[0] = updatedOrderTransfer
  //     }

  //     return updated
  //   })

  //   // Fetch recId only if not set
  //   if (!orderTransfer[0]?.order_Recid && value !== null) {
  //     const res: RecidInterface = await RecidNOHelp(
  //       formatDate(new Date()),
  //       'OTRFR',
  //       'OrderTransfer',
  //       Site_Code as string,
  //       companyid as string,
  //       UserName as string,
  //       bu as string
  //     )

  //     const recId = res?.data
  //     if (recId) {
  //       setOrderTransfer(prev => {
  //         const updated = [...prev]
  //         if (updated.length > 0) {
  //           updated[0] = {
  //             ...updated[0],
  //             order_Recid: recId
  //           }
  //         }
  //         return updated
  //       })
  //     }
  //   }
  // }

  // useEffect(() => {
  //   const Today = formatDate(new Date()) // Execute this when data is empty or null

  //   setCurrentDate(Today)
  // }, [])

  const [currentDate, setCurrentDate] = useState(() => formatDate(new Date()))

  const toggleAddModal = (
    isAddModalActive: boolean,
    setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsAddModalActive(true)
  }

  return (
    <>
      <div className=''>
        <div className='flex justify-center px-2 py-3'>
          <div className='w-full max-w-4xl'>
            <div className='rounded border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                {/* Type Data is Typed data */}
                <div>
                  <VoucherTypeHelpComponent
                    filters={orderTransfer[0]}
                    handleChange={handleChange}
                    StrCondition="and Category='OTRFR'"
                    filterKey='StrV_Type'
                    nameKey='StrDescription'
                    isMulti={false}
                    label={
                      <>
                        Type <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  />
                </div>

                {/* Entry No. */}
                <div>
                  <label className='block text-sm font-medium text-black mb-1'>
                    Entry No.<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type='text'
                    id='order_Recid'
                    name='order_Recid'
                    className='w-full rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input '
                    disabled
                    value={orderTransfer[0]?.order_Recid || orderNumber}
                  />
                </div>

                {/* Order Transfer Date */}
                <div>
                  <label className='block text-sm font-medium text-black mb-1'>
                    Entry Date<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id='V_Date'
                    name='V_Date'
                    type='date'
                    className='w-full rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input '
                    value={currentDate}
                    onChange={e => setCurrentDate(e.target.value)}
                  />
                </div>

                {/* Godown Help */}
                <div>
                  <GodownHelpComponent
                    filters={orderTransfer[0]}
                    handleChange={handleChange}
                    filterKey='order_GodCode'
                    nameKey='order_GodName'
                    label={
                      <>
                        Godown <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  />
                </div>

                {/* Transfer Type */}
                <div>
                  <TransferTypeHelpComponent
                    filters={orderTransfer[0]}
                    handleChange={handleChange}
                    filterKey='order_TransferType_Code'
                    nameKey='order_TransferType_Name'
                    label={
                      <>
                        Transfer Type <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  />
                </div>

                {/* Department */}
                <div>
                  {/* <DepartmentHelpComponent<IndentInterface>
                    filters={Indent[0]}
                    handleChange={handleChange}
                    filterKey='StrDepartment'
                    nameKey='StrDepartmentName'
                    isMulti={false}
                    label={
                      <>
                        Department <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  /> */}
                  <label className='block text-sm font-medium text-black  mb-1'>
                    Get New Barcode <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary' />
                </div>

                {/* HOD */}
                <div>
                  {/* <PartyHelpComponent
                    filters={Indent[0]}
                    handleChange={handleChange}
                    StrNature='Employee'
                    filterKey='StrHOD'
                    nameKey='StrHODName'
                    isMulti={false}
                    label='HOD'
                    showButton={false}
                  /> */}
                  <label className='block text-sm font-medium text-black  mb-1'>
                    Get New QRCode <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Select className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent font-normal outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:bg-form-input dark:focus:border-primary' />
                </div>

                {/* Indentor Name */}
                <div className='mt-6 ml-4 sm:ml-auto md:ml-80 lg:ml-80 xl:ml-72'>
                  {/* <PartyHelpComponent
                    filters={Indent[0]}
                    handleChange={handleChange}
                    StrNature='Employee'
                    filterKey='StrHOD'
                    nameKey='StrHODName'
                    isMulti={false}
                    label='HOD'
                    showButton={false}
                  /> */}
                  <button className='w-full sm:w-auto px-4 py-2 font-bold bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-15'>
          <button
            className='w-14 px-1 font-bold py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
            onClick={() => toggleAddModal(isAddModalActive, setIsAddModalActive)}
          >
            Add
          </button>
        </div>

        {/* Table */}
        <div className='overflow-x-auto mt-2 '>
          <div className='overflow-x-auto mt-2'>
            {/* <TableThree /> */}
            <div className='rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 '>
              <div className='max-w-full overflow-x-auto'>
                {/* Check if the screen is mobile */}
                <div className='lg:hidden '>
                  {/* Mobile View */}
                  <div className='overflow-y-auto max-h-full md:hidden  px-4 sm:px-6 bg-cyan-50'>
                    <div className='space-y-6'>
                      {' '}
                      {/* Increased spacing between each item */}
                      {/* {!isSelect &&
                        IndentDet.map((ele, index) => ( */}
                      <div
                        // key={index}
                        className='bg-white rounded-xl shadow-lg mb-6 p-6  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out'
                      >
                        <div className='flex flex-col'>
                          {' '}
                          {/* Increased space between the details */}
                          <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                            <span className='text-sm font-bold text-cyan-900'>S.No. :</span>
                            {/* <span className='text-sm font-semibold text-cyan-800 '>{ele.StrItemName}</span> */}
                          </div>
                          <div className='flex flex-col space-y-2 mt-2'>
                            {' '}
                            {/* Increased space between the details */}
                            <div className='text-xs font-semibold text-gray-700 '>
                              <span className='text-xs font-normal text-gray-600 '>Order No. :</span>
                              {/* <span className='text-xs text-gray-700 '>{index + 1}</span> */}
                            </div>
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>Item Name:</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.StrICode}</span> */}
                          </div>
                          <div className='flex items-center space-x-2  mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>BF :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.StrMakeName}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>Size :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.currentStock}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>Unit :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.MinStock}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>GSM :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.MaxStock}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>Reel No. :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.Reorder}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>Weight :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.dblAprQty}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>To Order No. :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.IndQty}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>To Godown :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.StrUnit}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>Old Barcode :</span>
                            {/* <span className='text-xs text-gray-700 '>{ele.StrCostCenterName}</span> */}
                          </div>
                          <div className='flex items-center space-x-2 mt-1'>
                            <span className='text-xs font-semibold text-gray-600 '>New Barcode :</span>
                            <span className='text-xs text-gray-700 '> {formatDate('', 'display')}</span>
                          </div>
                        </div>

                        <div className='flex items-center justify-end space-x-1 mt-4'>
                          <IconButton color='primary' className='hover:bg-blue-100' sx={{ fontSize: 18 }}>
                            <FaEdit />
                          </IconButton>

                          <IconButton
                            color='error'
                            className='hover:bg-red-100'
                            sx={{ fontSize: 18 }}
                            // onClick={e => {
                            //   e.stopPropagation()
                            //   openDialog(index) // Open dialog with the current row index
                            // }}
                          >
                            <FaTrash />
                          </IconButton>
                        </div>
                      </div>
                      {/* // ))} */}
                    </div>
                  </div>
                </div>

                {/* Desktop View (Optional) */}
                <div className='hidden lg:block'>
                  <table className='w-full table-auto whitespace-nowrap'>
                    <thead>
                      <tr className='bg-teal-500 text-white '>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          S.No.
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Action
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Order No.
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Item Name
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          BF
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Size
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Unit
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          GSM
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Reel No.
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Weight
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          To Order No.
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          To Godown
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Old Barcode
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          New Barcode
                        </th>
                      </tr>
                    </thead>
                    {/* {!isSelect &&
                      IndentDet.map((ele, index) => { */}
                    {/* return ( */}
                    <tbody>
                      <tr className='hover:bg-gray-50 dark:hover:bg-gray-200'>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {index + 1} */}
                        </td>
                        <td className='px-4 py-1 text-xs  text-blacktext-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          <div className='flex items-center justify-end space-x-1 '>
                            <IconButton
                              color='primary'
                              className='hover:bg-blue-100'
                              sx={{ fontSize: 18 }}
                              // onClick={() =>
                              //   handleEdit(index, IndentDet, setIsEditModalActive, setEditItem, setEditIndex)
                              // }
                            >
                              <FaEdit />
                            </IconButton>

                            <IconButton
                              color='error'
                              className='hover:bg-red-100'
                              sx={{ fontSize: 18 }}
                              // onClick={e => {
                              //   e.stopPropagation()
                              //   openDialog(index) // Open dialog with the current row index
                              // }}
                            >
                              <FaTrash />
                            </IconButton>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.StrItemName} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.StrICode} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.StrICode} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.StrMakeName} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.currentStock} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.MinStock} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.MaxStock} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.Reorder} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.dblAprQty} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.IndQty} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.StrUnit} */}
                        </td>
                        <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                          {/* {ele.StrCostCenterName} */}
                        </td>
                      </tr>
                    </tbody>
                    {/* )})} */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button

            // onClick={e => handleSubmit(e, setIsSelect)}
            
            className='w-14 px-1 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
          >
            Save
          </button>
        </div>
      </div>

      {/* <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth='xs'
        fullWidth={false}
        style={{ minHeight: '250px' }}
      >
        <DialogContent style={{ padding: '10px 20px' }}>
          <TableContainer component={Paper} elevation={3}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#5D6B8D' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                // onClick={() => handleRowClick('Closed')}
                // className={getRowClass('Closed')} // Apply the class conditionally
                >
                  <TableCell>Closed</TableCell>
                </TableRow>

                <TableRow
                // onClick={() => handleRowClick('Hold')}
                // className={getRowClass('Hold')} // Apply the class conditionally
                >
                  <TableCell>Hold</TableCell>
                </TableRow>
                <TableRow
                // onClick={() => handleRowClick('Open')}
                // className={getRowClass('Open')} // Apply the class conditionally
                >
                  <TableCell>Open</TableCell>
                </TableRow>
                <TableRow
                // onClick={() => handleRowClick('Cancel')}
                // className={getRowClass('Cancel')} // Apply the class conditionally
                >
                  <TableCell>Cancel</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions style={{ padding: '8px 16px' }}>
          <Button
            style={{
              backgroundColor: '#7367F0',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
              padding: '6px 12px',
              fontSize: '0.875rem',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => {
              const target = e.target as HTMLButtonElement
              target.style.backgroundColor = '#5E50F4'
            }}
            onMouseLeave={e => {
              const target = e.target as HTMLButtonElement
              target.style.backgroundColor = '#7367F0'
            }}
            // onClick={handleOkClick} // Print the letter and close the dialog when "OK" is clicked
          >
            OK
          </Button>

          <Button
            onClick={() => setIsModalOpen(false)}
            style={{
              backgroundColor: '#EF5350',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
              padding: '6px 12px',
              fontSize: '0.875rem',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => {
              const target = e.target as HTMLButtonElement
              target.style.backgroundColor = '#E04E4A'
            }}
            onMouseLeave={e => {
              const target = e.target as HTMLButtonElement
              target.style.backgroundColor = '#EF5350'
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
            Are you sure you want to delete this Row?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: '#7367F0', // Yes button color
              color: 'white' // Text color
            }}

            // onClick={handleConfirmDelete}

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
      {isModalvalidate && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn z-[1000]'>
          <div className='bg-white dark:border-strokedark dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-xl font-semibold text-gray-800 text-center mb-7'>modalMessage</h2>
            <div className='flex justify-center'>
              <button
                onClick={() => setIsModalvalidate(false)}
                className='bg-blue-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition duration-200'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <OrderTransferEntryDetail
        isAddModalActive={isAddModalActive}
        isEditModalActive={isEditModalActive}
        toggleAddModal={() => setIsAddModalActive(false)}
        toggleEditModal={() => setIsEditModalActive(false)}
      />
    </>
  )
}

const OrderTransferEntry = () => {
  const router = useRouter()
  function handleChange() {
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
      <HeadingTab TitleIcon={BsBank2} Title='Order Transfer' RoutingIcon={SiHomebridge} routingPath='/home/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Order Transfer Entry'
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
          <CardContent sx={{ padding: '10px' }}>{RenderStats()}</CardContent>
        </Card>
      </div>
    </>
  )
}

export default OrderTransferEntry
