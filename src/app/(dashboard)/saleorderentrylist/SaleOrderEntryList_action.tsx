'use server'

export async function getSaleListAction(
  Site_Code: string ,
  companyid: string ,
  strfromdate: string | null,
  strtodate: string | null,
  bu: string | null
) {
//   const { StrFromDate, StrToDate } = params

  let apiUrl = `http://localhost/BSA/SaleOrder/GetSaleOrderList?Site_Code=${Site_Code}&companyid=${companyid}&strfromdate=${strfromdate}&strtodate=${strtodate}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function DeleteSaleOrderAction(
  StrDocID: string,
  UserName: string,
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const API_URL = `http://localhost/BSA/SaleOrder/DeleteSaleOrderEntry?username=${UserName}&Site_Code=${Site_Code}&strdocid=${StrDocID}&companyid=${companyid}`

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // If it's truly a POST, even though the params are in query string
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = await response.json()

    if (response.ok) {
      return responseData
    } else {
      console.error('Failed to delete Gate Entry:', responseData.message || responseData)
      return null
    }
  } catch (error) {
    console.error('Error deleting Gate Entry:', error)
    return null
  }
}
