'use server'

import type { OrderTrack } from './SOTrackingDisplay_modal'

export const OrderTrackingDisplay = async (
  filters: {
    StrfromDate?: string
    StrToDate?: string
    StrSaleOrderNo?: string
    StrPartyCode?: string
    StrItemCode?: string
    StrTransactionType?: string
    StrSiteName?: string
    StrDealerCode?: string
    StrConsigneeCode?: string
    StrStatus?: string
    StrOrderStatus?: string
    StrSizeUnit?: string
    StrOrderType?: string
    StrWidth?: string
    StrBFCode?: string
    StrGSMCode?: string
    StrReportFor?: string
    StrZone?: string
    StrLength?: string
  },
  Site_Code: string,
  companyid: string
) => {
  const params = new URLSearchParams()

  // Loop through filters and exclude StrPartyCode
  for (const [key, value] of Object.entries(filters)) {
    if (value && key !== 'StrPartyCode') {
      if (typeof value === 'string' && value.includes(',')) {
        const formattedValues = value
          .split(',')
          .map(val => `'${val.trim()}'`)
          .join(',')
        params.append(key, formattedValues)
      } else {
        if (key === 'StrfromDate') params.append(key, `${value}`)
        else params.append(key, `'${value}'`)
      }
    }
  }

  // Get site code from filters, or use default value if not provided
  const siteCodeParam = filters.StrSiteName ? filters.StrSiteName : Site_Code

  // Prepare StrPartyCode separately (if exists)
  const partyCodeParam = filters.StrPartyCode ? `&StrPartyCode=${filters.StrPartyCode}` : ''

  // Construct the API URL
  const apiUrl = `http://localhost/BSA/SaleOrder/GetOrderTrackingDisplay_DMS?Site_Code=${siteCodeParam}&companyid=${companyid}&${params.toString()}${partyCodeParam}&strRole=Employee`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData: OrderTrack = await response.json()

    if (response.ok) {
      return responseData
    } else {
      console.error('Failed to get order status')
    }
  } catch (error) {
    console.error('Error getting order status:', error)
  }
}
