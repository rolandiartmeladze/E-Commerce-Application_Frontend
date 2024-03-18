import React, {useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import UserConteiner from './component/UserConteiner';
import Aside from './component/Aside';


function App(): JSX.Element{
  
  const [dataResponse, setDataResponse] = useState<any[]>([]);

      // როდესაც ჩაიტვირთრბა app.js აგზავნის მოთხოვნას GET მონაცემთა ბაზაში 
      // ამოწმებს შედეგს და ანიჭებს მიღებულ მონაცემებს dataResponse ცვლადს
      // რაც აისახება რეალურ გარემოში

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
            fetchData();
          }, []); 
  
  

  return (
    <>

<Header />
<Aside />



  <UserConteiner 
    dataResponse={dataResponse} 
    setDataResponse={setDataResponse} 
  />


      </>

  );
}

export default App;
