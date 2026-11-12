'use server'
import type { FSizeConversionResponse } from '@components/interfaces/page' // define this type or interface

export default async function FSizeConversionAction(
  Site_Code: string | number | true | object | null,
  companyid: string | number | true | object | null,
  strSzType: string | undefined,
  dblWeight: number | undefined,
  dblReel: number | undefined,
  StrGSMCode: string | undefined,
  StrBFCode: string | undefined,
  StrItemCode: string | undefined,
  StrSizeReel: number | null | undefined,
  bu: string | number | true | object | null
): Promise<FSizeConversionResponse | null> {
  const apiUrl = `http://localhost/BSA/SaleOrder/FSizeConversion?Site_Code=${Site_Code}&companyid=${companyid}&strSzType=${strSzType}
        &dblWeight=${dblWeight}&dblReel=${dblReel}&StrGSMCode=${StrGSMCode}&StrBFCode=${StrBFCode}
        &StrItemCode=${StrItemCode}&StrSizeReel=${StrSizeReel}`

  const cleanUrl = apiUrl.replace(/\s/g, '').replace(/\n/g, '')

  try {
    const response = await fetch(cleanUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data: FSizeConversionResponse = await response.json()

    if (response.ok && data.success) {
      return data
    } else {
      console.warn('API returned success = false')
      return null
    }
  } catch (error) {
    console.error('Error calling FSizeConversion API:', error)
    return null
  }
}
