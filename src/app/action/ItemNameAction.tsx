'use server'

import type { ItemName } from '@components/interfaces/page'

export default async function ItemNameAction(
  companyid: string | number | true | object | null,
  username: string | number | true | object | null,
  transTypeCat: string | undefined,
  contractDocId: number | string | undefined,
  vsNo: string | number | undefined,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  let apiUrl = `http://localhost/BSA/HelpBox/SelectItem_DMS?companyid=${companyid}&strTansType_Category=${transTypeCat}&username=${username}&StrUserCode=${username}&Site_Code=${Site_Code}&StrMainCondition=and IM.ItemType='FM'`

  if (contractDocId && vsNo) {
    apiUrl += `&strContratualOrdRef=${contractDocId}&strContratualOrdVSno=${vsNo}`
  } else if (contractDocId) {
    apiUrl += `&strContratualOrdRef=${contractDocId}`
  } else if (vsNo) {
    apiUrl += `&strContratualOrdVSno=${vsNo}`
  }

  try {
    const response = await fetch(apiUrl)
    const data: ItemName = await response.json()

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
