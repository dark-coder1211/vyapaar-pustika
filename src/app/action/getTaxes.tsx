'use server'

export default async function TaxesAction(
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrItemCode: string | number | true | object,
  StrFormCode: string | number | true | object,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/FAgtFormTaxPer?Site_Code=${Site_Code}&companyid=${companyid}&StrItemCode=${StrItemCode}&StrFormCode=${StrFormCode}`
  try {
    const response = await fetch(apiUrl, {
      method: 'GET'
      // Content-Type header usually not needed on GET
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
