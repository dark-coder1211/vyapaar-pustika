'use client'

import HeadingTab from '@/components/HeadingTab'

import type {
  AddRequisition,
  EditReqInterfaceDetail,
  RecidInterface,
  ReqApiResponse,
  ReqApiResponseDetail,
  ReqInterface
} from './Requisition_Entry_modal'
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
import type {  Dispatch, SetStateAction } from 'react'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import ExitToApp from '@/components/ExitToApp'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GetReqHeaderByDocid, GetReqDetailByDocid, AddRequisitionAction, RecidNOHelp } from './Requisition_Entry_action'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import DepartmentHelpComponent from '@/components/HelpBox/Depthelp'
import AddReqModal from './requisitionentrydetail_view'
import PartyHelpComponent from '@/components/HelpBox/partyhelp'
import { useParams } from '@/context/paramcontext'

const RenderStats = () => {
  const [isAddModalActive, setIsAddModalActive] = useState(false)
  const [isEditModalActive, setIsEditModalActive] = useState(false)
  const [docId, setdocId] = useState<string>('')
  const searchParams = useSearchParams()
  const [Req, setReq] = useState<ReqInterface[]>([])
  const [ReqDet, setReqDet] = useState<EditReqInterfaceDetail[]>([])
  const [currentDate, setCurrentDate] = useState<string>('')
  const [editItem, setEditItem] = useState<EditReqInterfaceDetail | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Closed') // Default to "Closed" option
  const [ReqNo, setReqNo] = useState('')
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessage, setModalMessage] = React.useState('')
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const { Site_Code, companyid, bu, UserName } = useParams()

  const handleChange = <K extends keyof ReqInterface>(key: K, value: ReqInterface[K]) => {
    setReq(prev => {
      const updated = [...prev]
      if (updated.length === 0) {
        updated.push({
          DeptCode: '',
          Department: '',
          CostCentreCode: '',
          CostCentre: '',
          [key]: value
        } as ReqInterface)
      } else {
        updated[0] = { ...updated[0], [key]: value }
      }
      return updated
    })
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
  //     setIsModalOpen(!isModalOpen);
  // };

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

  // const handleHeaderChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  //   setHeader: React.Dispatch<React.SetStateAction<any[]>>
  // ) => {
  //   const { name, value } = event.target

  //   setHeader(prevHeader => [
  //     {
  //       ...prevHeader[0], // Keep previous properties if needed
  //       [name]: value // Dynamically update the property based on the name attribute
  //     }
  //   ])
  // }

  useEffect(() => {
    async function getReqNumber() {
      const res: RecidInterface = await RecidNOHelp(
        formatDate(new Date()),
        'Req',
        'Requisition',
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )
      const clientId = searchParams.get('clientId')
      if (!clientId) {
        if (res?.success) {
          setReqNo(res?.data) // Set state if data is not null
        } else {
          // If there is an error, log the error message
          const errorMessage = res.error || 'Unknown error'
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
        }
      }
    }
    if (Site_Code && companyid && UserName) {
      getReqNumber()
    }
  }, [setReqNo, Site_Code, companyid, UserName])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ReqApiResponse | null = await GetReqHeaderByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setReq(data.data) // Set the fetched single object
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching Req data:', error)
      }
    }
    if(Site_Code && companyid){
    fetchData()
    }
  }, [searchParams, setCurrentDate, setReq, setdocId, Site_Code, companyid])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('Docid') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ReqApiResponseDetail | null = await GetReqDetailByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setReqDet(data.data) // Set the fetched single object
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching Req data:', error)
      }
    }
    if(Site_Code && companyid){
    fetchData()}
  }, [searchParams, setCurrentDate, setReqDet, setdocId, Site_Code, companyid])

  useEffect(() => {
    const Today = formatDate(new Date()) // Execute this when data is empty or null

    setCurrentDate(Today)
  }, [])

  const handleEdit = (
    index: number,
    ReqDet: EditReqInterfaceDetail[], // Adjust the type according to your data structure

    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    setEditItem: React.Dispatch<React.SetStateAction<EditReqInterfaceDetail | null>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const dataToEdit = ReqDet[index]
    console.log('datatoedit', dataToEdit)
    setIsEditModalActive(true) // Open the modal for editing

    setEditIndex(index) // Save the index of the item being edited
    setEditItem(dataToEdit)
  }

  const handleTableDelete = (
    index: number,
    ReqDet: EditReqInterfaceDetail[],
    setReqDet: React.Dispatch<React.SetStateAction<EditReqInterfaceDetail[]>>
  ) => {
    // First, get the data from the row that is about to be deleted
    const rowToDelete = ReqDet[index]

    if (rowToDelete) {
      console.log('rowToDelete', rowToDelete)
      setReqDet(prevDetail => prevDetail.filter((_, i) => i !== index))

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
      handleTableDelete(rowIndexToDelete, ReqDet, setReqDet) // Delete the row and pass the necessary parameters
      setOpen(false) // Close the dialog
    }
  }

  const submitForm = (formData: EditReqInterfaceDetail) => {
    handleFormSubmit(
      formData,

      setReqDet,

      toggleAddModal, // Pass the function directly

      isAddModalActive,
      setIsAddModalActive
    )
  }

  const handleFormSubmit = (
    formData: EditReqInterfaceDetail,

    setReqDet: React.Dispatch<React.SetStateAction<EditReqInterfaceDetail[]>>,

    toggleAddModal: (
      isAddModalActive: boolean,
      setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
    ) => void,

    isAddModalActive: boolean,
    setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setReqDet(prevSubmissions => [...prevSubmissions, formData])

    toggleAddModal(isAddModalActive, setIsAddModalActive) // Correct argument order
  }

  const submitEditForm = (formData: EditReqInterfaceDetail) => {
    handleEditFormSubmit(
      formData,
      editIndex,
      ReqDet,
      setReqDet,
      toggleEditModal,
      setReq,
      setEditIndex,
      isEditModalActive,
      setIsEditModalActive
    )
  }

  const handleEditFormSubmit = (
    formData: EditReqInterfaceDetail,
    editIndex: number | null,
    ReqDet: EditReqInterfaceDetail[],
    setDetail: React.Dispatch<React.SetStateAction<EditReqInterfaceDetail[]>>,
    toggleEditModal: (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
    setHeader: React.Dispatch<React.SetStateAction<ReqInterface[]>>, // Adjust the type as necessary
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
    isEditModalActive: boolean,
    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (editIndex !== null) {
      const updatedSubmissions = ReqDet.map((item, index) => (index === editIndex ? formData : item))
      setDetail(updatedSubmissions)

      toggleEditModal(isEditModalActive, setIsEditModalActive) // Close the modal
    } else {
      console.error('Edit index is not set.')
    }
  }

  type ReqKeys = keyof ReqInterface

  const requiredFields: { key: ReqKeys; label: string }[] = [
    { key: 'strReqCode', label: 'Requisition By' },
    { key: 'strDepartmentCode', label: 'Department' }
  ]

  const validateReq = (req: ReqInterface): boolean => {
    for (const field of requiredFields) {
      const value = req[field.key]
      if (!value || value.toString().trim() === '') {
        setModalMessage(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }
    }
    return true
  }
  async function getRequisitionNumberAfterSave() {
    const res: RecidInterface = await RecidNOHelp(
      formatDate(new Date()),
      'Req',
      'Requisition',
      Site_Code as string,
      companyid as string,
      UserName as string,
      bu as string
    )
    const clientId = searchParams.get('clientId')
    if (!clientId && res?.success) {
      setReqNo(res?.data) // ✅ This updates your indent number state
    } else {
      console.error(res?.error || 'Failed to fetch indent number.')
    }
  }
  const handleSubmit = async (event: React.FormEvent, setIsSelect: Dispatch<SetStateAction<boolean>>) => {
    event.preventDefault()

    if (!Req || Req.length === 0 || !Req[0]) {
      setModalMessage('Requisition data is missing.')
      setIsModalvalidate(true)
      return
    }

    if (!validateReq(Req[0])) {
      return // modal will show the message, stop submit here
    }

    if (!ReqDet || ReqDet.length === 0) {
      setModalMessage('Please Fill item.')
      setIsModalvalidate(true)
      return
    }

    for (const item of ReqDet) {
      if (!item.strItemCode || item.strItemCode.trim() === '') {
        setModalMessage('Item Name is a required field.')
        setIsModalvalidate(true)
        return
      }

      if (
        item.strReqQty === undefined ||
        item.strReqQty === null ||
        item.strReqQty.toString().trim() === '' ||
        Number(item.strReqQty) === 0
      ) {
        setModalMessage('Indent Qty is a required field .')
        setIsModalvalidate(true)
        return
      }

      if (!item.strReqDate || item.strReqDate.toString().trim() === '') {
        setModalMessage('Req Date is a required field.')
        setIsModalvalidate(true)
        return
      }
    }

    const updatedPostFormData = {
      clsRequHeader: [
        {
          strDocId: Req[0]?.strDocId || '',
          strRecId: Req[0]?.strRecId || ReqNo,
          strV_No: Req[0]?.strV_No || '',
          strV_Date: Req[0]?.strV_Date || new Date().toISOString().split('T')[0],
          strV_Type: Req[0]?.strV_Type || 'REQ',
          strV_Prefix: Req[0]?.strV_Prefix || '',
          strDepartmentCode: Req[0]?.strDepartmentCode || '', // mapped from StrDepartment
          strDepartment: Req[0]?.strDepartment || '', // mapped from StrDepartmentName
          strReqCode: Req[0]?.strReqCode || '', // mapped from StrReqDocId
          strReqBy: Req[0]?.strReqBy || '', // mapped from StrIndenter
          strPreparedBy: UserName,
          strModifiedBy: UserName,
          strDesignation: Req[0]?.strDesignation || '', // Optional, fill if data is available
          strApprovalId: '', // Optional, fill if data is available
          strVerifiedBy: UserName, // Optional
          strVerifiedDate: new Date().toISOString().split('T')[0], // Optional
          strApprovedDate: new Date().toISOString().split('T')[0], // Optional
          strApprovedBy: UserName, // Optional
          strApprovalStatus: '', // Optional
          strSite_Code: String(Site_Code), // ✅ Fix here
          strU_EntDt: new Date().toISOString(), // full ISO datetime
          strU_AE: 'A',
          strTransfered: '' // Optional
        }
      ],

      clsRequDetail: ReqDet
    }
    console.log('updatedPostFormData', updatedPostFormData)
    let res: AddRequisition | null = null

    try {
      res = await AddRequisitionAction(
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
            toast.success('Add Requisition Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })
            setReq([
              {
                strDocId: '',
                strRecId: '',
                strV_No: '',
                strV_Date: '',
                strV_Type: '',
                strV_TypeName: '',
                strV_Prefix: '',
                strDepartmentCode: '',
                strDepartment: '',
                strReqCode: '',
                strReqBy: '',
                strPreparedBy: '',
                strModifiedBy: '',
                strDesignation: '',
                strApprovalId: '',
                strVerifiedBy: '',
                strVerifiedDate: '',
                strApprovedDate: '',
                strApprovedBy: '',
                strApprovalStatus: '',
                strSite_Code: '',
                strU_EntDt: '',
                strU_AE: '',
                strTransfered: ''
              }
            ])

            setReqDet([
              {
                RowID: '',
                strDocId: '',
                strRecId: '',
                strV_No: '',
                strV_Sno: 0,
                strV_Date: '',
                strV_Type: '',
                strV_TypeName: '',
                strItemCode: '',
                strItem: '',
                strMakeCode: '',
                strMakeName: '',
                strSKU: '',
                strReqQty: 0,
                strReqDate: '',
                strCCCode: '',
                strCostCenter: '',
                strRemark: '',
                strClosed: '',
                strSite_Code: '',
                currentStock: 0
              }
            ])

            setIsSelect(true)
          } else {
            toast.success('Requisition Edited Successfully!', {
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
      await getRequisitionNumberAfterSave()
      showToastAndReload()
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
        <div className='grid grid-cols-1 gap-9 md:w-1/3 sm:grid-cols-1 ml-0 md:ml-[400px] '>
          <div className='flex flex-col gap-9'>
            <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
              <div className='flex flex-col gap-2 p-4'>
                <div className='md:flex md:flex-col md:gap-2'>
                  <div className='grid'>
                    <label className='block text-sm font-medium text-black '>
                      Req. No.<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='ReqNo'
                      name='ReqNo'
                      disabled
                      className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-1 h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                      defaultValue={Req[0]?.strRecId || ReqNo}
                    />
                  </div>
                </div>
                <div className='md:flex md:flex-col md:gap-2'>
                  <div className='flex flex-col'>
                    <label className='block text-sm font-medium text-black '>
                      Req. Date<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      id='IndDt'
                      name='IndDt'
                      disabled
                      type='date'
                      className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-2 h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                      defaultValue={formatDate(Req[0]?.strV_Date ? Req[0].strV_Date : currentDate)}
                    />
                  </div>
                </div>
                <div className='md:flex md:flex-col md:gap-2'>
                  <div className='grid'>
                    <DepartmentHelpComponent<ReqInterface>
                      filters={Req[0]}
                      handleChange={handleChange}
                      filterKey='strDepartmentCode'
                      nameKey='strDepartment'
                      isMulti={false}
                      label={
                        <>
                          Department <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                    />
                  </div>
                </div>

                <div className='md:flex md:flex-col md:gap-2'>
                  <div className='grid'>
                    <PartyHelpComponent
                      filters={Req[0]}
                      handleChange={handleChange}
                      StrNature='Employee'
                      filterKey='strReqCode'
                      nameKey='strReqBy'
                      isMulti={false}
                      label={
                        <>
                          Requisition By <span style={{ color: 'red' }}>*</span>
                        </>
                      }
                      showButton={true}
                    />
                  </div>
                </div>
                <div className='md:flex md:flex-col md:gap-2'>
                  <div className='grid'>
                    <label className='block text-sm font-medium text-black '>Designtion</label>
                    <input
                      type='text'
                      name='strDesignation'
                      id='strDesignation'
                      disabled
                      value={Req[0]?.strDesignation || ''}
                      className='form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-1 h-8 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-15' >
          <button className='w-14 px-1 font-bold py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
          onClick={() => toggleAddModal(isAddModalActive, setIsAddModalActive)}>
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
                        ReqDet.map((ele, index) => (
                          <div
                            key={index}
                            className='bg-white rounded-xl shadow-lg mb-6 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out'
                          >
                            <div className='flex flex-col'>
                              {' '}
                              {/* Increased space between the details */}
                              <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                                <span className='text-sm font-bold text-cyan-900'>Item Description:</span>
                                <span className='text-sm font-semibold text-cyan-800'>{ele.strItem}</span>
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
                                <span className='text-xs font-semibold text-gray-600 '>Make:</span>
                                <span className='text-xs text-gray-700 '>{ele.strMakeName}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Current Stock:</span>
                                <span className='text-xs text-gray-700 '>{ele.currentStock}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Req. Qty:</span>
                                <span className='text-xs text-gray-700 '>{ele.strReqQty}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Unit:</span>
                                <span className='text-xs text-gray-700 '>{ele.strSKU}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Cost Center:</span>
                                <span className='text-xs text-gray-700 '>{ele.strCostCenter}</span>
                              </div>
                              <div className='flex items-center space-x-2 mt-1'>
                                <span className='text-xs font-semibold text-gray-600 '>Req. On Date:</span>
                                <span className='text-xs text-gray-700 '>
                                  {' '}
                                  {formatDate(ele.strReqDate || '', 'display')}
                                </span>
                              </div>
                              {/* <div className="flex items-center space-x-2 mt-1"> */}
                              <div className='flex items-center'>
                                <span className='text-xs font-semibold text-gray-600 '>Remarks:{ele.strRemark}</span>
                                {/* <span className="text-xs text-gray-700 ">{ele.Remark}</span> */}
                              </div>
                            </div>

                            <div className='flex items-center justify-end space-x-1 mt-4'>
                              <IconButton
                                color='primary'
                                className='hover:bg-blue-100'
                                sx={{ fontSize: 18 }}
                                onClick={() =>
                                  handleEdit(index, ReqDet, setIsEditModalActive, setEditItem, setEditIndex)
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
                          Item Description
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Make
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Current Stock
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Req. Qty
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Unit
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Cost Center
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Req. On Date
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Remark
                        </th>
                      </tr>
                    </thead>
                    {!isSelect &&
                      ReqDet.map((ele, index) => {
                        return (
                          <tbody key={index}>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-300'>
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
                                      handleEdit(index, ReqDet, setIsEditModalActive, setEditItem, setEditIndex)
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
                                {ele.strItem}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.strMakeName}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.currentStock}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.strReqQty}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.strSKU}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.strCostCenter}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {formatDate(ele.strReqDate || '', 'display')}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 whitespace-nowrap'>
                                {ele.strRemark}
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

      <AddReqModal
        isAddModalActive={isAddModalActive}
        toggleAddModal={() => setIsAddModalActive(false)}
        isEditModalActive={isEditModalActive}
        toggleEditModal={() => setIsEditModalActive(false)}
        onFormSubmit={isEditModalActive ? submitEditForm : submitForm}
        editItem={isEditModalActive ? editItem : undefined} // Pass editItem only if in edit mode
        editIndex={editIndex}
        Req={Req}
        setReq={setReq}
        ReqDet={ReqDet}
        setReqDet={setReqDet}
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

const ReqEntry = () => {
  const router = useRouter()
  function handleChange() {
    router.push('/reqList/')
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
            title='Requisition Entry'
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

export default ReqEntry
