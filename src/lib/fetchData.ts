// src/lib/fetchData.ts
import axios from 'axios';


export const fetchFinancialData = async () => {
  try {
    const response = await axios.get('/financialData.json');
    // const response = await axios.get('https://127.0.0.1:8000/financials');
    console.log("response"+ response)
    return response.data;
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return null;
  }
};
