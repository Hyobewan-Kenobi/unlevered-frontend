"use client";
import { useEffect, useState } from 'react';
import KeyRatios from '../components/KeyRatios';
import AnalystEstimates from '../components/AnalystEstimates';
import { fetchFinancialData } from '../lib/fetchData';
// import CandleChartTwo from '../components/CandlestickChartv2';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React from 'react';
import CandlestickChart from '../components/CandlestickChart';
import axios from 'axios';
import { parseCSVData } from '@/lib/parseCSV';

// Define the types for the financial data
interface AnalystEstimatesData {
  bank: string;
  estimate: number;
}

interface FinancialData {
  analyst_estimates: AnalystEstimatesData[];
}

const Home = () => {
  const [data, setData] = useState<FinancialData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const financialData: FinancialData = await fetchFinancialData();
      setData(financialData);
    };

    fetchData();
  }, []);

  const [transformedEstimates, setTransformedEstimates] = useState<Record<string, number>>({});

  useEffect(() => {

    const fetchData = async () => {
      const data = {
        analyst_estimates: [
          { bank: 'Citibank', estimate: 6.5 },
          { bank: 'Goldman Sachs', estimate: 7.9 },
          { bank: 'Morgan Stanley', estimate: 9.87 },
        ] as AnalystEstimatesData[],
      };

      // Transform the data
      const transformed = data.analyst_estimates.reduce((acc, item) => {
        acc[item.bank] = item.estimate;
        return acc;
      }, {} as Record<string, number>);

      setTransformedEstimates(transformed);
    };

    fetchData();
  }, []);

//stock data
type DataType = { x: number; y: [number, number, number, number] };  
const [stockData, setStockData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('/apple_stock_data.csv');
        const parsedData = parseCSVData(response.data);
        setStockData(parsedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  

  return (
    <div className='bg-slate-800 text-slate-400'>
      <NavBar />
      <div className='flex'>
        <div className='flex-auto w-2/3 p-4'>
          <h1 className='font-bold text-4xl pl-4 text-white'>Apple Inc. (AAPL)</h1>
          <CandlestickChart data={stockData} />
          {/* <CandleChartTwo /> */}
        </div>
        <div className='flex-auto w-1/4 p-4'>
          {data ? (
            <>
              <div className='pb-4'>
                <KeyRatios data={data} />
              </div>
              <div>
                <AnalystEstimates estimates={transformedEstimates} />
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
