'use client'
import React, { useCallback, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { ImCross } from 'react-icons/im'
import ItemNameHelpComponent from '../../../components/HelpBox/itemhelp'
import CostCenterHelpComponent from '../../../components/HelpBox/costcenterhelp'
import ItemMakeHelpComponent from '../../../components/HelpBox/itemmakehelp'
import { FAutoGodown, getBalance } from './stockissueEntry_action'
import { toast } from 'react-toastify'
import { useParams } from '@/context/paramcontext'
import type { Godown, StockissueInterfaceDetail, StockISUHeaderInterface } from './stockissueEntry_modal'
import TextBoxOne from '@/components/TextBoxOne'
import GodownHelpComponent from '@/components/HelpBox/godownhelp'
import DepartmentHelpComponent from '@/components/HelpBox/Depthelp'
import IssuedForHelpComponent from '@/components/HelpBox/issueforhelp'
import IssuedTypeHelpComponent from '@/components/HelpBox/issuetypehelp'
import { GetPurchaseAcAndConsumptionAc } from '@/app/action/filteraction'
import LotNoHelpComponent from '@/components/HelpBox/lotnohelp'

interface Props {
  isAddModalActive?: boolean
  toggleAddModal?: () => void
  onFormSubmit?: (formData: StockissueInterfaceDetail) => void
  isEditModalActive?: boolean
  toggleEditModal?: () => void
  editItem?: StockissueInterfaceDetail | null
  stkIsu: StockISUHeaderInterface[]
  setStkIsu: Dispatch<SetStateAction<StockISUHeaderInterface[]>>
  stkIsuDet: StockissueInterfaceDetail[]
  setStkIsuDet: Dispatch<SetStateAction<StockissueInterfaceDetail[]>>
  editIndex: number | null
}

type HandleModalSubmitProps = {
  e: React.FormEvent
  formData: StockissueInterfaceDetail
  setFormData: Dispatch<SetStateAction<StockissueInterfaceDetail>>
  stkIsu: StockISUHeaderInterface[]
  setStkIsu: Dispatch<SetStateAction<StockISUHeaderInterface[]>>
  onFormSubmit?: (data: StockissueInterfaceDetail) => void
  toggleAddModal?: () => void
  toggleEditModal?: () => void
  handleReset: () => void
}

const AddStockIssueModal = ({
  isAddModalActive,
  toggleAddModal,
  isEditModalActive,
  toggleEditModal,
  editItem,
  editIndex,
  onFormSubmit,
  stkIsu,
  setStkIsu,
  stkIsuDet,
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

  const initialFormData: StockissueInterfaceDetail = {
    strDocId: '',
    strV_Sno: '',
    strManualCode: '',
    strItemCode: '',
    strMakeCode: '',
    strMakeName: '',
    dblIssueQty: 0,
    dblReqQty: 0,
    dblRate: 0,
    StrItemDesc: '',
    StrLotNo: '',
    StrCostCenterDocID: '',
    StrCostCenterName: '',
    StrReqDocId: '',
    StrReqNo: '',
    StrGodownCode: '',
    StrGodownName: '',
    StrRemark: '',
    StrDepartmentCode: '',
    StrUnit: '',
    StrDepartmentName: '',
    DblLandedValue: 0,
    StrIssuedFor: '',
    StrIssuedName: '',
    StrIssuedType: '',
    StrIssuedTypeName: '',
    StrPurchaseAccount: '',
    StrPurchaseAccountName: '',
    StrConsumptionAccount: '',
    StrConsumptionAccountName: '',
    StrCurrentStock: 0
  }

  const [submittedData, setSubmittedData] = useState<StockissueInterfaceDetail[]>([])
  const [formData, setFormData] = useState<StockissueInterfaceDetail>(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isModalvalidate, setIsModalvalidate] = React.useState(false)
  const [modalMessagevalidate, setModalMessagevalidate] = React.useState('')
  const { Site_Code, companyid, bu } = useParams()

  type StockKeys = keyof StockissueInterfaceDetail

  const requiredFields: { key: StockKeys; label: string }[] = [
    { key: 'strItemCode', label: 'Item Name' },
    { key: 'dblIssueQty', label: 'Issue Qty' },
    { key: 'StrIssuedFor', label: 'Issued For' },
    { key: 'StrIssuedType', label: 'Issued Type' }
  ]

  const validateStock = (stock: StockissueInterfaceDetail): boolean => {
    for (const field of requiredFields) {
      const value = stock[field.key]

      // Check for missing or empty value
      if (value === null || value === undefined || value.toString().trim() === '') {
        setModalMessagevalidate(`${field.label} is a required field.`)
        setIsModalvalidate(true)
        return false
      }

      // // Special validation for IndQty: should not be 0
      if (field.key === 'dblIssueQty' && Number(value) === 0) {
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


  const handleModalSubmit = ({
    e,
    formData,
    onFormSubmit,
    toggleAddModal,
    toggleEditModal,
    handleReset
  }: HandleModalSubmitProps) => {
    e.preventDefault()

    if (!validateStock(formData)) return

    // ✅ Inject currentStock into formData
    const finalFormData = {
      ...formData
    }

    if (onFormSubmit) {
      onFormSubmit(finalFormData)
    }

    toggleAddModal?.()
    toggleEditModal?.()
    handleReset()
  }

  const handleSubmit = (e: React.FormEvent) => {
    let isDuplicate = false

    if (isAddModalActive) {
      isDuplicate = stkIsuDet.some(item => item.strItemCode === formData.strItemCode)
    } else if (isEditModalActive) {
      isDuplicate = stkIsuDet.some((item, index) => index !== editIndex && item.strItemCode === formData.strItemCode)
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
      stkIsu,
      setStkIsu,
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

  const handleChange = useCallback((eventOrKey: any, value?: any) => {
    let key: string
    let updatedValue: any

    if (eventOrKey?.target) {
      const { name, value: inputValue } = eventOrKey.target
      key = name
      updatedValue = inputValue
    } else if (typeof eventOrKey === 'string') {
      key = eventOrKey
      updatedValue = value
    } else {
      return
    }

    setFormData(prev => ({
      ...prev,
      [key]: updatedValue
    }))
  }, [])

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await getBalance(formData.strItemCode, Site_Code as string, companyid as string, bu as string)

        const balance = res?.data?.[0]?.DblBalanceStock ?? 0
        setFormData(prev => ({
          ...prev,
          StrCurrentStock: balance
        }))
      } catch (err) {
        console.error('Failed to fetch stock balance:', err)
      }
    }

    fetchBalance()
  }, [formData.strItemCode])

  const GetGodown = async (): Promise<void> => {
    try {
      const res = (await FAutoGodown(
        stkIsu[0]?.StrLocationCode,
        Site_Code as string,
        companyid as string,
        bu as string
      )) as Godown[] | null

      if (res && res.length > 0) {
        setFormData(prev => ({
          ...prev,
          StrGodownCode: res[0].GodCode,
          StrGodownName: res[0].GodName
        }))
      }

      // function ends cleanly with no return needed
    } catch (err) {
      console.error('Failed to fetch godown:', err)
    }
  }

  useEffect(() => {
    const fetchACData = async () => {
      try {
        const data = await GetPurchaseAcAndConsumptionAc(
          Site_Code as string,
          companyid as string,
          bu as string,
          !formData.strDocId ? 'Add' : 'Edit',
          formData.StrCostCenterDocID
        )

        if (data && data.length > 0) {
          const acdata = data[0]
          console.log('Raw AC Data:', acdata)

          const mappedData = {
            StrPurchaseAccount: acdata.PurchaseAccount,
            StrPurchaseAccountName: acdata.PurchaseAccountName,
            StrConsumptionAccount: acdata.ConsumptionAccount,
            StrConsumptionAccountName: acdata.ConsumptionAccountName
          }

          console.log('Mapped AC Data:', mappedData)

          // Update state here
          setFormData(prev => ({
            ...prev,
            ...mappedData
          }))
        }
      } catch (err) {
        console.error('Failed to fetch stock balance:', err)
      }
    }

    fetchACData()
  }, [formData.StrCostCenterDocID])

  const handleItemSelect = async (item: any) => {
    if (item?.Code) {
      setFormData(prev => ({
        ...prev,
        strManualCode: item.ManualCode,
        StrUnit: item.SKU,

        // 🟩 Default Issue For if empty
        StrIssuedFor: prev.StrIssuedFor && prev.StrIssuedFor.trim() !== '' ? prev.StrIssuedFor : 'P',
        StrIssuedName:
          prev.StrIssuedName && prev.StrIssuedName.trim() !== '' ? prev.StrIssuedName : 'Production (Input)',

        // 🟩 Default Issue Type if empty
        StrIssuedType: prev.StrIssuedType && prev.StrIssuedType.trim() !== '' ? prev.StrIssuedType : 'M',
        StrIssuedTypeName:
          prev.StrIssuedTypeName && prev.StrIssuedTypeName.trim() !== '' ? prev.StrIssuedTypeName : 'Manufacturer'
      }))
      await GetGodown()
    } else {
      // Dropdown cleared
      setFormData(prev => ({
        ...prev,
        strManualCode: '',
        StrUnit: '',

        // Reset default values when no item selected
        StrIssuedFor: 'P',
        StrIssuedName: 'Production (Input)',
        StrIssuedType: 'M',
        StrIssuedTypeName: 'Manufacturer'
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
              className='inline-block align-bottom b g-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-16'
              style={{ marginTop: '120px' }}
            >
              {/* Modal Header */}
              <div className='bg-blue-500 rounded-t-lg py-3 px-6 text-white text-center text-xl font-bold'>
                {isEditModalActive ? 'Edit Stock Issue Details' : 'Add Stock Issue Details'}
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
              <div className='p-6 bg-white dark:bg-boxdark rounded-md shadow-md max-w-4xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* Left Column */}
                  <div className='space-y-4'>
                    {/* Item Name */}
                    <div>
                      <TextBoxOne
                        label='Req.No.'
                        name='StrRecId'
                        value={formData.StrReqNo}
                        disabled
                        required={!!formData.StrReqDocId}
                      />
                    </div>

                    <div className='relative z-50'>
                      <ItemNameHelpComponent
                        filters={formData}
                        handleChange={handleChange}
                        filterKey='strItemCode'
                        nameKey='StrItemDesc'
                        isMulti={false}
                        label={
                          <>
                            Item Name <span className='text-red-500'>*</span>
                          </>
                        }
                        onItemSelect={handleItemSelect}
                      />
                    </div>

                    {/* Manual Code + Make */}
                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <label className='block text-sm font-medium text-black'>Item Manual Code</label>
                        <input
                          type='text'
                          value={formData.strManualCode}
                          disabled
                          className='w-full h-9 px-2 border rounded-md bg-gray-50'
                        />
                      </div>

                      <div className='w-1/2 relative z-40'>
                        <ItemMakeHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='strMakeCode'
                          nameKey='strMakeName'
                          isMulti={false}
                          label='Make'
                        />
                      </div>
                    </div>

                    {/* Req Qty + Unit */}
                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <TextBoxOne type='number' label='Req Qty.' value={formData.dblReqQty} disabled />
                      </div>

                      <div className='w-1/2'>
                        <TextBoxOne
                          label='Unit'
                          name='StrUnit'
                          value={formData.StrUnit}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                    </div>

                    {/* Lot No + Godown */}
                    <div className='flex gap-4'>
                      <div className={!formData.strDocId ? 'w-1/2' : 'w-full'}>
                        <LotNoHelpComponent
                          filters={formData}
                          filterKey='StrLotNo'
                          nameKey='StrLotNo'
                          handleChange={handleChange}
                          label='Lot No'
                          isMulti={false}
                          StrMode={!formData.strDocId ? 'Add' : 'Edit'}
                          StrEntryDate={stkIsu[0]?.StrV_Date || new Date().toISOString().split('T')[0]}
                          StrItemCode={formData.strItemCode}
                          StrGodownCode={formData.StrGodownCode}
                          BlnAllowNegativeYN='Y'
                        />
                      </div>

                      {!formData.strDocId && (
                        <div className='w-1/2'>
                          <TextBoxOne label='Stock' value={formData.StrCurrentStock} disabled />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className='space-y-4'>
                    {/* Stock + Issue Qty */}
                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <GodownHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='StrGodownCode'
                          nameKey='StrGodownName'
                          label={<>Godown</>}
                        />
                      </div>

                      <div className='w-1/2'>
                        <TextBoxOne
                          type='number'
                          label='Issue Qty.'
                          name='dblIssueQty'
                          value={formData.dblIssueQty}
                          onChange={handleChange}
                          selectOnFocus={true}
                          required
                        />
                      </div>
                    </div>

                    {/* Cost Center */}
                    <div>
                      <CostCenterHelpComponent
                        filters={formData}
                        handleChange={handleChange}
                        filterKey='StrCostCenterDocID'
                        nameKey='StrCostCenterName'
                        isMulti={false}
                        label='Cost Center'
                      />
                    </div>

                    {/* Department + Remarks */}
                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <DepartmentHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='StrDepartmentCode'
                          nameKey='StrDepartmentName'
                          isMulti={false}
                          label={<>Department</>}
                        />
                      </div>

                      <div className='w-1/2'>
                        <TextBoxOne
                          label='Remarks'
                          name='StrRemark'
                          value={formData.StrRemark}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <IssuedForHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='StrIssuedFor'
                          nameKey='StrIssuedName'
                          isMulti={false}
                          label={
                            <>
                              Issue For <span className='text-red-500'>*</span>
                            </>
                          }
                          StrMode={!formData.strDocId ? 'Add' : 'Edit'} // or your logic
                          StrCurrentDocID={formData.strDocId}
                        />
                      </div>

                      <div className='w-1/2'>
                        <IssuedTypeHelpComponent
                          filters={formData}
                          handleChange={handleChange}
                          filterKey='StrIssuedType'
                          nameKey='StrIssuedTypeName'
                          isMulti={false}
                          StrIssuedFor={formData.StrIssuedFor} // <-- pass the selected "Issued For"
                          label={
                            <>
                              Issue Type <span className='text-red-500'>*</span>
                            </>
                          }
                        />
                      </div>
                    </div>

                    <div className='flex gap-4'>
                      <div className='w-1/2'>
                        <TextBoxOne
                          label='StrPurchaseAccount'
                          name='StrPurchaseAccount'
                          value={formData.StrPurchaseAccountName}
                          disabled
                        />
                      </div>

                      <div className='w-1/2'>
                        <TextBoxOne
                          label='Consumption Account'
                          name='StrConsumptionAccount'
                          value={formData.StrConsumptionAccountName}
                          onChange={handleChange}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className='mt-6 flex justify-end gap-4'>
                  <button
                    onClick={handleSubmit}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold'
                  >
                    Submit
                  </button>

                  <button
                    onClick={handleReset}
                    className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold'
                  >
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

export default AddStockIssueModal
