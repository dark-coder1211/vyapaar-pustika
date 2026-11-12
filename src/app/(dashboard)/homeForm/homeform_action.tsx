'use server';

export const Home = async (
  stats: string,
  Site_Code: string,
  companyid: string,    
  UserName: string
) => {
  const apiUrl = `http://localhost/BSA/Home/${stats}?Site_Code=${Site_Code}&companyid=${companyid}&User_Name=${UserName}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////

export const LocalCurrency = async (
  Site_Code: string,
  companyid: string
) => {
  const apiUrl = `http://localhost/BSA/Home/LocalCurrency?site_code=${Site_Code}&Companyid=${companyid}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    //   cache: 'no-store', // Prevent caching (optional)
    });

    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////

export const userPermission = async (UserName: string) => {
  const apiUrl = `http://localhost/BSA/UserControlPanel/userPermission?userName=${UserName}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Optional: disable caching
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return null;
  }
};
