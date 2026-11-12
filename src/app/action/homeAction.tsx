import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const getbaseURLFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('BaseURL') : null)
const getSite_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Code') : null)
const getSite_NameFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Name') : null)
const getComp_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Comp_Code') : null)

export const baseUrl = getbaseURLFromSession() || ''
export const Site_Code = getSite_CodeFromSession() || ''
export const Site_Name = getSite_NameFromSession() || ''
export const companyid = getComp_CodeFromSession() || ''

const getUserNameFromSession = () =>
  typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string) : null
export const UserName = getUserNameFromSession() || ''

export const Home = async (stats: string) => {
  const apiUrl = `http://localhost/BSA/Home/${stats}?Site_Code=${Site_Code}&companyid=${companyid}&User_Name=${UserName}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const userPermission = async (UserName: any, bu: string) => {
  const apiUrl = `http://localhost/BSA/UserControlPanel/userPermission?userName=${UserName}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // The HTTP method
      headers: {
        'Content-Type': 'application/json' // Setting the content type
      }
    })

    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    // Parse the JSON response
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const LocalCurrency = async (Site_Code: string, companyid: string, bu: string) => {
  // console.log('----', baseUrl, companyid, Site_Code, UserName)
  const apiUrl = `http://localhost/BSA/Home/LocalCurrency?site_code=${Site_Code}&Companyid=${companyid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}

export const GetNoOfEntries = async (Site_Code: string, companyid: string, UserName: string, bu: string) => {
  const apiUrl = `http://localhost/BSA/Home/NoOfEntries?userName=${UserName}&site_code=${Site_Code}&Companyid=${companyid} `

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // The HTTP method
      headers: {
        'Content-Type': 'application/json' // Setting the content type
      }
    })

    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    // Parse the JSON response
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error getting data:', error)
    return null
  }
}
