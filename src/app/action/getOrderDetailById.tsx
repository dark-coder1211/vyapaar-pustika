
import { clsSaleOrderItemDetail } from '../(dashboard)/saleOrderEntry/SaleOrder_Entry_modal'

interface ApiResponseDetail {
  success: boolean
  data: clsSaleOrderItemDetail[] // Assuming the data property contains the array
}

export default async function getOrderDetailById(
  { clientIdd }: { clientIdd: string | null },
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/SaleOrder/getSaleOrderDetail?Site_Code=${Site_Code}&companyid=${companyid}&strdocid=${clientIdd}&username=${username}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData: ApiResponseDetail = await response.json()

    if (response.ok) {
      return responseData // Return the fetched data for further processing
    } else {
      console.error('Failed to get order status:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting order status:', error)
    return null // Return null in case of an exception
  }
}
