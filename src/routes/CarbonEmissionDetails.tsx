// CarbonEmissionDetails.tsx
import React, { useContext, useState, useEffect } from 'react';
import { CarbonEmissionDetails as CarbonEmissionDetailsType } from '../Interfaces';
import AxiosContext from '../contexts/AxiosContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



const CarbonEmissionDetails = () => {
  const axiosInstance = useContext(AxiosContext);
  let params = useParams();
  const modelId = params.modelId;
  const distance = 100;
  const distanceUnit = "mi";
  const [details, setDetails] = useState<CarbonEmissionDetailsType | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.post('/estimates', {
          type: "vehicle",
          vehicle_model_id: modelId,
          distance_unit: distanceUnit, 
          distance_value: distance, 
        });
        setDetails(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [modelId, distance, distanceUnit, axiosInstance]);

  if (!details) return <div>Loading carbon emission details...</div>;
  details
  return (
    <>
    <Link to={`/`}>Back to Brands</Link>
    <div className="model-item">
     <h2> {details.attributes.vehicle_make}</h2>
     <h2> {details.attributes.vehicle_model}</h2>
     <h2> {details.attributes.vehicle_year}</h2>
       <h2> {details.attributes.estimated_at}</h2>
      {Object.entries(details.attributes).map(([key, value]) => (
      <div key={key}>
        <strong>{key}</strong>: {value}  
      </div>))}
      
 
      <p>Carbon Emission: {details.attributes.carbon_kg} kg</p>
      {/* Display additional carbon emission details here */}
    </div>
    </>
  );
};

export default CarbonEmissionDetails;
