'use client'
import React, {useCallback, useEffect, useState } from 'react'
import {  Dispatch, SetStateAction } from 'react'
import { ImCross } from 'react-icons/im'
import { PoDetailInterface, POInterface, StrucIndent } from './PurchaseOrder_Entry_modal'
import ItemNameHelpComponent from '@/components/HelpBox/itemhelp'
import ItemMakeHelpComponent from '@/components/HelpBox/itemmakehelp'
import UnitHelpComponent from '@/components/HelpBox/UnitHelp'
import { toast } from 'react-toastify'
import type { clsDMSSordOH } from '../saleOrderEntry/SaleOrder_Entry_modal'
import LineOHComp from '@/components/LineOHComp/LineOHComp'
import { GetPOtaxes } from '@/components/Functions/SaleOrder/AddEditModal'
import { useParams } from '@/context/paramcontext'

interface Props {
  isAddModalActive?: boolean
  toggleAddModal?: () => void
  onFormSubmit?: (formData: PoDetailInterface) => void
  isEditModalActive?: boolean
  toggleEditModal?: () => void
  editItem?: PoDetailInterface | null
  PO: POInterface[]
  setPO: Dispatch<SetStateAction<POInterface[]>>
  PODet: PoDetailInterface[]
  setPODet: Dispatch<SetStateAction<PoDetailInterface[]>>
  editIndex: number | null
  ohList: clsDMSSordOH[]
  setOHList: Dispatch<SetStateAction<clsDMSSordOH[]>>
  fetchOHLineData: () => Promise<void>
}

type HandleModalSubmitProps = {
  e: React.FormEvent
  formData: PoDetailInterface
  setFormData: Dispatch<SetStateAction<PoDetailInterface>>
  onFormSubmit?: (data: PoDetailInterface) => void
  toggleAddModal?: () => void
  toggleEditModal?: () => void
  handleReset: () => void
}

const AddPOModal = ({
  isAddModalActive,
  toggleAddModal,
  isEditModalActive,
  toggleEditModal,
  editItem,
  editIndex,
  onFormSubmit,
  PO,
  setPO,
  PODet,
  setPODet,
  ohList,
  setOHList,
  fetchOHLineData
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

  const initialFormData: PoDetailInterface = {
    RowID: '',
    strDocId: '',
    strV_Type: '',
    intRecId: 0,
    intV_SNo: 0,
    strV_Date: '',
    strItemCode: '',
    strManualCode: '',
    strMake: '',
    dblQtySKU: 0,
    dblOrdQty: 0,
    dblTL_ShortageQty: 0,
    dblTL_ExcessQty: 0,
    strUnit: '',
    strSKU: '',
    dblRate: 0,
    dblAmount: 0,
    strReqDate: '',
    strRemark: '',
    dblDisc: 0,
    dblExciseAmt: 0,
    dblCessAmt: 0,
    dblEduCessAmt: 0,
    dblSHCessAmt: 0,
    dblTaxAmt: 0,
    blnClosed: false,
    strSite_Code: '',
    dblDiscAmt: 0,
    dblIGST_Per: 0,
    dblIGSTAmt: 0,
    dblUGST_Per: 0,
    dblUGSTAmt: 0,
    dblCGST_Per: 0,
    dblCGSTAmt: 0,
    dblSGST_Per: 0,
    dblSGSTAmt: 0,
    dblAdditionAmt: 0,
    dblPackFwdAmt: 0,
    dblDiscPer: 0,
    dblPackFwdPer: 0,
    dblFreightPer: 0,
    dblFreight: 0,
    dblInsurance: 0,
    dblInsuPer: 0,
    dblServiceValue: 0,
    dblTaxableValue: 0,
    dblCessPer: 0,
    dblItemNetValue: 0,
    dblItemValue: 0,
    dblAdditionPer: 0,
    strGoodsServices: '',
    strItemDesc: '',
    strCloseRemark: '',
    strPIDocId: '',
    intPIV_SNo: 0,
    dblFcRate: 0,
    dblPIQty: 0,
    dblExchangeRate: 0,
    dblFCAmount: 0,
    strLocalCurrency: '',
    strForeignCurrency: ''

    // // Related arrays can be initialized as empty arrays if needed
    // clsItemOH: [],
    // StructParameter: [],
    // clsIndent: [],
    // clsQcNew: [],
    // clsTolerance: []
  }

  const [formData, setFormData] = useState<PoDetailInterface>(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessagevalidate, setModalMessagevalidate] = React.useState('')
  const { Site_Code, companyid, bu } = useParams()

  type poKeys = keyof PoDetailInterface

  const requiredFields: { key: poKeys; label: string }[] = [
    { key: 'strItemCode', label: 'Item Name' },
    { key: 'dblOrdQty', label: 'Order Qty' },
    { key: 'strReqDate', label: 'Req Date' },
    { key: 'dblRate', label: 'Rate' } // 👈 Added Rate
  ]

  const validatePO = (indent: PoDetailInterface): boolean => {
    for (const field of requiredFields) {
      const value = indent[field.key]

      // General empty check
      if (value === null || value === undefined || value.toString().trim() === '') {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }

      // Check for zero quantity
      if (field.key === 'dblOrdQty' && Number(value) === 0) {
        setModalMessagevalidate(`${field.label} must be greater than 0.`)
        setIsModalvalidate(true)
        return false
      }

      // Check for zero or negative rate
      if (field.key === 'dblRate' && Number(value) <= 0) {
        setModalMessagevalidate(`${field.label} must be greater than 0.`)
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

    if (!validatePO(formData)) return

    const PODateStr = PO[0]?.strV_Date ?? new Date().toISOString().split('T')[0]
    const reqDateStr = formData.strReqDate

    if (!reqDateStr || !PODateStr) {
      setModalMessage('Both Req. Date and Indent Date are required.')
      setIsModalOpen(true)
      return
    }

    const reqDate = new Date(reqDateStr)
    const poDate = new Date(PODateStr)

    if (reqDate < poDate) {
      setModalMessage('Req. Date can not less than Indent Date.')
      setIsModalOpen(true)
      return
    }

    if (
      formData &&
      typeof formData.dblQtySKU === 'number' &&
      formData.dblQtySKU > 0 &&
      formData.strSKU === formData.strUnit &&
      formData.dblQtySKU !== formData.dblOrdQty
    ) {
      setModalMessage('SKU Unit and Order Unit are the same, so Order Qty and SKU Qty should be the same.')
      setIsModalOpen(true)
      return
    }

    if (onFormSubmit) {
      onFormSubmit(formData)
    }

    if (toggleAddModal) {
      toggleAddModal() // Close Add Modal
    }
    if (toggleEditModal) {
      toggleEditModal() // Close Edit Modal
    }

    handleReset() // Reset form after submission
  }

  const handleSubmit = (e: React.FormEvent) => {
    let isDuplicate = false

    if (isAddModalActive) {
      isDuplicate = PODet.some(item => item.strItemCode === formData.strItemCode)
    } else if (isEditModalActive) {
      isDuplicate = PODet.some((item, index) => index !== editIndex && item.strItemCode === formData.strItemCode)
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

    const finalFormData = {
      ...formData,
      clsItemOH: ohList // Inject updated OH data here
    }

    handleModalSubmit({
      e,
      formData: finalFormData,
      setFormData,
      onFormSubmit,
      toggleAddModal,
      toggleEditModal,
      handleReset
    })
  }

  useEffect(() => {
    console.log('edititem', editItem)
  }, [editItem])

  const handleReset = () => {
    setFormData(initialFormData)
  }

  const handleChange = useCallback(
    async (eventOrKey: any, value?: any) => {
      let key: string
      let updatedValue: any

      if (typeof eventOrKey === 'object' && eventOrKey?.target) {
        const { name, value: inputValue } = eventOrKey.target
        key = name
        updatedValue = ['dblOrdQty', 'dblRate', 'dblAmount', 'dblAdditionAmt'].includes(key)
          ? parseFloat(inputValue) || 0
          : inputValue
      } else if (typeof eventOrKey === 'string') {
        key = eventOrKey
        updatedValue = ['dblOrdQty', 'dblRate', 'dblAmount', 'dblAdditionAmt'].includes(key)
          ? parseFloat(value) || 0
          : value
      } else {
        return
      }

      setFormData(prev => {
        const newFormData = {
          ...prev,
          [key]: updatedValue
        }

        // ✅ Recalculate amount if qty & rate exist
        const qty = parseFloat(String(newFormData.dblOrdQty)) || parseFloat(String(newFormData.dblPIQty))
        const rate = parseFloat(String(newFormData.dblRate)) || 0
        newFormData.dblAmount = qty * rate

        // ✅ Recalculate net value
        const amount = parseFloat(String(newFormData.dblAmount)) || 0
        const addition = parseFloat(String(newFormData.dblAdditionAmt)) || 0
        newFormData.dblItemNetValue = amount + addition

        return newFormData
      })
    },
    [setFormData]
  )

  const handleItemSelect = async (item: any) => {
    if (item?.Code) {
      setFormData(prev => ({
        ...prev,
        strManualCode: item.ManualCode,
        strSKU: item.SKU,
        strUnit: item.SKU,
        strUnitName: item.SKU,
        LRate: item.LRate
      }))

      // ✅ Call Gettaxes after setting item details
      await GetPOtaxes(
        Site_Code as string, // from useParams or context
        companyid as string, // from useParams or context
        item.Code, // selected item code
        PO[0].strAgtForm || '', // ensure formCode is available in your formData
        bu as string, // from useParams or context
        setFormData // updater function
      )
    } else {
      setFormData(prev => ({
        ...prev,
        strManualCode: '',
        strSKU: '',
        strUnit: '',
        strUnitName: '',
        LRate: 0,
        dblCGST_Per: 0,
        dblSGST_Per: 0,
        dblIGST_Per: 0
      }))
    }
  }

  useEffect(() => {
    const noPOIndent = !PO?.[0]?.strIndDocId
    const noFormIndent = !formData?.clsIndent?.some((indent: StrucIndent) => indent?.StrIndDocId?.trim() !== '')
    if (noPOIndent || noFormIndent) {
      if (formData?.strItemCode) {
        GetPOtaxes(
          Site_Code as string,
          companyid as string,
          formData.strItemCode,
          PO?.[0]?.strAgtForm || '',
          bu as string,
          setFormData
        )
      } else {
        console.log('formData.strItemCode missing')
      }
    } else {
      console.log('Condition failed')
    }
  }, [PO, formData?.strItemCode, Site_Code, companyid, bu])

  const handleUpdate = React.useCallback((updatedList: clsDMSSordOH[]) => {
    setOHList(updatedList)
  }, [])

  return (
    <>
      {(isAddModalActive || isEditModalActive) && (
        <div className='fixed inset-0 z-[99] overflow-y-auto md:overflow-y-hidden '>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0  '>
            <div className='  inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-28'>
              {/* Header */}
              <div className='flex justify-center bg-blue-400 rounded-lg p-2 '>
                <div className='text-xl font-bold text-center text-white'>
                  {isEditModalActive ? 'Edit Purchase Order Details' : 'Add Purchase Order Details'}
                </div>
                <button
                  onClick={() => {
                    if (toggleAddModal) toggleAddModal()
                    if (toggleEditModal) toggleEditModal()
                    handleReset()
                  }}
                  className='absolute top-4 right-4 text-blue-950 hover:text-black-700 focus:outline-none'
                >
                  <ImCross size={18} />
                </button>
              </div>

              {/* Body */}
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  dark:border-strokedark dark:bg-boxdark '>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2  max-w-3xl mx-auto over overflow-x-auto'>
                  {/* Left Section */}
                  <div className='space-y-2'>
                    <ItemNameHelpComponent
                      filters={formData}
                      handleChange={handleChange}
                      filterKey='strItemCode'
                      nameKey='strItemDesc'
                      isMulti={false}
                      label={
                        <>
                          Item Name <span className='text-red-500'>*</span>
                        </>
                      }
                      onItemSelect={handleItemSelect}
                    />

                    {/* Code & Make */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>Code</label>
                        <input
                          type='text'
                          value={formData.strManualCode}
                          disabled
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                        />
                      </div>
                      <div className='w-full'>
                        <ItemMakeHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='strMake'
                          nameKey='strMakeName'
                          isMulti={false}
                          label='Make'
                        />
                      </div>
                    </div>

                    {/* SKU Qty & SKU */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>SKU Qty.</label>
                        <input
                          type='number'
                          name='dblQtySKU'
                          value={formData.dblQtySKU || formData.dblPIQty}
                          onChange={handleChange}
                          disabled
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                        />
                      </div>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>SKU</label>
                        <input
                          type='text'
                          name='strSKU'
                          value={formData.strSKU}
                          onChange={handleChange}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                          disabled
                        />
                      </div>
                    </div>

                    {/* Ord Qty & Unit */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>
                          Ord. Qty. <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='number'
                          name='dblOrdQty'
                          value={formData.dblOrdQty || formData.dblPIQty}
                          onFocus={e => e.target.select()}
                          onChange={handleChange}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                        />
                      </div>
                      <div className='w-full'>
                        <UnitHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='strUnit'
                          nameKey='strUnitName'
                          isMulti={false}
                          label='Unit'
                        />
                      </div>
                    </div>

                    {/* Rate & Amount */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>
                          Rate <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='number'
                          name='dblRate'
                          value={formData.dblRate ?? ''}
                          onFocus={e => e.target.select()}
                          onChange={handleChange}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                        />
                      </div>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>Amount</label>
                        <input
                          readOnly
                          type='number'
                          name='dblAmount'
                          value={formData.dblAmount ?? ''}
                          onChange={handleChange}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                        />
                      </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4'>
                      <div className='w-full'>
                        <label className='block text-sm font-medium text-black mb-1'>Remarks</label>
                        <input
                          type='text'
                          name='strRemark'
                          value={formData.strRemark}
                          onChange={handleChange}
                          autoComplete='off'
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className='space-y-2'>
                    {/* Remarks */}

                    {/* Req Date */}
                    <div>
                      <label className='block text-sm font-medium text-black mb-1'>
                        Req. Date <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='date'
                        name='strReqDate'
                        value={formatDate(formData.strReqDate || '')}
                        onChange={handleChange}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition'
                      />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <LineOHComp
                        ohList={isEditModalActive ? formData.clsItemOH || ohList : ohList}
                        onUpdate={handleUpdate}
                        grossamount={formData.dblAmount ?? 0}
                        Qty={formData.dblOrdQty ?? 0}
                        igstper={formData.dblIGST_Per ?? 0}
                        cgstper={formData.dblCGST_Per ?? 0}
                        sgstper={formData.dblSGST_Per ?? 0}
                        rate={formData.dblRate ?? 0}
                      />
                    </div>

                    {/* Submit & Reload Buttons */}
                    <div className='grid grid-cols-2 gap-4 mt-6' style={{ marginTop: 20 }}>
                      <button
                        onClick={handleSubmit}
                        className='w-full py-2 px-4 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md'
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleReset}
                        className='w-full py-2 px-4 rounded-md text-white font-semibold bg-gray-500 hover:bg-gray-600 transition-all duration-200 shadow-md'
                      >
                        Reload
                      </button>
                    </div>
                  </div>
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
            <h2 className='text-sm font-semibold text-gray-800 text-center mb-7'>{modalMessage}</h2>
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

export default AddPOModal
