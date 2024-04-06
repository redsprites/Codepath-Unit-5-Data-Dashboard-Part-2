// Interfaces.ts
export interface Brand {
  data : {
    id: string;
    type: string;
    attributes: {
      name: string;
      number_of_models: number;
    };
  }
  }
  
  export interface Model {
    data :{
    id: string;
    type: string;
    attributes: {
      name: string;
      year: number;
      vehicle_make: string;
    };
  }
  }
  
  export interface CarbonEmissionDetails {
    id: string;
    type: string;
    attributes: {
      distance_value: number;
      vehicle_make: string;
      vehicle_model: string;
      vehicle_year: number;
      distance_unit: string;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  }
export interface AxiosInstance {
    get: (url: string) => Promise<any>;
    post: (url: string, data: object) => Promise<any>;
  }
  
  // src/interfaces/index.ts
export interface Model {
  id: string;
  name: string;
  // Add other model properties as needed
}

export interface EmissionData {
  x: string; // Assuming 'x' is the model name for chart plotting
  y: number; // Assuming 'y' is the carbon emission value for chart plotting
}

export interface EmissionResponseData {
  data: {
    attributes: {
      carbon_kg: number;
      // Add other emission details as needed
    }
  }
}
