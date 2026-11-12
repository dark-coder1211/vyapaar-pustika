'use server'

import axios from 'axios'
import type { GetStockResponse, StockISUHeaderInterface } from './stockissueEntry_modal'

export const AddStockIssueAction = async (
    data: StockISUHeaderInterface,
    Site_Code: string,
    companyid: string,
    UserName: string,
    bu: string
) => {
    let apiUrl
    console.log("DATA", data.strDocId)
    if (data.strDocId === '') {

        apiUrl = `http://localhost/BSA/Store/SaveStoreIssueEntry?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=ADD`
    } else {
        apiUrl = `http://localhost/BSA/Store/SaveStoreIssueEntry?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&strMode=EDIT`
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

///////////////////////////////////////////////////////////////////////////////////////////////

export async function GetStockIssueDetByReq(
    {
        StrReqNo,
    }: {
        StrReqNo: string | null
    },
    StrCurrentDocID: string,
    StrMode: string,
    Site_Code: string,
    companyid: string,
    bu: string
): Promise<any | null> {

    const apiUrl = `http://localhost/BSA/Store/StoreReqNoHelp?Site_Code=${Site_Code}&companyid=${companyid}&StrMode=${StrMode}&StrCurrentDocID=${StrCurrentDocID}&StrReqDocId=${StrReqNo}`

    try {
        const response = await axios.get(apiUrl)
        return response.data
    } catch (error) {
        console.error('Error getting data:', error)
        return null
    }
}


/////////////////////////////////////////////////////////////////////////////////////////

export async function GetStockIssueDetailByDocid(
    { Docid }: { Docid: string | null },
    Site_Code: string,
    companyid: string,
    bu: string
): Promise<any | null> {
    const apiUrl = `http://localhost/BSA/Store/getStoreissuedetail?Site_Code=${Site_Code}&companyid=${companyid}&StrDocid=${Docid}`

    try {
        const response = await axios.get(apiUrl)
        return response.data
    } catch (error) {
        console.error('Error getting Stock Issue details:', error)
        return null
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////

export async function GetStockIssueHeaderByDocid(
    { Docid }: { Docid: string | null },
    Site_Code: string,
    companyid: string,
    bu: string
): Promise<any | null> {

    const apiUrl = `http://localhost/BSA/Store/getStoreissueheader?Site_Code=${Site_Code}&companyid=${companyid}&strdocid=${Docid}`

    try {
        const response = await axios.get<StockISUHeaderInterface>(apiUrl, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting data:', error);
        return null;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const getBalance = async (
    strItemCode: string,
    Site_Code: string,
    companyid: string,
    bu: string
): Promise<GetStockResponse | null> => {

    const apiUrl = `http://localhost/BSA/Filter/GetStoreStock?companyid=${companyid}&site_code=${Site_Code}&StrItemCode=${strItemCode}`

    try {
        const response = await axios.get<GetStockResponse>(apiUrl)
        return response.data
    } catch (error) {
        console.error('Error getting balance:', error)
        return null
    }
}



export const FAutoGodown = async (
    StrLocationCode: string,
    Site_Code: string,
    companyid: string,
    bu: string
): Promise<null> => {

    const apiUrl = `http://localhost/BSA/Filter/FAutoGodown?companyid=${companyid}&site_code=${Site_Code}&StrLocationCode=${StrLocationCode}`

    try {
        const response = await axios.get(apiUrl)
        return response.data
    } catch (error) {
        console.error('Error getting balance:', error)
        return null
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
