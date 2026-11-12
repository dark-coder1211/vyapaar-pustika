export default async function getOrderHeaderById(
  { clientId }: { clientId: string | null },
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  // 100011232400000004
  const apiUrl = `http://localhost/BSA/SaleOrder/getSaleOrderHeader?Site_Code=${Site_Code}&companyid=${companyid}&strdocid=${clientId}&username=${username}`
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
