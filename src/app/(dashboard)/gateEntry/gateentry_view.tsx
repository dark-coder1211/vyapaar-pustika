'use client'

import HeadingTab from '@/components/HeadingTab'
import type {
  ApiResponseDetail,
  RecidInterface,
  GateEntryInterface,
  GateEntryDetailInterface,
  ApiResponse
} from './GateEntry_modal'
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
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BsBank2 } from 'react-icons/bs'
import { SiHomebridge } from 'react-icons/si'
import ExitToApp from '@/components/ExitToApp'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import PartyHelpComponent from '@/components/HelpBox/partyhelp'
import { useParams } from '@/context/paramcontext'
import TextBoxOne from '@/components/TextBox/TextBoxOne'
import { AddIndentAction, GetGateEntryDetailByDocid, GetGateEntryHeaderByDocid, RecidNOHelp } from './GateEntry_action'
import AddGateEntryModal from './gateentry_detail_view'
import PurposeHelpComponent from '@/components/HelpBox/purposehelp'
import WeighmentHelpComponent from '@/components/HelpBox/weighmenthelp'
import VehicleHelpComponent from '@/components/HelpBox/vehicletypehelp'

const RenderStats = () => {
  const [isAddModalActive, setIsAddModalActive] = useState(false)
  const [isEditModalActive, setIsEditModalActive] = useState(false)
  const [docId, setdocId] = useState<string>('')
  const searchParams = useSearchParams()
  const [gateEntry, setGateEntry] = useState<GateEntryInterface>({
    clsGatePassEntryDetail: []
  })
  const [gateEntryDet, setGateEntryDet] = useState<GateEntryDetailInterface[]>([])
  const [currentDate, setCurrentDate] = useState<string>('')
  const [editItem, setEditItem] = useState<GateEntryDetailInterface | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [rowIndexToDelete, setRowIndexToDelete] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState('Closed') // Default to "Closed" option
  const [gateEntryNo, setGateEntryNo] = useState('')
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessage, setModalMessage] = React.useState('')

  const { Site_Code, companyid, UserName, bu } = useParams()

  const handleChange = async <K extends keyof GateEntryInterface>(key: K, value: GateEntryInterface[K]) => {
    // let updatedGateEntry: GateEntryInterface

    // setGateEntry(prev => {
    //   const updated = [...prev]
    //   if (updated.length === 0) {
    //     updatedGateEntry = { [key]: value } as GateEntryInterface
    //     updated.push(updatedGateEntry)
    //   } else {
    //     updatedGateEntry = { ...updated[0], [key]: value }
    //     updated[0] = updatedGateEntry
    //   }
    //   return updated
    // })

    // setGateEntry(prev => ({ ...prev, [key]: value }))

    setGateEntry(prev => {
      const updated = { ...prev, [key]: value }

      if (key === 'StrWeighYN') {
        updated.StrWeighYNName = value === 'Y' ? 'Yes' : value === 'N' ? 'No' : ''
      }

      return updated
    })

    // ✅ Fix for "used before assigned"

    // ✅ API call only when StrReqDocId changes
    // if (key === 'StrReqDocId') {
    //   if (typeof value === 'string' && value.trim() !== '') {
    //     try {
    //       const data: ApiResponse = await GetIndentDetByReq(
    //         {
    //           StrReqNo: value, // already a string
    //           StrTansType_Category:
    //             updatedIndent?.StrTansType_Category != null ? String(updatedIndent.StrTansType_Category) : null
    //         },
    //         Site_Code as string,
    //         companyid as string,
    //         bu as string
    //       )
    //       console.log('Fetched Indent Details:', data)
    //       setIndentDet(data ? data.data : [])
    //     } catch (error) {
    //       console.error('Failed to fetch indent details:', error)
    //       setIndentDet([])
    //     }
    //   } else {
    //     // Clear IndentDet if requisition number is empty
    //     setIndentDet([])
    //   }
    // }
  }

  const handleRowClick = (option: any) => {
    setSelectedOption(option) // Set the selected option when a row is clicked
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

  function formatDateForInput(dateStr: string | undefined): string {
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
    async function getGateEntryNumber() {
      const res: RecidInterface = await RecidNOHelp(
        formatDate(new Date()),
        'Gate',
        'GateInOut',
        Site_Code as string,
        companyid as string,
        UserName as string,
        bu as string
      )
      if (res?.success) {
        setGateEntryNo(res?.data) // Set state if data is not null
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
    if (Site_Code && companyid && UserName) {
      getGateEntryNumber()
    }
  }, [setGateEntryNo, Site_Code, companyid, UserName])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('DocId') // Get the clientId from URL

        if (Docid) {
          setdocId(Docid)
          const data: ApiResponse | null = await GetGateEntryHeaderByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            console.log('data', data)

            // Check if data is not null and has items

            setGateEntry(data.data[0]) // Set the fetched single object
            if (data.data[0].StrWeighYN === 'Y') {
              data.data[0].StrWeighYNName = 'Yes'
            } else {
              data.data[0].StrWeighYNName = 'No'
            }
          } else {
            const Today = formatDate(new Date()) // Execute this when data is empty or null
            setCurrentDate(Today)
          }
        } else {
          const Today = formatDate(new Date()) // Execute this when data is empty or null
          setCurrentDate(Today)
        }
      } catch (error) {
        console.error('Error fetching gate entry data:', error)
      }
    }

    fetchData()
  }, [searchParams, setCurrentDate, setGateEntry, setdocId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Docid = searchParams.get('DocId') // Get the clientId from URL
        if (Docid) {
          setdocId(Docid)
          const data: ApiResponseDetail | null = await GetGateEntryDetailByDocid(
            { Docid },
            Site_Code as string,
            companyid as string,
            bu as string
          )
          if (data) {
            // Check if data is not null and has items
            setGateEntryDet(data.data) // Set the fetched single object
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

    fetchData()
  }, [searchParams, setCurrentDate, setdocId])

  const handleEdit = (
    index: number,
    gateEntryDet: GateEntryDetailInterface[], // Adjust the type according to your data structure

    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    setEditItem: React.Dispatch<React.SetStateAction<GateEntryDetailInterface | null>>,
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const dataToEdit = gateEntryDet[index]
    setIsEditModalActive(true) // Open the modal for editing

    setEditIndex(index) // Save the index of the item being edited
    setEditItem(dataToEdit)
  }

  const handleTableDelete = (
    index: number,
    gateEntryDet: GateEntryDetailInterface[],
    setGateEntryDet: React.Dispatch<React.SetStateAction<GateEntryDetailInterface[]>>
  ) => {
    // First, get the data from the row that is about to be deleted
    const rowToDelete = gateEntryDet[index]

    if (rowToDelete) {
      setGateEntryDet(prevDetail => prevDetail.filter((_, i) => i !== index))

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
      handleTableDelete(rowIndexToDelete, gateEntryDet, setGateEntryDet) // Delete the row and pass the necessary parameters
      setOpen(false) // Close the dialog
    }
  }

  const submitForm = (formData: GateEntryDetailInterface) => {
    handleFormSubmit(
      formData,

      setGateEntryDet,

      toggleAddModal, // Pass the function directly

      isAddModalActive,
      setIsAddModalActive
    )
  }

  const handleFormSubmit = (
    formData: GateEntryDetailInterface,
    setIndentDet: React.Dispatch<React.SetStateAction<GateEntryDetailInterface[]>>,

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

  const submitEditForm = (formData: GateEntryDetailInterface) => {
    handleEditFormSubmit(
      formData,
      editIndex,
      gateEntryDet,
      setGateEntryDet,
      toggleEditModal,
      isEditModalActive,
      setIsEditModalActive
    )
  }

  const handleEditFormSubmit = (
    formData: GateEntryDetailInterface,
    editIndex: number | null,
    gateEntryDet: GateEntryDetailInterface[],
    setDetail: React.Dispatch<React.SetStateAction<GateEntryDetailInterface[]>>,
    toggleEditModal: (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
    isEditModalActive: boolean,
    setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (editIndex !== null) {
      const updatedSubmissions = gateEntryDet.map((item, index) => (index === editIndex ? formData : item))
      setDetail(updatedSubmissions)

      toggleEditModal(isEditModalActive, setIsEditModalActive) // Close the modal
    } else {
      console.error('Edit index is not set.')
    }
  }

  type IndentKeys = keyof GateEntryInterface

  const requiredFields: { key: IndentKeys; label: string }[] = [
    { key: 'StrLoadUnLoad', label: 'Purpose' },
    { key: 'StrWeighYN', label: 'Weighment' }
  ]

  const validateIndent = (indent: GateEntryInterface): boolean => {
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
  async function getGateEntryNumberAfterSave() {
    const res: RecidInterface = await RecidNOHelp(
      formatDate(new Date()),
      'Gate',
      'GateInOut',
      Site_Code as string,
      companyid as string,
      UserName as string,
      bu as string
    )
    if (res?.success) {
      setGateEntryNo(res.data) // ✅ This updates your indent number state
    } else {
      console.error(res?.error || 'Failed to fetch Gate Entry number.')
    }
  }
  const handleSubmit = async (event: React.FormEvent, setIsSelect: Dispatch<SetStateAction<boolean>>) => {
    event.preventDefault()

    if (!gateEntry || Object.keys(gateEntry).length === 0) {
      setModalMessage('Gate Entry data is missing.')
      setIsModalvalidate(true)
      return
    }

    if (!validateIndent(gateEntry)) {
      return // modal will show the message, stop submit here
    }

    if (!gateEntryDet || gateEntryDet.length === 0) {
      setModalMessage('Please Fill item.')
      setIsModalvalidate(true)
      return
    }

    for (const item of gateEntryDet) {
      if (!item.strItemDesc || item.strItemDesc.trim() === '') {
        setModalMessage('Item Desc. is a required field.')
        setIsModalvalidate(true)
        return
      }

      if (
        item.dblQty === undefined ||
        item.dblQty === null ||
        item.dblQty.toString().trim() === '' ||
        Number(item.dblQty) === 0
      ) {
        setModalMessage('Qty is a required field .')
        setIsModalvalidate(true)
        return
      }

      if (!item.StrRemark || item.StrRemark.toString().trim() === '') {
        setModalMessage('Remark is a required field.')
        setIsModalvalidate(true)
        return
      }
    }

    const updatedPostFormData: GateEntryInterface = {
      strDocId: gateEntry?.strDocId || '', // Optional
      strV_Type: gateEntry?.strV_Type || 'Gate',
      IntV_No: gateEntry.IntV_No || '',
      StrV_Date: gateEntry?.StrV_Date || new Date().toISOString().split('T')[0],
      IntV_Prefix: gateEntry?.IntV_Prefix || '',
      StrRecId: gateEntry?.StrRecId || gateEntryNo,
      StrV_Time:
        gateEntry?.StrV_Time ||
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      StrPartyCode: gateEntry?.StrPartyCode || '',
      StrPartyName: gateEntry?.StrPartyName || '',
      StrRemark: gateEntry?.StrRemark || '',
      StrGateInBy: gateEntry?.StrGateInBy || '',
      StrLoadUnLoad: gateEntry?.StrLoadUnLoad || '',
      StrLoadUnLoadName: gateEntry?.StrLoadUnLoadName || '',
      StrVehicleType: gateEntry?.StrVehicleType || '',
      StrVehicleTypeName: gateEntry?.StrVehicleTypeName || '',
      StrVehicleNo: gateEntry?.StrVehicleNo || '',
      StrSaleInvNo: gateEntry?.StrSaleInvNo || '',
      StrWeighYN: gateEntry?.StrWeighYN || '',
      StrTransporter: gateEntry?.StrTransporter || '',
      StrTransporterName: gateEntry?.StrTransporterName || '',
      StrDriver: gateEntry?.StrDriver || '',
      StrWeighType: gateEntry?.StrWeighType || '',
      StrLabTestDependOn: gateEntry?.StrLabTestDependOn || '',
      StrStockDependOn: gateEntry?.StrStockDependOn || '',
      clsGatePassEntryDetail: gateEntryDet
    }

    try {
      const res = await AddIndentAction(
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
            toast.success('Add Gate Entry Successfully!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })

            setGateEntry({
              strDocId: '',
              strV_Type: '',
              IntV_No: '',
              IntV_Prefix: '',
              StrV_Date: '',
              StrRecId: '',
              StrV_Time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }),
              StrPartyCode: '',
              StrPartyName: '',
              StrRemark: '',
              StrGateInBy: '',
              StrLoadUnLoad: '',
              StrLoadUnLoadName: '',
              StrVehicleType: '',
              StrVehicleTypeName: '',
              StrVehicleNo: '',
              StrSaleInvNo: '',
              StrWeighYN: '',
              StrWeighYNName: '',
              StrTransporter: '',
              StrTransporterName: '',
              StrDriver: '',
              StrWeighType: '',
              StrLabTestDependOn: '',
              StrStockDependOn: '',
              clsGatePassEntryDetail: []
            })

            setGateEntryDet([
              {
                ...gateEntryDet[0],
                strDocId: '',
                strItemDesc: '',
                dblQty: 0,
                StrRemark: ''
              }
            ])
            setIsSelect(true)
          } else {
            toast.success('Gate Entry Edited Successfully!', {
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
      await getGateEntryNumberAfterSave()
    } catch (error) {
      toast.error('API call failed', {
        position: 'top-center',
        autoClose: 5,
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
          <div className='w-full max-w-6xl'>
            <div className='rounded border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark'>
              {/* Grid Container */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {/* Entry No. */}
                <div>
                  <TextBoxOne
                    id='StrRecId'
                    name='StrRecId'
                    label='Entry No.'
                    labelColor='red'
                    disabled={true}
                    defaultValue={gateEntry?.StrRecId || gateEntryNo}
                  />
                </div>

                {/* In Date */}
                <div>
                  <TextBoxOne
                    id='StrV_Date'
                    name='StrV_Date'
                    type='date'
                    value={formatDateForInput(gateEntry.StrV_Date) || currentDate}
                    disabled={true}
                    label='In Date'
                    labelColor='red'
                  />
                </div>

                {/* In Time */}
                <div>
                  <TextBoxOne
                    id='StrV_Time'
                    name='StrV_Time'
                    value={
                      gateEntry?.StrV_Time ||
                      new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })
                    }
                    type='time'
                    label='In Time'
                    labelColor='red'
                    disabled={true}
                  />
                </div>

                {/* Purpose */}
                <div>
                  <PurposeHelpComponent
                    filters={gateEntry}
                    handleChange={handleChange}
                    filterKey='StrLoadUnLoad'
                    nameKey='StrLoadUnLoadName'
                    label={
                      <>
                        Purpose <span className='text-red-500'>*</span>
                      </>
                    }
                  />
                </div>

                {/* Weighment */}
                <div>
                  <WeighmentHelpComponent
                    filters={gateEntry}
                    handleChange={handleChange}
                    filterKey='StrWeighYN'
                    nameKey='StrWeighYNName'
                    label={
                      <>
                        Weighment <span className='text-red-500'>*</span>
                      </>
                    }
                  />
                </div>

                {/* Party */}
                <div>
                  <PartyHelpComponent
                    filters={gateEntry}
                    handleChange={handleChange}
                    filterKey='StrPartyCode'
                    nameKey='StrPartyName'
                    StrNature={['customer', 'agent']}
                    label={
                      <>
                        Party <span className='text-red-500'>*</span>
                      </>
                    }
                    showButton={false}
                  />
                </div>

                {/* Vehicle Type */}
                <div>
                  <VehicleHelpComponent
                    filters={gateEntry}
                    handleChange={handleChange}
                    filterKey='StrVehicleType'
                    nameKey='StrVehicleTypeName'
                    label='Vehicle Type'
                  />
                </div>

                {/* Vehicle No */}
                <div>
                  <TextBoxOne
                    label='Vehicle No'
                    id='StrVehicleNo'
                    name='StrVehicleNo'
                    value={gateEntry.StrVehicleNo || ''}
                    onChange={e => handleChange('StrVehicleNo', e.target.value)}
                  />
                </div>

                {/* Transporter */}
                <div>
                  <PartyHelpComponent
                    filters={gateEntry}
                    handleChange={handleChange}
                    StrNature='Transporter'
                    filterKey='StrTransporter'
                    nameKey='StrTransporterName'
                    isMulti={false}
                    label='Transporter'
                    showButton={false}
                  />
                </div>

                {/* Driver Name */}
                <div>
                  <TextBoxOne
                    label='Driver Name'
                    id='StrDriver'
                    name='StrDriver'
                    value={gateEntry.StrDriver || ''}
                    onChange={e => handleChange('StrDriver', e.target.value)}
                  />
                </div>

                {/* Stock Depend On */}
                <div>
                  <TextBoxOne
                    label='Stock Depend On'
                    id='StrStockDependOn'
                    name='StrStockDependOnName'
                    defaultValue={gateEntry.StrStockDependOn || ''}
                    disabled={true}
                  />
                </div>

                {/* Lab Depend On */}
                <div>
                  <TextBoxOne
                    label='Lab Depend On'
                    id='StrLabTestDependOn'
                    name='StrLabTestDependOnName'
                    defaultValue={gateEntry.StrLabTestDependOn || ''}
                    disabled={true}
                  />
                </div>
                <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                  <TextBoxOne
                    label='Remark'
                    id='StrRemark'
                    name='StrRemark'
                    value={gateEntry.StrRemark || ''}
                    onChange={e => handleChange('StrRemark', e.target.value)}
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
                        gateEntryDet.map((ele, index) => (
                          <div
                            key={index}
                            className='bg-white rounded-xl shadow-lg mb-6 p-6  transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r duration-500 ease-in-out '
                          >
                            <div className='flex flex-col '>
                              {' '}
                              {/* Increased space between the details */}
                              <div className='flex items-center space-x-2 border-b-2 border-cyan-900 pb-2'>
                                <span className='text-lg font-bold text-cyan-900'>S.No.:</span>
                                <span className='text-lg font-semibold text-cyan-800 '>{index + 1}</span>
                              </div>
                              <div className='flex flex-col space-y-2 mt-2 w-full'>
                                {' '}
                                {/* Increased space between the details */}
                                <div>
                                  <span className='text-s font-semibold text-gray-600 '>Item Description: </span>
                                  <span className='text-s text-gray-700 break-words whitespace-normal '>
                                    {ele.strItemDesc}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <span className='text-s font-semibold text-gray-600 '>Quantity: </span>
                                <span className='text-s text-gray-700 break-words whitespace-normal'>{ele.dblQty}</span>
                              </div>
                              <div>
                                <span className='text-s font-semibold text-gray-600 '>Remark: </span>
                                <span className='text-s text-gray-700 break-words whitespace-normal'>
                                  {ele.StrRemark}
                                </span>
                              </div>
                            </div>

                            <div className='flex items-center justify-end space-x-1 mt-4'>
                              <IconButton
                                color='primary'
                                className='hover:bg-blue-100'
                                sx={{ fontSize: 18 }}
                                onClick={() =>
                                  handleEdit(index, gateEntryDet, setIsEditModalActive, setEditItem, setEditIndex)
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
                  <table className='w-full table-fixed '>
                    <thead>
                      <tr className='bg-teal-400 text-white '>
                        <th className='py-3 w-20 text-xs font-semibold tracking-wide uppercase text-center  border-b border-gray-300 dark:border-gray-700'>
                          Sno
                        </th>
                        <th className='py-3 w-44 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Action
                        </th>
                        <th className='py-3 w-96 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Item Description
                        </th>
                        <th className='py-3 w-40 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Quantity
                        </th>
                        <th className='py-3 w-96 text-xs font-semibold tracking-wide uppercase text-center border-b border-gray-300 dark:border-gray-700'>
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    {!isSelect &&
                      gateEntryDet.map((ele, index) => {
                        return (
                          <tbody key={index}>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-200'>
                              <td className=' py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700'>
                                {index + 1}
                              </td>
                              <td className='py-1 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700'>
                                <div
                                  className='flex items-center justify-center space-x-5
                                 '
                                >
                                  <IconButton
                                    color='primary'
                                    className='hover:bg-blue-100'
                                    sx={{ fontSize: 18 }}
                                    onClick={() =>
                                      handleEdit(index, gateEntryDet, setIsEditModalActive, setEditItem, setEditIndex)
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
                              <td className='px-4 py-3 text-xs text-black text-left border-b border-gray-300 dark:border-gray-700 break-words'>
                                {ele.strItemDesc}
                              </td>
                              <td className='px-4 py-3 text-xs text-black text-center border-b border-gray-300 dark:border-gray-700 break-words'>
                                {ele.dblQty}
                              </td>
                              <td className='px-4 py-3 w-96 text-xs text-black text-left border-b border-gray-300 dark:border-gray-700 break-words'>
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

      <AddGateEntryModal
        isAddModalActive={isAddModalActive}
        toggleAddModal={() => setIsAddModalActive(false)}
        isEditModalActive={isEditModalActive}
        toggleEditModal={() => setIsEditModalActive(false)}
        onFormSubmit={isEditModalActive ? submitEditForm : submitForm}
        editItem={isEditModalActive ? editItem : undefined} // Pass editItem only if in edit mode
        editIndex={editIndex}
        Indent={gateEntry}
        setIndent={setGateEntry}
        IndentDet={gateEntryDet}
        setIndentDet={setGateEntryDet}
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

const GateEntry = () => {
  const router = useRouter()
  function handleChange() {
    router.push('/gateInList/')
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
            title='Gate Entry'
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

export default GateEntry
