// BrandAccordion.tsx
import React, { useContext, useEffect, useState } from 'react';
import ModelDetails from './ModelDetails';
import { Brand, Model } from '../Interfaces';
import AxiosContext from '../contexts/AxiosContext';

interface BrandAccordionProps {
  brand: Brand;
}

const BrandAccordion: React.FC<BrandAccordionProps> = ({brand}) => {
  const [models, setModels] = useState<Model[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('');
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const axiosInstance = useContext(AxiosContext);
  useEffect(() => {
    if (isOpen) {
      fetchModels();
    }
  }, [isOpen]);
  const fetchModels = async () => {
    if (isOpen || models.length > 0) return;
    try {
      const response = await axiosInstance.get(`/vehicle_makes/${brand.data.id}/vehicle_models`);
      setModels(response.data);
      const years = Array.from(new Set(response.data.map((model: Model) => model.data.attributes.year.toString()))).sort();
      setAvailableYears(years as string[]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    fetchModels();
  };
  const filteredModels = models.filter(model => {
    const matchesYear = yearFilter === 'all' ? true : model.data.attributes.year.toString() === yearFilter;
    const matchesModel = modelFilter ? model.data.attributes.name.toLowerCase().includes(modelFilter.toLowerCase()) : true;
    return matchesYear && matchesModel;
  });

  return (
    <div className='accordion'>
    <div className="accordion-header" onClick={toggleAccordion} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
      {brand.data.attributes.name}
    </div>
    {isOpen && (
      <>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            placeholder="Filter by model name..."
            className="search-input"
            onChange={(e) => setModelFilter(e.target.value)}
          />
          <select  className="filter-dropdown" onChange={(e) => setYearFilter(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="all">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        {filteredModels.map(model => (
          <ModelDetails key={model.data.id} model={model} />
        ))}
      </>
    )}
    </div>
  );
};

export default BrandAccordion;
