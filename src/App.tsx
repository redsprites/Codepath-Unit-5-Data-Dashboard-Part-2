import { useContext, useState, useEffect } from 'react'
import './App.css'
import AxiosContext from './contexts/AxiosContext';
import Statistics from './components/Statistics';
import BrandAccordion from './components/BrandAccordion';
import { Brand } from './Interfaces';
import { Link } from 'react-router-dom'



function App() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const axiosInstance = useContext(AxiosContext);
 
   const fetchBrands = async () => {
    try{
    const response = await axiosInstance.get('/vehicle_makes')
    setBrands(response.data);
  }
  catch (error){
    console.log(error)
  }
}

  useEffect(() => {
    fetchBrands()
  },[])
  const filteredBrands = brands.filter(brand => brand.data.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>Carbon Emission Calculator for Cars</h1>
      <Link to="/emission-visualization">Go to Brand Visualization</Link>
      {brands.length > 0 && <Statistics brands={brands} />}
      <div  className="search-filter-container">
      <input
        type="text"
        placeholder="Search brands..."
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
        
     
         {filteredBrands.map(brand => (
        <BrandAccordion key={brand.data.id} brand={brand} />
      ))}
    </div>
  )
}

export default App
