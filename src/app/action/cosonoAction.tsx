'use server'

export default async function cosonoAction(
  docId: string,
  contractDocId: string | undefined,
  intv_SNo: number,
  username: string | number | true | object | null,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/RecId/ContractSordHelpV_Sno_DMS?companyid=${companyid}&Site_Code=${Site_Code}&strDocid=${docId}&strCDocid=${contractDocId}&intv_SNo=${intv_SNo}&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:')
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}
