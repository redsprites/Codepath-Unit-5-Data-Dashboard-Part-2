// src/routes/CarbonEmissionVisualization.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';
import AxiosContext from '../contexts/AxiosContext';

// Assuming EmissionData is structured correctly for your needs.
// Ensure it has x (string) for brand names and y (number) for counts.
interface EmissionData {
  x: string;
  y: number;
}

const CarbonEmissionVisualization: React.FC = () => {
  const axiosInstance = useContext(AxiosContext);
  const [data, setData] = useState<EmissionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await axiosInstance.get('/vehicle_makes');
        const brands = brandsResponse.data;
        if (brands.length === 0) return;

        const emissionsData: EmissionData[] = [];
        for (let i = 0; i < brands.length; i++) {
          const brand = brands[i];
          const brandName = brand.data.attributes.name;
          const noOfModelsRaw = brand.data.attributes.number_of_models;
          // Ensure noOfModels is always treated as a number, even if undefined or null.
          const noOfModels = Number(noOfModelsRaw) || 0; // Fallback to 0 if not a number.
          emissionsData.push({ x: brandName, y: noOfModels });
        }

        setData(emissionsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div>
    <Link to="/">Back to Brands</Link>
    <XYPlot height={900} width={1400} xType="ordinal" margin={{bottom: 100}}>
      <VerticalBarSeries data={data} barWidth={0.5} />
      <XAxis title="Brand" style={{
        line: {stroke: '#FFF'},
        ticks: {fontSize: '12px', color: '#FFF'},
        text: {
          transform: 'rotate(-90deg)',
          textAnchor: 'end',
          fill: '#FFF'
        },
        title: {fill: '#FFF'}
      }}/>
      <YAxis title="Number Of Models" style={{
        line: {stroke: '#FFF'},
        ticks: {fontSize: '12px', color: '#FFF'},
        text: {fill: '#FFF'},
        title: {fill: '#FFF'}
      }}/>
    </XYPlot>
  </div>
  );
};

export default CarbonEmissionVisualization;
