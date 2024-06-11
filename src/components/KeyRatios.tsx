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
      <h2 className="text-2xl font-bold mb-4">Key Ratios</h2>
      <ul>
        <li>Market Cap: {data.market_cap}</li>
        <li>Shares Outstanding: {data.shares_outstanding}</li>
        <li>P/E Ratio: {data.pe_ratio}</li>
        <li>P/S Ratio: {data.ps_ratio}</li>
        <li>P/B Ratio: {data.pb_ratio}</li>
        <li>PEG Ratio: {data.peg_ratio}</li>
        <li>Current Ratio: {data.current_ratio}</li>
        <li>Debt to Equity Ratio: {data.debt_to_equity_ratio}</li>
        <li>EPS: {data.eps}</li>
      </ul>
    </div>
  );
};

export default KeyRatios;
