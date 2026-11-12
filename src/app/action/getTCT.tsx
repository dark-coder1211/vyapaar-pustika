'use server'

export async function TermsCondAction(
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/Filter/FGetTerm_Cond?companyid=${companyid}&Site_Code=${Site_Code}&strv_type=WSOGS`
  console.log('tct', apiUrl)
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

export async function GetTermsCondAction(
  { clientId }: { clientId: string | null },
  username: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetOrderTerm_Cond_TransByDocid_DMS?companyid=${companyid}&Site_Code=${Site_Code}&StrDocid=${clientId}&StrUserCode=${username}&strRole=Employee`
  
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}
