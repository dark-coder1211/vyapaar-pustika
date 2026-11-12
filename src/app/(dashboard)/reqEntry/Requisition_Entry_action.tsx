'use server'

import axios from 'axios'
import type { PostReqFormData } from './Requisition_Entry_modal'

export async function GetReqHeaderByDocid(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
) {
  if (!Docid) return null

  const apiUrl = `http://localhost/BSA/Store/GetReqHeaderByDocid?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${Docid}`

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetReqDetailByDocid(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
) {
  if (!Docid) return null

  const apiUrl = `http://localhost/BSA/Store/GetReqDetailByDocid?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${Docid}`

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AddRequisitionAction = async (
  data: PostReqFormData,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  let apiUrl
  if (data.clsRequHeader[0].strDocId === '') {
    apiUrl = `http://localhost/BSA/Store/AddRequisition?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`
  } else {
    apiUrl = `http://localhost/BSA/Store/EditRequisition?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`
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
    return { success: false, data: null }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getBalance = async (
  strTableName: string,
  strFirstColumn: string,
  strSecondColumn: string,
  strBalanceOfColumn: string,
  strBalanceOf: string,
  Site_Code: string,
  companyid: string,
  bu: string
) => {
  const apiUrl = `http://localhost/BSA/Purchase/FGetBalance?companyid=${companyid}&strTableName=${strTableName}&strFirstColumn=${strFirstColumn}&strSecondColumn=${strSecondColumn}&strBalanceOfColumn=${strBalanceOfColumn}&strBalanceOf=${strBalanceOf}&strCondition=and site_code='${Site_Code}'`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting balance:', error)
    return null
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RecidNOHelp = async (
  StrCurrentDate: string,
  StrV_Type: string,
  StrtableName: string,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  try {
    const response = await axios.get(
      `http://localhost/BSA/RecId/RecidNOHelp?Site_Code=${Site_Code}&userName=${UserName}&companyid=${companyid}&StrCurrentDate=${StrCurrentDate}&StrV_Type=${StrV_Type}&StrtableName=${StrtableName}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching rec IDs:', error)
    throw error
  }
}
