'use server'

import type { ReportFile, VGPIn, VisitorGateOutDetail } from './visitorGateInList_modal'

export const getVistorGateInList = async (
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string,
  strfromdate: string,
  strtodate: string
) => {
  const apiUrl = `http://localhost/BSA/Gate/getvisitorgatepassdetail?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error('API Error', response.status)
      return null
    }

    const responseData: VGPIn = await response.json()

    return responseData
  } catch (error) {
    console.error('Fetch Error:', error)
    return null
  }
}

export const SaveVisitorGatePassOutAction = async (
  SE: VisitorGateOutDetail,
  username: string,
  Site_Code: string,
  companyid: string
) => {
  const apiUrl = `http://localhost/BSA/Gate/SaveVisitorGatePassOutDetail?username=${username}&Site_Code=${Site_Code}&companyid=${companyid}`

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(SE) // only the object being sent in [FromBody]
    })

    const responseData = await response.json()
    return responseData
  } catch (error) {
    return { success: false, error: error }
  }
}

export async function DeleteVGPAction(
  StrDocID: string,
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const API_URL = `http://localhost/BSA/Gate/DeleteVisitorGatePass?username=${UserName}&Site_Code=${Site_Code}&strdocid=${StrDocID}&companyid=${companyid}`

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // If it's truly a POST, even though the params are in query string
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = await response.json()

    if (response.ok) {
      return responseData
    } else {
      console.error('Failed to delete Visitor Gate Pass:', responseData.message || responseData)
      return null
    }
  } catch (error) {
    console.error('Error deleting Visitor Gate Pass:', error)
    return null
  }
}


export const handleVisitorGateEntryDocPrint = async (
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string,
  Docid?: string
): Promise<ReportFile | null> => {
  try {
    const apiUrl = `http://localhost/BSA/Gate/GetPrintVisitorPass?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`

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
