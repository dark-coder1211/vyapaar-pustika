'use server'

export default async function PartyAction(
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/HelpBox/SelectParty_DMS?companyid=${companyid}&site_code=${Site_Code}&strRole=Employee&username=${username}&StrUserCode=${username}`

  console.log('apiUrl', apiUrl)
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch consignee:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching party:', error)
    return null
  }
}
