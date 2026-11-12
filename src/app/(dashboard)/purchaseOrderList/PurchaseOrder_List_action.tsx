'use server'
import axios from 'axios'
import type { ReportFile } from './PurchaseOrder_List_modal'

export async function DeletePOAction(
  StrDocID: string,
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const API_URL = `http://localhost/BSA/Purchase/DeletePO?username=${UserName}&Site_Code=${Site_Code}&StrDocID=${StrDocID}&companyid=${companyid}`

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // If it's truly a POST, even though the params are in query string
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = await response.json()

    if (response.ok) {
      console.log('Purchase Order deleted successfully')
      return responseData
    } else {
      console.error('Failed to delete Purchase Order:', responseData.message || responseData)
      return null
    }
  } catch (error) {
    console.error('Error deleting Purchase Order:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPurchaseOrderList = async (
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string,
  strfromdate: string,
  strtodate: string
) => {
  const apiUrl = `http://localhost/BSA/Purchase/GetPurchaseOrderList?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error getting purchase order list:', error)
    return null
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const handlePODocPrint = async (
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string,
  Docid?: string
): Promise<ReportFile | null> => {
  try {
    const apiUrl = `http://localhost/BSA/Purchase/GetPrintPO?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error('Failed to fetch PDF data:', response.statusText)
      return null
    }

    const data: ReportFile = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching PDF:', error)
    return null
  }
}
