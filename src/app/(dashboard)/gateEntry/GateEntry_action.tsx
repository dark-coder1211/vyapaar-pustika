'use server'

import axios from 'axios'
import type { GateEntryInterface, ReportFile } from './GateEntry_modal'

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AddIndentAction = async (
  data: GateEntryInterface,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  let apiUrl
  if (data.strDocId === '') {
    apiUrl = `http://localhost/BSA/Gate/SaveGateEntry?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=ADD`
  } else {
    apiUrl = `http://localhost/BSA/Gate/SaveGateEntry?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`
  }

  console.log('body', data)

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetGateEntryHeaderByDocid(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
): Promise<any | null> {

  const apiUrl = `http://localhost/BSA/Gate/GetGateEntryHeaderByDocid?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${Docid}`

  try {
    const response = await axios.get(apiUrl)
    return response.data
  } catch (error) {
    console.error('Error getting gate entry header:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetGateEntryDetailByDocid(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
): Promise<any | null> {
  const apiUrl = `http://localhost/BSA/Gate/GetGateEntryDetailByDocid?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${Docid}`

  try {
    const response = await axios.get(apiUrl)
    return response.data
  } catch (error) {
    console.error('Error getting gate entry details:', error)
    return null
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const handleGateEntryDocPrint = async (
    Site_Code: string,
    companyid: string,
    UserName: string,
    bu: string,
    Docid?: string
): Promise<ReportFile | null> => {
    try {
        const apiUrl = `http://localhost/BSA/Gate/GetPrintGatepass?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`

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
