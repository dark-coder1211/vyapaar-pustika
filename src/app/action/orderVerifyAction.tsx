export default async function orderVerifyAction(
  docId: number,
  username: string,
  Site_Code: string,
  companyid: string,
  bu: string
) {
  // Define your URL for the GET request

  const apiUrl = `http://localhost/BSA/SaleOrder/verifiedByDMSSord_DMS?username=${username}&Site_Code=${Site_Code}&companyid=${companyid}&strDocid=${docId}&strverifiedBy=${username}&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl, {
      method: 'POST', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()

    if (response) {
      return responseData // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting :', error)
    return null // Return null in case of an exception
  }
}
