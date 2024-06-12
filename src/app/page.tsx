"use client"
// src/app/page.tsx
import { useEffect, useState } from 'react';
import KeyRatios from '../components/KeyRatios';
import AnalystEstimates from '../components/AnalystEstimates';
import { fetchFinancialData } from '../lib/fetchData';
import CandlestickChart from '../components/CandlestickChart';
import { parseCSVData } from '../lib/parseCSV';
import CandleChartTwo from '../components/CandlestickChartv2';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import axios from 'axios';


// const sampleCSVData = `Date,Open,High,Low,Close,Adj Close,Volume
// 2023-06-12,181.270004,183.889999,180.970001,183.789993,182.819077,54274900
// 2023-06-13,182.800003,184.149994,182.440002,183.309998,182.341629,54929100`;
// const parsedData = parseCSVData(sampleCSVData);
// console.log(parsedData);

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const financialData = await fetchFinancialData();
      setData(financialData);
    };

    fetchData();
  }, []);

  // const [stockData, setStockData] = useState([]);

  // useEffect(() => {
  //   const fetchStockData = async () => {
  //     try {
  //       const response = await axios.get('/apple_stock_data.csv');
  //       const parsedData = parseCSVData(response.data);
  //       setStockData(parsedData);
  //     } catch (error) {
  //       console.error('Error fetching stock data:', error);
  //     }
  //   };

  //   fetchStockData();
  // }, []);

  return (
    <div className='bg-slate-800 text-slate-400'>
      <NavBar/>
      <div className='flex'>
        <div className='flex-auto w-2/3 p-4'>
          {/* <CandlestickChart data={stockData} /> */}
          <h1 className='font-bold text-4xl pl-4 text-white'>Apple Inc. (AAPL)</h1>
          <CandleChartTwo />
        </div>
        <div className='flex-auto w-1/4 p-4'>
          {data ? (
            <>
              <div className='pb-4'>
                <KeyRatios data={data} />
              </div>
              <div>
                <AnalystEstimates estimates={data.analyst_estimates} />
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <Footer/>
      
    

      
    </div>
    
  );
};

export default Home;