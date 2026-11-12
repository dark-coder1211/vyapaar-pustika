'use server'

import type { VGPOut } from "./visitorGateOutList_modal"


export const getVistorGateOutList = async (UserName: string, Site_Code: string, companyid: string, bu: string , strfromdate: string, strtodate: string) => {
  const apiUrl = `http://localhost/BSA/Gate/getvisitorgatepassoutlist?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error("API Error", response.status)
      return null
    }

    const responseData: VGPOut = await response.json()
    console.log("API Response:", responseData)

    return responseData
  } catch (error) {
    console.error("Fetch Error:", error)
    return null
  }
}
