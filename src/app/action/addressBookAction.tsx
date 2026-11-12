'use server'

export default async function Addressbookaction(
  strconsignee: string | number | true | object | undefined,
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/saleOrder/GetAddressbook_DMS?Site_Code=${Site_Code}&companyid=${companyid}&strconsignee=${strconsignee}&StrUserCode=${username}`

  try {
    if (strconsignee) {
      const response = await fetch(apiUrl)
      const data = await response.json()
      console.log('data', data)
      if (response.ok) {
        return data
      } else {
        console.error('Failed to fetch consignee:', data.message)
        return null
      }
    }
  } catch (error) {
    console.error('Error fetching address book:', error)
    return null
  }
}
