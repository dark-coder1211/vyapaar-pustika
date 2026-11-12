import type { Bf, DMSSordItemDetailUpdatePostData, Gsm, ItemName, SizeUnit, Taxes, Type } from '@/components/interfaces/page'
import { toast } from 'react-toastify'
import type { Dispatch, SetStateAction } from 'react'
import ItemNameAction from '@/app/action/ItemNameAction'
import PackingTypeAction from '@/app/action/getpackingType'
import TaxesAction from '@/app/action/getTaxes'
import type { PoDetailInterface } from '@/app/(dashboard)/purchaseOrderEntry/PurchaseOrder_Entry_modal'
import { clsSaleOrderItemDetail } from '@/app/(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'

export const fetchBf = async (
  bu: string | number | true | object | null,
  companyid: string | number | true | object | null,
  setBf: (data: Bf[]) => void,
  username: string | number | true | object | null,
  contractDocId?: string | undefined,
  vsNo?: number | undefined
) => {
  try {
    let apiUrl = `http://localhost/BSA/HelpBox/selectbf_DMS?companyid=${companyid}&StrUserCode=${username}`
    if (contractDocId && vsNo) {
      apiUrl += `&contractualdocid=${contractDocId}&contractualV_SNo=${vsNo}`
    } else if (contractDocId) {
      apiUrl += `&contractualdocid=${contractDocId}`
    } else if (vsNo) {
      apiUrl += `&contractualV_SNo=${vsNo}`
    }

    const response = await fetch(apiUrl)
    const data: Bf = await response.json()
    if (data.success) {
      setBf([data])
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
      setBf([])
    }
  } catch (error) {
    console.error('Failed to fetch bf:', error)
  }
}

export const fetchGsm = async (
  bu: string | number | true | object | null,
  companyid: string | number | true | object | null,
  setGsm: Dispatch<SetStateAction<Gsm[]>>,
  username: string | number | true | object | null,
  contractDocId?: string | undefined,
  vsNo?: number | undefined
) => {
  try {
    let apiUrl = `http://localhost/BSA/HelpBox/selectgsm_DMS?companyid=${companyid}&StrUserCode=${username}`

    if (contractDocId && vsNo) {
      apiUrl += `&contractualdocid=${contractDocId}&contractualV_SNo=${vsNo}`
    } else if (contractDocId) {
      apiUrl += `&contractualdocid=${contractDocId}`
    } else if (vsNo) {
      apiUrl += `&contractualV_SNo=${vsNo}`
    }

    const response = await fetch(apiUrl)
    const data: Gsm = await response.json()
    if (data.success) {
      setGsm([data])
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
      setGsm([])
    }
  } catch (error) {
    console.error('Failed to fetch GSM:', error)
  }
}

export const fetchItemName = async (
  companyid: string | number | true | object | null,
  setItem: React.Dispatch<React.SetStateAction<ItemName[]>>,
  username: string | number | true | object | null,
  transTypeCat: string | undefined,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null,
  contractDocId?: string | undefined,
  vsNo?: number | undefined
) => {
  try {
    const response = await ItemNameAction(
      companyid,
      username,
      transTypeCat,
      contractDocId,
      vsNo,
      Site_Code,
      bu
    )

    if (response?.success) {
      setItem([response])
    } else {
      // If there is an error, log the error message
      const errorMessage = response?.error
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
      setItem([])
    }
  } catch (error) {
    console.error('Failed to fetch item name:', error)
  }
}

export const fetchPackingType = async (
  setPackingType: React.Dispatch<React.SetStateAction<Type[]>>,
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) => {
  try {
    // 🔁 Convert everything to string
    const response = await PackingTypeAction(
      String(username),
      String(companyid),
      String(Site_Code),
      String(bu)
    )

    const data: Type = response

    if (data?.success) {
      setPackingType([data])
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
      setPackingType([])
    }
  } catch (error) {
    console.error('❌ Failed to fetch item name:', error)
    toast.error('Network error while fetching packing type')
  }
}

export const handleBFChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  bf: Bf[],
  setSelectedBF: (value: string) => void,
  setFormData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail>>,
  setBfError: React.Dispatch<React.SetStateAction<string>>,
  setStrBFCode: React.Dispatch<React.SetStateAction<string>>,
  fetchPriceList: Function,
  isPriceListApplicable: number,
  contractDocId: string | undefined,
  ordertype: string | undefined,
  currentDate: string,
  vsNo: number | undefined,
  bu: string | number | true | object | null,
  formData: clsSaleOrderItemDetail // ✅ current form data
) => {
  const selectedBfName = event.target.value
  setStrBFCode(selectedBfName)
  setSelectedBF(selectedBfName)

  const selectedItem = bf[0].data.find(item => item.code == selectedBfName)

  if (selectedItem) {
    setFormData(prevFormData => ({
      ...prevFormData,
      StrBFName: selectedItem.Name,
      StrBf: selectedBfName
    }))
    const { StrItemCode, StrGsm } = formData

    if (isPriceListApplicable === 200 || contractDocId !== '') {
      fetchPriceList(ordertype || '', StrItemCode, currentDate, selectedBfName, StrGsm, contractDocId, vsNo, bu)
    }
    setBfError('')
  } else {
    setFormData(prevFormData => ({
      ...prevFormData,
      StrBFName: '',
      StrBf: '',
      DblRate: 0,
      DblAgreedRate: 0
    }))
  }
}

export const handleGsmChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  gsm: Gsm[],
  setFormData: Dispatch<SetStateAction<clsSaleOrderItemDetail>>,
  setGsmError: React.Dispatch<React.SetStateAction<string>>,
  setStrGSMCode: React.Dispatch<React.SetStateAction<string>>,
  fetchPriceList: Function,
  isPriceListApplicable: number,
  contractDocId: string | undefined,
  ordertype: string | undefined,
  currentDate: string,
  vsNo: number | undefined,
  bu: string | number | true | object | null,
  formData: clsSaleOrderItemDetail // ✅ receive current formData for accurate values
) => {
  const selectedGsmCode = event.target.value
  const selectedItem = gsm[0].data.find(item => item.code == selectedGsmCode)

  if (selectedItem) {
    setStrGSMCode(selectedItem.code)
    setFormData(prevFormData => ({
      ...prevFormData,
      StrGsmName: selectedItem.Name,
      StrGsm: selectedItem.code
    }))
    const { StrItemCode, StrBf } = formData
    if (isPriceListApplicable === 200 || contractDocId !== '') {
      fetchPriceList(ordertype || '', StrItemCode, currentDate, StrBf, selectedGsmCode, contractDocId, vsNo, bu)
    }
    setGsmError('')
  } else {
    setFormData(prevFormData => ({
      ...prevFormData,
      StrGsmName: '',
      StrGsm: '',
      DblRate: 0,
      DblAgreedRate: 0
    }))
  }
}

export const Gettaxes = async (
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrItemCode: string | number | true | object,
  StrFormCode: string | number | true | object,
  bu: string | number | true | object | null,
  setFormData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail>>
) => {
  const response = await TaxesAction(Site_Code, companyid, StrItemCode, StrFormCode, bu)

  if (response.success && Array.isArray(response.data)) {
    const cgst = (response.data as Taxes[]).find(tax => tax.ECode === 'CGST')
    const sgst = (response.data as Taxes[]).find(tax => tax.ECode === 'SGST')
    const igst = (response.data as Taxes[]).find(tax => tax.ECode === 'IGST')

    setFormData(prev => {
      const cgstPer = cgst?.Per ?? 0
      const sgstPer = sgst?.Per ?? 0
      const igstPer = igst?.Per ?? 0

      return {
        ...prev,
        DblCGST_Per: cgstPer,
        DblSGST_Per: sgstPer,
        DblIGST_Per: igstPer
      }
    })
  }
}


export const GetPOtaxes = async (
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrItemCode: string | number | true | object,
  StrFormCode: string | number | true | object,
  bu: string | number | true | object | null,
  setFormData: React.Dispatch<React.SetStateAction<PoDetailInterface>>
) => {
  const response = await TaxesAction(Site_Code, companyid, StrItemCode, StrFormCode, bu)

  if (response.success && Array.isArray(response.data)) {
    const cgst = (response.data as Taxes[]).find(tax => tax.ECode === 'CGST')
    const sgst = (response.data as Taxes[]).find(tax => tax.ECode === 'SGST')
    const igst = (response.data as Taxes[]).find(tax => tax.ECode === 'IGST')

    setFormData(prev => {
      const cgstPer = cgst?.Per ?? 0
      const sgstPer = sgst?.Per ?? 0
      const igstPer = igst?.Per ?? 0

      return {
        ...prev,
        DblCGST_Per: cgstPer,
        DblSGST_Per: sgstPer,
        DblIGST_Per: igstPer
      }
    })
  }
}

export const handleItemNameChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  item: ItemName[],
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  setFormData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail>>,
  setItemnameError: React.Dispatch<React.SetStateAction<string>>,
  setStrItemCode: React.Dispatch<React.SetStateAction<string>>,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null,
  StrFormCode: string
) => {
  const selectedItemName = event.target.value

  // Find the corresponding ItemCode object for the selected ItemName
  const selectedItem = item[0].data.find(item => item.Code === selectedItemName)
  
  // If the corresponding ItemCode is found, set it in formData
  if (selectedItem) {
   
    setStrItemCode(selectedItem.Code)
    setSelectedItem(selectedItemName)
    setFormData(prevFormData => ({
      ...prevFormData,
      StrItemName: selectedItem.Name,
      StrItemCode: selectedItem.Code
    }))
    Gettaxes(Site_Code, companyid, selectedItemName, StrFormCode, bu, setFormData)
    setItemnameError('')
  } else {
    setFormData(prevFormData => ({
      ...prevFormData,
      StrItemName: '',
      StrItemCode: ''
    }))
  }
}

export const handlePackingTypeChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  packingtype: Type[],
  setselectedPackingType: React.Dispatch<React.SetStateAction<string>>,
  setFormData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail>>,
  setPackingtypeError: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedPackingTypeName = event.target.value
  if (selectedPackingTypeName == '') {
    setFormData(prevFormData => ({
      ...prevFormData,
      strPackingType: '',
      strPackingTypeName: ''
    }))
  } else {
    const selectedPackingType = packingtype[0].data.find(packingtype => packingtype.Code == selectedPackingTypeName)
    if (selectedPackingType) {
      setselectedPackingType(selectedPackingTypeName)
      setFormData(prevFormData => ({
        ...prevFormData,
        strPackingType: selectedPackingType.Code,
        strPackingTypeName: selectedPackingType.Name
      }))
      setPackingtypeError('')
    }
  }
}

export const handlePackingTypeFocus = (
  isFetchedPackingType: boolean,
  fetchPackingType: () => Promise<void>,
  setisFetchedPackingType: (fetched: boolean) => void
) => {
  if (!isFetchedPackingType) {
    fetchPackingType().then(() => setisFetchedPackingType(true))
  }
}

export const handleSizeUnitChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  sizeUnit: SizeUnit[],
  setFormData: React.Dispatch<React.SetStateAction<clsSaleOrderItemDetail>>,
  setSelectedSizeUnit: (value: string) => void,
  setSizeUnitError: React.Dispatch<React.SetStateAction<string>>
) => {
  const selectedSizeUnit = event.target.value
  setSelectedSizeUnit(selectedSizeUnit)

  const selectedSizeUnitName = sizeUnit[0].data.find(item => item.Code == selectedSizeUnit)
  console.log('code', selectedSizeUnitName?.Code)
  console.log('name', selectedSizeUnitName?.Code)
  setFormData(prevFormData => ({
    ...prevFormData,
    StrSizeUnitName: selectedSizeUnitName?.Code || '',
    StrSizeUnit: selectedSizeUnitName?.Code || ''
  }))
  setSizeUnitError('')
}

export const handleSizeUnitFocus = (
  isFetchedSizeUnit: boolean,
  fetchSizeUnit: () => Promise<void>,
  setIsFetchedSizeUnit: (fetched: boolean) => void
) => {
  if (!isFetchedSizeUnit) {
    fetchSizeUnit().then(() => setIsFetchedSizeUnit(true))
  }
}
