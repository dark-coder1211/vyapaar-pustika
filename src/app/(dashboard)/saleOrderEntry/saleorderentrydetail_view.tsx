'use client'
import type {
  DMSSordItemDetailUpdatePostData,
  PriceDetails,
  Props,
  SizeUnit,
  clsDMSSordOH,
  clsSaleOrderItemDetail,
  cosno
} from './SaleOrder_Entry_modal'
import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { useOrderState } from '@/components/states/useOrderState'
import {
  formatDate,
  handleModalSubmit,
  initialFormData,
  initialFormDataForSale
} from '@/components/Functions/SaleOrder/SaleOrder'
import {
  fetchBf,
  fetchGsm,
  fetchItemName,
  fetchPackingType,
  Gettaxes,
  handleBFChange,
  handleGsmChange,
  handleItemNameChange,
  handlePackingTypeChange,
  handlePackingTypeFocus,
  handleSizeUnitChange,
  handleSizeUnitFocus
} from '@components/Functions/SaleOrder/AddEditModal'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import FSizeConversionAction from '../../action/sizecon'
import { useParams } from '@/context/paramcontext'
import SaleOrderHelp from '@/components/SaleOrderComponents/SaleOrderHelp'
import cosonoDetailAction, { PriceListAction } from './SaleOrder_Entry_action'
import SaleOrderInput from '@/components/SaleOrderComponents/SaleOrderInput'
import LineOHComp from '@/components/LineOHComp/LineOHComp'

const SaleOrderEntryDetail = ({
  isAddModalActive,
  toggleAddModal,
  isEditModalActive,
  toggleEditModal,
  onFormSubmit,
  editItem,
  editIndex,
  ordertype,
  contractDocId,
  transTypeCat,
  cosono,
  setCosono,
  isPriceListApplicable,
  item,
  setItem,
  bf,
  setBf,
  gsm,
  setGsm,
  setIsSelect,
  detail,
  setDetail,
  header,
  setHeader,
  ohList,
  setOHList,
  fetchOHLineData
}: Props) => {
  const {
    sizeUnit,
    setsizeUnit,
    coSo,
    setCoSo,
    isFetchedSizeUnit,
    setisFetchedSizeUnit,
    selectedBF,
    setSelectedBF,
    selectedSizeUnit,
    setSelectedSizeUnit,
    isModalOpen,
    setIsModalOpen,
    packingtype,
    setPackingType,
    selectedItem,
    setselectedItem,
    selectedPackingType,
    setselectedPackingType,
    isFetchedPackingType,
    setisFetchedPackingType,
    isFetchedCoSnO,
    setIsFetchedCoSnO,
    formData,
    setFormData,
    docId,
    setdocId,
    currentDate,
    setCurrentDate,
    priceListData,
    setPriceListData,
    vsNo,
    setVsNo
  } = useOrderState()
  const [submittedData, setSubmittedData] = useState<clsSaleOrderItemDetail[]>([])
  const [cosnoError, setCosnoError] = useState<string>('')
  const [itemnameError, setItemnameError] = useState<string>('')
  const [packingtypeError, setPackingtypeError] = useState<string>('')
  const [bfError, setBfError] = useState<string>('')
  const [gsmError, setGsmError] = useState<string>('')
  const [sizeUnitError, setSizeUnitError] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [lengthError, setLengthError] = useState<string>('')
  const [grainError, setGrainError] = useState<string>('')
  const [reelPackError, setReelPackError] = useState<string>('')
  const [weightError, setWeightError] = useState<string>('')
  const [billingRateError, setBillingRateError] = useState<string>('')
  const [agreedRateError, setAgreedRateError] = useState<string>('')
  const [billagreederrorPopup, setBillagreederrorPopup] = useState(false)

  const [StrItemCode, setStrItemCode] = useState<string>('')
  const [StrBFCode, setStrBFCode] = useState<string>('')
  const [StrGSMCode, setStrGSMCode] = useState<string>('')
  const { Site_Code, companyid, bu, UserName } = useParams()

  const searchParams = useSearchParams()

  const secretKey = 'your-secret-key'

  // const decryptCookie = (cookieValue: string | undefined): string | null => {
  //   if (!cookieValue) return null

  //   try {
  //     const bytes = CryptoJS.AES.decrypt(cookieValue, secretKey)
  //     const decrypted = bytes.toString(CryptoJS.enc.Utf8)
  //     return decrypted || null
  //   } catch (err) {
  //     console.error('Error decrypting cookie:', err)
  //     return null
  //   }
  // }

  // useEffect(() => {
  //   const getDecryptedAndSet = (cookieName: string, setter: (val: string) => void, label: string) => {
  //     const value = Cookies.get(cookieName)
  //     const decrypted = decryptCookie(value)
  //     if (decrypted) {
  //       setter(decrypted)
  //     } else {
  //       console.warn(`No valid ${label.toLowerCase()} found in cookies.`)
  //     }
  //   }

  //   getDecryptedAndSet('LoginToken', setStrToken, 'LOGIN TOKEN')
  //   getDecryptedAndSet('PartyCode', setPartyCode, 'PartyCode')
  //   getDecryptedAndSet('distributorCode', setdistributorCode, 'distributorCode')
  //   getDecryptedAndSet('PartyDisplayName', setPartyDisplayName, 'PartyDisplayName')
  //   getDecryptedAndSet('DistributorDisplayName', setDistributorDisplayName, 'DistributorDisplayName')
  //   getDecryptedAndSet('DistributorName', setDistributorName, 'DistributorName')
  //   getDecryptedAndSet('NatureName', setNatureName, 'NatureName')
  // }, [])

  const fetchSizeUnit = async (
    bu: string,
    companyid: string,
    setsizeUnit: (data: SizeUnit[]) => void,
    username: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost/BSA/HelpBox/selectsizeunit_DMS?companyid=${companyid}&StrUserCode=${username}`
      )
      const data: SizeUnit = await response.json()
      if (data.success) {
        setsizeUnit([data])

        if (data.data.length == 1) {
          setFormData(prevFormData => ({
            ...prevFormData,
            // strsizeUnitName: data?.data[0]?.Unit || '',
            StrSizeUnit: data?.data[0]?.Code || ''
          }))
        }
      } else {
        // If there is an error, log the error message
        const errorMessage = data.error
        console.error('Error:', errorMessage)
        toast.error('Something Went Wrong', {
          position: 'top-center',
          autoClose: 10,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setsizeUnit([])
      }
    } catch (error) {
      console.error('Failed to fetch consignees:', error)
    }
  }

  useEffect(() => {
    const clientId = searchParams.get('clientId')
    if (clientId) {
      setdocId(clientId)
    }
    const Today = formatDate(new Date()) // Execute this when data is empty or null
    setCurrentDate(Today)
  }, [])

  useEffect(() => {
    if (editItem) {
      setFormData(editItem)
    }
  }, [editItem])

  useEffect(() => {
    const calculateGrossAmt = () => {
      const weight = formData.DblWeight || 0 // No need to parse
      const billingRate = formData.DblRate || 0 // No need to parse
      setBillingRateError('')
      setWeightError('')
      return weight > 0 && billingRate > 0 ? weight * billingRate : 0
    }

    const grossAmt = calculateGrossAmt()

    if (formData.DblAmount !== grossAmt) {
      setFormData(prevFormData => ({
        ...prevFormData,
        DblAmount: grossAmt // Convert grossAmt to string
      }))
    }
  }, [formData.DblWeight, formData.DblRate, formData.DblAmount, setFormData])

  // useEffect(() => {
  //   const calculateAdditionAmt = () => {
  //     const grossAmt = formData.DblAmount
  //     const additionRate = formData.dbloh_At_Addition || 0
  //     return grossAmt && grossAmt > 0 && additionRate > 0 ? (grossAmt * additionRate) / 100 : 0
  //   }

  //   const amount2 = calculateAdditionAmt()

  //   if (formData.DblAdditionAmt !== amount2) {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       dbloh_Amt_Addition: amount2
  //     }))
  //   }
  // }, [formData.DblAmount, formData.dbloh_At_Addition, formData.DblAdditionAmt, setFormData])

  // useEffect(() => {
  //   const calculateDiscountAmt = () => {
  //     const grossAmt = formData.DblAmount
  //     const discountRate = formData.dbloh_At_Discount || 0
  //     return grossAmt && discountRate && grossAmt > 0 && discountRate > 0 ? (grossAmt * discountRate) / 100 : 0
  //   }

  //   const discountAmount = calculateDiscountAmt()

  //   if (formData.DblDiscAmt !== discountAmount) {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       dbloh_Amt_Discount: discountAmount
  //     }))
  //   }
  // }, [formData.DblAmount, formData.dbloh_At_Discount, formData.DblDiscAmt, setFormData])

  useEffect(() => {
    const calculateItemNetValue = () => {
      const grossAmt = formData.DblAmount
      const additionAmount = formData.DblAdditionAmt || 0
      const discountAmount = formData.DblDiscAmt || 0
      const dblCGSTAmt = formData.DblCGSTAmt || 0
      const dblSGSTAmt = formData.DblSGSTAmt || 0
      const dblIGSTAmt = formData.DblIGSTAmt || 0
      return grossAmt && grossAmt > 0
        ? grossAmt + additionAmount - discountAmount + dblCGSTAmt + dblSGSTAmt + dblIGSTAmt
        : 0
    }

    const itemNetValue = calculateItemNetValue()

    if (formData.DblItemNetAmount !== itemNetValue) {
      setFormData(prevFormData => ({
        ...prevFormData,
        DblItemNetAmount: itemNetValue
      }))
    }
  }, [
    formData.DblAmount,
    formData.DblAdditionAmt,
    formData.DblDiscAmt,
    formData.DblItemNetAmount,
    formData.DblCGSTAmt,
    formData.DblSGSTAmt,
    formData.DblIGSTAmt,
    setFormData
  ])

  const calculateWeight = () => {
    const width = formData.DblWidth ?? 0
    const reelPack = formData.DblReel ?? 0
    const weight = width > 0 && reelPack > 0 ? width * (reelPack * 6) : 0
    const validWeight = isFinite(weight) && !isNaN(weight) ? weight : 0
    setReelPackError('') // Reset any errors
    setFormData(prevFormData => ({
      ...prevFormData,
      dblqty: Number(validWeight)
    }))
  }

  const calculatedReelPack = () => {
    const width = formData.DblWidth ?? 0
    const weight = formData.DblWeight ?? 0

    const reelPack = width > 0 && weight > 0 ? Math.floor(weight / (width * 6)) : 0
    setReelPackError('') // Reset any errors
    setFormData(prevFormData => ({
      ...prevFormData,
      dblreel: Number(reelPack)
    }))
  }

  const callUpdateAPI = async () => {
    const data = await FSizeConversionAction(
      Site_Code,
      companyid,
      formData.StrSizeUnit,
      formData.DblWeight,
      formData.DblReel,
      formData.StrGsm,
      formData.StrBf,
      formData.StrItemCode,
      formData.DblWidth,
      bu
    )

    if (data) {
      setFormData(prevFormData => ({
        ...prevFormData,
        DblWeight: data.Weight,
        DblReel: data.Reel
      }))
    }
  }

  const handleReelPackChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setReelPackError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newReelPack = event.target.value
    setFormData(prevFormData => ({
      ...prevFormData,
      DblReel: Number(newReelPack)
    }))
    setReelPackError('')
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = e.target.value
    setFormData(prevFormData => ({
      ...prevFormData,
      DblWeight: Number(newWeight)
    }))
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    console.log('current box name - ', name)
    console.log('Order Type', ordertype)
    console.log('TRUE OR FALSE - ', name === 'DblWidth' && ordertype === 'R')

    // Prepare new form data with the updated value, ensuring numeric conversion where necessary

    const newFormData = {
      ...formData,
      [name]: name === 'amount3' || name === 'grossAmt' ? parseFloat(value) || 0 : value
    }

    if (name === 'v_SNo') {
      const selectedIndex = event.target.selectedIndex - 1 // Since your default option can be "Select"
      setCoSo(selectedIndex + 1)
    }

    if (name === 'dbloh_Amt_AgreedRate') {
      setAgreedRateError('')
      const agreedRate = parseFloat(value) // Convert input value to number
      const billingRate = newFormData.DblRate ?? 0

      if (agreedRate > billingRate) {
        setBillagreederrorPopup(true)
      } else {
        setBillagreederrorPopup(false)
      }
    }

    if (name === 'dblrate') {
      setAgreedRateError('')
      const agreedRate = parseFloat(value) // Convert input value to number
      const billingRate = newFormData.DblRate ?? 0

      if (agreedRate > billingRate) {
        setBillagreederrorPopup(true)
      } else {
        setBillagreederrorPopup(false)
      }
    }

    // Automatically adjust 'Grain' based on 'Width' and 'Length'
    if ((name === 'DblWidth' || name === 'DblLength') && ordertype === 'S') {
      console.log(1)

      const width = newFormData.DblWidth
      const length = newFormData.DblLength

      // Check if both width and length are valid numbers (not null/undefined/empty string)
      if (width !== undefined && width !== null && length !== undefined && length !== null) {
        console.log(2)

        // Use numeric comparison after coercion to numbers
        const numericWidth = Number(width)
        const numericLength = Number(length)

        if (!isNaN(numericWidth) && !isNaN(numericLength)) {
          newFormData.StrGrain = numericWidth > numericLength ? 'S' : 'L'
          newFormData.StrGrainName = numericWidth > numericLength ? 'Short' : 'Long'
        }
      }

      setWidthError('')
      setLengthError('')
      setGrainError('')
    }

    // Check conditions specifically for amount3 and grossAmt inputs
    if (newFormData.DblDiscAmt !== undefined && newFormData.DblAmount !== undefined) {
      // Parse the values from the formData to ensure numeric comparison
      const amount3Numeric = newFormData.DblDiscAmt || 0
      const grossAmtNumeric = newFormData.DblAmount || 0

      // Check the conditions based on the requirements
      if (amount3Numeric === 0 && grossAmtNumeric === 0) {
        setIsModalOpen(false) // Keep the modal closed if both values are zero
      } else if (amount3Numeric > grossAmtNumeric) {
        setIsModalOpen(true) // Open the modal for the error message
        newFormData.DblDiscAmt = 0 // Set the discount amount to 0 on error
      } else {
        setIsModalOpen(false) // Any other case, keep the modal closed
      }
    }

    // Update state with the new (potentially modified) form data
    setFormData(newFormData)
  }

  useEffect(() => {
    // Try to fetch the input element. Ensure it's an HTMLInputElement for TypeScript.
    const input = document.getElementsByName('grossAmt')[0] as HTMLInputElement | null
    if (!input) return // Exit if the element was not found.

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      attributeFilter: ['value']
    }
    const callback = function (mutationsList: MutationRecord[]) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
          // Now that TypeScript knows 'input' is an HTMLInputElement, 'value' is recognized.
          const newValue = parseFloat(input.value) // Convert to number
          if (!isNaN(newValue) && newValue !== formData.DblAmount) {
            handleChange({ target: { name: 'grossAmt', value: newValue.toString() } })
          }
        }
      }
    }

    // Set up the MutationObserver with the callback and config.
    const observer = new MutationObserver(callback)
    observer.observe(input, config)

    // Ensure to clean up the observer to prevent memory leaks.
    return () => observer.disconnect()
  }, [formData.DblAmount, handleChange])

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    const validateField = (
      fieldValue: string | undefined | number | null,
      setError: React.Dispatch<React.SetStateAction<string>>,
      errorMessage: string
    ) => {
      if (!fieldValue) {
        setError(errorMessage)
        return false
      }
      setError('')
      return true
    }

    // Validate Contractual S.No only if Contract Sales Order is filled
    let isCosnoValid = true

    if (header?.StrContractSalesOrderDocID?.trim()) {
      isCosnoValid = validateField(formData.IntcontractSoV_Sno, setCosnoError, 'Please fill Contractual S.No')
      if (!isCosnoValid) {
        return // Stop execution if not valid
      }
    } else {
      setCosnoError('') // Clear error if not required
    }

    const isItemNameValid = validateField(formData.StrItemName, setItemnameError, 'Please fill item name')
    const isBfValueValid = validateField(formData.StrBFName, setBfError, 'Please fill bf')
    const isGsmValueValid = validateField(formData.StrGsmName, setGsmError, 'Please fill gsm')
    const isSizeUnitValid = validateField(formData.StrSizeUnit, setSizeUnitError, 'Please fill size unit')
    const isWidthValid = validateField(formData.DblWidth, setWidthError, 'Please fill width')

    let isLengthValid = true
    if (ordertype === 'S') {
      isLengthValid = validateField(formData.DblLength, setLengthError, 'Please fill length')
    }

    // const isGrainValid = validateField(formData.strgrainValue, setGrainError, "Please fill grain");
    const isReelValid = validateField(formData.DblReel, setReelPackError, 'Please fill reel/pack')
    const isWeightValid = validateField(formData.DblWeight, setWeightError, 'Please fill weight')
    const isBillingRateValid = validateField(formData.DblRate, setBillingRateError, 'Please fill billing rate')
    const isAgreedRateValid = validateField(formData.DblAgreedRate, setAgreedRateError, 'Please fill agreed rate')

    // If all validations pass, call handlePostSubmit
    if (
      isItemNameValid &&
      isBfValueValid &&
      isGsmValueValid &&
      isSizeUnitValid &&
      isWidthValid &&
      isLengthValid &&
      isReelValid &&
      isWeightValid &&
      isBillingRateValid &&
      isAgreedRateValid &&
      !billagreederrorPopup &&
      isCosnoValid
    ) {
      let isDuplicate = false

      if (isAddModalActive) {
        isDuplicate = detail.some(
          item =>
            item.StrItemName === formData.StrItemName &&
            item.StrBFName === formData.StrBFName &&
            item.StrGsmName === formData.StrGsmName &&
            item.StrSizeUnit === formData.StrSizeUnit &&
            Number(item.DblWidth) === Number(formData.DblWidth) &&
            Number(item.DblLength || 0) === Number(formData.DblLength || 0)
        )
      } else if (isEditModalActive) {
        isDuplicate = detail.some(
          (item, index) =>
            index !== editIndex &&
            item.StrItemName === formData.StrItemName &&
            item.StrBFName === formData.StrBFName &&
            item.StrGsmName === formData.StrGsmName &&
            item.StrSizeUnit === formData.StrSizeUnit &&
            Number(item.DblWidth) === Number(formData.DblWidth) &&
            Number(item.DblLength || 0) === Number(formData.DblLength || 0)
        )
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

      if (formData.DblRate === null || Number(formData.DblRate) === 0) {
        setBillingRateError('Billing rate cannot  cannot be zero or blank')
        return
      }

      if (formData.DblAgreedRate === null || Number(formData.DblAgreedRate) === 0) {
        setAgreedRateError('Agreed rate  cannot be zero or blank')
        return
      }
      if (formData.DblAgreedRate != null && formData.DblRate != null) {
        if (Number(formData.DblAgreedRate) > Number(formData.DblRate)) {
          setAgreedRateError('Agreed rate should not exceed billing rate')
          return
        }
      }

      setAgreedRateError('') // Clear error if all good

      const finalFormData = {
        ...formData,
        clsSaleOrderOHLine: ohList // Inject updated OH data here
      }
      console.log('Final Form Data to submit:', finalFormData)
      handleModalSubmit({
        e,
        formData: finalFormData,
        coSo,
        onFormSubmit,
        toggleAddModal,
        toggleEditModal,
        handleModal,
        setIsSelect,
        handleReset,
        isEditModalActive,
        isAddModalActive
      })

      if (isAddModalActive) {
        setSubmittedData(prevData => [...prevData, formData])
      }

      await fetchOHLineData()
    }
  }

  const handleReset = () => {
    setFormData(initialFormDataForSale)
    setItemnameError('')
    setBfError('')
    setGsmError('')
    setSizeUnitError('')
    setWidthError('')
    setGrainError('')
    setReelPackError('')
    setWeightError('')
    setBillingRateError('')
    setAgreedRateError('')
    setCosnoError('')
  }

  const handleModal = () => {
    setFormData(prevHeader => ({
      ...prevHeader,
      DblWidth: 0,
      DblLength: 0,
      DblReel: 0,
      DblWeight: 0
    }))
  }

  const handleCoSNoFocus = (
    isFetchedCoSnO: boolean,
    setIsFetchedCoSnO: Dispatch<SetStateAction<boolean>>,
    fetchCoSnO: () => Promise<void>
  ) => {
    if (!isFetchedCoSnO) {
      fetchCoSnO().then(() => setIsFetchedCoSnO(true))
    }
  }

  const fetchCoSnO = async (
    docId: string,
    setCosono: React.Dispatch<React.SetStateAction<cosno[]>>,
    contractDocId: string | undefined,
    intv_SNo: number | undefined,
    username: string | number | true | object | null,
    bu: string | number | true | object | null
  ) => {
    try {
      const response = await cosonoDetailAction(docId, contractDocId, intv_SNo, username, companyid, Site_Code, bu)

      const data: cosno = response
      console.log('cosodata', data)
      if (data?.success) {
        setCosono([data])
      } else {
        // If there is an error, log the error message
        const errorMessage = data?.error
        console.error('Error:', errorMessage)
        toast.error('Something Went Wrong', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setCosono([])
      }
    } catch (error) {
      console.error('Failed to fetch item name:', error)
    }
  }

  const fetchPriceList = async (
    ordertype: string,
    StrItemCode: string,
    currentDate: string,
    StrBFCode: string,
    StrGSMCode: string,
    contractDocId: string | undefined,
    vsNo: number | undefined,
    bu: string | number | true | object | null
  ) => {
    try {
      const response = await PriceListAction(
        ordertype,
        StrItemCode,
        currentDate,
        StrBFCode,
        StrGSMCode,
        contractDocId,
        vsNo,
        Site_Code as string,
        companyid as string,
        UserName as string,
        header?.StrPartyCode as string,
        bu
      )
      const data: PriceDetails = response

      if (data) {
        setPriceListData(data)
        setFormData(prev => ({
          ...prev,
          DblRate: data.DblMRP,
          DblAgreedRate: data.DblAgreedRate
        }))
      } else {
        // setPriceListData();
      }
    } catch (error) {
      console.error('Failed to fetch item name:', error)
    }
  }

  const handleCoSoNoChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    cosono: cosno[],
    setFormData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail>>,
    setCosnoError: React.Dispatch<React.SetStateAction<string>>,
    setVsNo: React.Dispatch<React.SetStateAction<number | undefined>>,
    setSelectedSizeUnit: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const selectedcOsNoName = event.target.value

    const selectedItem = cosono[0]?.data.find(item => {
      const itemConcatenated = item.V_SNo + '-' + item.DocId
      return itemConcatenated === selectedcOsNoName
    })

    if (selectedItem) {
      setVsNo(selectedItem.V_SNo)
      setSelectedSizeUnit(selectedSizeUnit)
      setFormData(prevFormData => ({
        ...prevFormData,
        IntcontractSoV_Sno: selectedItem.V_SNo,
        StrDocID: selectedItem.DocId,
        StrItemName: selectedItem.strItemName,
        StrItemCode: selectedItem.stritemCode,
        StritemDesc: selectedItem.stritemDesc,
        StrBFName: selectedItem.strBFValue,
        StrBf: selectedItem.strbf,
        StrGsmName: selectedItem.strGsmValue,
        StrGsm: selectedItem.strgsm,
        StrSizeUnit: selectedItem.strsizeUnit || selectedSizeUnit,
        // strsizeUnitName: selectedItem.strsizeUnitName || selectedSizeUnit,
        DblWidth: selectedItem.dblwidth || 0,
        DblLength: selectedItem.dbllength || 0,
        StrGrainName: selectedItem.strgrainValue,
        DblReel: 0,
        DblRate: 0,
        DblAgreedRate: 0
      }))
      Gettaxes(Site_Code, companyid, selectedItem.stritemCode, header?.StrAgainstFormCode || '', bu, setFormData)
      if (isPriceListApplicable === 200 || contractDocId !== '') {
        fetchPriceList(
          ordertype || '',
          selectedItem.stritemCode,
          currentDate,
          selectedItem.strbf,
          selectedItem.strgsm,
          selectedItem.DocId,
          selectedItem.V_SNo,
          bu
        )
      }
      setCosnoError('')
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        IntcontractSoV_Sno: 0,
        StrDocID: '',
        StrItemName: '',
        StritemDesc: '',
        StrBFName: '',
        StrGsmName: '',
        // strsizeUnitName: '',
        DblWidth: 0,
        DblLength: 0,
        StrGrainName: '',
        DblReel: 0,
        DblWeight: 0,
        DblRate: 0,
        DblAgreedRate: 0
      }))
    }
  }

  useEffect(() => {
    if (formData.IntcontractSoV_Sno) {
      handleCoSNoFocus(isFetchedCoSnO, setIsFetchedCoSnO, () =>
        fetchCoSnO(docId, setCosono, contractDocId, formData.IntcontractSoV_Sno, UserName, bu)
      )
    }
  }, [formData.IntcontractSoV_Sno])

  useEffect(() => {
    const getDefaultSizeUnit = async () => {
      try {
        const url = `http://localhost/BSA/saleorder/GetEnviroSizeUnit?Site_Code=${Site_Code}&companyid=${companyid}&username=${UserName}&StrUserCode=${UserName}&strRole=Employee`
        const response = await fetch(url)
        const result = await response.json()

        if (result?.statusCode === 200 && result.data?.length > 0) {
          const defaultUnit = result.data[0].SL_SizeUnit
          console.log('defaultUnit', defaultUnit)
          setFormData(prev => ({
            ...prev,
            StrSizeUnit: defaultUnit
            // strsizeUnitName: defaultUnit
          }))

          setSelectedSizeUnit(defaultUnit)
        } else {
          console.warn('No default size unit found or invalid response format:', result)
        }
      } catch (error) {
        console.error('Error fetching default size unit:', error)
      }
    }
    if (isAddModalActive && Site_Code && companyid && UserName) {
      getDefaultSizeUnit()
    }
  }, [isAddModalActive, Site_Code, companyid, UserName])

  useEffect(() => {
    const grossValue = formData.DblAmount ?? 0
    const cgstPer = formData.DblCGST_Per ?? 0
    const sgstPer = formData.DblSGST_Per ?? 0
    const igstPer = formData.DblIGST_Per ?? 0

    const cgstAmt = (grossValue * cgstPer) / 100
    const sgstAmt = (grossValue * sgstPer) / 100
    const igstAmt = (grossValue * igstPer) / 100

    setFormData(prev => ({
      ...prev,
      DblCGSTAmt: cgstAmt,
      DblSGSTAmt: sgstAmt,
      DblIGSTAmt: igstAmt
    }))
  }, [formData.DblAmount, formData.DblCGST_Per, formData.DblSGST_Per, formData.DblIGST_Per])

  const handleUpdate = React.useCallback((updatedList: clsDMSSordOH[]) => {
    setOHList(updatedList)
  }, [])

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {(isAddModalActive || isEditModalActive) && (
        <div className='fixed inset-0 z-[900] overflow-y-auto md:overflow-y-hidden '>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0  '>
            {/* Modal content */}
            <div className='md:mt-20 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle mt-20'>
              <div className='flex justify-center bg-blue-400 rounded-lg p-2 '>
                <div className='text-xl font-bold text-center text-white'>
                  {isEditModalActive ? 'Edit Order Details' : 'Add Order Details'}
                </div>
              </div>

              <button
                onClick={() => {
                  if (toggleAddModal) {
                    toggleAddModal() // Close Add Modal
                  }
                  if (toggleEditModal) {
                    toggleEditModal() // Close Edit Modal
                  }
                  handleReset() // Reset form after submission
                }}
                className='absolute top-4 right-4 text-blue-950 hover:text-black-700 focus:outline-none'
              >
                <ImCross />
              </button>

              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  dark:border-strokedark dark:bg-boxdark '>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2  max-w-3xl mx-auto over overflow-x-auto'>
                  {/* Left side */}
                  <div className=' space-y-3 md:flex-row  md:items-center'>
                    {/* CO S.No, Item Name *, Description */}
                    <div className='border border-transparent sm:border-2 sm:border-solid '>
                      <div>
                        <SaleOrderHelp
                          htmlforData='IntcontractSoV_Sno'
                          labelData='Co S No'
                          idData='IntcontractSoV_Sno'
                          party={cosono[0]?.data?.map((item, index) => ({
                            Code: `${item.V_SNo}-${item.DocId}`,
                            Name: item.V_SNo,
                            keyData: index
                          }))}
                          valueData={formData.IntcontractSoV_Sno || ''}
                          optionData={formData?.IntcontractSoV_Sno}
                          onChange={event =>
                            handleCoSoNoChange(event, cosono, setFormData, setCosnoError, setVsNo, setSelectedSizeUnit)
                          }
                          onFocus={() =>
                            handleCoSNoFocus(isFetchedCoSnO, setIsFetchedCoSnO, () =>
                              fetchCoSnO(
                                docId,
                                setCosono,
                                contractDocId,
                                formData.IntcontractSoV_Sno || 0,
                                UserName,
                                bu
                              )
                            )
                          }
                          CoSNoStar={contractDocId !== ''}
                          nameData='IntcontractSoV_Sno'
                        />
                        {cosnoError && <div className='text-danger text-sm text-red-700'>{cosnoError}</div>}
                      </div>
                      <div>
                        <SaleOrderHelp
                          htmlforData='StrItemName'
                          labelData='Item Name'
                          idData='StrItemName'
                          party={item[0]?.data?.map((items, index) => ({
                            Code: items.Code,
                            Name: items.Name,
                            keyData: `${items.Code}-${index}`
                          }))}
                          valueData={formData.StrItemCode ?? ''}
                          optionData={formData.StrItemName || 'Select'}
                          onChange={event =>
                            handleItemNameChange(
                              event,
                              item,
                              setselectedItem,
                              setFormData,
                              setItemnameError,
                              setStrItemCode,
                              Site_Code,
                              companyid,
                              bu,
                              header?.StrAgainstFormCode || ''
                            )
                          }
                          onFocus={() => {
                            setItem([
                              {
                                success: false,
                                error: '',
                                data: []
                              }
                            ])
                            fetchItemName(
                              companyid,
                              setItem,
                              UserName,
                              transTypeCat,
                              Site_Code,
                              bu,
                              header?.StrContractSalesOrderDocID || '',
                              formData.IntcontractSoV_Sno || 0
                            )
                          }}
                          CoSNoStar={true}
                        />
                        {itemnameError && <div className='text-danger text-sm text-red-700'>{itemnameError}</div>}
                      </div>

                      {/* <div>
                        <SaleOrderHelp
                          htmlforData='strPackingTypeName'
                          labelData='Packing Type'
                          idData='strPackingTypeName'
                          party={packingtype[0]?.data?.map((items, index) => ({
                            Code: items.Code,
                            Name: items.Name,
                            keyData: `${items.Code}-${index}`
                          }))}
                          valueData={formData.strPackingType || ''}
                          optionData={formData.strPackingTypeName || 'Select'}
                          onChange={event =>
                            handlePackingTypeChange(
                              event,
                              packingtype,
                              setselectedPackingType,
                              setFormData,
                              setPackingtypeError
                            )
                          }
                          onFocus={() =>
                            handlePackingTypeFocus(
                              isFetchedPackingType,
                              () => fetchPackingType(setPackingType, UserName, Site_Code, companyid, bu),
                              setisFetchedPackingType
                            )
                          }
                          CoSNoStar={false}
                        />
                        {packingtypeError && <div className='text-danger text-sm text-red-700'>{packingtypeError}</div>}
                      </div> */}

                      <SaleOrderInput
                        htmlForData='StritemDesc'
                        labelData='Description'
                        isStar={false}
                        valueData={formData.StritemDesc ?? ''}
                        idData='StritemDesc'
                        typeData='text'
                        isReadOnly={false}
                        nameData='StritemDesc'
                        onChangeFun={handleChange}
                      />
                    </div>

                    {/*BF *, GSM *, Size Unit * */}
                    <div className='flex flex-col md:grid md:grid-cols-3 gap-4 '>
                      <div className='flex-1'>
                        <SaleOrderHelp
                          htmlforData='StrBf'
                          labelData='BF'
                          idData='StrBf'
                          party={bf[0]?.data?.map((ele, index) => ({
                            Code: ele.code,
                            Name: ele.Name,
                            keyData: index
                          }))}
                          valueData={formData.StrBf || ''}
                          optionData={formData.StrBFName || 'Select'}
                          onChange={event =>
                            handleBFChange(
                              event,
                              bf,
                              setSelectedBF,
                              setFormData,
                              setBfError,
                              setStrBFCode,
                              fetchPriceList,
                              isPriceListApplicable,
                              contractDocId,
                              ordertype,
                              currentDate,
                              vsNo || formData.IntcontractSoV_Sno,
                              bu,
                              formData
                            )
                          }
                          onFocus={() => {
                            fetchBf(
                              bu,
                              companyid,
                              setBf,
                              UserName,
                              header?.StrContractSalesOrderDocID || '',
                              formData.IntcontractSoV_Sno || 0
                            )
                          }}
                          CoSNoStar={true}
                        />
                        {bfError && <div className='text-danger text-sm text-red-700'>{bfError}</div>}
                      </div>
                      <div className='flex-1'>
                        <SaleOrderHelp
                          htmlforData='StrGsm'
                          labelData='GSM'
                          idData='StrGsm'
                          party={gsm[0]?.data?.map((ele, index) => ({
                            Code: ele.code,
                            Name: ele.Name,
                            keyData: index
                          }))}
                          valueData={formData.StrGsm || ''}
                          optionData={formData.StrGsmName || 'Select'}
                          onChange={event =>
                            handleGsmChange(
                              event,
                              gsm,
                              setFormData,
                              setGsmError,
                              setStrGSMCode,
                              fetchPriceList, // 👈 now passed
                              isPriceListApplicable,
                              contractDocId,
                              ordertype,
                              currentDate,
                              vsNo || formData.IntcontractSoV_Sno,
                              bu,
                              formData
                            )
                          }
                          onFocus={() => {
                            fetchGsm(
                              bu,
                              companyid,
                              setGsm,
                              UserName,
                              header?.StrContractSalesOrderDocID || '',
                              formData.IntcontractSoV_Sno || 0
                            )
                          }}
                          CoSNoStar={true}
                        />
                        {gsmError && <div className='text-danger text-sm text-red-700'>{gsmError}</div>}
                      </div>

                      <div className='flex-1'>
                        <SaleOrderHelp
                          htmlforData='StrSizeUnit'
                          labelData='Size Unit'
                          idData='StrSizeUnit'
                          party={sizeUnit[0]?.data?.map((ele, index) => ({
                            Code: ele.Code,
                            Name: ele.Unit,
                            keyData: index
                          }))}
                          valueData={formData.StrSizeUnit || ''}
                          optionData={formData.StrSizeUnit || 'Select'}
                          onChange={event =>
                            handleSizeUnitChange(event, sizeUnit, setFormData, setSelectedSizeUnit, setSizeUnitError)
                          }
                          onFocus={() =>
                            handleSizeUnitFocus(
                              isFetchedSizeUnit,
                              () => fetchSizeUnit(bu as string, companyid as string, setsizeUnit, UserName as string),
                              setisFetchedSizeUnit
                            )
                          }
                          onBlurFunction={callUpdateAPI}
                          CoSNoStar={true}
                        />
                        {sizeUnitError && <div className='text-danger text-sm text-red-700'>{sizeUnitError}</div>}
                      </div>
                    </div>

                    <div className='flex flex-col md:grid md:grid-cols-3 gap-4'>
                      <div className='flex-1'>
                        <SaleOrderInput
                          htmlForData='DblWidth'
                          labelData='Width'
                          isStar={true}
                          valueData={formData.DblWidth ?? ''}
                          idData='DblWidth'
                          typeData='number'
                          isReadOnly={false}
                          nameData='DblWidth'
                          onChangeFun={handleChange}
                          onFocusFun={e => {
                            if (e.target.value === '0') e.target.value = ''
                          }}
                          onBlurFun={callUpdateAPI}
                        />
                        {widthError && <div className='text-danger text-sm text-red-700'>{widthError}</div>}
                      </div>

                      <div className='flex-1'>
                        <SaleOrderInput
                          htmlForData='DblLength'
                          labelData='Length'
                          isStar={ordertype === 'S'}
                          valueData={formData.DblLength ?? ''}
                          idData='DblLength'
                          typeData='number'
                          isReadOnly={ordertype === 'R'}
                          nameData='DblLength'
                          onChangeFun={handleChange}
                          onFocusFun={() => {
                            if (formData.DblLength === 0) {
                              setFormData(prev => ({ ...prev, DblLength: 0 }))
                            }
                          }}
                        />
                        {lengthError && <div className='text-danger text-sm text-red-700'>{lengthError}</div>}
                      </div>

                      <div className='flex-1'>
                        <SaleOrderInput
                          htmlForData='StrGrain'
                          labelData='Grain'
                          isStar={ordertype === 'S'}
                          valueData={formData.StrGrainName}
                          idData='StrGrain'
                          typeData='text'
                          isReadOnly={true}
                          nameData='StrGrain'
                          onChangeFun={handleChange}
                        />
                        {grainError && <div className='text-danger text-sm text-red-700'>{grainError}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className='flex-1'>
                    <div className='overflow-auto'>
                      {/* Reel/Pack *, Weight *, Unit */}
                      <div className='md:mt-[1px]'>
                        <div className='flex space-x-4'>
                          <div className='flex-1'>
                            <SaleOrderInput
                              htmlForData='DblReel'
                              labelData='Reel/Pack'
                              isStar={true}
                              valueData={formData.DblReel === 0 ? '' : formData.DblReel}
                              idData='DblReel'
                              typeData='number'
                              isReadOnly={false}
                              nameData='DblReel'
                              onChangeFun={event => handleReelPackChange(event, setReelPackError)}
                              onFocusFun={e => {
                                if (e.target.value === '0') {
                                  e.target.value = ''
                                }
                              }}
                              onBlurFun={() => callUpdateAPI()}
                            />
                            {reelPackError && <div className='text-danger text-sm text-red-700'>{reelPackError}</div>}
                          </div>

                          <div className='flex-1'>
                            <SaleOrderInput
                              htmlForData='DblWeight'
                              labelData='Weight'
                              isStar={true}
                              valueData={formData.DblWeight === 0 ? '' : formData.DblWeight}
                              idData='DblWeight'
                              typeData='number'
                              isReadOnly={false}
                              nameData='DblWeight'
                              onChangeFun={handleWeightChange}
                              onFocusFun={e => {
                                if (e.target.value === '0') {
                                  e.target.value = ''
                                }
                              }}
                              onBlurFun={() => callUpdateAPI()}
                            />
                            {weightError && <div className='text-danger text-sm text-red-700'>{weightError}</div>}
                          </div>

                          <div className='flex-1'>
                            <SaleOrderInput
                              htmlForData='KGS'
                              labelData='Unit'
                              isStar={false}
                              valueData='KGS'
                              idData='KGS'
                              typeData='text'
                              isReadOnly={false}
                              nameData='KGS'
                              onChangeFun={handleChange}
                            />
                            {sizeUnitError && <div className='text-danger text-sm text-red-700'>{sizeUnitError}</div>}
                          </div>
                        </div>
                        {/* Billing Rate *, Agreed Rate **/}
                        <div className='flex justify-start gap-7 md:mt-3'>
                          <div className='w-1/3.5'>
                            <SaleOrderInput
                              htmlForData='DblRate'
                              labelData='Billing Rate'
                              isStar={true}
                              valueData={formData.DblRate ?? ''}
                              idData='DblRate'
                              typeData='number'
                              isReadOnly={false}
                              nameData='DblRate'
                              onChangeFun={handleChange}
                              onFocusFun={e => {
                                if (e.target.value === '0') {
                                  e.target.value = ''
                                }
                              }}
                            />
                            {billingRateError && (
                              <div className='text-danger text-sm text-red-700'>{billingRateError}</div>
                            )}
                          </div>

                          <div className='w-1/3.5'>
                            <SaleOrderInput
                              htmlForData='DblAgreedRate'
                              labelData='Agreed Rate'
                              isStar={true}
                              valueData={formData.DblAgreedRate ?? ''}
                              idData='DblAgreedRate'
                              typeData='number'
                              isReadOnly={contractDocId !== '' || priceListData.StrRateApplicable === 'AR'}
                              nameData='DblAgreedRate'
                              onChangeFun={handleChange}
                              onFocusFun={e => {
                                if (e.target.value === '0') {
                                  e.target.value = ''
                                }
                              }}
                            />
                            {agreedRateError && (
                              <div className='text-danger text-sm text-red-700'>{agreedRateError}</div>
                            )}
                            {billagreederrorPopup && (
                              <div className='text-danger text-sm text-red-700'>
                                Agreed Rate cannot exceed Billing Rate
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* table */}
                      <LineOHComp
                        ohList={isEditModalActive ? formData.clsSaleOrderOHLine || [] : ohList}
                        onUpdate={handleUpdate}
                        grossamount={formData.DblAmount ?? 0}
                        Qty={formData.DblWeight ?? 0}
                        igstper={formData.DblIGST_Per ?? 0}
                        cgstper={formData.DblCGST_Per ?? 0}
                        sgstper={formData.DblSGST_Per ?? 0}
                        rate={formData.DblRate ?? 0}
                        millrate={formData.DblAgreedRate ?? 0}
                      />
                    </div>

                    {/* Submit and Reload Button */}
                    <div className='grid grid-cols-2 gap-4 mt-4 md:mt-6'>
                      <button
                        onClick={handleSubmit}
                        className='  px-1 h-7 md:px-4 border border-transparent  text-base md:text-sm font-bold rounded-md text-white bg-blue-500'
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleReset}
                        className='  px-1 h-7 md:px-4 border border-transparent  text-base md:text-sm font-bold rounded-md text-white bg-blue-500'
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
    </>
  )
}

export default SaleOrderEntryDetail
