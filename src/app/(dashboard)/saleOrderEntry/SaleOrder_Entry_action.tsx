'use server'

import type { clsSaleOrderHeader, PostFormData } from './SaleOrder_Entry_modal'

export async function ConsigneesAction(
  strPartyCode: string | undefined,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderConsigneeHelp?Site_Code=${Site_Code}&companyid=${companyid}&strPartyCode=${strPartyCode}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response) {
      return data
    } else {
      console.error('Failed to fetch consignee:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching consignee:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function DeliveryAction(
  username: string | number | true | object | null,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/HelpBox/selectdeliveryto_DMS?companyid=${companyid}&site_code=${Site_Code}&strRole=Employee&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function TransactionTypeAction(
  strV_TypeCode: string | number | true | undefined,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderTransactionTypeHelp?Site_Code=${Site_Code}&companyid=${companyid}&strV_TypeCode=${strV_TypeCode}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const formatDate = (date: Date): string => {
  const d = new Date(date)
  const day = d.getDate()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export async function OrderNumberAction(
  username: string | number | true | object | null,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const today = formatDate(new Date())

  const apiUrl = `http://localhost/BSA/recid/PlaceOrderNo_DMS?strTableName=dmsSOrd&username=${username}&companyid=${companyid}&StrV_Date=${today}&StrV_Type=SODMS&Site_Code=${Site_Code}&StrUserCode=${username}&strRole=Employee`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function FreightTypeAction(Site_Code: string, companyid: string, username: string, bu: string) {
  // const userCode = LinkCode || username;

  const apiUrl = `http://localhost/BSA/saleOrder/GetFreightType_DMS?Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    const text = await response.text()

    try {
      const data = JSON.parse(text)
      if (response.ok) {
        return data
      } else {
        console.error('API responded with error:', data.message || data)
        return null
      }
    } catch (jsonError) {
      console.error('❌ Response is not valid JSON. Raw response:', text)
      return null
    }
  } catch (error) {
    console.error('❌ Network or fetch error:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function Addressbookaction(
  strconsignee: string | number | true | object,
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/saleOrder/GetAddressbook_DMS?Site_Code=${Site_Code}&companyid=${companyid}&strconsignee=${strconsignee}&StrUserCode=${username}`

  try {
    if (strconsignee) {
      const response = await fetch(apiUrl)
      const data = await response.json()
      console.log('data', data)
      if (response.ok) {
        return data
      } else {
        console.error('Failed to fetch consignee:', data.message)
        return null
      }
    }
  } catch (error) {
    console.error('Error fetching address book:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function SiteDataAction(
  companyid: string | number | true | object | null,
  username: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/HelpBox/SelectSite_DMS?companyid=${companyid}&StrUserCode=${username}&strRole=Employee`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function PartyAction(
  strV_TypeCode: string | undefined,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderPartyHelp?companyid=${companyid}&Site_code=${Site_Code}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch consignee:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching party:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function OrderTypeAction(
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderOrderTypeHelp?companyid=${companyid}&Site_code=${Site_Code}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch consignee:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching party:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetTermsCondAction(
  { clientId }: { clientId: string | null },
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetSaleOrderTermsConditionByDocID?companyid=${companyid}&Site_Code=${Site_Code}&strDocID=${clientId}&username=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function TermsCondAction(
  strv_type: string,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/FGetTerm_Cond?companyid=${companyid}&Site_Code=${Site_Code}&strv_type=${strv_type}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const placeOrderAction = async (
  data: clsSaleOrderHeader,
  username: string,
  Site_Code: string,
  companyid: string,
  bu: string
) => {
  let apiUrl
  if (data.StrDocID === '') {
    apiUrl = `http://localhost/BSA/SaleOrder/SaveSaleOrderEntry?username=${username}&Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${username}&strRole=Employee&strMode=ADD`
  } else {
    apiUrl = `http://localhost/BSA/SaleOrder/SaveSaleOrderEntry?username=${username}&Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${username}&strRole=Employee`
  }
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()

    return responseData
  } catch (error) {
    return error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function ContractSalesOrderAction(
  docId: string,
  selectedParty: string | number | true | object,
  PartyCode: string | number | true | object,
  username: string | number | true | object | null,
  Site_Code: string,
  companyid: string,
  bu: string | number | true | object | null
) {
  // let apiUrl
  // if (docId == '') {
  //   if (selectedParty) {
  //     apiUrl = `http://localhost/BSA/RecId/ContractSordHelp_DMS/?site_code=${Site_Code}&companyid=${companyid}&strPartyCode=${selectedParty}&username=${username}&StrUserCode=${username}`
  //   } else {
  //     apiUrl = `http://localhost/BSA/RecId/ContractSordHelp_DMS/?site_code=${Site_Code}&companyid=${companyid}&strPartyCode=${PartyCode}&username=${username}&StrUserCode=${username}`
  //   }
  // } else {
  //   apiUrl = `http://localhost/BSA/RecId/ContractSordHelp_DMS/?site_code=${Site_Code}&companyid=${companyid}&strPartyCode=${selectedParty}&strDocid=${docId}&username=${username}&StrUserCode=${username}`
  // }

  const apiUrl = `http://localhost/BSA/RecId/ContractSordHelp_DMS/?site_code=${Site_Code}&companyid=${companyid}&strPartyCode=${PartyCode}&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch contract sale order:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching contract sale order:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function cosonoAction(
  docId: string,
  contractDocId: string | undefined,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/RecId/ContractSordHelpV_Sno_DMS?companyid=${companyid}&Site_Code=${Site_Code}&strDocid=${docId}&strCDocid=${contractDocId}&intv_SNo=0&username=${UserName}&StrUserCode=${UserName}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function IsPriceListApplicableAction(
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string | null
) {
  const apiUrl = `http://localhost/BSA/saleOrder/GetPriceApplicableYN_DMS?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${UserName}&strRole=Employee`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function cosonoDetailAction(
  docId: string,
  contractDocId: string | undefined,
  intv_SNo: number | undefined,
  username: string | number | true | object | null,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/RecId/ContractSordHelpV_Sno_DMS?companyid=${companyid}&Site_Code=${Site_Code}&strDocid=${docId}&strCDocid=${contractDocId}&intv_SNo=${intv_SNo}&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function PriceListAction(
  ordertype: string,
  StrItemCode: string,
  currentDate: string,
  StrBFCode: string,
  StrGSMCode: string,
  contractDocId: string | undefined,
  vsNo: number | undefined,
  Site_Code: string,
  companyid: string,
  UserName: string,
  HeaderPartyCode: string,
  bu: string | number | true | object | null
) {
  let apiUrl = `http://localhost/BSA/SaleOrder/FGetPriceList_DMS?site_code=${Site_Code}&companyid=${companyid}&username=${UserName}&StrorderType=${ordertype}&StrItemCode=${StrItemCode}&StrV_Date=${currentDate}&StrBFCode=${StrBFCode}&StrGSMCode=${StrGSMCode}&username=${UserName}&StrUserCode=${UserName}&strRole=Employee&StrPartyCode=${HeaderPartyCode}`

  if (contractDocId && vsNo) {
    apiUrl += `&contractualdocid=${contractDocId}&contractualV_SNo=${vsNo}`
  } else if (contractDocId) {
    apiUrl += `&contractualdocid=${contractDocId}`
  } else if (vsNo) {
    apiUrl += `&contractualV_SNo=${vsNo}`
  }

  console.log('PRICE LIST URL', apiUrl)
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log('PRICE LIST DATA', data)
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function ToPlaceAction(
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderToPlaceHelp?Site_Code=${Site_Code}&companyid=${companyid}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function ExcisableAction(
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderExciseHelp?Site_Code=${Site_Code}&companyid=${companyid}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function OrderNoAction(
  StrV_Type: string | undefined,
  StrCurrentDate: string,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  username: string | number | true | object | null,
  bu: string | number | true | object | null,
  strtransactiontypecode?: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/RecId/GetSaleOrderNumberSystem?Site_Code=${Site_Code}&companyid=${companyid}&username=${username}&strV_Date=${StrCurrentDate}&strV_Type=${StrV_Type}&strtransactiontypecode=${strtransactiontypecode}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}
