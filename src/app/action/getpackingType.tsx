'use server'

export default async function PackingTypeAction(
  username: string | number | true | object,
  companyid: string | number | true | object,
  Site_Code: string | number | true | object,
  bu: string | number | true | object
) {
  const apiUrl = `http://localhost/BSA/saleOrder/GetPackingType_DMS?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&StrUserCode=${username}`

  try {
    const response = await fetch(apiUrl)
    const contentType = response.headers.get('content-type')
    const text = await response.text() // Get raw response text

    // ✅ Detect and handle HTML response
    if (!contentType || !contentType.includes('application/json')) {
      console.error('⚠️ Expected JSON but got HTML or something else.')
      console.error('📄 HTML Response Preview:', text.slice(0, 300))
      return null
    }

    // ✅ Parse JSON
    const data = JSON.parse(text)

    if (response.ok) {
      return data
    } else {
      console.error('❌ API error:', data.message || data)
      return null
    }
  } catch (error) {
    console.error('🔥 Exception while fetching packing type:', error)
    return null
  }
}
