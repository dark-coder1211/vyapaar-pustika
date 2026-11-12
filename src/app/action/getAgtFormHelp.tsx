'use server'

export default async function AgtFormHelpForPartyAction(
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrV_Type: string | undefined,
  bu: string | number | true | object | null,
  Strpartycode?: string | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderAganistFormUsingParty?Site_Code=${Site_Code}&companyid=${companyid}&StrV_Type=${StrV_Type}&Strpartycode=${Strpartycode}`

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



export async function AgtFormHelpAction(
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  StrV_Type: string | undefined,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/SaleOrderAganistFormHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrV_Type=${StrV_Type}`

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
