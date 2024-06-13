// components/CandlestickChart.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickChartProps {
  data: {
    x: number;
    y: [number, number, number, number];
  }[];
  
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      foreColor: '#ffffff'
    },
    title: {
      text: 'Apple Inc. (AAPL)',
      align: 'left',
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  const series = [
    {
      data
    }
  ];

  return (
    <div>
      <ApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default CandlestickChart;
