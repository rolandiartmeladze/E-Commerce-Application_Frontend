import React, {useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import ProductsConteiner from './component/ProductsConteiner/ProductsConteiner';
import Aside from './component/Aside';

interface User {
  Name: string;
  Address: string;
  Price: number;
  Currency:string;
  Quantity: number;
}


function App(): JSX.Element{
  
  // const serverUrl = "https://limitless-tor-40344-c89ae9237437.herokuapp.com";
  const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";


  const [loading, setLoading] = useState<boolean>(false);
  const [findstatus, setFindStatus] = useState<boolean>(false);
  const [notfound, setNotound] = useState<boolean>(false);
  const [findInput, setFindInput] = useState<string>('');

  // const [userResponse, setUserData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
    const [advanceData, setAdvanceData] = useState<any[]>([]);

    const [isselected, setIsSelected] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [soldAmount, setSoldAmount] = useState<number>(1);
    const [singup, setSingUp] = useState(false);

    const [inUerMode, setInUserMode] = useState(true);
    const [product, setProduct] = useState<any>(false);

    const componentsprops = {
          userData,
          setUserData,
          loading,
          setLoading,
          findstatus,
          setFindStatus,
          notfound,
          setNotound,
          findInput,
          setFindInput,
          isselected,
          setIsSelected,
          selectedUser,
          setSelectedUser,   
          soldAmount,
          setSoldAmount
          
      
                            };

      // როდესაც ჩაიტვირთრბა app.js აგზავნის მოთხოვნას GET მონაცემთა ბაზაში 
      // ამოწმებს შედეგს და ანიჭებს მიღებულ მონაცემებს dataResponse ცვლადს
      // რაც აისახება რეალურ გარემოში
      const fetchData = async () => {
        setLoading(true);
        try {

          const usersResponse = await fetch(`${serverUrl}/checkProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
            if (!usersResponse.ok) {throw new Error('Failed to fetch users data');}
            const usersData = await usersResponse.json();
            setUserData(usersData);
      
        const advanceResponse = await fetch(`${serverUrl}/checkAdvance`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      });
            if (!advanceResponse.ok) {throw new Error('Failed to fetch advance data');}
            const advanceData = await advanceResponse.json();
            setAdvanceData(advanceData[0]);
          setLoading(false)
      } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

          useEffect(() => {
            fetchData();
          }, []); 
  return (
    <>

<Header singup={singup} setSingUp={setSingUp} />
<Aside {...componentsprops} />



  <ProductsConteiner {...componentsprops}
    inUerMode={inUerMode}
    setInUserMode={setInUserMode}
    findInput={findInput}
    setFindInput={setFindInput}
    fetchData={fetchData}
    advanceData={advanceData}
    setAdvanceData={setAdvanceData}
    singup={singup} 
    setSingUp={setSingUp}
    product={product} 
    setProduct={setProduct}
  />


      </>

  );
}

export default App;
