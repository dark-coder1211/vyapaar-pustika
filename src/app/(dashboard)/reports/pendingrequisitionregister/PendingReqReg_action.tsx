'use server'

import axios from 'axios'

export const PendingReqRegReport = async (
  filters: {
    AsOnDate?: string
    StrOrderNo?: string
    StrPartyCode?: string
    StrItemCode?: string
    StrItemGroup?: string
    StrItemCat?: string
    StrTransactionType?: string
    StrSiteName?: string
  },
  Site_Code: string,
  companyid: string,
  UserName: string
) => {
  const params = new URLSearchParams()

  // Loop through the filters object and append non-empty values
  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      if (typeof value === 'string' && value.includes(',')) {
        // Handle comma-separated values (like StrPartyCode)
        const formattedValues = value
          .split(',')
          .map(val => `'${val.trim()}'`)
          .join(',')
        params.append(key, formattedValues)
      } else {
        // For all other single string values, wrap them in single quotes
        if (key === 'AsOnDate') params.append(key, `${value}`)
        else params.append(key, `'${value}'`)
      }
    }
  }

  // Get site code from filters, or use default value if not provided
  const siteCodeParam = Site_Code

  // Construct the API URL with the dynamic query parameters
  const apiUrl = `http://localhost/BSA/Reports/PendingRequisitionRegister?Site_Code='${siteCodeParam}'&companyid=${companyid}&${params.toString()}`
  if (UserName) {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200 && response.data) {
        return response.data // Return the filtered data
      } else {
        console.error('Unexpected response:', response)
        return null
      }
    } catch (error) {
      console.error('Error getting data:', error)
      return null
    }
  }
}
