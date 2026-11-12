'use client'

import AddStockIssueModal from './stockissueEntrydetail_view'
import HeadingTab from '@/components/HeadingTab'
import type {
  ApiResponse,
  ApiResponseDetail,
  StockissueInterfaceDetail,
  StockISUHeaderInterface,
  RecidInterface,
  Godown
} from './stockissueEntry_modal'
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
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { SiHomebridge } from 'react-icons/si'
import ExitToApp from '@/components/ExitToApp'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AddStockIssueAction,
  FAutoGodown,
  GetStockIssueDetByReq,
  GetStockIssueDetailByDocid,
  GetStockIssueHeaderByDocid,
  RecidNOHelp
} from './stockissueEntry_action'
import { FaEdit, FaStore } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import VoucherTypeHelpComponent from '@/components/HelpBox/vouchertypehelp'
import { useParams } from '@/context/paramcontext'
import TextBoxOne from '@/components/TextBoxOne'
import ReqNoStkIsuHelpComponent from '@/components/HelpBox/reqnoStkIsuhelp'
import LocationHelpComponent from '@/components/HelpBox/locationhelp'

const RenderStats = () => {
  const [isAddModalActive, setIsAddModalActive] = useState(false)
  const [isEditModalActive, setIsEditModalActive] = useState(false)
  const [docId, setdocId] = useState<string>('')
  const searchParams = useSearchParams()
  const [stkIsu, setStkIsu] = useState<StockISUHeaderInterface[]>([])
  const [stkIsuDet, setStkIsuDet] = useState<StockissueInterfaceDetail[]>([])
  const [currentDate, setCurrentDate] = useState<string>('')
  const [editItem, setEditItem] = useState<StockissueInterfaceDetail | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Closed') // Default to "Closed" option
  const [entryno, setEntryNo] = useState('')
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessage, setModalMessage] = React.useState('')
  const { Site_Code, companyid, UserName, bu } = useParams()

  const handleChange = async <K extends keyof StockISUHeaderInterface>(key: K, value: StockISUHeaderInterface[K]) => {
    let updatedstkIsu: StockISUHeaderInterface

    setStkIsu(prev => {
      const updated = [...prev]
      const current = updated[0] || ({} as StockISUHeaderInterface)
      updated[0] = { ...current, [key]: value }
      updatedstkIsu = updated[0]
      return updated
    })

    if (key === 'StrReqDocId') {
      if (typeof value === 'string' && value.trim() !== '') {
        // do nothing here, rely on Fill Detail button or separate fetch
      } else {
        // cleared or empty string
        setStkIsuDet([])
      }
    }
  }

  const GetGodown = async (): Promise<void> => {
    try {
      const res = (await FAutoGodown(
        stkIsu[0]?.StrLocationCode,
        Site_Code as string,
        companyid as string,
        bu as string
      )) as Godown[] | null

      if (res && res.length > 0) {
        setStkIsuDet(prev =>
          prev.map(item => ({
            ...item,
            StrGodownCode: res[0].GodCode,
            StrGodownName: res[0].GodName
          }))
        )
      }
    } catch (err) {
      console.error('Failed to fetch godown:', err)
    }
  }

  const handleFillDetail = async () => {
    const value = stkIsu[0]?.StrReqDocId

    if (typeof value === 'string' && value.trim() !== '') {
      const data = await GetStockIssueDetByReq(
        { StrReqNo: value },
        stkIsu[0]?.strDocId,
        !stkIsu[0]?.strDocId ? 'Add' : 'Edit',
        Site_Code as string,
        companyid as string,
        bu as string
      )

      const updated =
        data?.map((item: StockissueInterfaceDetail) => ({
          ...item,
          dblIssueQty: item.dblReqQty, // 👈 Same value set
          StrIssuedFor: item.StrIssuedFor?.trim() ? item.StrIssuedFor : 'P',
          StrIssuedName: item.StrIssuedName?.trim() ? item.StrIssuedName : 'Production (Input)',

          StrIssuedType: item.StrIssuedType?.trim() ? item.StrIssuedType : 'M',
          StrIssuedTypeName: item.StrIssuedTypeName?.trim() ? item.StrIssuedTypeName : 'Manufacturer'
        })) ?? []

      setStkIsuDet(updated)

      console.log('updated data', updated)
      await GetGodown()
    } else {
      setStkIsuDet([])
    }
  }
  useEffect(() => {
    // Reset the selectedOption when the dialog is opened
    if (isModalOpen) {
      setSelectedOption('Closed') // Set default option to "Closed"
    }
  }, [isModalOpen])

  const handleRowClick = (option: any) => {
    setSelectedOption(option) // Set the selected option when a row is clicked
  }

  const handleOkClick = () => {
    if (selectedOption === 'Closed') {
      console.log('Y')
    } else if (selectedOption === 'Hold') {
      console.log('H')
    } else if (selectedOption === 'Open') {
      console.log('N')
    } else if (selectedOption === 'Cancel') {
      console.log('R')
    }
    setIsModalOpen(false)
  }

  const getRowClass = (option: any) => {
    return selectedOption === option ? 'bg-purple-50' : ''
  }

  // Handler for checkbox click
  // const handleCheckboxClick = () => {
  //   setIsModalOpen(!isModalOpen)
  // }

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

  const toggleAddModal = (
    isAddModalActive: boolean,
    setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsAddModalActive(true)
  }

  const toggleEditModal = (
    isEditModalActive: boolean,
    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsEditModalActive(true)
  }

  useEffect(() => {
    const Today = formatDate(new Date()) // Execute this when data is empty or null

    setCurrentDate(Today)
  }, [])

  useEffect(() => {
    async function getstkIsuNumber() {
      const res: RecidInterface = await RecidNOHelp(
        formatDate(new Date()),
        'ISU',
        'STOCKHEAD',
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )
      const clientId = searchParams.get('clientId')
      if (!clientId) {
        if (res?.success) {
          setEntryNo(res?.data) // Set state if data is not null
        } else {
          // If there is an error, log the error message
          const errorMessage = res.error || 'Unknown error'
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
        }
      }
    }
    if (Site_Code && companyid && UserName) {
      getstkIsuNumber()
    }
  }, [setEntryNo, Site_Code, companyid, UserName])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ApiResponse | null = await GetStockIssueHeaderByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setStkIsu(data.data) // Set the fetched single object
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching stkIsu data:', error)
      }
    }

    fetchData()
  }, [searchParams, setCurrentDate, setStkIsu, setdocId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ApiResponseDetail | null = await GetStockIssueDetailByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setStkIsuDet(data.data) // Set the fetched single object
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching stkIsu data:', error)
      }
    }

    fetchData()
  }, [searchParams, setCurrentDate, setStkIsuDet, setdocId])

  const handleEdit = (
    index: number,
    stkIsuDet: StockissueInterfaceDetail[], // Adjust the type according to your data structure

    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    setEditItem: React.Dispatch<React.SetStateAction<StockissueInterfaceDetail | null>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const dataToEdit = stkIsuDet[index]
    setIsEditModalActive(true) // Open the modal for editing

    setEditIndex(index) // Save the index of the item being edited
    setEditItem(dataToEdit)
  }

  const handleTableDelete = (
    index: number,
    stkIsuDet: StockissueInterfaceDetail[],
    setStkIsuDet: React.Dispatch<React.SetStateAction<StockissueInterfaceDetail[]>>
  ) => {
    // First, get the data from the row that is about to be deleted
    const rowToDelete = stkIsuDet[index]

    if (rowToDelete) {
      setStkIsuDet(prevDetail => prevDetail.filter((_, i) => i !== index))

      toast.success('Data deleted successfully!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  // Function that sets the index of the row to delete and opens the dialog
  const openDialog = (index: number): void => {
    setRowIndexToDelete(index) // Set the index of the row to delete
    setOpen(true) // Open the dialog
  }

  // Function to handle deletion after confirmation
  const handleConfirmDelete = () => {
    if (rowIndexToDelete !== null) {
      handleTableDelete(rowIndexToDelete, stkIsuDet, setStkIsuDet) // Delete the row and pass the necessary parameters
      setOpen(false) // Close the dialog
    }
  }

  const submitForm = (formData: StockissueInterfaceDetail) => {
    handleFormSubmit(
      formData,

      setStkIsuDet,

      toggleAddModal, // Pass the function directly

      isAddModalActive,
      setIsAddModalActive
    )
  }

  const handleFormSubmit = (
    formData: StockissueInterfaceDetail,

    setStkIsuDet: React.Dispatch<React.SetStateAction<StockissueInterfaceDetail[]>>,

    toggleAddModal: (
      isAddModalActive: boolean,
      setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
    ) => void,

    isAddModalActive: boolean,
    setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setStkIsuDet(prevSubmissions => [...prevSubmissions, formData])

    toggleAddModal(isAddModalActive, setIsAddModalActive) // Correct argument order
  }

  const submitEditForm = (formData: StockissueInterfaceDetail) => {
    handleEditFormSubmit(
      formData,
      editIndex,
      stkIsuDet,
      setStkIsuDet,
      toggleEditModal,
      setStkIsu,
      setEditIndex,
      isEditModalActive,
      setIsEditModalActive
    )
  }

  const handleEditFormSubmit = (
    formData: StockissueInterfaceDetail,
    editIndex: number | null,
    stkIsuDet: StockissueInterfaceDetail[],
    setDetail: React.Dispatch<React.SetStateAction<StockissueInterfaceDetail[]>>,
    toggleEditModal: (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
    setHeader: React.Dispatch<React.SetStateAction<StockISUHeaderInterface[]>>, // Adjust the type as necessary
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
    isEditModalActive: boolean,
    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (editIndex !== null) {
      const updatedSubmissions = stkIsuDet.map((item, index) => (index === editIndex ? formData : item))
      setDetail(updatedSubmissions)

      toggleEditModal(isEditModalActive, setIsEditModalActive) // Close the modal
    } else {
      console.error('Edit index is not set.')
    }
  }

  type stkIsuKeys = keyof StockISUHeaderInterface

  const requiredFields: { key: stkIsuKeys; label: string }[] = [{ key: 'StrLocationCode', label: 'Location' }]

  const validatestkIsu = (stkIsu: StockISUHeaderInterface): boolean => {
    for (const field of requiredFields) {
      const value = stkIsu[field.key]
      if (!value || value.toString().trim() === '') {
        setModalMessage(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }
    }
    return true
  }

  async function getstkIsuNumberAfterSave() {
    const res: RecidInterface = await RecidNOHelp(
      formatDate(new Date()),
      'ISU',
      'STOCKHEAD',
      Site_Code as string,
      companyid as string,
      UserName as string,
      bu as string
    )
    const clientId = searchParams.get('clientId')
    if (!clientId && res?.success) {
      setEntryNo(res.data) // ✅ This updates your stkIsu number state
    } else {
      console.error(res?.error || 'Failed to fetch stkIsu number.')
    }
  }

  const showError = (msg: string) => {
    setModalMessage(msg)
    setIsModalvalidate(true)
  }

  const resetForms = () => {
    const emptyHeader: StockISUHeaderInterface = {
      strDocId: '',
      strV_Type: '',
      strV_TypeDesc: '',
      IntV_No: 0,
      StrV_Date: '',
      IntV_Prefix: 0,
      StrRecId: '',
      StrStaff: '',
      StrStaffName: '',
      StrLocationCode: '',
      StrLocationName: '',
      StrPlantCode: '',
      StrPlantName: '',
      StrPreparedBy: '',
      StrReqDocId: '',
      StrReqNo: '',
      clsStoreIssueDetail: []
    }

    setStkIsu([emptyHeader])
    setStkIsuDet([])
  }

  const handleSubmit = async (event: React.FormEvent, setIsSelect: Dispatch<SetStateAction<boolean>>) => {
    event.preventDefault()

    // -------------------------
    // 1. VALIDATION: HEADER
    // -------------------------
    if (!stkIsu?.length || !stkIsu[0]) {
      showError('Stock Issue header data is missing.')
      return
    }

    if (!validatestkIsu(stkIsu[0])) {
      return // already handled inside validate function
    }

    // -------------------------
    // 2. VALIDATION: DETAILS
    // -------------------------
    if (!stkIsuDet?.length) {
      showError('Please fill at least one item.')
      return
    }

    for (const row of stkIsuDet) {
      if (!row.strItemCode?.trim()) {
        showError('Item Name is required.')
        return
      }
      if (!row.dblIssueQty || Number(row.dblIssueQty) === 0) {
        showError('Issue Qty is required.')
        return
      }
    }

    // -------------------------
    // 3. PREPARE PAYLOAD
    // -------------------------
    const updatedPostFormData: StockISUHeaderInterface = {
      strDocId: stkIsu[0]?.strDocId || '', // default empty string if undefined
      strV_Type: stkIsu[0]?.strV_Type || '',
      strV_TypeDesc: stkIsu[0]?.strV_TypeDesc || '',
      IntV_No: stkIsu[0]?.IntV_No || 0,
      StrV_Date: stkIsu[0]?.StrV_Date || new Date().toISOString().split('T')[0], // default to current date
      IntV_Prefix: stkIsu[0]?.IntV_Prefix || 0,
      StrRecId: stkIsu[0]?.StrRecId || '',
      StrStaff: stkIsu[0]?.StrStaff || '',
      StrStaffName: stkIsu[0]?.StrStaffName || '',
      StrLocationCode: stkIsu[0]?.StrLocationCode || '',
      StrLocationName: stkIsu[0]?.StrLocationName || '',
      StrPlantCode: stkIsu[0]?.StrPlantCode || '',
      StrPlantName: stkIsu[0]?.StrPlantName || '',
      StrPreparedBy: UserName || '',
      StrReqDocId: stkIsu[0]?.StrReqDocId || '',
      StrReqNo: stkIsu[0]?.StrReqNo || '',
      clsStoreIssueDetail: stkIsuDet.length ? [...stkIsuDet] : []
    }

    try {
      // -------------------------
      // 4. API CALL
      // -------------------------
      const res = await AddStockIssueAction(
        updatedPostFormData,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      // -------------------------
      // 5. RESPONSE HANDLING
      // -------------------------
      if (res?.success) {
        if (!docId) {
          toast.success('Record Added Successfully!', { position: 'top-center' })

          resetForms() // 🔥 Clean reset function
          setIsSelect(true)
        } else {
          toast.success('Record Updated Successfully!', { position: 'top-center' })
        }
      } else {
        showError(res?.error || 'Unknown error.')
      }

      // fetch next doc number
      await getstkIsuNumberAfterSave()
    } catch (error) {
      showError('API call failed')
    }
  }

  function formatDateForInput(dateStr: string): string {
    if (!dateStr) return ''
    const [day, monthStr, year] = dateStr.split('/')
    const monthMap: Record<string, string> = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    }
    const month = monthMap[monthStr] || '01'
    return `${year}-${month}-${day.padStart(2, '0')}`
  }

  return (
    <>
      <div className=''>
        <div className='flex justify-center px-2 py-3'>
          <div className='w-full max-w-4xl'>
            <div className='rounded border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                {/* Type */}
                <div>
                  <VoucherTypeHelpComponent
                    filters={stkIsu[0]}
                    handleChange={handleChange}
                    StrCondition="and Category='ISU'"
                    filterKey='strV_Type'
                    nameKey='strV_TypeDesc'
                    isMulti={false}
                    label={
                      <>
                        Entry Type <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  />
                </div>

                {/* Entry No. */}
                <div>
                  <TextBoxOne
                    label='Entry No.'
                    name='StrRecId'
                    value={stkIsu[0]?.StrRecId || entryno}
                    disabled
                    required
                  />
                </div>

                {/* Entry Date */}
                <div>
                  <TextBoxOne
                    label='Date'
                    name='StrV_Date'
                    type='date'
                    value={formatDateForInput(stkIsu[0]?.StrV_Date) || currentDate}
                    disabled
                    required
                  />
                </div>

                {/* Location*/}
                <div>
                  <LocationHelpComponent
                    filters={stkIsu[0]}
                    handleChange={handleChange}
                    filterKey='StrLocationCode'
                    nameKey='StrLocationName'
                    label={
                      <>
                        Location <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  />
                </div>

                {/* Issued To */}
                <div>
                  <TextBoxOne
                    label='Issued To'
                    name='StrStaff'
                    value={stkIsu[0]?.StrStaff || ''}
                    onChange={e => {
                      const newValue = e.target.value
                      setStkIsu(prev => [{ ...prev[0], StrStaff: newValue }, ...prev.slice(1)])
                    }}
                  />
                </div>

                {/* Requisition No. */}
                <div>
                  <ReqNoStkIsuHelpComponent
                    filters={stkIsu[0]}
                    handleChange={handleChange}
                    filterKey='StrReqDocId'
                    nameKey='StrReqNo'
                    isMulti={false}
                    label='Requisition No.'
                    onFillDetailClick={handleFillDetail}
                  />
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
                <div className='lg:hidden'>
                  <div className='overflow-y-auto max-h-full px-4 sm:px-6 bg-cyan-50'>
                    <div className='space-y-6'>
                      {stkIsuDet.map((ele, index) => (
                        <div
                          key={index}
                          className='bg-white rounded-xl shadow-lg p-6 mb-6 transition-all transform hover:scale-[1.02] hover:shadow-xl duration-300'
                        >
                          {/* Header */}
                          <div className='flex justify-between items-center border-b pb-2 border-cyan-900 mb-2'>
                            <span className='font-bold text-cyan-900 text-sm'>
                              {index + 1}. {ele.StrItemDesc}
                            </span>

                            <div className='flex items-center space-x-1'>
                              <IconButton
                                color='primary'
                                className='hover:bg-blue-100'
                                sx={{ fontSize: 18 }}
                                onClick={() =>
                                  handleEdit(index, stkIsuDet, setIsEditModalActive, setEditItem, setEditIndex)
                                }
                              >
                                <FaEdit />
                              </IconButton>

                              <IconButton
                                color='error'
                                className='hover:bg-red-100'
                                sx={{ fontSize: 18 }}
                                onClick={e => {
                                  e.stopPropagation()
                                  openDialog(index)
                                }}
                              >
                                <FaTrash />
                              </IconButton>
                            </div>
                          </div>

                          {/* DETAILS LIST */}
                          <div className='space-y-1 text-xs text-gray-700'>
                            {[
                              ['Req. No', ele.StrReqNo],
                              ['Manual Code', ele.strManualCode],
                              ['Make', ele.strMakeName],
                              ['Req. Qty', ele.dblReqQty],
                              ['Unit', ele.StrUnit],
                              ['Lot No', ele.StrLotNo],
                              ['Godown', ele.StrGodownName],
                              ...(!ele.strDocId ? [['Stock', ele.StrCurrentStock]] : []),
                              ['Issue Qty', ele.dblIssueQty],
                              ['Cost Center', ele.StrCostCenterName],
                              ['Department', ele.StrDepartmentName],
                              ['Remark', ele.StrRemark],
                              ['Issue For', ele.StrIssuedName],
                              ['Type', ele.StrIssuedTypeName],
                              ['Purchase A/C', ele.StrPurchaseAccountName],
                              ['Consumption A/C', ele.StrConsumptionAccountName]
                            ].map(([label, value], i) => (
                              <div key={i} className='flex items-center justify-between border-b py-1'>
                                <span className='font-semibold text-gray-600'>{label}:</span>

                                {/* Make Req. No clickable */}
                                {label === 'Req. No' && value ? (
                                  <a
                                    href={`/reqEntry?Docid=${encodeURIComponent(value)}`}
                                    className='text-blue-500 hover:underline'
                                  >
                                    {value}
                                  </a>
                                ) : (
                                  <span className='text-gray-700'>{value || '-'}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop View (Optional) */}
                <div className='hidden lg:block'>
                  <table className='w-full table-auto whitespace-nowrap'>
                    <thead>
                      <tr className='bg-teal-400 text-white'>
                        {[
                          'Sno',
                          'Actions',
                          'Req. No.',
                          'Item Description',
                          'Manual Code',
                          'Make',
                          'Req. Qty',
                          'Unit',
                          'Lot No',
                          'Godown',
                          ...(!stkIsu[0]?.strDocId ? ['Stock'] : []),
                          'Issue Qty',
                          'Cost Center',
                          'Department',
                          'Remark',
                          'Issue For',
                          'Type',
                          'Purchase A/C',
                          'Consumption A/C'
                        ].map((head, i) => (
                          <th
                            key={i}
                            className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {
                      <tbody>
                        {stkIsuDet.map((ele, index) => (
                          <tr key={index} className='hover:bg-gray-50 dark:hover:bg-gray-200'>
                            {/* Sno */}
                            <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300'>
                              {index + 1}
                            </td>

                            {/* Actions */}
                            <td className='px-4 py-1 text-xs text-black text-center border-b border-gray-300'>
                              <div className='flex items-center justify-center space-x-1'>
                                <IconButton
                                  color='primary'
                                  className='hover:bg-blue-100'
                                  sx={{ fontSize: 18 }}
                                  onClick={() =>
                                    handleEdit(index, stkIsuDet, setIsEditModalActive, setEditItem, setEditIndex)
                                  }
                                >
                                  <FaEdit />
                                </IconButton>

                                <IconButton
                                  color='error'
                                  className='hover:bg-red-100'
                                  sx={{ fontSize: 18 }}
                                  onClick={e => {
                                    e.stopPropagation()
                                    openDialog(index)
                                  }}
                                >
                                  <FaTrash />
                                </IconButton>
                              </div>
                            </td>

                            {/* Data Fields */}
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrReqNo ? (
                                <a
                                  href={`/reqEntry?Docid=${encodeURIComponent(ele.StrReqDocId)}`}
                                  className='text-blue-500 hover:underline'
                                >
                                  {ele.StrReqNo}
                                </a>
                              ) : (
                                '-'
                              )}
                            </td>

                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrItemDesc || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.strManualCode || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.strMakeName || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.dblReqQty || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>{ele.StrUnit || '-'}</td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>{ele.StrLotNo || '-'}</td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrGodownName || '-'}
                            </td>
                            {!ele.strDocId && (
                              <td className='px-4 py-3 text-xs text-black text-center border-b'>
                                {ele.StrCurrentStock || '-'}
                              </td>
                            )}
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.dblIssueQty || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrCostCenterName || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrDepartmentName || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrRemark || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrIssuedName || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrIssuedTypeName || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrPurchaseAccountName || '-'}
                            </td>
                            <td className='px-4 py-3 text-xs text-black text-center border-b'>
                              {ele.StrConsumptionAccountName || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    }
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            onClick={e => handleSubmit(e, setIsSelect)}
            className='w-14 px-1 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
          >
            Save
          </button>
        </div>
      </div>

      <Dialog
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
                  onClick={() => handleRowClick('Closed')}
                  className={getRowClass('Closed')} // Apply the class conditionally
                >
                  <TableCell>Closed</TableCell>
                </TableRow>

                <TableRow
                  onClick={() => handleRowClick('Hold')}
                  className={getRowClass('Hold')} // Apply the class conditionally
                >
                  <TableCell>Hold</TableCell>
                </TableRow>
                <TableRow
                  onClick={() => handleRowClick('Open')}
                  className={getRowClass('Open')} // Apply the class conditionally
                >
                  <TableCell>Open</TableCell>
                </TableRow>
                <TableRow
                  onClick={() => handleRowClick('Cancel')}
                  className={getRowClass('Cancel')} // Apply the class conditionally
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
            onClick={handleOkClick} // Print the letter and close the dialog when "OK" is clicked
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
      </Dialog>

      <AddStockIssueModal
        isAddModalActive={isAddModalActive}
        toggleAddModal={() => setIsAddModalActive(false)}
        isEditModalActive={isEditModalActive}
        toggleEditModal={() => setIsEditModalActive(false)}
        onFormSubmit={isEditModalActive ? submitEditForm : submitForm}
        editItem={isEditModalActive ? editItem : undefined} // Pass editItem only if in edit mode
        editIndex={editIndex}
        stkIsu={stkIsu}
        setStkIsu={setStkIsu}
        stkIsuDet={stkIsuDet}
        setStkIsuDet={setStkIsuDet}
      />
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
            onClick={handleConfirmDelete}
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
          <div className='bg-white dark:border-strokedark  p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-sm font-semibold text-gray-800 text-center mb-7'>{modalMessage}</h2>
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
    </>
  )
}

const StockIssueEntry = () => {
  const router = useRouter()
  function handleChange() {
    router.push('/stockissueList/')
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
      <HeadingTab TitleIcon={FaStore} Title='Store' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Stock Issue Entry'
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

export default StockIssueEntry
