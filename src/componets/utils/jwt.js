// Method 2: Using API Key
export default async function getTokenWithAPIKey(setToken) {
  const BASE_URL = 'https://docspace-hlkza1.onlyoffice.com';
  const API_KEY = 'sk-5d8b411bb54e4abf0f9f720a7258d03f408d98559581ced848632d59e0fab78b'; // Get this from DocSpace settings

  try {
    const response = await fetch(`${BASE_URL}/api/2.0/authentication`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      setToken( data.response.token);
    }
  } catch (error) {
    console.error('API key authentication failed:', error);
  }
}


// Example:

