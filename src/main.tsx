import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarbonEmission from './routes/carbonEmission.tsx'
import CarbonEmissionDetails from './routes/CarbonEmissionDetails.tsx'
import AxiosInstance from './contexts/AxiosInstance.tsx'
import AxiosContext from './contexts/AxiosContext.tsx'
import CarbonEmissionVisualization from './routes/CarbonEmissionVis.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
 
  <React.StrictMode>
     <AxiosContext.Provider value={AxiosInstance}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/carbonEmission" element={<CarbonEmission/>} />
          <Route path="/models/:modelId/emissions" element={<CarbonEmissionDetails />} />
          <Route path="/emission-visualization" element={<CarbonEmissionVisualization />} />
          <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        </Routes>
      </BrowserRouter>
    </AxiosContext.Provider>
  </React.StrictMode>
 ,
)
