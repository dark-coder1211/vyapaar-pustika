'use client'

import AddIndentModal from '@/app/(dashboard)/indentEntry/indententrydetail_view'
import HeadingTab from '@/components/HeadingTab'
import type {
  AddIndent,
  ApiResponse,
  ApiResponseDetail,
  EditIndentInterfaceDetail,
  IndentInterface,
  RecidInterface
} from './Indent_Entry_modal'
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
import { Dispatch, SetStateAction } from 'react'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import ExitToApp from '@/components/ExitToApp'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AddIndentAction,
  GetIndentDetByReq,
  GetIndentDetailByDocid,
  GetIndentHeaderByDocid,
  RecidNOHelp
} from './Indent_Entry_action'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import TransactionTypeHelpComponent from '@/components/HelpBox/transactiontype'
import DepartmentHelpComponent from '@/components/HelpBox/Depthelp'
import ReqNoHelpComponent from '@/components/HelpBox/reqnohelp'
import PartyHelpComponent from '@/components/HelpBox/partyhelp'
import VoucherTypeHelpComponent from '@/components/HelpBox/vouchertypehelp'
import { useParams } from '@/context/paramcontext'
import { VoucherTypeHelp } from '@/app/action/filteraction'

interface VoucherType {
  V_Type: string
  Description: string
}

const RenderStats = () => {
  const [isAddModalActive, setIsAddModalActive] = useState(false)
  const [isEditModalActive, setIsEditModalActive] = useState(false)
  const [docId, setdocId] = useState<string>('')
  const searchParams = useSearchParams()
  const [Indent, setIndent] = useState<IndentInterface[]>([])
  const [IndentDet, setIndentDet] = useState<EditIndentInterfaceDetail[]>([])
  const [currentDate, setCurrentDate] = useState<string>('')
  const [editItem, setEditItem] = useState<EditIndentInterfaceDetail | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Closed') // Default to "Closed" option
  const [indentno, setIndentNo] = useState('')
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessage, setModalMessage] = React.useState('')
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([])

  const { Site_Code, companyid, UserName, bu } = useParams()

  const handleChange = async <K extends keyof IndentInterface>(key: K, value: IndentInterface[K]) => {
    let updatedIndent: IndentInterface

    setIndent(prev => {
      const updated = [...prev]
      if (updated.length === 0) {
        updatedIndent = { [key]: value } as IndentInterface
        updated.push(updatedIndent)
      } else {
        updatedIndent = { ...updated[0], [key]: value }
        updated[0] = updatedIndent
      }
      return updated
    })

    // ✅ Fix for "used before assigned"
    const currentIndent = Indent.length > 0 ? Indent[0] : ({} as IndentInterface)
    updatedIndent = { ...currentIndent, [key]: value }

    // ✅ API call only when StrReqDocId changes
    if (key === 'StrReqDocId') {
      if (typeof value === 'string' && value.trim() !== '') {
        try {
          const data: ApiResponse = await GetIndentDetByReq(
            {
              StrReqNo: value, // already a string
              StrTansType_Category:
                updatedIndent?.StrTansType_Category != null ? String(updatedIndent.StrTansType_Category) : null
            },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          console.log('Fetched Indent Details:', data)
          setIndentDet(data ? data.data : [])
        } catch (error) {
          console.error('Failed to fetch indent details:', error)
          setIndentDet([])
        }
      } else {
        // Clear IndentDet if requisition number is empty
        setIndentDet([])
      }
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
    async function getIndentNumber() {
      const res: RecidInterface = await RecidNOHelp(
        formatDate(new Date()),
        'IND',
        'Indent',
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )
      const clientId = searchParams.get('clientId')
      if (!clientId) {
        if (res?.success) {
          setIndentNo(res?.data) // Set state if data is not null
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
      getIndentNumber()
    }
  }, [setIndentNo, Site_Code, companyid, UserName])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ApiResponse | null = await GetIndentHeaderByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setIndent(data.data) // Set the fetched single object
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching Indent data:', error)
      }
    }
    if(Site_Code && companyid){
    fetchData()}
  }, [searchParams, setCurrentDate, setIndent, setdocId, Site_Code, companyid])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ApiResponseDetail | null = await GetIndentDetailByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setIndentDet(data.data) // Set the fetched single object
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching Indent data:', error)
      }
    }
    if(Site_Code && companyid){
    fetchData()}
  }, [searchParams, setCurrentDate, setIndentDet, setdocId, Site_Code, companyid])

  useEffect(() => {
    const fetchVoucherTypes = async () => {
      try {
        const data: VoucherType[] = await VoucherTypeHelp(
          "and Category='IND'",
          Site_Code as string,
          companyid as string,
          bu as string
        )
        setVoucherTypes(data)
      } catch (err) {
        console.error('Error fetching voucher types:', err)
      }
    }

    if (Site_Code && companyid) {
      fetchVoucherTypes()
    }
  }, [Site_Code, companyid])

  const handleEdit = (
    index: number,
    IndentDet: EditIndentInterfaceDetail[], // Adjust the type according to your data structure

    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    setEditItem: React.Dispatch<React.SetStateAction<EditIndentInterfaceDetail | null>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const dataToEdit = IndentDet[index]
    setIsEditModalActive(true) // Open the modal for editing

    setEditIndex(index) // Save the index of the item being edited
    setEditItem(dataToEdit)
  }

  const handleTableDelete = (
    index: number,
    IndentDet: EditIndentInterfaceDetail[],
    setIndentDet: React.Dispatch<React.SetStateAction<EditIndentInterfaceDetail[]>>
  ) => {
    // First, get the data from the row that is about to be deleted
    const rowToDelete = IndentDet[index]

    if (rowToDelete) {
      setIndentDet(prevDetail => prevDetail.filter((_, i) => i !== index))

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
      handleTableDelete(rowIndexToDelete, IndentDet, setIndentDet) // Delete the row and pass the necessary parameters
      setOpen(false) // Close the dialog
    }
  }

  const submitForm = (formData: EditIndentInterfaceDetail) => {
    handleFormSubmit(
      formData,

      setIndentDet,

      toggleAddModal, // Pass the function directly

      isAddModalActive,
      setIsAddModalActive
    )
  }

  const handleFormSubmit = (
    formData: EditIndentInterfaceDetail,

    setIndentDet: React.Dispatch<React.SetStateAction<EditIndentInterfaceDetail[]>>,

    toggleAddModal: (
      isAddModalActive: boolean,
      setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
    ) => void,

    isAddModalActive: boolean,
    setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIndentDet(prevSubmissions => [...prevSubmissions, formData])

    toggleAddModal(isAddModalActive, setIsAddModalActive) // Correct argument order
  }

  const submitEditForm = (formData: EditIndentInterfaceDetail) => {
    handleEditFormSubmit(
      formData,
      editIndex,
      IndentDet,
      setIndentDet,
      toggleEditModal,
      setIndent,
      setEditIndex,
      isEditModalActive,
      setIsEditModalActive
    )
  }

  const handleEditFormSubmit = (
    formData: EditIndentInterfaceDetail,
    editIndex: number | null,
    IndentDet: EditIndentInterfaceDetail[],
    setDetail: React.Dispatch<React.SetStateAction<EditIndentInterfaceDetail[]>>,
    toggleEditModal: (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
    setHeader: React.Dispatch<React.SetStateAction<IndentInterface[]>>, // Adjust the type as necessary
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
    isEditModalActive: boolean,
    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (editIndex !== null) {
      const updatedSubmissions = IndentDet.map((item, index) => (index === editIndex ? formData : item))
      setDetail(updatedSubmissions)

      toggleEditModal(isEditModalActive, setIsEditModalActive) // Close the modal
    } else {
      console.error('Edit index is not set.')
    }
  }

  type IndentKeys = keyof IndentInterface

  const requiredFields: { key: IndentKeys; label: string }[] = [
    { key: 'StrTransactionType', label: 'Transaction Type' },
    { key: 'StrDepartment', label: 'Department' },
    { key: 'StrIndenter', label: 'Indentor Name' }
  ]

  const validateIndent = (indent: IndentInterface): boolean => {
    for (const field of requiredFields) {
      const value = indent[field.key]
      if (!value || value.toString().trim() === '') {
        setModalMessage(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }
    }
    return true
  }
  async function getIndentNumberAfterSave() {
    const res: RecidInterface = await RecidNOHelp(
      formatDate(new Date()),
      'IND',
      'Indent',
      Site_Code as string,
      companyid as string,
      UserName as string,
      bu as string
    )
    const clientId = searchParams.get('clientId')
    if (!clientId && res?.success) {
      setIndentNo(res.data) // ✅ This updates your indent number state
    } else {
      console.error(res?.error || 'Failed to fetch indent number.')
    }
  }
  const handleSubmit = async (event: React.FormEvent, setIsSelect: Dispatch<SetStateAction<boolean>>) => {
    event.preventDefault()

    if (!Indent || Indent.length === 0 || !Indent[0]) {
      setModalMessage('Indent data is missing.')
      setIsModalvalidate(true)
      return
    }

    if (!validateIndent(Indent[0])) {
      return // modal will show the message, stop submit here
    }

    if (!IndentDet || IndentDet.length === 0) {
      setModalMessage('Please Fill item.')
      setIsModalvalidate(true)
      return
    }

    for (const item of IndentDet) {
      if (!item.StrItemcode || item.StrItemcode.trim() === '') {
        setModalMessage('Item Name is a required field.')
        setIsModalvalidate(true)
        return
      }

      if (
        item.IndQty === undefined ||
        item.IndQty === null ||
        item.IndQty.toString().trim() === '' ||
        Number(item.IndQty) === 0
      ) {
        setModalMessage('Indent Qty is a required field .')
        setIsModalvalidate(true)
        return
      }

      if (!item.ReqDate || item.ReqDate.toString().trim() === '') {
        setModalMessage('Req Date is a required field.')
        setIsModalvalidate(true)
        return
      }
    }

    const updatedPostFormData = {
      clsIndHeader: [
        {
          StrDocId: Indent[0]?.StrDocId || '', // Optional
          StrV_Type: Indent[0]?.StrV_Type || '',
          StrDescription: Indent[0]?.StrDescription || '',
          StrV_No: Indent[0]?.StrV_No || '',
          StrRecId: Indent[0]?.StrRecId || indentno,
          V_Date: Indent[0]?.V_Date || new Date().toISOString().split('T')[0],
          StrV_Prefix: Indent[0]?.StrV_Prefix || '',
          StrReqDocId: Indent[0]?.StrReqDocId || '',
          StrReqno: Indent[0]?.StrReqno || '',
          StrDepartment: Indent[0]?.StrDepartment || '',
          StrDepartmentName: Indent[0]?.StrDepartmentName || '',
          StrIndenter: Indent[0]?.StrIndenter || '',
          StrIndenterName: Indent[0]?.StrIndenterName || '',
          StrSite_Code: Site_Code,
          StrPreparedBy: UserName,
          U_EntDt: new Date().toISOString(), // full ISO datetime
          StrU_AE: 'A',
          StrTransactionType: Indent[0]?.StrTransactionType || '',
          StrTransactionTypeName: Indent[0]?.StrTransactionTypeName || '',
          StrCostCenter: Indent[0]?.StrCostCenter || '',
          StrCostCenterName: Indent[0]?.StrCostCenterName || '',
          StrItemcode: Indent[0]?.StrItemcode || '',
          StrItemName: Indent[0]?.StrItemName || '',
          Remark: Indent[0]?.Remark || '',
          StrModifiedBy: UserName,
          StrHOD: Indent[0]?.StrHOD || '',
          StrHODName: Indent[0]?.StrHODName || '',
          ISAutoIndent: Indent[0]?.ISAutoIndent ?? 0
        }
      ],

      clsIndDetail: IndentDet
    }
    let res: AddIndent | null = null

    try {
      res = await AddIndentAction(
        updatedPostFormData,
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )

      const showToastAndReload = async () => {
        if (res?.success) {
          // Show success toast
          if (docId === '') {
            toast.success('Add Indent Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })

            setIndent([
              {
                ...Indent[0],
                StrDocId: '',
                StrV_Type: '',
                StrDescription: '',
                StrV_No: '',
                StrRecId: '',
                V_Date: '',
                StrV_Prefix: '',
                StrReqDocId: '',
                StrReqno: '',
                StrDepartment: '',
                StrDepartmentName: '',
                StrIndenter: '',
                StrIndenterName: '',
                StrSite_Code: '',
                StrPreparedBy: '',
                U_EntDt: '',
                StrU_AE: '',
                StrTransactionType: '',
                StrTransactionTypeName: '',
                StrCostCenter: '',
                StrCostCenterName: '',
                StrItemcode: '',
                StrItemName: '',
                Remark: '',
                StrModifiedBy: '',
                StrHOD: '',
                StrHODName: '',
                ISAutoIndent: 0
              }
            ])

            setIndentDet([
              {
                ...IndentDet[0],
                StrDocId: '',
                StrV_Type: '',
                StrRecId: '',
                IntV_SNo: 0,
                V_Date: '',
                StrItemcode: '',
                StrItemName: '',
                StrCostCenter: '',
                StrCostCenterName: '',
                StrMake: '',
                IndQty: 0,
                StrRemark: '',
                StrSite_Code: '',
                ReqDate: '',
                StrClosed: '',
                StrVerifiedBy: '',
                VerifiedDate: '',
                StrApprovedBy: '',
                ApprovedDate: '',
                StrPreVerifiedBy: '',
                dblAprQty: 0
              }
            ])
            setIsSelect(true)
          } else {
            toast.success('Indent Edited Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })
          }
        } else {
          toast.error(res?.error, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }
      }

      showToastAndReload()
      await getIndentNumberAfterSave()
    } catch (error) {
      toast.error('API call failed', {
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
                    filters={Indent[0]}
                    handleChange={handleChange}
                    StrCondition="and Category='IND'"
                    filterKey='StrV_Type'
                    nameKey='StrDescription'
                    isMulti={false}
                    label={
                      <>
                        Type <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                  />

                  {/* <label className='block text-xs font-medium text-black  mb-1'>
                    Type<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id='StrV_Type'
                    name='StrDescription'
                    disabled
                    className='w-full rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input '
                    defaultValue={voucherTypes[0]?.Description}
                  /> */}
                </div>

                {/* Indent No. */}
                <div>
                  <label className='block text-xs font-medium text-black mb-1'>
                    Indent No.<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id='StrRecId'
                    name='StrRecId'
                    disabled
                    className='w-full rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input '
                    defaultValue={Indent[0]?.StrRecId || indentno}
                  />
                </div>

                {/* Indent Date */}
                <div>
                  <label className='block text-xs font-medium text-black  mb-1'>
                    Indent Date<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id='V_Date'
                    name='V_Date'
                    type='date'
                    className='w-full rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input '
                    defaultValue={formatDate(Indent[0]?.V_Date ? Indent[0].V_Date : currentDate)}
                    disabled
                  />
                </div>

                {/* Transaction Type */}
                <div>
                  <TransactionTypeHelpComponent
                    filters={Indent[0]}
                    handleChange={handleChange}
                    filterKey='StrTransactionType'
                    nameKey='StrTransactionTypeName'
                    categoryKey='StrTansType_Category' // NEW key for category
                    StrCondition=" AND  VT.V_Type In ('IND') "
                    isMulti={false}
                    label={
                      <>
                        Transaction Type <span style={{ color: 'red' }}>*</span>
                      </>
                    }
                    showButton={false}
                  />
                </div>

                {/* Requisition No. */}
                <div>
                  <ReqNoHelpComponent
                    filters={Indent[0]}
                    handleChange={handleChange}
                    filterKey='StrReqDocId'
                    nameKey='StrReqno'
                    isMulti={false}
                    label='Requisition No.'
                  />
                </div>

                {/* Department */}
                <div>
                  <DepartmentHelpComponent<IndentInterface>
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
                  />
                </div>

                {/* HOD */}
                <div>
                  <PartyHelpComponent
                    filters={Indent[0]}
                    handleChange={handleChange}
                    StrNature='Employee'
                    filterKey='StrHOD'
                    nameKey='StrHODName'
                    isMulti={false}
                    label='HOD'
                    showButton={false}
                  />
                </div>

                {/* Indentor Name */}
                <div>
                  <PartyHelpComponent
                    filters={Indent[0]}
                    handleChange={handleChange}
                    StrNature='Employee'
                    filterKey='StrIndenter'
                    nameKey='StrIndenterName'
                    isMulti={false}
                    label={
                      <>
                        Indentor Name<span style={{ color: 'red' }}>*</span>
                      </>
                    }
                    showButton={false}
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
                <div className='lg:hidden '>
                  {/* Mobile View */}
                  <div className='overflow-y-auto max-h-full md:hidden  px-4 sm:px-6 bg-cyan-50'>
                    <div className='space-y-6'>
                      {' '}
                      {/* Increased spacing between each item */}
                      {!isSelect &&
                        IndentDet.map((ele, index) => (
                          <div
                            key={index}
                            className='bg-white rounded-xl shadow-lg mb-6 p-6  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out'
                          >
                            <div className='flex flex-col'>
                              {' '}
                              {/* Increased space between the details */}
                              <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                                <span className='text-sm font-bold text-cyan-900'>Item Name:</span>
                                <span className='text-sm font-semibold text-cyan-800 '>{ele.StrItemName}</span>
                              </div>
                              <div className='flex flex-col space-y-2 mt-2'>
                                {' '}
                                {/* Increased space between the details */}
                                <div className='text-xs font-semibold text-gray-700 '>
                                  <span className='text-xs font-normal text-gray-600 '>S.No.:</span>
                                  <span className='text-xs text-gray-700 '>{index + 1}</span>
                                </div>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Item Manual Code:</span>
                                <span className='text-xs text-gray-700 '>{ele.StrICode}</span>
                              </div>
                              <div className='flex items-center space-x-2  mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Make:</span>
                                <span className='text-xs text-gray-700 '>{ele.StrMakeName}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Current Stock:</span>
                                <span className='text-xs text-gray-700 '>{ele.currentStock}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Min Qty:</span>
                                <span className='text-xs text-gray-700 '>{ele.MinStock}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Max Qty:</span>
                                <span className='text-xs text-gray-700 '>{ele.MaxStock}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Reorder Qty:</span>
                                <span className='text-xs text-gray-700 '>{ele.Reorder}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Required Qty:</span>
                                <span className='text-xs text-gray-700 '>{ele.dblAprQty}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Ind Qty:</span>
                                <span className='text-xs text-gray-700 '>{ele.IndQty}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Unit:</span>
                                <span className='text-xs text-gray-700 '>{ele.StrUnit}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Cost Center:</span>
                                <span className='text-xs text-gray-700 '>{ele.StrCostCenterName}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Req. Date:</span>
                                <span className='text-xs text-gray-700 '>
                                  {' '}
                                  {formatDate(ele.ReqDate || '', 'display')}
                                </span>
                              </div>
                              {/* <div className="flex items-center space-x-2 mt-1"> */}
                              <div className='flex items-center'>
                                <span className='text-xs font-semibold text-gray-600 '>Remarks:{ele.StrRemark}</span>
                                {/* <span className="text-xs text-gray-700 ">{ele.Remark}</span> */}
                              </div>
                            </div>

                            <div className='flex items-center justify-end space-x-1 mt-4'>
                              <IconButton
                                color='primary'
                                className='hover:bg-blue-100'
                                sx={{ fontSize: 18 }}
                                onClick={() =>
                                  handleEdit(index, IndentDet, setIsEditModalActive, setEditItem, setEditIndex)
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
                                  openDialog(index) // Open dialog with the current row index
                                }}
                              >
                                <FaTrash />
                              </IconButton>
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
                      <tr className='bg-teal-400 text-white '>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Sno
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Actions
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Item Name
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Item Manual Code
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Make
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Current Stock
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Min Qty
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Max Qty
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Record Qty
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Req Qty
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Ind Qty
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Unit
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Cost Center
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Req. Date
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    {!isSelect &&
                      IndentDet.map((ele, index) => {
                        return (
                          <tbody key={index}>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-200'>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {index + 1}
                              </td>
                              <td className='px-4 py-1 text-xs  text-blacktext-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                <div className='flex items-center justify-end space-x-1 '>
                                  <IconButton
                                    color='primary'
                                    className='hover:bg-blue-100'
                                    sx={{ fontSize: 18 }}
                                    onClick={() =>
                                      handleEdit(index, IndentDet, setIsEditModalActive, setEditItem, setEditIndex)
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
                                      openDialog(index) // Open dialog with the current row index
                                    }}
                                  >
                                    <FaTrash />
                                  </IconButton>
                                </div>
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.StrItemName}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.StrICode}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.StrMakeName}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.currentStock}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.MinStock}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.MaxStock}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.Reorder}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.dblAprQty}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.IndQty}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.StrUnit}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.StrCostCenterName}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {formatDate(ele.ReqDate || '', 'display')}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.StrRemark}
                              </td>
                            </tr>
                          </tbody>
                        )
                      })}
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

      <AddIndentModal
        isAddModalActive={isAddModalActive}
        toggleAddModal={() => setIsAddModalActive(false)}
        isEditModalActive={isEditModalActive}
        toggleEditModal={() => setIsEditModalActive(false)}
        onFormSubmit={isEditModalActive ? submitEditForm : submitForm}
        editItem={isEditModalActive ? editItem : undefined} // Pass editItem only if in edit mode
        editIndex={editIndex}
        Indent={Indent}
        setIndent={setIndent}
        IndentDet={IndentDet}
        setIndentDet={setIndentDet}
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
          <div className='bg-white dark:border-strokedark dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-xl font-semibold text-gray-800 text-center mb-7'>{modalMessage}</h2>
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

const IndentEntry = () => {
  const router = useRouter()
  function handleChange() {
    router.push('/indentList/')
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
      <HeadingTab TitleIcon={BsBank2} Title='Purchase' RoutingIcon={SiHomebridge} routingPath='/dashboardpage/' />
      <div style={{ marginTop: '10px' }}>
        <Card>
          <CardHeader
            title='Purchase Indent Entry'
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

export default IndentEntry
