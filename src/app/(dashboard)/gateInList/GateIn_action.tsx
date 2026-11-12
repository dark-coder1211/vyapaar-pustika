'use server'

import type { GateEntryOutDetail, VGPIn } from './GateIn_modal'

export const getGateInList = async (
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string,
  strfromdate: string,
  strtodate: string
) => {
  const apiUrl = `http://localhost/BSA/Gate/getgateentrydetail?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SaveGateEntryOutDetail = async (
  SE: GateEntryOutDetail,
  username: string,
  Site_Code: string,
  companyid: string
) => {
  const apiUrl = `http://localhost/BSA/Gate/SaveGateEntryOutDetail?username=${username}&Site_Code=${Site_Code}&companyid=${companyid}`

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function DeleteGateEntryAction(
  StrDocID: string,
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const API_URL = `http://localhost/BSA/Gate/DeleteGateEntry?username=${UserName}&Site_Code=${Site_Code}&strdocid=${StrDocID}&companyid=${companyid}`

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
      console.error('Failed to delete Gate Entry:', responseData.message || responseData)
      return null
    }
  } catch (error) {
    console.error('Error deleting Gate Entry:', error)
    return null
  }
}
