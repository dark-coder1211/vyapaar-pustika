'use server'

import axios from 'axios'
import type { ReportFile } from './Indent_List_modal'

export const getIndentList = async (
  bu: string,
  Site_Code: string,
  companyid: string,
  strfromdate: string,
  strtodate: string
) => {
  const apiUrl = `http://localhost/BSA/Purchase/GetIndentList?Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`
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

///////////////////////////////////////////////////////////////////////////////////////////////////

export async function DeleteIndentAction(
  StrDocID: string,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) {
  const API_URL = `http://localhost/BSA/Purchase/DeleteIndent?username=${UserName}&Site_Code=${Site_Code}&StrDocID=${StrDocID}&companyid=${companyid}`

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = await response.json()

    if (response.status === 200) {
      // Assuming responseData.success indicates success from API
      console.log('Indent deleted successfully')
      return responseData // Return the fetched data for further processing
    } else {
      console.error('Failed to delete Indent:', responseData.message || responseData)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error deleting Indent:', error)
    return null // Return null in case of an exception
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const handleIndDocPrint = async (
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string,
  Docid?: string
): Promise<ReportFile | null> => {
  try {
    const apiUrl = `http://localhost/BSA/Purchase/GetPrintIndent?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`

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
