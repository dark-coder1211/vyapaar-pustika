'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { ImCross } from 'react-icons/im'
import { toast } from 'react-toastify'
import TextBoxOne from '@/components/TextBox/TextBoxOne'
import type { GateEntryDetailInterface, GateEntryInterface } from './GateEntry_modal'

interface Props {
  isAddModalActive?: boolean
  toggleAddModal?: () => void
  onFormSubmit?: (formData: GateEntryDetailInterface) => void
  isEditModalActive?: boolean
  toggleEditModal?: () => void
  editItem?: GateEntryDetailInterface | null
  Indent: GateEntryInterface
  setIndent: Dispatch<SetStateAction<GateEntryInterface>>
  IndentDet: GateEntryDetailInterface[]
  setIndentDet: Dispatch<SetStateAction<GateEntryDetailInterface[]>>
  editIndex: number | null
}

type HandleModalSubmitProps = {
  e: React.FormEvent
  formData: GateEntryDetailInterface
  setFormData: Dispatch<SetStateAction<GateEntryDetailInterface>>
  Indent: GateEntryInterface
  setIndent: Dispatch<SetStateAction<GateEntryInterface>>
  onFormSubmit?: (data: GateEntryDetailInterface) => void
  toggleAddModal?: () => void
  toggleEditModal?: () => void
  handleReset: () => void
}

const AddGateEntryModal = ({
  isAddModalActive,
  toggleAddModal,
  isEditModalActive,
  toggleEditModal,
  editItem,
  editIndex,
  onFormSubmit,
  Indent,
  setIndent,
}: Props) => {

  // const formatDate = (date: string | Date): string => {
  //   // Convert to Date object if it's a string
  //   const d = new Date(date)

  //   // Check if the date is valid
  //   if (isNaN(d.getTime())) {
  //     return '' // Return empty string if the date is invalid
  //   }

  //   const year = d.getFullYear()
  //   const month = (d.getMonth() + 1).toString().padStart(2, '0')
  //   const day = d.getDate().toString().padStart(2, '0')

  //   return `${year}-${month}-${day}`
  // }

  const initialFormData: GateEntryDetailInterface = {
    // strDocId: '',
    strItemDesc: '',
    dblQty: 0,
    StrRemark: ''
  }
  const [submittedData, setSubmittedData] = useState<GateEntryDetailInterface[]>([])
  const [formData, setFormData] = useState<GateEntryDetailInterface>(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessagevalidate, setModalMessagevalidate] = React.useState('')
  type IndentKeys = keyof GateEntryDetailInterface

  const requiredFields: { key: IndentKeys; label: string }[] = [
    { key: 'strItemDesc', label: 'Item Description' },
    { key: 'dblQty', label: 'Quantity' },
    { key: 'StrRemark', label: 'Remark' }
  ]

  const validateIndent = (indent: GateEntryDetailInterface): boolean => {
    for (const field of requiredFields) {
      const value = indent[field.key]

      // Check for missing or empty value
      if (value === null || value === undefined || value.toString().trim() === '') {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }

      // Special validation for IndQty: should not be 0
      if (field.key === 'dblQty' && Number(value) === 0) {
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
  }, [editItem])

  // const checkForDuplicate = (newData: EditIndentInterfaceDetail, formDataArray: EditIndentInterfaceDetail[]) => {
  //   return formDataArray.some(
  //     (item, index) =>
  //       index !== editIndex && // Skip comparing with the selected index
  //       item.StrItemName === newData.StrItemName
  //   )
  // }

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

    
    const finalFormData = {
      ...formData,
    }

    if (onFormSubmit) {
      onFormSubmit(finalFormData)
    }

    toggleAddModal?.()
    toggleEditModal?.()
    handleReset()
  }

  const handleSubmit = (e: React.FormEvent) => {
    const isDuplicate = false

    // if (isAddModalActive) {
    //   isDuplicate = IndentDet.some(item => item.StrItemcode === formData.StrItemcode)
    // } else if (isEditModalActive) {
    //   isDuplicate = IndentDet.some((item, index) => index !== editIndex && item.StrItemcode === formData.StrItemcode)
    // }

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
      
    },
    [setFormData] // ✅ Add all state setters to dependencies
  )

  // const handleItemSelect = (item: any) => {
  //   if (item?.Code) {
  //     setFormData(prev => ({
  //       ...prev,
  //       StrICode: item.ManualCode, // ✅ Set ManualCode to formData
  //       MinStock: item.MinStock,
  //       MaxStock: item.maxStock,
  //       Reorder: item.Reorder,
  //       StrUnit: item.SKU
  //     }))
  //   } else {
  //     // ✅ Dropdown cleared
  //     setFormData(prev => ({
  //       ...prev,
  //       StrICode: '', // ✅ Set ManualCode to formData
  //       MinStock: 0,
  //       MaxStock: 0,
  //       Reorder: 0,
  //       StrUnit: ''
  //     }))
  //   }
  // }

  return (
    <>
      {(isAddModalActive || isEditModalActive) && (
        <div className='fixed inset-0 z-999 overflow-y-auto md:overflow-y-hidden '>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0  '>
            {/* Modal content */}
            <div
              className='inline-block w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 
             max-w-6xl align-bottom bg-white rounded-lg 
             text-left overflow-hidden shadow-xl transform 
             transition-all sm:my-8 sm:align-middle mt-16'
              style={{ marginTop: '120px' }}
            >
              {/* Modal Header */}
              <div className='bg-blue-500 rounded-t-lg py-3 px-6 text-white text-center text-xl font-bold'>
                {isEditModalActive ? 'Edit Gate Entry Details' : 'Add Gate Entry Details'}
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
                <div className='p-6 bg-white dark:bg-boxdark w-full max-w-5xl mx-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
                    {/* Left Column */}
                    <div className='space-y-4'>
                      <div className='relative z-50'>
                        <TextBoxOne
                          label='Item Description'
                          name='strItemDesc'
                          value={formData.strItemDesc ?? ''}
                          onChange={handleChange}
                          labelColor='red'
                        />
                      </div>
                      <div className='relative z-50'>
                        <TextBoxOne
                          label='Quantity'
                          name='dblQty'
                          value={formData.dblQty ?? 0}
                          onChange={handleChange}
                          type='number'
                          labelColor='red'
                        />
                      </div>
                      <div className='relative z-50'>
                        <TextBoxOne
                          label='Remarks'
                          name='StrRemark'
                          value={formData.StrRemark ?? ''}
                          onChange={handleChange}
                          labelColor='red'
                        />
                      </div>
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

export default AddGateEntryModal
