import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const getbaseURLFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('BaseURL') : null)
const getSite_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Code') : null)
const getSite_NameFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Name') : null)
const getComp_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Comp_Code') : null)
const getUserNameFromSession = () =>
  typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string) : null

export const baseUrl = getbaseURLFromSession() || ''
export const Site_Code = getSite_CodeFromSession() || ''
export const Site_Name = getSite_NameFromSession() || ''
export const companyid = getComp_CodeFromSession() || ''
export const UserName = getUserNameFromSession() || ''

export const SubGroupHelp = async (StrNature: string[] | string, Site_Code: string, companyid: string, bu: string) => {
  // If it's an array, join it into the required string format
  const natureParam = Array.isArray(StrNature) ? StrNature.map(nature => `'${nature}'`).join(',') : `'${StrNature}'`

  const apiUrl = `http://localhost/BSA/Filter/SubGroupHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrNature=${natureParam}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const PurchaseOrderHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/PurchaseOrderHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ReqNoHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ReqnoHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ItemHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ItemHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}


export const ReqNoStkIsuHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/RequisitionNo?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const DepartmentHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/DepartmentHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const CostCenterHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/CostCenterHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const IndentNoHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/IndentNoHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ItemMakeHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ItemMakeHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ItemGroupHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ItemGroupHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ItemCatHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ItemCatHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const TransactionTypeHelp = async (Site_Code: string, companyid: string, bu: string, StrCondition?: string) => {
  let apiUrl = `http://localhost/BSA/Filter/TransactionTypeHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  if (StrCondition) {
    apiUrl += `&StrCondition=${StrCondition}`
  }
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const FGetAgainstForm = async (
  Site_Code: string,
  companyid: string,
  bu: string,
  StrV_Type?: string,
  StrPartyLocation?: string
) => {
  const apiUrl = `http://localhost/BSA/Filter/FGetAgainstForm?Site_Code=${Site_Code}&companyid=${companyid}&StrV_Type=${StrV_Type}&StrPartyLocation=${StrPartyLocation}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const FGetCurrency = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/FGetCurrency?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const QuotationNoHelp = async (Site_Code: string, companyid: string, bu: string, StrSupplierCode?: string) => {
  const apiUrl = `http://localhost/BSA/Filter/QuotationNoForPordHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrSupplierCode=${StrSupplierCode}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const PendingIndentNoHelp = async (
  Site_Code: string,
  companyid: string,
  bu: string,
  StrSupplierCode?: string,
  StrV_Date?: string
) => {
  const apiUrl = `http://localhost/BSA/Filter/PendingIndentForPordHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrSupplierCode=${StrSupplierCode}&StrV_Date=${StrV_Date}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const SiteMastHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/SiteMastHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const VoucherTypeHelp = async (StrCondition: string, Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/VoucherTypeHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrCondition=${StrCondition}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const SaleOrderHelp = async () => {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderNoHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const SOSubGroupHelp = async () => {
  const apiUrl = `http://localhost/BSA/Filter/SubGroupHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrNature='Customer','Agent'`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const BFHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/BFHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const GSMHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/GSMHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ZoneHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ZoneHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const StatusHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/StatusHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const OrderTypeHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/OrderTypeHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ReportForHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ReportForHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const OrderStatusHelp = async () => {
  const apiUrl = `http://localhost/BSA/Filter/OrderStatusHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const WidthHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/WidthHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const LengthHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/LengthHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const SizeUnitHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/SizeUnitHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const UnitHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/UnitHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const SaleOrderNoHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderNoHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const MethodHelp = async (companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/StockReportMethod?companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ClassificationHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/ClassificationHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const VarityHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/VarityMastHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ReportForHelpGateVsInvoice = async (companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/GateVsInvoiceReportFor?companyid=${companyid}`
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const SaleTypeHelp = async (companyid: string, Site_Code: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/SaleTypeHelp?companyid=${companyid}&Site_Code=${Site_Code}`
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const AccountGroupHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/AccountGroupHelp?companyid=${companyid}&Site_Code=${Site_Code}`
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const ReportOnHelp = async (companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/BillWiseLedgerReportOnHelp?companyid=${companyid}`
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const PurposeHelp = async (companyid: string, bu: string) => {
  try {
    const response = await axios.get(`http://localhost/BSA/Filter/GateEntryPurposeHelp?companyid=${companyid}`)
    return response.data
  } catch (error) {
    console.error('Error fetching godown:', error)
    throw error
  }
}

export const WeighmentHelp = async (companyid: string, bu: string) => {
  try {
    const response = await axios.get(`http://localhost/BSA/Filter/GateEntryweighmentHelp?companyid=${companyid}`)
    return response.data
  } catch (error) {
    console.error('Error fetching godown:', error)
    throw error
  }
}

export const VehicleTypeHelp = async (Site_Code: string, companyid: string, bu: string) => {
  try {
    const response = await axios.get(
      `http://localhost/BSA/Filter/VehicleTypeHelp?companyid=${companyid}&site_code=${Site_Code}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching godown:', error)
    throw error
  }
}

export const CityHelp = async (Site_Code: string, companyid: string, UserName: string, bu: string) => {
  try {
    const response = await axios.get(
      `http://localhost/BSA/HelpBox/SelectCityState_DMS?companyid=${companyid}&StrUserCode=${UserName}&strRole=Employee&Site_Code=${Site_Code}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching godown:', error)
    throw error
  }
}

export const IssueForHelp = async (
  Site_Code: string,
  companyid: string,
  bu: string,
  StrMode?: string,
  StrCurrentDocID?: string
) => {
  let apiUrl = `http://localhost/BSA/Filter/IssuedForHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  if (StrMode) {
    apiUrl += `&StrMode=${encodeURIComponent(StrMode)}`
  }
  if (StrCurrentDocID) {
    apiUrl += `&StrCurrentDocID=${encodeURIComponent(StrCurrentDocID)}`
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const IssueTypeHelp = async (Site_Code: string, companyid: string, bu: string, StrIssuedFor?: string) => {
  let apiUrl = `http://localhost/BSA/Filter/IssuedTypeHelp?Site_Code=${Site_Code}&companyid=${companyid}`
  if (StrIssuedFor) {
    apiUrl += `&StrIssuedFor=${encodeURIComponent(StrIssuedFor)}`
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const GetPurchaseAcAndConsumptionAc = async (
  Site_Code: string,
  companyid: string,
  bu: string,
  StrMode?: string,
  StrCostCenterCode?: string
) => {
  let apiUrl = `http://localhost/BSA/Filter/StoreIssuePurchaseAcAndConsumptionAcDetail?Site_Code=${Site_Code}&companyid=${companyid}`

  if (StrMode) {
    apiUrl += `&StrMode=${encodeURIComponent(StrMode)}`
  }
  if (StrCostCenterCode) {
    apiUrl += `&StrCostCenterCode=${encodeURIComponent(StrCostCenterCode)}`
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const LocationHelp = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/LocationHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const LotNoHelp = async (
  Site_Code: string,
  companyid: string,
  StrMode: string,
  StrEntryDate: string,
  StrItemCode: string,
  StrGodownCode: string,
  BlnAllowNegativeYN: string
) => {
  let apiUrl = `http://localhost/BSA/Filter/LotNoHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  // Append parameters only if they exist
  if (StrMode) {
    apiUrl += `&StrMode=${encodeURIComponent(StrMode)}`
  }
  if (StrEntryDate) {
    apiUrl += `&StrEntryDate=${encodeURIComponent(StrEntryDate)}`
  }
  if (StrItemCode) {
    apiUrl += `&StrItemCode=${encodeURIComponent(StrItemCode)}`
  }
  if (StrGodownCode) {
    apiUrl += `&StrGodownCode=${encodeURIComponent(StrGodownCode)}`
  }
  if (BlnAllowNegativeYN) {
    apiUrl += `&BlnAllowNegativeYN=${encodeURIComponent(BlnAllowNegativeYN)}`
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting LotNoHelp data:', error)
    return null
  }
}


export const GateNoHelp = async (Site_Code: string, companyid: string, bu: string, StrCondition?: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GateNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrCondition=${StrCondition}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}


export const GateEntryPartyHelps = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GateEntryPartyHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const GateEntryOrderNoHelps = async (Site_Code: string, companyid: string, bu: string, StrPartyCode: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GateEntryOrderNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrPartyCode=${StrPartyCode}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}


export const GateEntryAdviseItemHelps = async (Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GateEntryAdviseItemHelp?Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const GateEntryAdviseChangeItemHelps = async (Site_Code: string, companyid: string, bu: string, StrItemCode: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GateEntryAdviseChangeItemHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrItemCode=${StrItemCode}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}
