'use server'

import axios from 'axios'

export const getUnloadingList = async (bu: string, Site_Code: string, companyid: string, fromDate: string, toDate: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GetGateAdviseEntryByDocid/?Site_Code=${Site_Code}&companyid=${companyid}&fromdate=${fromDate}&todate=${toDate}`
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

export async function DeleteUnloadingAction(
    GateDocID: string,
    Site_Code: string,
    companyid: string,
    UserName: string,
    IntV_Sno: number,
    bu: string
) {
    const API_URL = `http://localhost/BSA/Gate/DeleteGateAdviseItem?username=${UserName}&Site_Code=${Site_Code}&strdocid=${GateDocID}&companyid=${companyid}&IntV_Sno=${IntV_Sno}`

    try {
        const response = await fetch(API_URL, {
            method: 'POST', // Specify the method as GET
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.json()

        if (response.status) {
            // Assuming responseData.success indicates success from API
            console.log('Record deleted successfully')
            return responseData // Return the fetched data for further processing
        } else {
            console.error('Failed to delete Record:', responseData.message || responseData)
            return null // Return null in case of an error
        }
    } catch (error) {
        console.error('Error deleting Record:', error)
        return null // Return null in case of an exception
    }
}

