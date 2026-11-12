'use server'

export default async function TransactionTypeAction(
  username: string | number | true | object | null,
  LinkCode: string | number | true | object,
  StrToken: string | number | true | object,
  clientCode: string | number | true | object,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetTransactionType_DMS?username=${username}&Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${username}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log('TransactionType', data)
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}
