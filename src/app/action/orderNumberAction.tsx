'use server'

const formatDate = (date: Date): string => {
  const d = new Date(date)
  const day = d.getDate()
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export default async function OrderNumberAction(
  username: string | number | true | object | null,
  companyid: string | number | true | object | null,
  Site_Code: string | number | true | object | null,
  bu: string | number | true | object | null
) {
  const today = formatDate(new Date())

  const apiUrl = `http://localhost/BSA/recid/PlaceOrderNo_DMS?strTableName=dmsSOrd&username=${username}&companyid=${companyid}&StrV_Date=${today}&StrV_Type=SODMS&Site_Code=${Site_Code}&StrUserCode=${username}&strRole=Employee`
  
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data // Return the fetched data for further processing
    } else {
      console.error('Failed to fetch order number:', data.message)
      return null // Return null in case of an error
    }
  } catch (error) {
    console.error('Error fetching order number:', error)
    return null // Return null in case of an exception
  }
}
