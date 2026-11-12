import { ConsigneesAction } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_action'
import type {
  clsDMSSordOHHeader,
  clsSaleOrderHeader,
  clsSaleOrderItemDetail,
  ConsigneeDataForSale,
  PartyDataforSaleOrder
} from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'
import Addressbookaction from '@/app/action/addressBookAction'
import AgtFormAction from '@/app/action/getAgtForm'
import AgtFormHelpForPartyAction, { AgtFormHelpAction } from '@/app/action/getAgtFormHelp'
import SalesPersonAction from '@/app/action/getSalesperson'
import type {
  PriceDetails,
  DMSSordItemDetailUpdatePostData,
  AddressBook,
  Consignee,
  Type,
  DMSSordHeader,
  AgtForm,
  Delivery,
  FormData,
  PartyforSale,
  AgtFormres
} from '@/components/interfaces/page'
import PreviousMap_ from 'postcss/lib/previous-map'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

export const PriceListinitialFormData: PriceDetails = {
  blnPricelistApplicable: null,
  DblAgreedRate: 0,
  DblFinalRate: null,
  DblMRP: 0,
  IntOrdV_SNo: null,
  IntPLV_SNo: null,
  Str_RefNo: '',
  StrOrdDocId: '',
  StrPL_DocId: '',
  StrRateApplicable: '',
  StrV_date: '',
  StrUserCode: ''
}

export const initialFormData: DMSSordItemDetailUpdatePostData = {
  intdocId: '', // Assuming an empty string is the default
  intv_SNo: null, // Default to null or 0 depending on your requirements
  stritemCode: '',
  strItemName: '',
  stritemDesc: '',
  strbf: '',
  strBFValue: '',
  dblwidth: null, // Assuming 0 is a valid default for numbers
  dbllength: null,
  strsizeUnit: '',
  strgsm: '',
  strGsmValue: '',
  strgrain: '',
  strgrainValue: '',
  dblqty: 0,
  strtl_ExcessPer: '',
  dbltl_ExcessQty: 0,
  dblreel: 0,
  dblrate: null,
  dblamount: null,
  strclosed: 'N',
  dbloh_Amt_Gross: null,
  dbloh_At_Addition: null,
  dbloh_Amt_Addition: null,
  dbloh_At_Discount: null,
  dbloh_Amt_Discount: null,
  dbloh_Amt_Net: null,
  strpldDocId: '0',
  intpldV_SNo: 0,
  strpldRateApplicableOn: 'N',
  dbloh_Amt_AgreedRate: null,
  strcontractSoDocId: '',
  intcontractSoV_Sno: 0,
  intcontractSo_Sno: 0,
  strsizeUnitName: ''
}

export const initialFormDataForSale: clsSaleOrderItemDetail = {
  StrDocID: '',
  Intv_SNo: 0,
  StrGoodsServices: '',
  StrGoodsServicesName: '',
  StrClosed: '',
  strOrderCloseRemark: '',
  IntcontractSoV_Sno: 0,
  IntCO_ItemRateSNo: 0,
  StrItemCode: '',
  StrItemName: '',
  StritemDesc: '',
  StrBf: '',
  StrBFName: '',
  DblWidth: 0,
  DblLength: 0,
  StrSizeUnit: '',
  DblSizeInch: 0,
  DblSizeCm: 0,
  StrGrain: '',
  StrGrainName: '',
  StrGsm: '',
  StrGsmName: '',
  StrCorePipeCode: '',
  StrCorePipeName: '',
  DblOuterDIA: 0,
  DblInnerDIA: 0,
  DblBulk: 0,
  DblPerReelWeight: 0,
  DblReel: 0,
  DblWeightSDU: 0,
  StrSDU: '',
  DblConverstionRate: 0,
  DblWeight: 0,
  DblShortWeight: 0,
  Dtrtl_ExcessPer: 0,
  Dbltl_ExcessQty: 0,
  StrSKU: '',
  DblRate: 0,
  DblAmount: 0,
  StrLocalCurrencyCode: '',
  StrLocalCurrencyName: '',
  DblRateFC: 0,
  DblAmountFC: 0,
  DblCurrencyExchangeRate: 0,
  StrForeignCurrencyCode: '',
  StrForeignCurrencyName: '',
  DblOrderNetValue: 0,
  DblLineDiscount: 0,
  DblItemNetAmount: 0,
  DblAgreedRate: 0,
  StrItemGroupCode: '',
  StrItemGroupName: '',
  strPackingType: '',
  strPackingTypeName: '',
  StrStatus: '',
  StrStatusName: '',
  DblExchangeRate: 0,
  DblTaxableValue: 0,
  DblItemNetValue: 0,
  DblIGST_Per: 0,
  DblCGST_Per: 0,
  DblSGST_Per: 0,
  DblUGST_Per: 0,
  DblCess_Per: 0,
  DblIGSTAmt: 0,
  DblCGSTAmt: 0,
  DblSGSTAmt: 0,
  DblUGSTAmt: 0,
  DblCessAmt: 0,
  DblAdditionAmt: 0,
  DblDiscAmt: 0,
  DblItemValue: 0,
  DblServiceValue: 0,
  DblInsuranceValue: 0,
  DblFreightValue: 0,

  clsSaleOrderOHLine: []
}

export const formatDate = (date: Date): string => {
  const d = new Date(date)
  const day = d.getDate()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

type HandleModalSubmitProps = {
  e: React.FormEvent
  formData: clsSaleOrderItemDetail
  coSo?: number
  onFormSubmit?: (data: clsSaleOrderItemDetail) => void
  toggleAddModal?: () => void
  toggleEditModal?: () => void
  handleModal: () => void
  setIsSelect: Dispatch<SetStateAction<boolean>>
  handleReset: () => void
  isEditModalActive?: boolean
  isAddModalActive?: boolean
}

export const handleModalSubmit = ({
  e,
  formData,
  coSo,
  onFormSubmit,
  toggleEditModal,
  handleModal,
  setIsSelect,
  handleReset,
  isEditModalActive,
  isAddModalActive
}: HandleModalSubmitProps) => {
  e.preventDefault()
  formData.Intv_SNo = coSo ? coSo : 0 // Default value of 0 if coSo is falsy

  if (onFormSubmit) {
    onFormSubmit(formData)
  }

  if (isAddModalActive) {
    handleModal()
  }

  if (isEditModalActive) {
    if (toggleEditModal) {
      toggleEditModal() // Close Edit Modal
      handleReset()
    }
  }

  setIsSelect(false)
}

export const fetchAddressbook = async (
  setAddressbook: Dispatch<SetStateAction<AddressBook[]>>,
  strconsignee: string | undefined,
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) => {
  try {
    const response = await Addressbookaction(strconsignee, username, Site_Code, companyid, bu)

    if (!strconsignee) {
      setAddressbook([])
      return
    }
    const data: AddressBook = response
    if (data.success) {
      setAddressbook([data])
    } else {
      // If there is an error, log the error message
      const errorMessage = data.error
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
      setAddressbook([])
    }
  } catch (error) {
    console.error('Failed to fetch AddressBook:', error)
  }
}

export const fetchConsignees = async (
  setConsignees: Dispatch<SetStateAction<ConsigneeDataForSale[]>>,
  strPartyCode: string | undefined,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) => {
  try {
    const response = await ConsigneesAction(strPartyCode, Site_Code, companyid, bu)
    const res: ConsigneeDataForSale[] = response
    if (res) {
      setConsignees(res)
    } else {
      const errorMessage = 'Something went wrong for consignee data'

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
      // setConsignees([])
    }
  } catch (error) {
    console.error('Failed to fetch consignees:', error)
  }
}

export const fetchDelAddressbook = async (
  setPartyaddressbook: Dispatch<SetStateAction<AddressBook[]>>,
  strPartyaddressbook: string | undefined,
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) => {
  try {
    const response = await Addressbookaction(strPartyaddressbook, username, Site_Code, companyid, bu)
    if (!strPartyaddressbook) {
      setPartyaddressbook([])
      return
    }
    const data: AddressBook = response
    console.log('Address Book Data', data)
    if (data?.success) {
      setPartyaddressbook([data])
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
      setPartyaddressbook([])
    }
  } catch (error) {
    console.error('Failed to fetch AddressBook:', error)
  }
}

export const fetchsalesperson = async (
  setSalesPerson: Dispatch<SetStateAction<Type[]>>,
  distributorCode: string | number | true | object,
  TransactionType: string | number | true | object,
  Site_Code: string,
  companyid: string,
  username: string,
  bu: string
) => {
  try {
    const response = await SalesPersonAction(distributorCode, TransactionType, Site_Code, companyid, username, bu)

    const data: Type = response

    if (data?.success) {
      setSalesPerson([data])
    } else {
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
      setSalesPerson([])
    }
  } catch (error) {
    console.error('Failed to fetch freight type:', error)
  }
}

export const handleAgtFormChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  agtForm: AgtForm[],
  setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>,
  setAgtFormError: React.Dispatch<React.SetStateAction<string>>,
  setDetail: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>
) => {
  const code = e.target.value

  setHeader(prevHeader => {
    if (!prevHeader) return prevHeader // ✅ null guard

    setDetail([])
    if (code === '') {
      return {
        ...prevHeader,
        StrAgainstFormCode: '',
        StrAgainstFormName: ''
      }
    }

    const agtFormData = agtForm.find(ele => ele.Form_Code == code)

    if (!agtFormData) {
      setAgtFormError('Invalid agtForm selected.')
      return prevHeader
    }

    setAgtFormError('')
    return {
      ...prevHeader,
      StrAgainstFormName: agtFormData.Form_Desc,
      StrAgainstFormCode: agtFormData.Form_Code
    }
  })
}

export const fetchAgtForm = async (
  setAgtForm: Dispatch<SetStateAction<AgtForm[]>>,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrV_Type: string | undefined,
  bu: string | number | true | object | null
) => {
  try {
    const response = await AgtFormHelpAction(Site_Code, companyid, StrV_Type, bu)
    console.log('AGT FORM RESPONSE', response)
    const data = response
    if (data) {
      setAgtForm(data)
    } else {
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
      setAgtForm([])
    }
  } catch (error) {
    console.error('Failed to fetch against :', error)
  }
}

export const handleAgtFormFocus = (
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrV_Type: string | undefined,
  setAgtForm: Dispatch<SetStateAction<AgtForm[]>>,
  bu: string | number | true | object | null
) => {
  // if (!isFetchedAgtForm) {
  fetchAgtForm(setAgtForm, Site_Code, companyid, StrV_Type, bu)
  // }
}

export const handleCloseErrorModal = (setIsErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  return () => {
    setIsErrorModalOpen(false)
  }
}

export const handleCloseModal = (setIsModalOpen: (isOpen: boolean) => void, setError: (message: string) => void) => {
  setIsModalOpen(false)
  setError('') // Optionally clear the error when the modal is closed
}

export const handleConsigneeChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  consignees: ConsigneeDataForSale[],
  setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>,
  setConsigneeError: React.Dispatch<React.SetStateAction<string>>,
  setStrConsignee: React.Dispatch<React.SetStateAction<string>>
) => {
  const code = event.target.value

  setHeader(prevHeader => {
    if (!prevHeader) return prevHeader // ✅ null guard

    if (code === '') {
      return {
        ...prevHeader,
        StrConsignee: '',
        StrConsigneeName: ''
      }
    }

    const consigneeData = consignees.find(ele => ele.SubCode === code)

    if (!consigneeData) {
      setConsigneeError('Invalid consignee selected.')
      return prevHeader
    }

    setStrConsignee(consigneeData.SubCode)
    setConsigneeError('')
    return {
      ...prevHeader,
      StrConsigneeName: consigneeData.Name,
      StrConsignee: consigneeData.SubCode
    }
  })
}

export const handleDeliveryToChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  deliveryTo: ConsigneeDataForSale[],
  setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>
) => {
  const code = event.target.value

  setHeader(prevHeader => {
    if (!prevHeader) return prevHeader // ✅ null guard

    if (code === '') {
      return {
        ...prevHeader,
        StrDelAt: '',
        StrDelAtName: ''
      }
    }

    const deliveryData = deliveryTo.find(ele => ele.SubCode === code)

    if (!deliveryData) {
      return prevHeader
    }

    return {
      ...prevHeader,
      StrDelAtName: deliveryData.Name,
      StrDelAt: deliveryData.SubCode
    }
  })
}

export const handleConsigneeFocus = (
  isFetchedCon: boolean,
  setIsFetchedCon: Dispatch<SetStateAction<boolean>>,
  fetchConsignees: () => Promise<void>
) => {
  // if (!isFetchedCon) {
  fetchConsignees().then(() => setIsFetchedCon(true))
  // }
}

export const handleDeliveryChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  delivery: Delivery[],
  setHeader: Dispatch<SetStateAction<DMSSordHeader[]>>, // Adjust type as necessary
  setToPlaceError: React.Dispatch<React.SetStateAction<string>>,
  setDeliveryError: React.Dispatch<React.SetStateAction<string>>,
  setDelAddressbook: Dispatch<SetStateAction<AddressBook[]>>,
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) => {
  const code = event.target.value
  if (code === '') {
    setHeader(prevHeader => [
      {
        ...prevHeader[0], // Keep previous properties if needed
        strdelAt: '',
        strdelAtName: '',
        strtoPlace: '',
        strToPlaceValue: '',
        strplaceOfSupply: '',
        strdeladdress1: '',
        strdeladdress2: '',
        strdeladdressbook: '',
        strdeladdressbookName: ''
      }
    ])
    setDelAddressbook([])
    return
  } else {
    const deliveryData = delivery[0].data.find(ele => ele.Code === code)

    if (deliveryData) {
      setHeader(prevHeader => [
        {
          ...prevHeader[0], // Keep previous properties if needed
          strdelAt: deliveryData.Code,
          strdelAtName: deliveryData.Name,
          strToPlaceValue: deliveryData.City,
          strtoPlace: deliveryData.CityCode,
          strplaceOfSupply: deliveryData.stateCode,
          strdeladdress1: deliveryData.ADD1,
          strdeladdress2: deliveryData.ADD2,
          strdeladdressbook: '',
          strdeladdressbookName: ''
        }
      ])
    }

    setToPlaceError('')
    setDeliveryError('')
  }
  fetchDelAddressbook(setDelAddressbook, code, username, Site_Code, companyid, bu)
}

export const handleEdit = (
  index: number,
  detail: clsSaleOrderItemDetail[], // Adjust the type according to your data structure

  setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
  setEditItem: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail | null>>,
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const dataToEdit = detail[index]
  console.log('dataToEdit', dataToEdit)
  setIsEditModalActive(true) // Open the modal for editing

  setEditIndex(index) // Save the index of the item being edited
  setEditItem(dataToEdit)
}

export const computeOHHeader = (
  detail: clsSaleOrderItemDetail[],
  ohHeader: clsDMSSordOHHeader[]
): clsDMSSordOHHeader[] => {
  const totalsByShortCode: Record<string, number> = {}

  // Step 1: Collect totals from detail
  detail.forEach(item => {
    item.clsSaleOrderOHLine?.forEach(ohItem => {
      const code = ohItem.strExpShortCode
      const amount = ohItem.dblAmount ?? 0
      totalsByShortCode[code] = (totalsByShortCode[code] || 0) + amount
    })
  })

  const computedAmounts: Record<string, number> = {}

  // Step 2: Assign directly known totals
  ohHeader.forEach(headerItem => {
    const code = headerItem.strExpShortCode

    if (code === 'G' && totalsByShortCode['IV'] !== undefined) {
      computedAmounts[code] = totalsByShortCode['IV']
    } else if (totalsByShortCode[code] !== undefined) {
      computedAmounts[code] = totalsByShortCode[code]
    }
  })

  // Step 3: Evaluate formula-based entries
  ohHeader.forEach(headerItem => {
    const code = headerItem.strExpShortCode

    // Already computed in first pass
    if (computedAmounts[code] !== undefined) return

    const formula = headerItem.strFormulaString

    if (formula?.trim()) {
      let expression = formula

      // Replace ROUND(x, 0) with Math.round(x)
      expression = expression.replace(/ROUND\(([^,]+),\s*0\)/gi, 'Math.round($1)')

      // Replace tokens like [CODE] or {CODE} with values
      const tokens = expression.match(/[\[{]([A-Z0-9]+)[\]}]/g) || []

      tokens.forEach(token => {
        const cleanCode = token.replace(/[\[\]{}]/g, '')
        const value = computedAmounts[cleanCode] ?? 0
        expression = expression.replace(token, `(${value})`)
      })

      try {
        // Evaluate the final expression safely
        // eslint-disable-next-line no-eval
        const result = eval(expression)
        computedAmounts[code] = parseFloat(Number(result).toFixed(2))
      } catch (error) {
        console.warn(`Failed to evaluate formula for ${code}: ${expression}`, error)
        computedAmounts[code] = 0
      }
    }
  })

  // Step 4: Build and return updated header list
  // return ohHeader.map((item) => {
  //     const code = item.strExpShortCode;
  //     return {
  //         ...item,
  //         dblAmount: computedAmounts[code] ?? item.dblAmount ?? 0,
  //     };
  // });

  return ohHeader.map(item => {
    const code = item.strExpShortCode
    const finalAmount =
      detail.length === 0
        ? 0 // If all detail deleted, zero the amounts
        : computedAmounts[code] ?? 0
    return {
      ...item,
      dblAmount: finalAmount
    }
  })
}

export const handleFormSubmit = (
  formData: clsSaleOrderItemDetail,
  setSubmissions: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>,
  setDetail: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>,
  setSubmittedData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail | null>>,
  toggleAddModal: (
    isAddModalActive: boolean,
    setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
  ) => void,
  setTotalGrossAmount: React.Dispatch<React.SetStateAction<number>>,
  setTotalCGST: React.Dispatch<React.SetStateAction<number>>,
  setTotalSGST: React.Dispatch<React.SetStateAction<number>>,
  setTotalIGST: React.Dispatch<React.SetStateAction<number>>,
  setTotalAdditionAmount: React.Dispatch<React.SetStateAction<number>>,
  setTotalDiscount: React.Dispatch<React.SetStateAction<number>>,
  isAddModalActive: boolean,
  setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>,
  ohHeader: clsDMSSordOHHeader[],
  setOHHeader: React.Dispatch<React.SetStateAction<clsDMSSordOHHeader[]>>
) => {
  setSubmissions(prevSubmissions => [...prevSubmissions, formData])
  setDetail(prevDetail => {
    const updatedDetail = [...prevDetail, formData]

    const updatedOHHeader = computeOHHeader(updatedDetail, ohHeader)
    setOHHeader(updatedOHHeader)

    console.log('updatedOHHeader', updatedOHHeader)

    return updatedDetail
  })

  setSubmittedData(formData) // Update the state with submitted form data
  toggleAddModal(isAddModalActive, setIsAddModalActive) // Correct argument order
  setTotalGrossAmount(prevAmountG => prevAmountG + (formData.DblAmount ?? 0))
  setTotalCGST(prevAmountC => prevAmountC + (formData.DblCGSTAmt ?? 0))
  setTotalSGST(prevAmountS => prevAmountS + (formData.DblSGSTAmt ?? 0))
  setTotalIGST(prevAmountI => prevAmountI + (formData.DblIGSTAmt ?? 0))
  setTotalAdditionAmount(prevAmountA => prevAmountA + (formData.DblAdditionAmt ?? 0))
  setTotalDiscount(prevAmountD => prevAmountD + (formData.DblDiscAmt ?? 0))
}

export const handleEditFormSubmit = (
  formData: clsSaleOrderItemDetail,
  editIndex: number | null,
  detail: clsSaleOrderItemDetail[],
  setDetail: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>,
  setTotalGrossAmount: React.Dispatch<React.SetStateAction<number>>,
  setTotalCGST: React.Dispatch<React.SetStateAction<number>>,
  setTotalSGST: React.Dispatch<React.SetStateAction<number>>,
  setTotalIGST: React.Dispatch<React.SetStateAction<number>>,
  setTotalAdditionAmount: React.Dispatch<React.SetStateAction<number>>,
  setTotalDiscount: React.Dispatch<React.SetStateAction<number>>,
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>,
  setSubmissions: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>,
  toggleEditModal: (isActive: boolean, setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => void,
  setHeader: React.Dispatch<React.SetStateAction<clsSaleOrderHeader>>, // Adjust the type as necessary
  handleReset: (detail: any[], setDetail: React.Dispatch<React.SetStateAction<any[]>>) => void,
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>,
  isEditModalActive: boolean,
  setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>,
  ohHeader: clsDMSSordOHHeader[],
  setOHHeader: React.Dispatch<React.SetStateAction<clsDMSSordOHHeader[]>>
) => {
  if (editIndex !== null) {
    const updatedSubmissions = detail.map((item, index) => (index === editIndex ? formData : item))
    setDetail(updatedSubmissions)

    const updatedOHHeader = computeOHHeader(updatedSubmissions, ohHeader)
    setOHHeader(updatedOHHeader)

    // Recalculate all totals based on updated submissions
    const totalGross = updatedSubmissions.reduce((acc, curr) => acc + (curr.DblAmount ?? 0), 0)
    const totalCGST = updatedSubmissions.reduce((acc, curr) => acc + (curr.DblCGSTAmt ?? 0), 0)
    const totalSGST = updatedSubmissions.reduce((acc, curr) => acc + (curr.DblSGSTAmt ?? 0), 0)
    const totalIGST = updatedSubmissions.reduce((acc, curr) => acc + (curr.DblIGSTAmt ?? 0), 0)
    const totalAddition = updatedSubmissions.reduce((acc, curr) => acc + (curr.DblAdditionAmt ?? 0), 0)
    const totalDiscount = updatedSubmissions.reduce((acc, curr) => acc + (curr.DblDiscAmt ?? 0), 0)

    const totalAmount = updatedSubmissions.reduce((acc, curr) => {
      const gross = curr.DblAmount || 0
      const addition = curr.DblAdditionAmt || 0
      const discount = curr.DblDiscAmt || 0
      return acc + (gross + addition - discount + totalCGST + totalSGST + totalIGST)
    }, 0)

    // Update state with new totals
    setTotalGrossAmount(totalGross)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblGAmount: totalGross
    }))
    setTotalCGST(totalCGST)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblCGSTAMT: totalCGST
    }))
    setTotalSGST(totalSGST)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblSGSTAMT: totalSGST
    }))
    setTotalIGST(totalIGST)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblIGSTAMT: totalIGST
    }))
    setTotalAdditionAmount(totalAddition)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblAdditionAmt: totalAddition
    }))
    setTotalAmount(totalAmount)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblTotalAmt: totalAmount
    }))
    setTotalDiscount(totalDiscount)
    setHeader(prevHeader => ({
      ...prevHeader,
      DblDiscAmt: totalDiscount
    }))

    toggleEditModal(isEditModalActive, setIsEditModalActive) // Close the modal
  } else {
    console.error('Edit index is not set.')
  }
}

export const handleHeaderChang = (
  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setHeader: React.Dispatch<React.SetStateAction<DMSSordHeader[]>>,
  setPartyOrderNoError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { name, value } = event.target
  setHeader(prevHeader => [
    {
      ...prevHeader[0], // Keep previous properties if needed
      [name]: value // Dynamically update the property based on the name attribute
    }
  ])
  setPartyOrderNoError('')
}

export const handleHeaderChange = <K extends keyof clsSaleOrderHeader>(
  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setHeader: React.Dispatch<React.SetStateAction<clsSaleOrderHeader>>,
  setPartyOrderNoError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { name, value } = event.target as HTMLInputElement & {
    name: K
  }

  setHeader(prevHeader => {
    if (!prevHeader) return prevHeader // ✅ null guard

    return {
      ...prevHeader,
      [name]: value as clsSaleOrderHeader[K]
    }
  })

  setPartyOrderNoError('')
}

export const handleOrderTypeChange = (
  e: React.ChangeEvent<HTMLSelectElement>, // Adjust the type based on your input type
  setHeader: React.Dispatch<React.SetStateAction<DMSSordHeader[]>>,
  setOrderType: Dispatch<React.SetStateAction<string>>,
  setDetail: React.Dispatch<React.SetStateAction<DMSSordItemDetailUpdatePostData[]>>
) => {
  setOrderType(e.target.value)
  setHeader(prevHeader => [
    {
      ...prevHeader[0],
      strorderType: e.target.value
    }
  ])
  setDetail([])
}

// export const GetAgtForm = async (
//   Site_Code: string | number | true | object | null,
//   companyid: string | number | true | object | null,
//   StrPartyCode: string | number | true | object,
//   bu: string | number | true | object | null,
//   setHeader: Dispatch<SetStateAction<DMSSordHeader[]>>
// ) => {
//   try {
//     const response = await AgtFormAction(Site_Code, companyid, StrPartyCode, bu)
//     const data: AgtFormres = response

//     if (data?.success && data?.data?.length > 0) {
//       const defaultForm = data.data[0] // pick first from response
//       setHeader(prev => [
//         {
//           ...prev[0],
//           strFormCode: defaultForm.Form_Code,
//           strFormCodeValue: defaultForm.Form_Desc
//         }
//       ])
//     } else {
//       toast.error('No Against Form found for this party', {
//         position: 'top-center',
//         autoClose: 3000
//       })
//     }
//   } catch (error) {
//     console.error('Failed to fetch Against Form:', error)
//   }
// }

// export const handlePartyChange = (
//   event: React.ChangeEvent<HTMLSelectElement>,
//   party: PartyDataforSaleOrder[],
//   setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>,
//   setPartyError: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   const code = event.target.value

//   setHeader(prevHeader => {
//     if (!prevHeader) return prevHeader // ✅ null guard

//     if (code === '') {
//       return {
//         ...prevHeader,
//         StrPartyName: '',
//         StrPartyCode: '',
//         StrDistributor: '',
//         StrDistributorName: ''
//       }
//     }

//     const partyData = party.find(ele => ele.SubCode === code)

//     if (!partyData) return prevHeader
//     setPartyError('')

//     return {
//       ...prevHeader,
//       StrPartyName: partyData.Name,
//       StrPartyCode: partyData.SubCode,
//       StrDistributor: partyData.DistributorCode,
//       StrDistributorName: partyData.DistributorName
//     }
//   })
// }

export const handlePartyChange = async (
  event: React.ChangeEvent<HTMLSelectElement>,
  party: PartyDataforSaleOrder[],
  setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>>,
  setPartyError: React.Dispatch<React.SetStateAction<string>>,
  setAgtForm: Dispatch<SetStateAction<AgtForm[]>>,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrV_Type: string | undefined,
  bu: string | number | true | object | null
) => {
  const code = event.target.value

  if (code === '') {
    setHeader(prev => {
      if (!prev) return prev
      return {
        ...prev,
        StrPartyName: '',
        StrPartyCode: '',
        StrDistributor: '',
        StrDistributorName: ''
      }
    })
    return
  }

  const partyData = party.find(ele => ele.SubCode === code)
  if (!partyData) return

  setPartyError('')

  // ✅ update header (sync)
  setHeader(prev => {
    if (!prev) return prev
    return {
      ...prev,
      StrPartyName: partyData.Name,
      StrPartyCode: partyData.SubCode,
      StrDistributor: partyData.DistributorCode,
      StrDistributorName: partyData.DistributorName
    }
  })

  // ✅ async side-effect (outside setState)
  try {
    const response = await AgtFormHelpForPartyAction(Site_Code, companyid, StrV_Type, bu, partyData.SubCode)
    console.log('Against Form Response:', response)
    if (response) {
      // setAgtForm(response)
      setHeader(prev => {
        if (!prev) return prev
        return {
          ...prev,
          StrAgainstFormCode: response[0]?.FormCode || '',
          StrAgainstFormName: response[0]?.FormName || ''
        }
      })
    } else {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: false,
        theme: 'light'
      })
      // setAgtForm([])
    }
  } catch (error) {
    console.error('Failed to fetch against form:', error)
  }
}

export const handlePartyDataFocus = (
  isFetchedParty: boolean,
  setIsFetchedParty: Dispatch<SetStateAction<boolean>>,
  fetchPartyData: () => Promise<void>
) => {
  // if (!isFetchedParty) {
  fetchPartyData().then(() => setIsFetchedParty(true))
  // }
}

export const handleOrderTypeDataFocus = (
  isFetchedParty: boolean,
  setIsFetchedParty: Dispatch<SetStateAction<boolean>>,
  fetchPartyData: () => Promise<void>
) => {
  // if (!isFetchedParty) {
  fetchPartyData().then(() => setIsFetchedParty(true))
  // }
}

export const handleReset = (
  detail: clsSaleOrderItemDetail[],
  setDetail: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>
) => {
  setDetail([]) // Resetting the state to an empty array
}

type Item = {
  Code: string
  Name: string
  CityName?: string
  CityCode?: string
  ADD1?: string
  ADD2?: string
  DistributorCode?: string
  DistributorName?: string
  SubCode?: string
}

type HandleRowSelectProps = {
  type: string
  item: Item
  setHeader: Dispatch<SetStateAction<clsSaleOrderHeader>> // Adjust the type according to your header state
  setTriggerFetch: Dispatch<SetStateAction<{ type: string; code: string | undefined } | null>>
  handleClose: () => void
}

export const handleRowSelect = ({ type, item, setHeader, setTriggerFetch, handleClose }: HandleRowSelectProps) => {
  setHeader(prevHeader => {
    const newHeader = {
      ...prevHeader
      // [type]: item.Code, // Access the code from the item
      // [`${type}Name`]: item.Name // Access the name from the item
    }

    // Check if the type is 'strdelAt' and fill strplacevalue with city
    if (type === 'StrToPlace') {
      newHeader.StrToPlaceName = item.CityName
      newHeader.StrToPlace = item.CityCode
      setTriggerFetch({ type, code: item.CityCode })
    }

    if (type === 'StrConsignee') {
      newHeader.StrConsignee = item.SubCode
      newHeader.StrConsigneeName = item.Name

      setTriggerFetch({ type, code: item.SubCode })
    }

    if (type === 'StrPartyCode') {
      newHeader.StrPartyCode = item.SubCode // Adjust this line according to the actual field name for the city
      newHeader.StrPartyName = item.Name
      newHeader.StrDistributor = item.DistributorCode // Adjust this line according to the actual field name for the city
      newHeader.StrDistributorName = item.DistributorName
      setTriggerFetch({ type, code: item.SubCode })
    }
    // if (type === 'strConsiaddressbook') {
    //   newHeader.strConsiaddress1 = item.ADD1 // Adjust this line according to the actual field name for the city
    //   newHeader.strConsiaddress2 = item.ADD2
    //   newHeader.strdeladdressbook = item.Code // Adjust this line according to the actual field name for the city
    //   newHeader.strdeladdressbookName = item.Name
    //   newHeader.strdeladdress1 = item.ADD1 // Adjust this line according to the actual field name for the city
    //   newHeader.strdeladdress2 = item.ADD2
    // }
    // if (type === 'strdeladdressbook') {
    //   newHeader.strdeladdress1 = item.ADD1 // Adjust this line according to the actual field name for the city
    //   newHeader.strdeladdress2 = item.ADD2
    // }

    // if (type === 'strPartyaddressbook') {
    //   newHeader.strPartyaddressbook = item.Code // Adjust this line according to the actual field name for the city
    //   newHeader.strPartyaddressbookName = item.Name
    //   newHeader.strPartyaddress1 = item.ADD1
    //   newHeader.strPartyaddress2 = item.ADD2
    // }

    return newHeader
  })
  handleClose()
}

export const handleTableDelete = (
  index: number,
  detail: clsSaleOrderItemDetail[],
  ohHeader: clsDMSSordOHHeader[],
  setTotalGrossAmount: React.Dispatch<React.SetStateAction<number>>,
  setTotalAdditionAmount: React.Dispatch<React.SetStateAction<number>>,
  setTotalDiscount: React.Dispatch<React.SetStateAction<number>>,
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>,
  setSubmissions: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>,
  setDetail: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail[]>>,
  setOhHeader: React.Dispatch<React.SetStateAction<clsDMSSordOHHeader[]>>
) => {
  if (index >= 0 && index < detail.length) {
    const rowToDelete = detail[index]
    if (rowToDelete) {
      const grossAmtToDelete = rowToDelete.DblAmount || 0
      const additionAmtToDelete = rowToDelete.DblAdditionAmt || 0
      const discountAmtToDelete = rowToDelete.DblDiscAmt || 0
      const totalAmtToDelete = grossAmtToDelete + additionAmtToDelete - discountAmtToDelete

      setTotalGrossAmount(prev => prev - grossAmtToDelete)
      setTotalAdditionAmount(prev => prev - additionAmtToDelete)
      setTotalDiscount(prev => prev - discountAmtToDelete)
      setTotalAmount(prev => prev - totalAmtToDelete)

      setSubmissions(prev => prev.filter((_, i) => i !== index))

      const updatedDetail = detail.filter((_, i) => i !== index)
      setDetail(updatedDetail)

      // Recompute ohHeader with updated detail
      const updatedOHHeader = computeOHHeader(updatedDetail, ohHeader)
      setOhHeader(updatedOHHeader)

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
  } else {
    console.error('Invalid index passed to handleTableDelete')
  }
}

export const handlefreighttypeChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  freighttype: Type[],
  setHeader: Dispatch<SetStateAction<DMSSordHeader[]>>,
  setFreightTypeError: React.Dispatch<React.SetStateAction<string>>
) => {
  const code = e.target.value
  if (code === '') {
    setHeader(prevHeader => [
      {
        ...prevHeader[0], // Keep previous properties if needed
        strFreightType: '',
        strFreightTypeName: ''
      }
    ])
  } else {
    const freighttypeData = freighttype[0]?.data.find(ele => ele.Code == code)
    console.log('AUSTRALIA', freighttypeData)
    if (freighttypeData) {
      setHeader(prevHeader => [
        {
          ...prevHeader[0], // Keep previous properties if needed
          strFreightType: freighttypeData.Code,
          strFreightTypeName: freighttypeData.Name
        }
      ])
    }
    setFreightTypeError('')
  }
}

export const handlesalespersonChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  salesperson: Type[],
  setHeader: Dispatch<SetStateAction<DMSSordHeader[]>>,
  setSalesPersonError: React.Dispatch<React.SetStateAction<string>>
) => {
  const code = e.target.value
  if (code === '') {
    setHeader(prevHeader => [
      {
        ...prevHeader[0], // Keep previous properties if needed
        strSalesPersonCode: '',
        strSalesPersonName: ''
      }
    ])
  } else {
    const salespersonData = salesperson[0]?.data.find(ele => ele.Code == code)
    if (salespersonData) {
      setHeader(prevHeader => [
        {
          ...prevHeader[0], // Keep previous properties if needed
          strSalesPersonCode: salespersonData.Code,
          strSalesPersonName: salespersonData.Name
        }
      ])
    }

    setSalesPersonError('')
  }
}

export const handlesalespersonFocus = (
  distributorCode: string | number | true | object,
  TransactionType: string | number | true | object,
  Site_Code: string,
  companyid: string,
  username: string,
  isFetchedSalesPerson: boolean,
  setIsFetchedSalesPerson: Dispatch<SetStateAction<boolean>>,
  setSalesPerson: Dispatch<SetStateAction<Type[]>>,
  bu: string
) => {
  if (!isFetchedSalesPerson) {
    fetchsalesperson(
      setSalesPerson,
      distributorCode,
      TransactionType,
      Site_Code as string,
      companyid as string,
      username as string,
      bu as string
    ).then(() => setIsFetchedSalesPerson(true))
  }
}

export const toggleAddModal = (
  isAddModalActive: boolean,
  setIsAddModalActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsAddModalActive(true)
}

export const toggleEditModal = (
  isEditModalActive: boolean,
  setIsEditModalActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsEditModalActive(true)
}

export const toggleViewModal = (
  index: number,
  detail: clsSaleOrderItemDetail[],
  setViewItem: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail | null>>,
  setViewIndex: React.Dispatch<React.SetStateAction<number | null>>,
  setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const clickedSubmission = detail[index] // Get the submission data corresponding to the clicked row
  setViewItem(clickedSubmission)
  setViewIndex(index)
  setIsViewModalOpen(prev => !prev)
}
