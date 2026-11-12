'use server';

export async function getOHheaderByDocIdAction(
    companyid: string | number | true | object,
    Site_Code: string | number | true | object,
    username: string | number | true | object,
    { clientId }: { clientId: string | null },
    bu: string | number | true | object
) {
    const apiUrl = `http://localhost/BSA/Saleorder/GetSaleOrderOHByDocID?companyid=${companyid}&Site_Code=${Site_Code}&username=${username}&strDocID=${clientId}`;
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


