// import { PostFormData, PostPOFormData, ReportFile } from '@/components/interfaces/page';
// import axios from 'axios';
// import secureLocalStorage from 'react-secure-storage';


// // const getbaseURLFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('BaseURL') : null)
// // const getSite_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Code') : null)
// // const getSite_NameFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Site_Name') : null)
// // const getComp_CodeFromSession = () => (typeof window !== 'undefined' ? secureLocalStorage.getItem('Comp_Code') : null)
// // const getUserNameFromSession = () => (typeof window !== 'undefined' ? (secureLocalStorage.getItem('UserName') as string) : null)

// // export const baseUrl = getbaseURLFromSession() || ''
// // export const Site_Code = getSite_CodeFromSession() || ''
// // export const Site_Name = getSite_NameFromSession() || ''
// // export const companyid = getComp_CodeFromSession() || ''
// // export const UserName = getUserNameFromSession() || ''


// // ==========================Indent API=================================


// export async function GetIndentDetByReq({
//   StrReqNo,
//   StrTansType_Category,
// }: {
//   StrReqNo: string | null;
//   StrTansType_Category?: string | null;
// }) {
//   const apiUrl = `http://localhost/BSA/Purchase/GetIndentDetByReq?Site_Code=${Site_Code}&companyid=${companyid}&StrReqNo=${StrReqNo}&StrTansType_Category=${StrTansType_Category ?? ''}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// }



// export async function GetIndentHeaderByDocid({ Docid }: { Docid: string | null }) {

//   const apiUrl = `http://localhost/BSA/Purchase/GetIndentHeaderMoveRec?Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };

// export async function GetIndentDetailByDocid({ Docid }: { Docid: string | null }) {

//   const apiUrl = `http://localhost/BSA/Purchase/GetIndentDetailMoveRec?Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };


// export const AddIndentAction = async (data: PostFormData) => {
//   let apiUrl;
//   if (data.clsIndHeader[0].StrDocId === '') {
//     apiUrl = `http://localhost/BSA/Purchase/AddIndent?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`;
//   } else {
//     apiUrl = `http://localhost/BSA/Purchase/EditIndent?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}`;
//   }

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     const responseData = await response.json();
//     return responseData

//   } catch (error) { 

//     return { success: false, data: null };
//   }
// };


// export const handleIndDocPrint = async (Docid?: string) => {
//   try {
//     const apiUrl = `http://localhost/BSA/Purchase/GetPrintIndent?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`;



//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       console.error('Failed to fetch PDF data:', response.statusText);
//       return;
//     }

//     const data: ReportFile = await response.json();

//     const byteCharacters = atob(data.FileBytes);
//     const byteArrays = new Uint8Array(byteCharacters.length);

//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteArrays[i] = byteCharacters.charCodeAt(i);
//     }

//     const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' });

//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = `Indent.pdf`;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000);

//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//   } finally {
//   }
// };


// // // getBalance API function
// // export const getBalance = async (
// //   strTableName: string,
// //   strFirstColumn: string,
// //   strSecondColumn: string,
// //   strBalanceOfColumn: string,
// //   strBalanceOf: string,
// // ) => {
// //   const apiUrl = `http://localhost/BSA/Purchase/FGetBalance?companyid=${companyid}&strTableName=${strTableName}&strFirstColumn=${strFirstColumn}&strSecondColumn=${strSecondColumn}&strBalanceOfColumn=${strBalanceOfColumn}&strBalanceOf=${strBalanceOf}&strCondition=and site_code='${Site_Code}'`;

// //   try {
// //     const response = await axios.get(apiUrl, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error getting balance:', error);
// //     return null;
// //   }
// // };


// // ================================Purchase order API=================================


// export const getPurchaseOrderList = async () => {
//   const apiUrl = `http://localhost/BSA/Purchase/GetPurchaseOrderList?Site_Code=${Site_Code}&companyid=${companyid}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };

// export async function GetPOHeaderByDocid({ Docid }: { Docid: string | null }) {

//   const apiUrl = `http://localhost/BSA/Purchase/GetPOHeaderByDocId?Site_Code=${Site_Code}&companyid=${companyid}&Docid=${Docid}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };

// export async function GetPODetailByDocid({ Docid }: { Docid: string | null }) {

//   const apiUrl = `http://localhost/BSA/Purchase/GetPODetailByDocId?Site_Code=${Site_Code}&companyid=${companyid}&Docid=${Docid}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };

// export async function TermsCondAction(
//   strv_type: string
// ) {
//   const apiUrl = `http://localhost/BSA/Filter/FGetTerm_Cond?companyid=${companyid}&Site_Code=${Site_Code}&strv_type=${strv_type}`;
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       console.error('Failed to fetch TCT:', data.message);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching TCT:', error);
//     return null;
//   }
// }

// export async function GetTermsCondAction(
//   { Docid }: { Docid: string | null }
// ) {
//   const apiUrl = `http://localhost/BSA/SaleOrder/GetOrderTerm_Cond_TransByDocid_DMS?companyid=${companyid}&Site_Code=${Site_Code}&StrDocid=${Docid}`;
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       console.error('Failed to fetch TCT:', data.message);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching TCT:', error);
//     return null;
//   }
// }


// export async function GetOHHeader(
//   strv_type: string
// ) {
//   const apiUrl = `http://localhost/BSA/SaleOrder/GetDMSOHHeader_DMS?username=${UserName}&companyid=${companyid}&Site_Code=${Site_Code}&strVtype=${strv_type}`;
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       console.error('Failed to fetch TCT:', data.message);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching TCT:', error);
//     return null;
//   }
// }


// export async function GetOHLine(
//   strv_type: string
// ) {
//   const apiUrl = `http://localhost/BSA/SaleOrder/GetDMSOHLine_DMS?username=${UserName}&companyid=${companyid}&Site_Code=${Site_Code}&strVtype=${strv_type}`;
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       console.error('Failed to fetch TCT:', data.message);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching TCT:', error);
//     return null;
//   }
// }


// export async function DeletePOAction(StrDocID: string) { 
//   const API_URL = `http://localhost/BSA/Purchase/DeletePO?username=${UserName}&Site_Code=${Site_Code}&StrDocID=${StrDocID}&companyid=${companyid}`;

//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST', // Specify the method as GET
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const responseData = await response.json();

//     if (response.status === 200) {
//       // Assuming responseData.success indicates success from API
//       console.log("Indent deleted successfully");
//       return responseData; // Return the fetched data for further processing
//     } else {
//       console.error('Failed to delete Indent:', responseData.message || responseData);
//       return null; // Return null in case of an error
//     }
//   } catch (error) {
//     console.error('Error deleting Indent:', error);
//     return null; // Return null in case of an exception
//   }
// }


// export const handlePODocPrint = async (Docid?: string) => {
//   try {
//     const apiUrl = `http://localhost/BSA/Purchase/GetPrintPO?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`;



//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       console.error('Failed to fetch PDF data:', response.statusText);
//       return;
//     }

//     const data: ReportFile = await response.json();

//     const byteCharacters = atob(data.FileBytes);
//     const byteArrays = new Uint8Array(byteCharacters.length);

//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteArrays[i] = byteCharacters.charCodeAt(i);
//     }

//     const pdfBlob = new Blob([byteArrays], { type: 'application/pdf' });

//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = `PurchaseOrder.pdf`;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setTimeout(() => URL.revokeObjectURL(pdfUrl), 7000);

//   } catch (error) {
//     console.error('Error fetching PDF:', error);
//   } finally {
//   }
// };


// export const AddPOAction = async (data: PostPOFormData) => {
//   let apiUrl;
//   if (data.clsHeader[0].strDocId === '') {
//     apiUrl = `http://localhost/BSA/Purchase/PostPurchaseOrder?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=ADD`;
//   } else {
//     apiUrl = `http://localhost/BSA/Purchase/PostPurchaseOrder?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=EDIT`;
//   }

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     const responseData = await response.json();
//     return responseData

//   } catch (error) {

//     return { success: false, data: null };
//   }
// };


// export async function GetPordDetInGridByPendingIndent({
//   strIndNo
// }: {
//   strIndNo: string;
// }) {
//   const apiUrl = `http://localhost/BSA/Purchase/GetPordDetInGridByPendingIndent?Site_Code=${Site_Code}&companyid=${companyid}&StrDefaultIndent=${strIndNo}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// }

// export async function GetPordDetByIndentNoHelp({
//   strIndNo,
//   StrItemCode,
//   StrV_date,
//   StrDocId
// }: {
//   strIndNo: string;
//   StrItemCode: string;
//   StrV_date: string
//   StrDocId: string
// }) {
//   const apiUrl = `http://localhost/BSA/Purchase/GetPordDetByIndentNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrDefaultIndent=${strIndNo}&StrItemCode=${StrItemCode}&StrV_date=${StrV_date}&StrDocIdCurrent=${StrDocId}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// }

// export async function GetFilQCByIndentNoHelp({
//   strIndNo,
//   StrItemCode,
//   StrV_date
// }: {
//   strIndNo: string;
//   StrItemCode: string;
//   StrV_date: string
// }) {
//   const apiUrl = `http://localhost/BSA/Purchase/GetFilQCByIndentNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrDefaultIndent=${strIndNo}&StrItemCode=${StrItemCode}&StrV_date=${StrV_date}&StrDocIdCurrent=${strIndNo}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// }

// // ================================Reports API=================================


// export const PendingPurchaseOrderReport = async (filters: {
//   StrfromDate?: string;
//   StrToDate?: string;
//   StrOrderNo?: string;
//   StrPartyCode?: string;
//   StrItemCode?: string;
//   StrItemGroup?: string;
//   StrItemCat?: string;
//   StrTransactionType?: string;
//   StrSiteName?: string;
// }) => {
//   const params = new URLSearchParams();

//   // Loop through the filters object and append non-empty values
//   for (const [key, value] of Object.entries(filters)) {
//     if (value) {
//       if (typeof value === 'string' && value.includes(',')) {
//         // Handle comma-separated values (like StrPartyCode)
//         const formattedValues = value.split(',').map(val => `'${val.trim()}'`).join(',');
//         params.append(key, formattedValues);
//       } else {
//         // For all other single string values, wrap them in single quotes
//         params.append(key, `'${value}'`);
//       }
//     }
//   }

//   // Get site code from filters, or use default value if not provided
//   const siteCodeParam = filters.StrSiteName ? filters.StrSiteName : Site_Code;

//   // Construct the API URL with the dynamic query parameters
//   const apiUrl = `http://localhost/BSA/Purchase/PendingPurchaseOrderReport?Site_Code=${siteCodeParam}&companyid=${companyid}&${params.toString()}`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 200 && response.data) {
//       return response.data;  // Return the filtered data
//     } else {
//       console.error('Unexpected response:', response);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };
