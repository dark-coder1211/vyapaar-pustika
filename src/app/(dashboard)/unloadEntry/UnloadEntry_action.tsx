'use server'

import axios from 'axios'
import type { UnloadingEntryInterface } from './UnloadEntry_modal'

export const AddUnloadingAction = async (
  data: UnloadingEntryInterface,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  const apiUrl
     = `http://localhost/BSA/Gate/SaveGateEntryAdviseItem?companyid=${companyid}&Site_Code=${Site_Code}&username=${UserName}`
  

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getUnloadingEntryByDocId = async (bu: string, Site_Code: string, companyid: string, strDocId: string, IntV_sno: string) => {
  const apiUrl = `http://localhost/BSA/Gate/GetGateAdviseEntryByDocid/?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${strDocId}&IntV_sno=${IntV_sno}`
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

