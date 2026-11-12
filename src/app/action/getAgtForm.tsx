'use server'

export default async function AgtFormAction(
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrPartyCode: string | number | true | object,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/FAutoAgtForm?Site_Code=${Site_Code}&companyid=${companyid}&StrVType=WSOGS&StrPartyCode=${StrPartyCode}`
  try {
    const response = await fetch(apiUrl, {
      method: 'GET'
    })

    if (!response.ok) {
      console.error('Failed to get Sales Person:', response.statusText)
      return null
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error getting Sales Person:', error)
    return null
  }
}
