'use client'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { IndentInterface, EditIndentInterfaceDetail } from '@/app/(dashboard)/indentEntry/Indent_Entry_modal'
import ItemNameHelpComponent from '../../../components/HelpBox/itemhelp'
import CostCenterHelpComponent from '../../../components/HelpBox/costcenterhelp'
import ItemMakeHelpComponent from '../../../components/HelpBox/itemmakehelp'
import { getBalance } from './Indent_Entry_action'
import { toast } from 'react-toastify'
import { useParams } from '@/context/paramcontext'

interface Props {
  isAddModalActive?: boolean
  toggleAddModal?: () => void
  onFormSubmit?: (formData: EditIndentInterfaceDetail) => void
  isEditModalActive?: boolean
  toggleEditModal?: () => void
  editItem?: EditIndentInterfaceDetail | null
  Indent: IndentInterface[]
  setIndent: Dispatch<SetStateAction<IndentInterface[]>>
  IndentDet: EditIndentInterfaceDetail[]
  setIndentDet: Dispatch<SetStateAction<EditIndentInterfaceDetail[]>>
  editIndex: number | null
}

type HandleModalSubmitProps = {
  e: React.FormEvent
  formData: EditIndentInterfaceDetail
  setFormData: Dispatch<SetStateAction<EditIndentInterfaceDetail>>
  Indent: IndentInterface[]
  setIndent: Dispatch<SetStateAction<IndentInterface[]>>
  onFormSubmit?: (data: EditIndentInterfaceDetail) => void
  toggleAddModal?: () => void
  toggleEditModal?: () => void
  handleReset: () => void
}

const AddIndentModal = ({
  isAddModalActive,
  toggleAddModal,
  isEditModalActive,
  toggleEditModal,
  editItem,
  editIndex,
  onFormSubmit,
  Indent,
  setIndent,
  IndentDet,
  setIndentDet
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

  const initialFormData: EditIndentInterfaceDetail = {
    StrItemName: '',
    StrItemcode: '',
    IndQty: 0,
    StrCostCenter: '',
    StrCostCenterName: '',
    ReqDate: '',
    StrRemark: ''
  }
  const [submittedData, setSubmittedData] = useState<EditIndentInterfaceDetail[]>([])
  const [formData, setFormData] = useState<EditIndentInterfaceDetail>(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessagevalidate, setModalMessagevalidate] = React.useState('')
  const [currentStock, setCurrentStock] = useState<number>(0) // Default 0
  const { Site_Code, companyid, bu } = useParams()

  type IndentKeys = keyof EditIndentInterfaceDetail

  const requiredFields: { key: IndentKeys; label: string }[] = [
    { key: 'StrItemcode', label: 'Item Name' },
    { key: 'IndQty', label: 'Indent Qty' },
    { key: 'ReqDate', label: 'Req Date' }
  ]

  const validateIndent = (indent: EditIndentInterfaceDetail): boolean => {
    for (const field of requiredFields) {
      const value = indent[field.key]

      // Check for missing or empty value
      if (value === null || value === undefined || value.toString().trim() === '') {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }

      // Special validation for IndQty: should not be 0
      if (field.key === 'IndQty' && Number(value) === 0) {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }
    }
    return true
  }

  useEffect(() => {
    if (editItem) {
      setFormData(editItem)
    } else {
      setFormData(initialFormData)
    }
  }, [editItem, setFormData])

  const checkForDuplicate = (newData: EditIndentInterfaceDetail, formDataArray: EditIndentInterfaceDetail[]) => {
    return formDataArray.some(
      (item, index) =>
        index !== editIndex && // Skip comparing with the selected index
        item.StrItemName === newData.StrItemName
    )
  }

  const handleModalSubmit = ({
    e,
    formData,
    setFormData,
    Indent,
    setIndent,
    onFormSubmit,
    toggleAddModal,
    toggleEditModal,
    handleReset
  }: HandleModalSubmitProps) => {
    e.preventDefault()

    if (!validateIndent(formData)) return

    const indentDateStr = Indent[0]?.V_Date ?? new Date().toISOString().split('T')[0]
    const reqDateStr = formData.ReqDate

    if (!reqDateStr || !indentDateStr) {
      setModalMessage('Both Req. Date and Indent Date are required.')
      setIsModalOpen(true)
      return
    }

    const reqDate = new Date(reqDateStr)
    const indentDate = new Date(indentDateStr)

    if (reqDate < indentDate) {
      setModalMessage('Req. Date can not less than Indent Date.')
      setIsModalOpen(true)
      return
    }

    // ✅ Inject currentStock into formData
    const finalFormData = {
      ...formData,
      currentStock // <- Add here
    }

    if (onFormSubmit) {
      onFormSubmit(finalFormData)
    }

    toggleAddModal?.()
    toggleEditModal?.()
    handleReset()
  }

  const handleSubmit = (e: React.FormEvent) => {
    // const isEditMode = !!editItem

    // // If it's edit mode, check if item name or code is changed
    // const isItemChanged =
    //   isEditMode && (formData.StrItemName !== editItem?.StrItemName || formData.StrItemcode !== editItem?.StrItemcode)

    // if (
    //   formData &&
    //   (!isEditMode || isItemChanged) &&
    //   (checkForDuplicate(formData, submittedData) || checkForDuplicate(formData, IndentDet))
    // ) {
    //   setModalMessage('Duplicate Item.')
    //   setIsModalOpen(true)
    //   return
    // }

    let isDuplicate = false

    if (isAddModalActive) {
      isDuplicate = IndentDet.some(item => item.StrItemcode === formData.StrItemcode)
    } else if (isEditModalActive) {
      isDuplicate = IndentDet.some((item, index) => index !== editIndex && item.StrItemcode === formData.StrItemcode)
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
      Indent,
      setIndent,
      onFormSubmit,
      toggleAddModal,
      toggleEditModal,
      handleReset
    })

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
      if (key === 'StrItemcode') {
        if (typeof updatedValue === 'string' && updatedValue.trim() !== '') {
          try {
            const data = await getBalance(
              'Stock',
              'RecQty',
              'IssueQty',
              'ItemCode',
              updatedValue,
              Site_Code as string,
              companyid as string,
              bu as string
            )

            const balance = data?.[0]?.Balance
            setCurrentStock(parseFloat(balance) || 0)
          } catch (error) {
            console.error('Failed to fetch stock balance:', error)
            setCurrentStock(0)
          }
        } else {
          // Clear stock balance if item code is empty
          setCurrentStock(0)
        }
      }
    },
    [setFormData, setCurrentStock] // ✅ Add all state setters to dependencies
  )

  const handleItemSelect = (item: any) => {
    if (item?.Code) {
      setFormData(prev => ({
        ...prev,
        StrICode: item.ManualCode, // ✅ Set ManualCode to formData
        MinStock: item.MinStock,
        MaxStock: item.maxStock,
        Reorder: item.Reorder,
        StrUnit: item.SKU
      }))
    } else {
      // ✅ Dropdown cleared
      setFormData(prev => ({
        ...prev,
        StrICode: '', // ✅ Set ManualCode to formData
        MinStock: 0,
        MaxStock: 0,
        Reorder: 0,
        StrUnit: ''
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
              className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-16'
              style={{ marginTop: '120px' }}
            >
              {/* Modal Header */}
              <div className='bg-blue-500 rounded-t-lg py-3 px-6 text-white text-center text-xl font-bold'>
                {isEditModalActive ? 'Edit Indent Details' : 'Add Indent Details'}
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  toggleAddModal?.()
                  toggleEditModal?.()
                  handleReset()
                }}
                className='absolute top-3 right-3 bg-blue-500 text-white hover:text-gray-200'
              >
                <ImCross />
              </button>

              {/* Modal Body */}
              <div className='p-6 bg-white dark:bg-boxdark'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Left Column */}
                  <div className='space-y-4'>
                    <div className='relative z-50'>
                      <ItemNameHelpComponent
                        filters={formData}
                        handleChange={handleChange}
                        filterKey='StrItemcode'
                        nameKey='StrItemName'
                        isMulti={false}
                        label={
                          <>
                            Item Name <span className='text-red-500'>*</span>
                          </>
                        }
                        onItemSelect={handleItemSelect}
                      />
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label className='block text-sm text-black font-medium'>Item Manual Code</label>
                        <input
                          type='text'
                          value={formData.StrICode}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
                        />
                      </div>

                      <div className='w-1/2 relative z-40'>
                        <ItemMakeHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='StrMake'
                          nameKey='StrMakeName'
                          isMulti={false}
                          label='Make'
                        />
                      </div>
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>Current Stock</label>
                        <input
                          type='number'
                          value={currentStock}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
                        />
                      </div>

                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>Min Qty.</label>
                        <input
                          type='number'
                          value={formData.MinStock}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
                        />
                      </div>
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>Max Qty.</label>
                        <input
                          type='number'
                          value={formData.MaxStock}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
                        />
                      </div>

                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>Record Qty.</label>
                        <input
                          type='number'
                          value={formData.Reorder ?? ''}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
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
                        filterKey='StrCostCenter'
                        nameKey='StrCostCenterName'
                        isMulti={false}
                        label={<>Cost Center</>}
                      />
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>Req Qty.</label>
                        <input
                          type='number'
                          value={formData.dblAprQty ?? ''}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
                        />
                      </div>

                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>
                          Ind Qty. <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='number'
                          name='IndQty'
                          value={formData.IndQty ?? ''}
                          onChange={handleChange}
                          className='w-full h-8 px-2 border rounded-md'
                        />
                      </div>
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>Unit</label>
                        <input
                          type='text'
                          value={formData.StrUnit}
                          disabled
                          className='w-full h-8 px-2 border rounded-md bg-gray-50'
                        />
                      </div>

                      <div className='w-1/2'>
                        <label className='block text-sm text-black  font-medium'>
                          Req. Date <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='date'
                          name='ReqDate'
                          defaultValue={formatDate(formData.ReqDate || '')}
                          onChange={handleChange}
                          className='w-full h-8 px-2 border rounded-md'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm text-black  font-medium'>Remarks</label>
                      <input
                        name='StrRemark'
                        value={formData.StrRemark}
                        onChange={handleChange}
                        autoComplete='off'
                        className='w-full h-8 px-2 border rounded-md'
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
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

export default AddIndentModal
