import React, { useState } from 'react';

function BtnRequest() {
  const [response, setResponse] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:2000/');
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <h1>Response from Backend:</h1>
      <div>{response}</div>
      <button onClick={fetchData}>Get Data from Backend</button>
    </>
  );
}

export default BtnRequest;
