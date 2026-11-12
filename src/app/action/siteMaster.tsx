import axios from 'axios';
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

export const getSiteDet = async () => {
  const apiUrl = `http://localhost/BSA/SiteMast/SiteDet?companyid=${companyid}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};
