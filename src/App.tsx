import React, {useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import ProductsConteiner from './component/ProductsConteiner/ProductsConteiner';
import Aside from './component/Aside';


import serverUri from './component/serverUrl';

interface User {
  Name: string;
  Address: string;
  Price: number;
  Currency:string;
  Quantity: number;
}


function App(): JSX.Element{
  
  const token = localStorage.getItem('token');

    const [usermode, setUserMode] = useState<boolean>(() => {
      if (token) { return true;} 
        else { return false;}
  });  
  
  // console.log(usermode);


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

    const [inUerMode, setInUserMode] = useState(true);
    const [product, setProduct] = useState<any>(false);

    const [singup, setSingUp] = useState(false);
    const [login, setLogIn] = useState(false);


    const [activeuser,setActiveUser] = useState({});
    const [members,setMembers] = useState<any>([]);

    
                        const serverlink = serverUri();



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
                    if (token) {
                        const userResponse = await fetch(`${serverlink}/user?token=${token}`);
                        if (userResponse.ok) {
                            const userData = await userResponse.json();
                            // console.log('User data:', userData);
                            setActiveUser(userData)
                        } else {
                            throw new Error('Failed to fetch user data');
                        }
                    }
            
                    const usersResponse = await fetch(`${serverlink}/checkProducts`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    if (!usersResponse.ok) {
                        throw new Error('Failed to fetch users data');
                    }
                    const usersData = await usersResponse.json();
                    setUserData(usersData);
            
                    // const activeUserResponse = await fetch(`${serverlink}/Activeuser`, {
                    //     method: 'GET',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    // });
                    // if (!activeUserResponse.ok) {
                    //     throw new Error('Failed to fetch advance data');
                    // }
                    // const activeUserResponseJson = await activeUserResponse.json();
                    
                    
                    // setActiveUser(activeUserResponseJson[0]);
                    // setMembers(activeUserResponseJson);
                    // console.log(activeUser);
            
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            };
            
          useEffect(() => {
            fetchData();
          }, []); 
  return (
    <>

<Header singup={singup} setSingUp={setSingUp} login={login} setLogIn={setLogIn} usermode={usermode} />
<Aside {...componentsprops}      activeuser={activeuser}
    setActiveUser={setActiveUser} members={members}
/>



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


    login={login}
    setLogIn={setLogIn}

    activeuser={activeuser}
    setActiveUser={setActiveUser}

    usermode={usermode}

  />




      </>

  );
}

export default App;
