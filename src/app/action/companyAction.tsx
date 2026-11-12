import secureLocalStorage from 'react-secure-storage';


const getbaseURLFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('BaseURL') : null)
const getSite_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Code') : null)
const getSite_NameFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Name') : null)
const getComp_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Comp_Code') : null)
const getUserNameFromSession = () => (typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string) : null)

export const baseUrl = getbaseURLFromSession() || ''
export const Site_Code = getSite_CodeFromSession() || ''
export const Site_Name = getSite_NameFromSession() || ''
export const companyid = getComp_CodeFromSession() || ''
export const UserName = getUserNameFromSession() || ''

export async function fetchDataAction() {
  const API_URL = `http://localhost/BSA/Company/Comp`
  try {
    const response = await fetch(API_URL, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();

    if (response.ok) {
      console.log("Response is ok");

      return responseData; // Return the fetched data for further processing
    } else {
      console.error('Failed to get order status:');
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting order status:', error);
    return null; // Return null in case of an exception
  }
}




export async function fetchSiteDataAction(companyid: any) {
  const SiteData_URL = `http://localhost/BSA/SiteMast/siteMast?companyid=${companyid}`
  try {
    const response = await fetch(SiteData_URL, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();

    if (response.ok) {
      console.log("Response is ok");

      return responseData; // Return the fetched data for further processing
    } else {
      console.error('Failed to get order status:');
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting order status:', error);
    return null; // Return null in case of an exception
  }
}




export async function fetchUserPermissionAction(UserName: any) {
  const API_URL = `http://localhost/BSA/UserControlPanel/UserPermission?userName=${UserName}`
  try {
    const response = await fetch(API_URL, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();

    if (response.ok) {
      console.log("Response is ok");

      return responseData; // Return the fetched data for further processing
    } else {
      console.error('Failed to get order status:');
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting order status:', error);
    return null; // Return null in case of an exception
  }
}

