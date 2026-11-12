'use server'

import type {
  OrderStatus,
  PartyforSale,
  OrderStatusParams,
  DeleteOrderParams,
  DeleteOrderResponse,
  ReportFile
} from './SaleOrder_List_modal'

export default async function orderStatusAction(
  params: OrderStatusParams,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  username: string | number | true | object,
  bu: string | null
) {
  const { StrFromDate, StrToDate } = params

  let apiUrl = `http://localhost/BSA/SaleOrder/GetSOrdStaus_DMS?site_code=${Site_Code}&companyid=${companyid}&username=${username}&StrStatus=0,3,2&strRole=Employee&StrUserCode=${username}`

  if (StrFromDate != '') {
    apiUrl += `&StrFromDate=${encodeURIComponent(StrFromDate)}`
  }
  if (StrToDate != '') {
    apiUrl += `&StrToDate=${encodeURIComponent(StrToDate)}`
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData: OrderStatus = await response.json()

    if (response.ok) {
      return responseData // Return the fetched data for further processing
    } else {
      console.error('Failed to get order status:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting order status:', error)
    return null // Return null in case of an exception
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchParties = async (
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
): Promise<PartyforSale> => {
  const url = `http://localhost/BSA/HelpBox/SelectParty_DMS?site_code=${Site_Code}&companyid=${companyid}&StrUserCode=${UserName}&strRole=Employee`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data: PartyforSale = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching parties:', error)
    return {
      success: false,
      data: [],
      error: (error as Error).message
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteOrderAction({
  UserName,
  Site_Code,
  companyid,
  clientId,
  LinkCode,
  StrToken,
  clientCode,
  bu
}: DeleteOrderParams): Promise<DeleteOrderResponse> {
  try {
    const response = await fetch(`http://localhost/BSA/SaleOrder/DeleteDMSSord_DMS`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserName,
        Site_Code,
        companyid,
        StrDocid: clientId,
        StrUserCode: LinkCode ?? UserName,
        strRole: "Employee",
        StrToken,
        strClientCode: clientCode
      })
    })

    const data = await response.json()
    return {
      success: data.success,
      responseText: data.responseText
    }
  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      responseText: '',
      error: (error as Error).message
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function fetchPdfDataForClient(
  clientId: number,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
): Promise<ReportFile | null> {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetPrintDmsSord?username=sa&site_code=${Site_Code}&companyid=${companyid}&StrDocid=${clientId}&username=${UserName}&StrUserCode=${UserName}&strRole=Employee`

  try {
    const res = await fetch(apiUrl)

    if (!res.ok) {
      console.error('Failed to fetch PDF from backend:', res.statusText)
      return null
    }

    const data: ReportFile = await res.json()
    return data
  } catch (err) {
    console.error('Error in fetchPdfDataForClient:', err)
    return null
  }
}
