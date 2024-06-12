"use client";

// src/components/KeyRatios.tsx
import React from 'react';

interface KeyRatiosProps {
  data: {
    market_cap: number;
    shares_outstanding: number;
    pe_ratio: number;
    ps_ratio: number;
    pb_ratio: number;
    peg_ratio: number;
    current_ratio: number;
    debt_to_equity_ratio: number;
    eps: number;
  };
}

const KeyRatios: React.FC<{ data: any }> = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Key Ratios</h2>
      <ul>
        <li><b>Market Cap:</b> {data.market_cap}</li>
        <li><b>Shares Outstanding:</b> {data.shares_outstanding}</li>
        <li><b>P/E Ratio:</b> {data.pe_ratio}</li>
        <li><b>P/S Ratio:</b> {data.ps_ratio}</li>
        <li><b>P/B Ratio:</b> {data.pb_ratio}</li>
        <li><b>PEG Ratio:</b> {data.peg_ratio}</li>
        <li><b>Current Ratio:</b> {data.current_ratio}</li>
        <li><b>Debt to Equity Ratio:</b> {data.debt_to_equity_ratio}</li>
        <li><b>EPS:</b> {data.eps}</li>
      </ul>
    </div>
  );
};

export default KeyRatios;
