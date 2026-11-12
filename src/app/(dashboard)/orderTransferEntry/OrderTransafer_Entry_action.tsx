'use server'

import { Bf } from '@/components/interfaces/page'
import axios from 'axios'
import { toast } from 'react-toastify'

export const VoucherTypeHelp = async (StrCondition: string, Site_Code: string, companyid: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Filter/VoucherTypeHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrCondition=${StrCondition}`

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const GodownHelp = async (
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  try {
    const response = await axios.get(
      `http://localhost/BSA/HelpBox/SelectGodown?companyid=${companyid}&StrUserCode=${UserName}&strRole=Employee&Site_Code=${Site_Code}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching godown:', error)
    throw error
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TransferTypeHelp = async (
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  try {
    const response = await axios.get(
      `http://localhost/BSA/HelpBox/SelectTransferType?companyid=${companyid}&StrUserCode=${UserName}&strRole=Employee&Site_Code=${Site_Code}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching transfer type:', error)
    throw error
  }
}
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fetchBf = async (
  bu: string,
  companyid: string,
  // setBf: (data: Bf[]) => void,
  username: string,
  // contractDocId?: string | undefined,
  // vsNo?: number | undefined
) => {
  try {
    let apiUrl = `http://localhost/BSA/HelpBox/selectbf_DMS?companyid=${companyid}&StrUserCode=${username}`
    // if (contractDocId && vsNo) {
    //   apiUrl += `&contractualdocid=${contractDocId}&contractualV_SNo=${vsNo}`
    // } else if (contractDocId) {
    //   apiUrl += `&contractualdocid=${contractDocId}`
    // } else if (vsNo) {
    //   apiUrl += `&contractualV_SNo=${vsNo}`
    // }

    const response = await fetch(apiUrl)
    const data: Bf = await response.json()
    if (data.success) {
      // setBf([data])
      console.log('bf', data)
    } else {
      // If there is an error, log the error message
      const errorMessage = data.error
      console.error('Error:', errorMessage)
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      // setBf([])
    }
  } catch (error) {
    console.error('Failed to fetch bf:', error)
  }
}


