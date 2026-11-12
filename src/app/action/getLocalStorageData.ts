import secureLocalStorage from 'react-secure-storage'

const getbaseURLFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('BaseURL') : null)
export const baseUrl = getbaseURLFromSession() || ''

const getSite_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Code') : null)
export const Site_Code = getSite_CodeFromSession() || ''

const getSite_NameFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Name') : null)
export const Site_Name = getSite_NameFromSession() || ''

const getComp_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Comp_Code') : null)
export const companyid = getComp_CodeFromSession() || ''


const getUserNameFromSession = () =>
  typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string) : null
export const UserName = getUserNameFromSession() || ''
