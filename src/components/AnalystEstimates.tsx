"use client";

// src/components/AnalystEstimates.tsx
import React from 'react';

interface AnalystEstimatesProps {
  estimates: {
    [key: string]: number;
  };
}

const AnalystEstimates: React.FC<{ estimates: any }> = ({ estimates }) => {
  if (!estimates) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Analyst Estimates</h2>
      <ul>
        {Object.entries(estimates).map(([bank, estimate]) => (
          <li key={bank}>{bank}: {estimate}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalystEstimates;
