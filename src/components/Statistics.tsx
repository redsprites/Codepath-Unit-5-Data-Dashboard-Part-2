// Statistics.tsx
import React from 'react';
import { Brand } from '../Interfaces';

interface StatisticsProps {
  brands: Brand[];
}

const Statistics: React.FC<StatisticsProps> = ({ brands }) => {
  const totalBrands = brands.length;
  const meanModels = brands.reduce((acc, brand) => acc + brand.data.attributes.number_of_models, 0) / totalBrands;
  const medianModels = totalBrands % 2 === 0 ? brands[totalBrands / 2].data.attributes.number_of_models : brands[Math.floor(totalBrands / 2)].data.attributes.number_of_models;

  return (
    <div  className="summary-container">
      <div className="summary-card">Total Brands: {totalBrands}</div>
      <div className="summary-card">Mean Number of Models per Brand: {meanModels.toFixed(2)}</div>
      <div className="summary-card">Median Number of Models: {medianModels}</div>
    </div>
  );
};

export default Statistics;
