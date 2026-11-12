'use server'

import axios from 'axios'

export const LedgerReports = async (
  filters: {
    StrFromDate?: string
    StrToDate?: string
    Site_Code?: string
    StrDistributorCode?: string
    AccountCode?: string
    AccountGroupCode?: string
  },
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
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
        if (key === 'StrFromDate' || key === 'StrToDate') params.append(key, `${value}`)
        else params.append(key, `'${value}'`)
      }
    }
  }

  // Construct the API URL with the dynamic query parameters
  const apiUrl = `http://localhost/BSA/SaleOrder/GetLedgerFinancialStatements_DMS?Site_Code='${Site_Code}'&companyid=${companyid}&username=${UserName}&strRole=Employee&${params.toString()}`

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const PrintPDF = async (
  filters: {
    StrFromDate?: string
    StrToDate?: string
    Site_Code?: string
    StrDistributorCode?: string
    AccountCode?: string
    AccountGroupCode?: string
  },
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
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
        if (key === 'StrFromDate' || key === 'StrToDate') params.append(key, `${value}`)
        else params.append(key, `'${value}'`)
      }
    }
  }

  // Construct the API URL with the dynamic query parameters
  const apiUrl = `http://localhost/BSA/SaleOrder/GetPrintLedgerFinancialStatements_DMS?Site_Code='${Site_Code}'&companyid=${companyid}&username=${UserName}&strRole=Employee&StrUserCode=${UserName}&${params.toString()}`

  try {
    const response = await fetch(apiUrl, {
      cache: 'no-store' // ensures fresh data
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF data: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching PDF on server:', error)
    throw error
  }
}
