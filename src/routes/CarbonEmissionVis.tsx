// src/routes/CarbonEmissionVisualization.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';
import AxiosContext from '../contexts/AxiosContext';
import { EmissionData, EmissionResponseData, Model } from '../../src/Interfaces';

const CarbonEmissionVisualization: React.FC = () => {
  const axiosInstance = useContext(AxiosContext);
  const [data, setData] = useState<EmissionData[]>([
    // { x: "Loading...", y: 0 }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse  = await axiosInstance.get<Model[]>('/vehicle_makes');
        const brands = brandsResponse.data;
        if (brands.length === 0) return; 
        const firstBrand = brands[0];
        const modelsResponse = await axiosInstance.get(`/vehicle_makes/${firstBrand.data.id}/vehicle_models`);
        const models = modelsResponse.data;
        console.log(models)
        const emissionsDataPromises = models.map(async (model: Model) => {
          try {
            console.log(model.data.id)
            const emissionResponse = await axiosInstance.post<EmissionResponseData>('/estimates', {
              type: "vehicle",
              vehicle_model_id: model.data.id,
              distance_unit: "mi", 
              distance_value: 100,
            });
            return { x: model.data.attributes.name, y: emissionResponse.data.data.attributes.carbon_kg };
          } catch (error) {
            console.log(`Failed to fetch emission data for model ${model.id}`, error);
            return null; // Return null if fetching fails, to be filtered out later
          }
        });
        const emissionsData = (await Promise.all(emissionsDataPromises)).filter(data => data !== null) as EmissionData[];

        // const models: Model[][] = await Promise.all(firstBrand.map(async (brand) => {
        //   const response = await axiosInstance.get<Model[]>(`/vehicle_makes/${brand.data.id}/vehicle_models`);
        //   return response.data;
          
        // }));
        // const firstBrand = models.slice(0,1);
        // const newModels = firstBrand[0][0];
        // console.log(newModels.data);
      //   const emissionsData: EmissionData[] = [];
      //  Object.entries(newModels).map(async([key, model]) =>{

      //     if (model?.id) { 
      //       console.log(model);
      //       const emissionResponse = await axiosInstance.post<EmissionResponseData>('/estimates', {
      //         type: "vehicle",
      //         vehicle_model_id: model.id,
      //         distance_unit: "mi",
      //         distance_value: 100,
      //       });
      //       emissionsData.push({ x: model.attributes.name, y: emissionResponse.data.data.attributes.carbon_kg });
      //     }
      //   });

        setData(emissionsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);
  console.log(data);

  return (
    <div>
      <Link to="/">Back to Brands</Link>
      <XYPlot height={300} width={300}>
      <VerticalBarSeries data={data} barWidth={0.5} />
        <XAxis title="Model" />
        <YAxis title="Carbon Emission (kg)" />
      </XYPlot>
    </div>
  );
};

export default CarbonEmissionVisualization;
