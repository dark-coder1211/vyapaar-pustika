'use client'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { Avatar } from '@mui/material'
import { EditReqInterfaceDetail, ReqInterface } from './interfaces/page'
import ItemNameHelpComponent from './HelpBox/itemhelp'
import CostCenterHelpComponent from './HelpBox/costcenterhelp'
import ItemMakeHelpComponent from './HelpBox/itemmakehelp'
import { getBalance } from '@/app/action/purchaseAction'
import { toast } from 'react-toastify'

interface Props {
  isAddModalActive?: boolean
  toggleAddModal?: () => void
  onFormSubmit?: (formData: EditReqInterfaceDetail) => void
  isEditModalActive?: boolean
  toggleEditModal?: () => void
  editItem?: EditReqInterfaceDetail | null
  editIndex: number | null
  Req: ReqInterface[]
  setReq: Dispatch<SetStateAction<ReqInterface[]>>
  ReqDet: EditReqInterfaceDetail[]
  setReqDet: Dispatch<SetStateAction<EditReqInterfaceDetail[]>>
}

type HandleModalSubmitProps = {
  e: React.FormEvent
  formData: EditReqInterfaceDetail
  setFormData: Dispatch<SetStateAction<EditReqInterfaceDetail>>
  onFormSubmit?: (data: EditReqInterfaceDetail) => void
  toggleAddModal?: () => void
  toggleEditModal?: () => void
  handleReset: () => void
}

const AddReqModal = ({
  isAddModalActive,
  toggleAddModal,
  isEditModalActive,
  toggleEditModal,
  editItem,
  editIndex,
  onFormSubmit,
  Req,
  setReq,
  ReqDet,
  setReqDet
}: Props) => {
  const formatDate = (date: string | Date): string => {
    // Convert to Date object if it's a string
    const d = new Date(date)

    // Check if the date is valid
    if (isNaN(d.getTime())) {
      return '' // Return empty string if the date is invalid
    }

    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const initialFormData: EditReqInterfaceDetail = {
    RowID: '',
    strItem: '',
    strItemCode: '',
    strMakeCode: '',
    strMakeName: '',
    strSKU: '',
    strCCCode: '',
    strCostCenter: '',
    strReqDate: '',
    strRemark: ''
  }

  const [submittedData, setSubmittedData] = useState<EditReqInterfaceDetail[]>([])
  const [formData, setFormData] = useState<EditReqInterfaceDetail>(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessagevalidate, setModalMessagevalidate] = React.useState('')
  const [currentStock, setCurrentStock] = useState<number>(0) // Default 0

  useEffect(() => {
    if (editItem) {
      setFormData(editItem)
    } else {
      setFormData(initialFormData)
    }
  }, [editItem, setFormData])

  type ReqKeys = keyof EditReqInterfaceDetail

  const requiredFields: { key: ReqKeys; label: string }[] = [
    { key: 'strItemCode', label: 'Item Description' },
    { key: 'strReqQty', label: 'Req. Qty' },
    { key: 'strCCCode', label: 'Cost Center' },
    { key: 'strReqDate', label: 'Req. On Date' }
  ]

  const validateIndent = (req: EditReqInterfaceDetail): boolean => {
    for (const field of requiredFields) {
      const value = req[field.key]

      // Check for missing or empty value
      if (value === null || value === undefined || value.toString().trim() === '') {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }

      // Special validation for IndQty: should not be 0
      if (field.key === 'strReqQty' && Number(value) === 0) {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }
    }
    return true
  }

  const handleModalSubmit = ({
    e,
    formData,
    setFormData,
    onFormSubmit,
    toggleAddModal,
    toggleEditModal,
    handleReset
  }: HandleModalSubmitProps) => {
    e.preventDefault()

    if (!validateIndent(formData)) return

    const entryDateStr = Req[0]?.strV_Date ?? new Date().toISOString().split('T')[0]
    const reqonDateStr = formData.strReqDate

    if (!reqonDateStr || !entryDateStr) {
      setModalMessage('Both Req. On Date and Entry Date are required.')
      setIsModalOpen(true)
      return
    }

    const reqDate = new Date(reqonDateStr)
    const entryDate = new Date(entryDateStr)

    if (reqDate < entryDate) {
      setModalMessage('Requisition Date Should Not Be Less Than Entry Date.')
      setIsModalOpen(true)
      return
    }

    const finalFormData = {
      ...formData,
      currentStock // <- Add here
    }

    if (onFormSubmit) {
      onFormSubmit(finalFormData)
    }

    // Check if toggle functions are defined before calling them
    if (toggleAddModal) {
      toggleAddModal() // Close Add Modal
    }
    if (toggleEditModal) {
      toggleEditModal() // Close Edit Modal
    }

    handleReset() // Reset form after submission
  }

  const checkForDuplicate = (newData: EditReqInterfaceDetail, formDataArray: EditReqInterfaceDetail[]) => {
    return formDataArray.some(
      (item, index) =>
        index !== editIndex && // Skip comparing with the selected index
        item.strItem === newData.strItem
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    // const isEditMode = !!editItem;

    // // Check if item name or item code has changed during edit
    // const isItemChanged = isEditMode && (
    //     formData.strItem !== editItem?.strItem ||
    //     formData.strItemCode !== editItem?.strItemCode
    // );

    // // Check for duplicates only in add mode or if item is changed in edit mode
    // if (
    //     formData &&
    //     (!isEditMode || isItemChanged) &&
    //     (checkForDuplicate(formData, submittedData) || checkForDuplicate(formData, ReqDet))
    // ) {
    //     setModalMessage("Duplicate Item.");
    //     setIsModalOpen(true);
    //     return;
    // }

    let isDuplicate = false

    if (isAddModalActive) {
      isDuplicate = ReqDet.some(item => item.strItemCode === formData.strItemCode)
    } else if (isEditModalActive) {
      isDuplicate = ReqDet.some((item, index) => index !== editIndex && item.strItemCode === formData.strItemCode)
    }

    if (isDuplicate) {
      toast.error('Duplicate entry detected! This combination already exists.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }

    // Proceed with form submission
    handleModalSubmit({
      e,
      formData,
      setFormData,
      onFormSubmit,
      toggleAddModal,
      toggleEditModal,
      handleReset
    })

    // Only add to submittedData in add mode
    if (isAddModalActive) {
      setSubmittedData(prevData => [...prevData, formData])
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
  }

  const handleChange = useCallback(
    async (eventOrKey: any, value?: any) => {
      let key: string
      let updatedValue: any

      // 🔍 Check if triggered by an event
      if (typeof eventOrKey === 'object' && eventOrKey?.target) {
        const { name, value: inputValue } = eventOrKey.target
        key = name
        updatedValue = key === 'amount3' || key === 'grossAmt' ? parseFloat(inputValue) || 0 : inputValue
      }
      // 🔡 Check if triggered manually with a key
      else if (typeof eventOrKey === 'string') {
        key = eventOrKey
        updatedValue = key === 'amount3' || key === 'grossAmt' ? parseFloat(value) || 0 : value
      } else {
        return
      }

      // 📝 Update form data
      setFormData(prev => ({
        ...prev,
        [key]: updatedValue
      }))

      if (key === 'strItemCode') {
        if (typeof updatedValue === 'string' && updatedValue.trim() !== '') {
          try {
            const data = await getBalance('Stock', 'RecQty', 'IssueQty', 'ItemCode', updatedValue)

            const balance = data?.[0]?.Balance
            setCurrentStock(parseFloat(balance) || 0)
          } catch (error) {
            console.error('Failed to fetch stock balance:', error)
            setCurrentStock(0)
          }
        } else {
          // Agar item code blank ho, toh balance ko blank set karo
          setCurrentStock(0)
        }
      }
    },
    [setFormData, setCurrentStock] // ✅ Add all state setters to dependencies
  )

  const handleItemSelect = (item: any) => {
    if (item?.Code) {
      // ✅ Item is selected
      setFormData(prev => ({
        ...prev,
        strSKU: item.SKU
      }))
    } else {
      // ✅ Dropdown cleared
      setFormData(prev => ({
        ...prev,
        strSKU: ''
      }))
    }
  }

  return (
    <>
      {(isAddModalActive || isEditModalActive) && (
        <div className='fixed inset-0 z-999 overflow-y-auto md:overflow-y-hidden '>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0  '>
            {/* Modal content */}
            <div
              className='md:mt-20  md:ml-28 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-16'
              style={{ marginTop: '120px' }}
            >
              {/* Modal Header */}
              <div className='bg-blue-500 rounded-t-lg py-3 px-6 text-white text-center text-xl font-bold'>
                {isEditModalActive ? 'Edit Requisition Details' : 'Add Requisition Details'}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  toggleAddModal?.()
                  toggleEditModal?.()
                  handleReset()
                }}
                className='absolute top-3 right-3 text-white hover:text-gray-200'
              >
                <ImCross />
              </button>

              {/* Modal Body */}
              <div className='p-6 bg-white dark:bg-boxdark'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Left Column */}
                  <div className='space-y-4 relative'>
                    {' '}
                    {/* Ensures dropdowns stay in bounds */}
                    <div className='relative z-50'>
                      {' '}
                      {/* Higher z-index to prevent overlap */}
                      <ItemNameHelpComponent
                        filters={formData}
                        handleChange={handleChange}
                        filterKey='strItemCode'
                        nameKey='strItem'
                        isMulti={false}
                        label={
                          <>
                            Item Description <span style={{ color: 'red' }}>*</span>
                          </>
                        }
                        onItemSelect={handleItemSelect}
                      />
                    </div>
                    <div className='flex gap-4'>
                      <div className='w-1/2 relative z-40'>
                        {' '}
                        {/* Lower z-index */}
                        <ItemMakeHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='strMakeCode'
                          nameKey='strMakeName'
                          isMulti={false}
                          label='Make'
                        />
                      </div>

                      <div className='w-1/2'>
                        <label htmlFor='currentStock' className='block text-sm font-medium text-black '>
                          Current Stock
                        </label>
                        <input
                          type='number'
                          id='currentStock'
                          disabled
                          value={currentStock}
                          className='w-full h-8 px-2 border rounded-md bg-gray-50 dark:bg-form-input'
                        />
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label htmlFor='reqQty' className='block text-sm font-medium text-black '>
                          Req. Qty<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type='number'
                          name='strReqQty'
                          id='strReqQty'
                          value={formData.strReqQty ?? ''}
                          onChange={handleChange}
                          className='w-full h-8 px-2 border rounded-md'
                        />
                      </div>
                      <div className='w-1/2'>
                        <label htmlFor='unit' className='block text-sm font-medium text-black '>
                          Unit
                        </label>
                        <input
                          type='text'
                          id='strSKU'
                          disabled
                          value={formData.strSKU}
                          className='w-full h-8 px-2 border rounded-md bg-gray-50 dark:bg-form-input'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-4'>
                    <div className='relative z-40'>
                      <CostCenterHelpComponent
                        filters={formData}
                        handleChange={handleChange}
                        filterKey='strCCCode'
                        nameKey='strCostCenter'
                        isMulti={false}
                        label={
                          <>
                            Cost Center <span style={{ color: 'red' }}>*</span>
                          </>
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor='reqDate' className='block text-sm font-medium text-black '>
                        Req. On Date<span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        type='date'
                        name='strReqDate'
                        id='strReqDate'
                        defaultValue={formatDate(formData.strReqDate || '')}
                        onChange={handleChange}
                        className='w-full h-8 px-2 border rounded-md'
                      />
                    </div>

                    <div>
                      <label htmlFor='strRemark' className='block text-sm font-medium text-black '>
                        Remarks
                      </label>
                      <input
                        name='strRemark'
                        id='strRemark'
                        value={formData.strRemark}
                        onChange={handleChange}
                        className='w-full h-8 px-2 border rounded-md'
                        autoComplete='off'
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className='mt-6 flex justify-end gap-4'>
                  <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded-md font-semibold'>
                    Submit
                  </button>
                  <button onClick={handleReset} className='bg-gray-500 text-white px-4 py-2 rounded-md font-semibold'>
                    Reload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn z-[1000]'>
          <div className='bg-white dark:border-strokedark dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-xl font-semibold text-gray-800 text-center mb-7'>{modalMessage}</h2>
            <div className='flex justify-center'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-blue-400 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition duration-200'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalvalidate && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 animate-fadeIn z-[1000]'>
          <div className='bg-white dark:border-strokedark dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-sm w-full transform scale-95 animate-scaleUp'>
            <h2 className='text-xl font-semibold text-gray-800 text-center mb-7'>{modalMessagevalidate}</h2>
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

export default AddReqModal
