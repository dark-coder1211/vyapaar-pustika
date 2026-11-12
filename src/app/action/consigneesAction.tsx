'use server'

export default async function ConsigneesAction(
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/HelpBox/SelectConsignee_DMS?Site_Code=${Site_Code}&companyid=${companyid}&strRole=Employee&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response) {
      return data
    } else {
      console.error('Failed to fetch consignee:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching consignee:', error);
    return null;
  }
}
