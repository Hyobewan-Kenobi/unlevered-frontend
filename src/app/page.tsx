"use client"
// src/app/page.tsx
import { useEffect, useState } from 'react';
import KeyRatios from '../components/KeyRatios';
import AnalystEstimates from '../components/AnalystEstimates';
import { fetchFinancialData } from '../lib/fetchData';
import CandlestickChart from '../components/CandlestickChart';
import { parseCSVData } from '../lib/parseCSV'

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const financialData = await fetchFinancialData();
      setData(financialData);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Apple Stock Information</h1>
      {data ? (
        <>
          <KeyRatios data={data} />
          <AnalystEstimates estimates={data.analyst_estimates} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;
