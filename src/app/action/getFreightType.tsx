'use server'

export default async function FreightTypeAction(
  Site_Code: string,
  companyid: string,
  username: string,
  LinkCode: string,
  StrToken: string,
  clientCode: string,
  bu: string
) {
  // const userCode = LinkCode || username;

  const apiUrl = `http://localhost/BSA/saleOrder/GetFreightType_DMS?Site_Code=${Site_Code}&companyid=${companyid}&StrUserCode=${LinkCode ? LinkCode : username}&StrToken=${StrToken}&strClientCode=${clientCode}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    const text = await response.text()

    try {
      const data = JSON.parse(text)
      if (response.ok) {
        return data
      } else {
        console.error('API responded with error:', data.message || data)
        return null
      }
    } catch (jsonError) {
      console.error('❌ Response is not valid JSON. Raw response:', text)
      return null
    }
  } catch (error) {
    console.error('❌ Network or fetch error:', error)
    return null
  }
}
