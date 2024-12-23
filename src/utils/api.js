// src/utils/api.js

import axios from "axios";

let cachedToken = null;
let tokenExpiry = null;

// Replace with your actual Amadeus credentials
const CLIENT_ID = "jduEbpxz3BxDpwAwyBDUHnqkfz2ksajL";
const CLIENT_SECRET = "DkhnuvmOw8PdmoXg";
const AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

/**
 * Fetches a new access token from Amadeus API.
 */
const fetchToken = async () => {
  try {
    const response = await axios.post(
      AUTH_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    // Cache the token and set expiry time
    cachedToken = access_token;
    tokenExpiry = Date.now() + expires_in * 1000; // expires_in is in seconds

    console.log("New token fetched:", access_token);
    return access_token;
  } catch (error) {
    console.error("Error fetching token:", error.response?.data || error);
    throw new Error("Failed to fetch token");
  }
};

/**
 * Returns a valid token, fetching a new one if necessary.
 */
const getToken = async () => {
  if (cachedToken && tokenExpiry > Date.now()) {
    return cachedToken;
  }
  return await fetchToken();
};

/**
 * Makes an API call with proper token management.
 * @param {string} url - The API endpoint URL.
 * @param {object} params - The query parameters.
 * @param {string} method - HTTP method, default is GET.
 * @param {object} data - Data for POST, PUT requests.
 */
const apiCall = async (url, params = {}, method = "GET", data = {}) => {
  try {
    const token = await getToken();

    const response = await axios({
      url,
      method,
      params,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token might have expired, fetch a new one and retry once
      try {
        cachedToken = null; // Invalidate the cached token
        const token = await getToken();

        const response = await axios({
          url,
          method,
          params,
          data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (err) {
        console.error(
          "Error after refreshing token:",
          err.response?.data || err
        );
        throw err;
      }
    }

    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded:", error.response?.data || error);
      // Optionally, implement a retry mechanism with delay
    }

    console.error("API call error:", error.response?.data || error);
    throw error;
  }
};

export { apiCall };

// import axios from "axios";

// let token = null; // Store the token globally within the module
// let tokenExpiry = null; // Track when the token expires

// const clientId = "jduEbpxz3BxDpwAwyBDUHnqkfz2ksajL"; // Replace with your Amadeus client ID
// const clientSecret = "DkhnuvmOw8PdmoXg"; // Replace with your Amadeus client secret

// // Function to fetch a new token
// const fetchToken = async () => {
//   try {
//     const response = await axios.post(
//       "https://test.api.amadeus.com/v1/security/oauth2/token",
//       new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: clientId,
//         client_secret: clientSecret,
//       }),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     token = response.data.access_token;
//     // Set the expiry to the current time plus the token's lifespan (usually 30 minutes)
//     tokenExpiry = Date.now() + response.data.expires_in * 1000;
//     console.log("New token generated:", token);
//   } catch (error) {
//     console.error("Error fetching token:", error.response?.data || error);
//     throw new Error("Failed to fetch token.");
//   }
// };

// // Function to get a valid token
// const getToken = async () => {
//   if (!token || Date.now() >= tokenExpiry) {
//     await fetchToken();
//   }
//   return token;
// };

// // Wrapper for making API calls with token management
// const apiCall = async (url, params = {}) => {
//   if (!token || Date.now() >= tokenExpiry) {
//     await fetchToken();
//   }

//   try {
//     const response = await axios.get(url, {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error in API call:", error.response?.data || error);
//     throw error;
//   }
// };

// export { getToken, apiCall };
