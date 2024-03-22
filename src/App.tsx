import React, {useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import UserConteiner from './component/UserConteiner';
import Aside from './component/Aside';


function App(): JSX.Element{
  
  // const [userResponse, setUserData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
    const [advanceData, setAdvanceData] = useState<any[]>([]);

      // როდესაც ჩაიტვირთრბა app.js აგზავნის მოთხოვნას GET მონაცემთა ბაზაში 
      // ამოწმებს შედეგს და ანიჭებს მიღებულ მონაცემებს dataResponse ცვლადს
      // რაც აისახება რეალურ გარემოში

          useEffect(() => {
            const fetchData = async () => {
              try {

                const usersResponse = await fetch('http://localhost:80/checkProducts', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
                  if (!usersResponse.ok) {throw new Error('Failed to fetch users data');}
                  const usersData = await usersResponse.json();
                  setUserData(usersData);
            
              const advanceResponse = await fetch('http://localhost:80/checkAdvance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
                  if (!advanceResponse.ok) {throw new Error('Failed to fetch advance data');}
                  const advanceData = await advanceResponse.json();
                  setAdvanceData(advanceData[0]);

            } catch (error) {
                console.error('Error fetching user data:', error);
              }
            };
            fetchData();
          }, []); 
  
          console.log(advanceData)

  return (
    <>

<Header />
<Aside />



  <UserConteiner 
    userData={userData} 
    setUserData={setUserData} 
    advanceData={advanceData}
    setAdvanceData={setAdvanceData}
  />


      </>

  );
}

export default App;
