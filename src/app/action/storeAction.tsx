import { ApiResponse, PostFormData, PostReqFormData, ReportFile, ReqApiResponse, ReqInterface } from '@/components/interfaces/page';
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

// ==========================Requisition API=================================

export const getReqList = async (): Promise<ReqApiResponse | null> => {
  const apiUrl = `http://localhost/BSA/Store/GetReqList?Site_Code=${Site_Code}&companyid=${companyid}`;

  try {
    const response = await axios.get<ReqApiResponse>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Now returning the typed data, not the whole Axios response
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};


export async function GetReqHeaderByDocid({ Docid }: { Docid: string | null }) {

  const apiUrl = `http://localhost/BSA/Store/GetReqHeaderByDocid?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${Docid}`;

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

export async function GetReqDetailByDocid({ Docid }: { Docid: string | null }) {

  const apiUrl = `http://localhost/BSA/Store/GetReqDetailByDocid?Site_Code=${Site_Code}&companyid=${companyid}&strDocId=${Docid}`;

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


export async function DeleteReqAction(StrDocID: string) {
  const API_URL = `http://localhost/BSA/Store/DeleteRequisition?username=${UserName}&Site_Code=${Site_Code}&StrDocID=${StrDocID}&companyid=${companyid}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (response.status === 200) {
      // Assuming responseData.success indicates success from API
      console.log("Indent deleted successfully");
      return responseData; // Return the fetched data for further processing
    } else {
      console.error('Failed to delete Indent:', responseData.message || responseData);
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error deleting Indent:', error);
    return null; // Return null in case of an exception
  }
}

export const handleReqDocPrint = async (Docid?: string ) => {
  try {
    let apiUrl = `http://localhost/BSA/Store/GetPrintRequisition?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`;



    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error('Failed to fetch PDF data:', response.statusText);
      return;
    }

    const data: ReportFile = await response.json();

    const byteCharacters = atob(data.FileBytes);
    const byteArrays = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }

    const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' });

    const pdfUrl = URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Requisition.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000);

  } catch (error) {
    console.error('Error fetching PDF:', error);
  } finally {
  }
};


export const AddRequisitionAction = async (data: PostReqFormData) => {
  let apiUrl;
  if (data.clsRequHeader[0].strDocId === '') {
    apiUrl = `http://localhost/BSA/Store/AddRequisition?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`;
  } else {
    apiUrl = `http://localhost/BSA/Store/EditRequisition?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData

  } catch (error) {

    return { success: false, data: null };
  }
};
