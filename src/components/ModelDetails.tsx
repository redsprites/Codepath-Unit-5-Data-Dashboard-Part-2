// ModelDetails.tsx
import React, { useState } from 'react';
import { Model } from '../Interfaces';
import {Link } from 'react-router-dom'

interface ModelDetailsProps {
  model: Model;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ model }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="accordion-content" style={{ marginLeft: '20px', padding: '10px', borderLeft: '2px solid #ccc' }}>
      <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
       <>Model Name </> - {model.data.attributes.name}  
        <br />
        <>Year</> - 
        {model.data.attributes.year}
      </div>
      {showDetails && <Link to={`/models/${model.data.id}/emissions`}>View Emissions</Link>}
    </div>
  );
};

export default ModelDetails;
