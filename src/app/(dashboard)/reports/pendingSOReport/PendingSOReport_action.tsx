'use server'

import type { PendingOrder } from './PendingSOReport_modal'

export async function pendingOrderAction(
  Site_Code: string | number | true | object,
  companyid: string | number | true | object,
  username: string | number | true | object,
  role: string,
  bu: string | number | true | object,
  filters?: {
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
    StrZoneF?: string
    StrVDate?: string
  }
): Promise<PendingOrder | null> {
  const params = new URLSearchParams()

  // ✅ Mandatory parameters
  params.append('site_code', Site_Code.toString())
  params.append('companyid', companyid.toString())
  params.append('username', username.toString())
  params.append('strRole', role.toString())

  // ✅ Optional filters
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        const needsQuoting = (val: string) => {
          if (key === 'StrVDate') return false
          else isNaN(Number(val)) || /^\d{4}-\d{2}-\d{2}/.test(val) // quote dates & non-numbers
        }
        const formattedValue = value.includes(',')
          ? value
              .split(',')
              .map(v => (needsQuoting(v) ? `'${v.trim()}'` : v.trim()))
              .join(',')
          : needsQuoting(value)
            ? `'${value.trim()}'`
            : value.trim()

        params.append(key, formattedValue)
      }
    }
  }

  const apiUrl = `http://localhost/BSA/SaleOrder/GetPendingOrder_OP?${params.toString()}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const responseData: PendingOrder = await response.json()
      return responseData
    } else {
      console.error('❌ Failed to get order status:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('❌ Error during API call:', error)
    return null
  }
}

