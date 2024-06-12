import React from 'react';

interface AnalystEstimatesProps {
  estimates: Record<string, number>;
}

const AnalystEstimates: React.FC<AnalystEstimatesProps> = ({ estimates }) => {
  return (
    <div>
      <h2>Analyst Estimates</h2>
      <ul>
        {Object.entries(estimates).map(([bank, estimate]) => (
          <li key={bank}>
            {bank}: {estimate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalystEstimates;
