'use server'

import axios from 'axios'
import type { PostPOFormData } from './PurchaseOrder_Entry_modal'

export async function GetPOHeaderByDocid(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const apiUrl = `http://localhost/BSA/Purchase/GetPOHeaderByDocId?Site_Code=${Site_Code}&companyid=${companyid}&Docid=${Docid}`

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error getting PO header:', error)
    return null
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetPODetailByDocid(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const apiUrl = `http://localhost/BSA/Purchase/GetPODetailByDocId?Site_Code=${Site_Code}&companyid=${companyid}&Docid=${Docid}`

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AddPOAction = async (
  data: PostPOFormData,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  let apiUrl
  if (data.clsHeader[0].strDocId === '') {
    apiUrl = `http://localhost/BSA/Purchase/PostPurchaseOrder?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=ADD`
  } else {
    apiUrl = `http://localhost/BSA/Purchase/PostPurchaseOrder?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=EDIT`
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    return { success: false, data: null }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetPordDetInGridByPendingIndent(
  { strIndNo }: { strIndNo: string },
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const apiUrl = `http://localhost/BSA/Purchase/GetPordDetInGridByPendingIndent?Site_Code=${Site_Code}&companyid=${companyid}&StrDefaultIndent=${strIndNo}`

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetTermsCondAction(
  { Docid }: { Docid: string | null },
  Site_Code: string,
  companyid: string,
  bu: string
) {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetOrderTerm_Cond_TransByDocid_DMS?companyid=${companyid}&Site_Code=${Site_Code}&StrDocid=${Docid}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function TermsCondAction(strv_type: string, Site_Code: string, companyid: string, bu: string) {
  const apiUrl = `http://localhost/BSA/Filter/FGetTerm_Cond?companyid=${companyid}&Site_Code=${Site_Code}&strv_type=${strv_type}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetOHHeader(
  strv_type: string,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetDMSOHHeader_DMS?username=${UserName}&companyid=${companyid}&Site_Code=${Site_Code}&strVtype=${strv_type}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetOHLine(strv_type: string, Site_Code: string, companyid: string, UserName: string, bu: string) {
  const apiUrl = `http://localhost/BSA/SaleOrder/GetDMSOHLine_DMS?username=${UserName}&companyid=${companyid}&Site_Code=${Site_Code}&strVtype=${strv_type}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.error('Failed to fetch TCT:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error fetching TCT:', error)
    return null
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RecidNOHelp = async (
  StrCurrentDate: string,
  StrV_Type: string,
  StrtableName: string,
  Site_Code: string,
  companyid: string,
  UserName: string,
  bu: string
) => {
  try {
    const response = await axios.get(
      `http://localhost/BSA/RecId/RecidNOHelp?Site_Code=${Site_Code}&userName=${UserName}&companyid=${companyid}&StrCurrentDate=${StrCurrentDate}&StrV_Type=${StrV_Type}&StrtableName=${StrtableName}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching rec IDs:', error)
    throw error
  }
}


export async function getOHheaderAction(
  companyid: string | number | true | object,
  Site_Code: string | number | true | object,
  username: string | number | true | object,
  bu: string | number | true | object,
  strV_Type: string
) {

  const apiUrl = `http://localhost/BSA/Purchase/GetPOOHHeader_DMS?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&strVtype=${strV_Type}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error('Failed to fetch TCT:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching TCT:', error);
    return null;
  }
}


export async function getOHheaderByDocIdAction(
  companyid: string | number | true | object,
  Site_Code: string | number | true | object,
  username: string | number | true | object,
  { Docid }: { Docid: string | null },
  bu: string | number | true | object,
  strV_Type: string
) {
  const apiUrl = `http://localhost/BSA/Purchase/GetPOOHHeader_DMSByDocid?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&strVtype=${strV_Type}&StrDocid=${Docid}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error('Failed to fetch TCT:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching TCT:', error);
    return null;
  }
}

export async function getOHlineAction(
  companyid: string | number | true | object,
  Site_Code: string | number | true | object,
  username: string | number | true | object,
  bu: string | number | true | object,
  strV_Type: string
) {

  const apiUrl = `http://localhost/BSA/Purchase/GetPOOHLine_DMS?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&strVtype=${strV_Type}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error('Failed to fetch TCT:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching TCT:', error);
    return null;
  }
}

export async function getOHlineByDocIdAction(
  companyid: string | number | true | object,
  Site_Code: string | number | true | object,
  username: string | number | true | object,
  { Docid }: { Docid: string | null },
  bu: string | number | true | object,
  strV_Type: string
) {
  const apiUrl = `http://localhost/BSA/Purchase/GetPOOHLine_DMSByDocid?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&strVtype=${strV_Type}&StrDocid=${Docid}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error('Failed to fetch TCT:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching TCT:', error);
    return null;
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function GetFilQCByIndentNoHelp({
  strIndNo,
  StrItemCode,
  StrV_date,
}: {
  strIndNo: string;
  StrItemCode: string;
  StrV_date: string;

},   Site_Code: string,
  companyid: string) {
  const apiUrl = `http://localhost/BSA/Purchase/GetFilQCByIndentNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrDefaultIndent=${strIndNo}&StrItemCode=${StrItemCode}&StrV_date=${StrV_date}&StrDocIdCurrent=${strIndNo}`;

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
}

export async function GetPordDetByIndentNoHelp({
  strIndNo,
  StrItemCode,
  StrV_date,
  StrDocId
}: {
  strIndNo: string;
  StrItemCode: string;
  StrV_date: string
  StrDocId: string
},   Site_Code: string,
  companyid: string) {
  const apiUrl = `http://localhost/BSA/Purchase/GetPordDetByIndentNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrDefaultIndent=${strIndNo}&StrItemCode=${StrItemCode}&StrV_date=${StrV_date}&StrDocIdCurrent=${StrDocId}`;

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
}
