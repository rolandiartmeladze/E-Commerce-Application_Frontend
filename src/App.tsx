import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link, useParams  } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import ProductsConteiner from './component/ProductsConteiner/ProductsConteiner';
import Aside from './component/Aside';

import AllProductsConteiner from './component/ProductsConteiner/AllProductConteiner';
import serverUri from './component/serverUrl';


// import LoginComp from './component/Login/LoginComp';
// import Home from './component/Home';

import Login from './component/UsersComponent/LogIn';
import SignUp from './component/UsersComponent/SingUp';

import View from './component/ViewProduct/View';
import ViewProductAside from './component/ViewProduct/ViewProductAside';



// import MyProducts from './component/ProductsConteiner/MyProducts';

interface User {
  Name: string;
  Address: string;
  Price: number;
  Currency:string;
  Quantity: number;
}

interface Productprops{
  name:string;
  _id: string;
  id: string;
  location:string;
  quantityUnit:string;
  quantity:number;
  price:number;
  currency:string;
  owner:string;
  email:string;
  phone:string;
  comment:string;
  description:string;
  view:number;
  sale:number;
  share:number;
  category: string;
  datatime: string;
}


const App: React.FC = () => {
  
  
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
    const [addproduct, setAddProduct] = useState<any>(false);

    const [singup, setSingUp] = useState(false);
    const [login, setLogIn] = useState(false);


    const [activeuser,setActiveUser] = useState<any>({});

    const [members, setMembers] = useState<any>([]);

    const [myRoom, setMyRoom] = useState(true);


    // const [category, setcategory] = useState(false);

    const [favorits, setFavorits] = useState<any[]>(JSON.parse(localStorage.getItem('favorits') ?? '[]'));
    const [incart, setInCart] = useState<any[]>(JSON.parse(localStorage.getItem('incart') ?? '[]'));


    const [inproduct, sesInProduct] = useState<boolean>(false);

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



      const chekfavorits  = async () => {

        try {
            
            const option = {
                userId: token,
                favorits:favorits
            }
            const favorit = await fetch(`${serverlink}/FavoritProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(option),
            })
            if (!favorit.ok) {
                throw new Error('Failed to fetch users data');
            }

               const favoritResponse = await favorit.json();
               localStorage.setItem('favorits', JSON.stringify(favoritResponse));
                    setFavorits(favoritResponse);
        } catch (error) { console.error('Error fetching data:', error);}

    


};


 
               const fetchData = async () => {

                               setLoading(true);

                try {
                    if (token) {
                        const userResponse = await fetch(`${serverlink}/user?token=${token}`);
                        if (userResponse.ok) {
                            const userData = await userResponse.json();
                            setActiveUser(userData)
                        } else { throw new Error('Failed to fetch user data'); }
                        chekfavorits();
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
                                headers: {'Content-Type': 'application/json'},
                                });
                        if (!membersdata.ok) {  throw new Error('Failed to fetch users data'); }
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


          const selectCategory = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
            const selectedCategory: string = event.target.value;
            if(selectedCategory !== "All"){

            try {
              const sortedcategory = await fetch(`${serverlink}/sortedcategory?category=${encodeURIComponent(selectedCategory)}`, {                
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              });
              if (!sortedcategory.ok) { throw new Error('Failed to fetch users data'); }
              const categoryresponse = await sortedcategory.json();
              setUserData(categoryresponse);
            } catch (error) { console.log('Error:', error); }
          }else if(selectedCategory === "All"){fetchData();}

          
          }
                    
          const categories: string[] = ["All", "Clothing", "Technique", "Food", "Accessories"];
          
          const categoryOptions: JSX.Element[] = categories.map((category: string, index: number) => (
            <option style={{ backgroundColor: 'black' }} key={index} value={category}>
              {category}
            </option>
          ));







          const [incartResponse, setInCartResponse] = useState<any[]>([]);
          const [quantities, setQuantities] = useState<{ id: string; quantity: number }[]>([]);
          const [buy, setBuy] = useState<boolean>(false);

          const [product, setProduct] = useState<Productprops | null>(null);



          const handleItemClick = async (itemId: string) => {
            let newItem = itemId;
            
            let storedFavorites = localStorage.getItem('favorits');
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            
            let updatedFavorites = [...favorites];
            
            const index = updatedFavorites.indexOf(newItem);
                if (index === -1) {updatedFavorites.push(newItem);} 
                else {updatedFavorites.splice(index, 1);}
            localStorage.setItem('favorits', JSON.stringify(updatedFavorites));
                setFavorits(updatedFavorites);
        };
        
        
        
        const handleClickCart = async (itemId: string) => {
        
                  const token = localStorage.getItem('token');
                  let newItem = itemId;
        
                      if(usermode){
                        try {  
                          const userID = token;
                          const checkCartItem = await fetch(`${serverlink}/addCarItem/${userID}`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({itemId}),
                                });
        
                            if(!checkCartItem.ok){ throw new Error('not working'); }
                            const cartResponse = await checkCartItem.json();
                            setInCart(cartResponse)
                        } catch (error) {console.log(error, "not Found");}
                      }
                
                let storedcarts = localStorage.getItem('incart');
                let incart = storedcarts ? JSON.parse(storedcarts) : [];
                let updatedcarts = [...incart];
                
                const index = updatedcarts.indexOf(newItem);
                    if (index === -1) {updatedcarts.push(newItem);} 
                    else {updatedcarts.splice(index, 1);}
                localStorage.setItem('incart', JSON.stringify(updatedcarts));
                    setInCart(updatedcarts);
        };
        
        const ViewProductProps = {
              product, incart, favorits, 
              handleItemClick, buy,
              handleClickCart, setBuy,
              incartResponse, quantities,
              members,
              }

              const ViewProductAsideProps = {
                    members, incart, favorits,
                    usermode, product, setBuy,
                    handleClickCart, activeuser,
                    loading, incartResponse,
                    userData, setLoading,
                    setInCartResponse, 
                    quantities, setQuantities,
                    }


  return (
    
    <>
    

<div className="app">

<Header singup={singup} 
        setSingUp={setSingUp} 
        login={login} 
        setLogIn={setLogIn} 
        usermode={usermode} 
        chekfavorits={chekfavorits}
        userData={userData} 
    setUserData={setUserData} 
    loading={loading}
    setLoading={setLoading}
    findstatus={findstatus}
    setFindStatus={setFindStatus}
    notfound={notfound}
    setNotound={setNotound}
    findInput={findInput}
    setFindInput={setFindInput}
    myRoom={myRoom} />

{!usermode &&
<div className='meniu'>
  {!inproduct? <h1> Result: {userData.length}</h1> :                       
  <Link to={'/'}>
<h1  style={{textDecoration:'underline', cursor:'pointer'}}> Home</h1></Link>}
  
   
  <h1> Members: {members.length}</h1> 
  {/* <h1> Favorite: {favorits.length}</h1> */}
  <h1 style={{display:'flex', alignItems: 'center'}}> Category: 
        <select onChange={selectCategory} style={{
            padding: '4px',
            background: 'none',
            fontWeight: '800',
            border: 'none',
            textAlign: 'center',
            color: 'yellow',
            marginLeft: '4px'
          }} name="category" id="category">
          {categoryOptions}
        </select>

  </h1>
  </div>
}


{/* {login || singup ? (
  <div className="sing-up-container">
    {login ? (
      <Login singup={singup} setSingUp={setSingUp} login={login} setLogIn={setLogIn} />
    ) : (
      <SignUp singup={singup} setSingUp={setSingUp} />
    )}
  </div>
):null} */}

<section style={{padding: '8px'}}>
  <Routes>
  <Route
path={'/'}     
element={
      <>
  {usermode &&
<div style={{ gridTemplateColumns: myRoom? '75% 25%':'100%', marginBottom:'5px'}} className="main">

      <div style={{marginRight: myRoom? '8px': '0px', paddingBottom: myRoom? '10px': '0px'}} className='main-products-container'>

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
          addproduct={addproduct} 
          setAddProduct={setAddProduct}
          login={login}
          setLogIn={setLogIn}
          activeuser={activeuser}
          setActiveUser={setActiveUser}
          usermode={usermode}
          favorits={favorits}
          myRoom={myRoom} 
          setMyRoom={setMyRoom}
        />

      </div>


        <Aside {...componentsprops}      
                activeuser={activeuser}
                setActiveUser={setActiveUser} 
                members={members}
                usermode={usermode}
                myRoom={myRoom} 
                />

</div>

}


<div style={{maxWidth:'1280px', width:'100%', margin:'auto'}}>
{userData && 

<AllProductsConteiner userData={userData} 
    usermode={usermode} 
    favorits={favorits} 
    setFavorits={setFavorits}  
    incart={incart} 
    setInCart={setInCart}
    chekfavorits={chekfavorits} 
    activeuser={activeuser} 
    loading={loading}
    setLoading={setLoading}
    members={members}
    sesInProduct={sesInProduct}
    product={product} 
    setProduct={setProduct}

    />
}


</div>


      </>
    }
  />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />

        <Route path={`/product-ID/:productId`} element={ 
                  <>

          {<Link to={'/'}>
            <h1 style={{textDecoration:'underline', cursor:'pointer', width: '99%' }} 
            className="products-header">Home</h1></Link>}

                  <div style={{flexWrap: 'nowrap', width: '100%', margin:'auto', padding: '0px', height: 'auto', 
                  marginTop: '8px'}} className="productarray">
  {product && (
      <>
        <View {...ViewProductProps} />
        <ViewProductAside {...ViewProductAsideProps} />
      </>
)}                                      

</div>


          </>
          
        } />

        

        
      </Routes>



</section>




<footer className="footer">
  
  <ul>
    <h4>Admin</h4>
    <li> Roland Artmeladze </li>
    <li> <a href='mailto:Rartmeladze@gmail.com'>Rartmeladze@gmail.com</a> </li>
    <li> <a href='tel:+995595035668'>(+995) 595 03-56-68</a> </li>
  </ul>

      <ul>
        <h4>info</h4>
        <li> <a href='#'> About Project </a> </li>
        <li> <a href='#'>Contacts</a> </li>
        <li> <a href='#'>Rante</a> </li>
      </ul>

          <ul>
            <h4>total</h4>
            <li> Products- {userData.length} </li>
            <li> Members- {members.length} </li>
            <li> Category- 5 </li>
          </ul>

<div style={{width:'100%', textAlign:'center', marginBottom:'8px', color:'cyan', fontWeight:'700'}}>@ Roland Artmeladze  2024</div>
</footer>

</div>


      </>

  );
}

export default App;


// const Home =() =>{
//   return(<><h1>Home</h1></>)
// }
// const LogilComponent =() =>{
//   return(<><h1>login</h1></>)
// }