'use server'

export default async function SiteDataAction(
  companyid: string | number | true | object | null,
  username: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/HelpBox/SelectSite_DMS?companyid=${companyid}&StrUserCode=${username}&strRole=Employee`

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
