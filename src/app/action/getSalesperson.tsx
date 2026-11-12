'use server'

export default async function SalesPersonAction(
  distributorCode: string | number | true | object,
  TransactionType: string | number | true | object,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  username: string | number | true | object | null,
  bu: string | number | true | object | null
) {

  const apiUrl = `http://localhost/BSA/HelpBox/SelectSalePerson?Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${username}&strRole=Employee&StrDistributorCode=${distributorCode}&StrTransactionType=${TransactionType}`

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
