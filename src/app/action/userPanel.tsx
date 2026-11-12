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


export const getUserDet = async () => {
  const apiUrl = `http://localhost/BSA/UserControlPanel/UserDet`;

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

export interface PostData {
  [key: string]: string;
  userName: string;
  comp_Code: string;
  site_Code: string;
}

export const setUserPermissions = async (
  postData: PostData
): Promise<Response> => {
  const API_Update = `http://localhost/BSA/UserControlPanel/setUserPermission`;

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(postData),
  };

  return fetch(API_Update, requestOptions);
};


export const getUserPermissionDet = async (value: string) => {
  const apiUrl = `http://localhost/BSA/UserControlPanel/userPermissionDet?userName=${value}`;
  try {
    const response = await axios.get(apiUrl);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    } else {
      console.error('Invalid data format. Expected an array with at least one element.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return null;
  }
};
