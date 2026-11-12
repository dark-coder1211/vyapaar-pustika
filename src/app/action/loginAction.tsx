
export async function getStaticIpPortAction(clientcode: any, userName: any) {

  // Define your URL for the GET requestc
  const apiUrl = `/api/getAPI/?ClientCode=${clientcode}&UserName=${userName}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();

    if (response.ok) {

      return responseData; // Return the fetched data for further processing
    } else {
      console.error('Failed to get order status:');
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting order status:', error);
    return null; // Return null in case of an exception
  }
}


export async function getUsernamePassAction(baseUrl: any, UserName: any, password: any) {
  const apiUrl = `http://localhost/BSA/UserMast/Get?userName=${UserName}&passWord=${password}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // Specify the method as GET
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();

    if (response.ok) {

      return responseData; // Return the fetched data for further processing
    } else {
      console.error('Failed to get:');
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error('Error getting:', error);
    return null; // Return null in case of an exception
  }
}






