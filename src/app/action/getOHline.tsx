'use server';

export async function getOHlineAction(
    companyid: string | number | true | object,
    Site_Code: string | number | true | object,
    username: string | number | true | object,
    bu: string | number | true | object,
    strV_Type: string
) {

    const apiUrl = `http://localhost/BSA/Saleorder/GetDMSOHLine_DMS?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&strVtype=${strV_Type}`;
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


