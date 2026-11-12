'use server'

export default async function DeliveryAction(
  username: string | number | true | object | null,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/HelpBox/selectdeliveryto_DMS?companyid=${companyid}&site_code=${Site_Code}&strRole=Employee&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
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
