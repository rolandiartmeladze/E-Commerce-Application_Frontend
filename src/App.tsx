import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import ProductsConteiner from './component/ProductsConteiner/ProductsConteiner';
import Aside from './component/Aside';

import AllProductsConteiner from './component/ProductsConteiner/AllProductConteiner';
import serverUri from './component/serverUrl';


import Login from './component/UsersComponent/LogIn';
import SignUp from './component/UsersComponent/SingUp';
// import MyProducts from './component/ProductsConteiner/MyProducts';

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

    const [members, setMembers] = useState<any>([]);


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
            
                    const productsResponse = await fetch(`${serverlink}/checkProducts`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (!productsResponse.ok) { throw new Error('Failed to fetch users data'); }
                    const productsData = await productsResponse.json();
                          setUserData(productsData);


                          const membersdata = await fetch(`${serverlink}/Members`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });
                        if (!membersdata.ok) {
                            throw new Error('Failed to fetch users data');
                        }
                        const membersResponse = await membersdata.json();
                        setMembers(membersResponse);
        
                        setLoading(false);



                } catch (error) {console.error('Error fetching data:', error);
                    setLoading(false);
                }
            };
            
          useEffect(() => {
            fetchData();
          }, []); 
  return (
    <>

<div className="app">

<Header 
      singup={singup} 
      setSingUp={setSingUp} 
      login={login} 
      setLogIn={setLogIn} 
      usermode={usermode} 
      />
{!usermode &&
<div className='meniu'>
  <h1>Products: {userData.length}</h1> 
  <h1> Members: {members.length}</h1> 
  <h1> Favorite: {'0'}</h1>
  <h1> Category{'>'}</h1>
  </div>
}

{usermode &&
<div className="main">

      <div className='main-products-container'>

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

      </div>


        <Aside {...componentsprops}      
                activeuser={activeuser}
                setActiveUser={setActiveUser} 
                members={members}
                />

</div>

}

{login || singup ? (
  <div className="sing-up-container">
    {login ? (
      <Login singup={singup} setSingUp={setSingUp} login={login} setLogIn={setLogIn} />
    ) : (
      <SignUp singup={singup} setSingUp={setSingUp} />
    )}
  </div>
):null}
<div style={{maxWidth:'1280px', width:'100%', margin:'auto'}}>

<AllProductsConteiner userData={userData} usermode={usermode} />

<footer className="footer">Footer</footer>

</div>



</div>




      </>

  );
}

export default App;
