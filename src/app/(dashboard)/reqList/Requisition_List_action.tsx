'use server'

import axios from 'axios'
import type { ReqApiResponse, ReportFile } from './Requisition_List_modal'

export async function DeleteReqAction(
  StrDocID: string,
  Site_Code: string,
  UserName: string,
  companyid: string,
  bu: string
) {
  const API_URL = `http://localhost/BSA/Store/DeleteRequisition?username=${UserName}&Site_Code=${Site_Code}&StrDocID=${StrDocID}&companyid=${companyid}`

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // assuming API expects POST
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = await response.json()

    if (response.ok) {
      console.log('Indent deleted successfully')
      return responseData
    } else {
      console.error('Failed to delete Indent:', responseData.message || responseData)
      return null
    }
  } catch (error) {
    console.error('Error deleting Indent:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getReqList(
  Site_Code: string,
  companyid: string,
  bu: string,
  strfromdate: string,
  strtodate: string
): Promise<ReqApiResponse | null> {
  const apiUrl = `http://localhost/BSA/Store/GetReqList?Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`

  try {
    const response = await axios.get<ReqApiResponse>(apiUrl, {     
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error getting requisition list:', error)
    return null
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function handleReqDocPrint(
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string,
  Docid?: string
): Promise<ReportFile | null> {
  const apiUrl = `http://localhost/BSA/Store/GetPrintRequisition?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
