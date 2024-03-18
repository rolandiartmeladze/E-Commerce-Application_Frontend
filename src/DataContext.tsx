import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the context value
interface ContextValue {
  dataResponse: any[]; // Adjust this type according to your data structure
  setDataResponse: React.Dispatch<React.SetStateAction<any[]>>;
}

// Create a context with the specified type
// In DataContext.tsx
export const DataContext = createContext<ContextValue>({ dataResponse: [], setDataResponse: () => {} });

// Create a context provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataResponse, setDataResponse] = useState<any[]>([]);

  // Function to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:80/checkUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        setDataResponse(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ dataResponse, setDataResponse }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
