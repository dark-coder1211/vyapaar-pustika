
'use server'

import axios from 'axios'
import type { VGPApiResponse, VisitorGatePass } from './visitorGateInEntry_modal'

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

export async function GetVGPByDocid(
    { Docid }: { Docid: string | null },
    UserName: string, Site_Code: string, companyid: string,
    bu: string
): Promise<any | null> {

    const apiUrl = `http://localhost/BSA/Gate/getvisitorgatepassdetail?username=${UserName}&Site_Code=${Site_Code}&companyid=${companyid}&strdocid=${Docid}`

    try {
        const response = await fetch(apiUrl)

        // if (!response.ok) {
        //     console.error("API Error", response.status)
        //     return null
        // }

        const responseData: VGPApiResponse = await response.json()
        console.log("API Response:", responseData)

        return responseData
    } catch (error) {
        console.error("Fetch Error:", error)
        return null
    }
}


export const AddVGPAction = async (
    data: VisitorGatePass,
    Site_Code: string,
    companyid: string,
    UserName: string,
    bu: string
) => {
    let apiUrl
    if (data.strDocId === '') {
        apiUrl = `http://localhost/BSA/Gate/SaveVisitorGatePass?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&StrMode=ADD`
    } else {
        apiUrl = `http://localhost/BSA/Gate/SaveVisitorGatePass?companyid=${companyid}&Site_Code=${Site_Code}&userName=${UserName}&StrMode=EDIT`
    }

    console.log("PostFormData", data)
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
