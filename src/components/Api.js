import axios from 'axios';
import base64 from 'base-64';

const consumerKey = 'CBkDtXYNR0mCvEoOHAm9LJu2mCwaNz4iEtGK9aBvaujJCGGQ';
const consumerSecret = 'uj3vlK7o58Rkd96UpDwXVj0bz12hSAiAmiRXoQ0kySGhChJx38X0bHtwqTpATdOC';
const passKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const businessShortCode = 174379; // You can obtain this from the M-Pesa portal
const callBackURL = 'https://your-domain.com/callback'; // Replace with your callback URL

/**
 * Generates an access token using the consumer key and secret.
 */
const generateAccessToken = async () => {
  const credentials = base64.encode(`${consumerKey}:${consumerSecret}`);
  try {
    const response = await axios.post('/oauth/v1/generate', {
      grant_type: 'client_credentials',
    }, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Access token response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};
/**
 * Generates the Lipa Na M-Pesa password using the pass key and timestamp.
 */
const lipaNaMpesaPassword = () => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
  const password = base64.encode(`${businessShortCode}${passKey}${timestamp}`);
  return password;
};

/**
 * Initiates an STK Push request to the M-Pesa API.
 */
const stkPush = async (amount, phoneNumber) => {
  const accessToken = await generateAccessToken();
  const password = lipaNaMpesaPassword();
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
  const data = {
    'BusinessShortCode': businessShortCode,
    'Password': password,
    'Timestamp': timestamp,
    'TransactionType': 'CustomerPayBillOnline',
    'Amount': amount,
    'PartyA': phoneNumber,
    'PartyB': businessShortCode,
    'PhoneNumber': phoneNumber,
    'CallBackURL': callBackURL,
    'AccountReference': 'Eastend Online shop',
    'TransactionDesc': 'lipa Na M-PESA',
  };

  const response = await axios.post('/mpesa/stkpush/v1/processrequest', data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export { stkPush };