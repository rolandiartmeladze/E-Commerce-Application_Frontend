import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';


import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Main from './component/ProductsConteiner/Main';
import Aside from './component/Aside';

import AllProductsConteiner from './component/ProductsConteiner/AllProductConteiner';
import serverUri from './component/serverUrl';


// import LoginComp from './component/Login/LoginComp';
// import Home from './component/Home';

import Meniu from './component/Navigation/Meniu';

import { ProductsNavigation } from './component/Navigation/Meniu';

import Login from './component/UsersComponent/LogIn';
import SignUp from './component/UsersComponent/SingUp';

import View from './component/ViewProduct/View';
import ViewProductAside from './component/ViewProduct/ViewProductAside';
import Footer from './component/Footer';

// import HomeIcon from './icon/home.png';
// import ProductIcon from './icon/product.png';
// import LabelIcon from './icon/label.png';
// import categoryIcon from './icon/category.png';

import Product from './component/ProductComponent/Product';

import Category from './component/CategoriComponent/Category';

// import { clickF } from "./component/ProductsConteiner/AllProductConteiner";


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


const SimilarProductHead = styled.h1`
      position: relative;
      padding: 4px;
      text-align: left;
      width: 96%;
      margin: auto;
      padding-left: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      box-shadow: 1px 1px 3px 0px black;
      border-radius: 10px 0px 0px 10px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 10px;
          background-color: red; 
          border-radius: 10px 0px 0px 10px;
        }
  `;

  const SimilarProductConteiner = styled.div`
        width:  98%; 
        margin: auto; 
        min-height:  150px; 
        margin-bottom: 10px; 
        box-shadow:  0px -2px 9px 0px black; 
        border-radius:  6px 6px 0 0;
      `;

  const ViewConteiner = styled.div`
        flex-wrap:  nowrap; 
        width:  100%; 
        margin: auto; 
        padding:  0px; 
        height:  auto; 
        margin-top:  8px; 
        display:  flex; 
        justify-content: space-around;
  `;

  const App: React.FC = () => {
  
  // const navigate = useNavigate(); 

  const token = localStorage.getItem('token');

    const [usermode, setUserMode] = useState<boolean>(() => {

      if (token) { return true; } 
        else { return false;}
  });  


  

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
      const [favorits, setFavorits] = useState<any[]>(JSON.parse(localStorage.getItem('favorits') ?? '[]'));
      const [incart, setInCart] = useState<any[]>(JSON.parse(localStorage.getItem('incart') ?? '[]'));
    const [inproduct, sesInProduct] = useState<boolean>(false);
    const [incartResponse, setInCartResponse] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<{ id: string; quantity: number }[]>([]);
    const [buy, setBuy] = useState<boolean>(false);
    const [product, setProduct] = useState<Productprops | null>(null);


          const serverlink = serverUri();


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

        const HeaderProps = {
              singup, setSingUp, login, setLogIn, 
              usermode, chekfavorits,
              userData, setUserData,
              loading, setLoading,
              findstatus, setFindStatus, 
              notfound, setNotound, findInput,
              setFindInput, myRoom,
              }

          const ViewProductProps = {
                product, incart, favorits, 
                handleItemClick, buy,
                handleClickCart, setBuy,
                incartResponse, quantities,
                members, setFavorits, setInCart
                }

                const ViewProductAsideProps = {
                      members, incart, favorits,
                      usermode, product, setBuy,
                      handleClickCart, activeuser,
                      loading, incartResponse,
                      userData, setLoading,
                      setInCartResponse, 
                      quantities, setQuantities,
                      setProduct
                      }

                      const ProductsConteinerProps = {
                            userData, usermode, favorits, 
                            setFavorits, incart, 
                            setInCart, chekfavorits, 
                            activeuser, loading,
                            setLoading, members,
                            sesInProduct, product, 
                            setProduct,
                            }

                            const ProductsProps = {
                                  inUerMode, setInUserMode,
                                  findInput, setFindInput,
                                  fetchData, advanceData,
                                  setAdvanceData, singup,
                                  setSingUp, addproduct, 
                                  setAddProduct, login,
                                  setLogIn, activeuser,
                                  setActiveUser, usermode,
                                  favorits, myRoom, setMyRoom,
                                  }
                                      const MeniuProps ={setUserData, fetchData, usermode, setMyRoom, setProduct};

                                  const NavigationProps = {setProduct, product};


          return (
    
    <>
    

<div className="app">

<Header {...HeaderProps} setMyRoom={setMyRoom} />



<section style={{padding: '8px',  paddingTop: '2px'}}>

    <Meniu {...MeniuProps} />
 
  <Routes>
  <Route
path={'/'}     
element={
      <>
  {/* {usermode &&

} */}



<div style={{maxWidth:'1280px', width:'100%', margin:'auto'}}>


  {userData && <AllProductsConteiner {...ProductsConteinerProps} /> }


</div>


      </>
    }
  />

<Route path="/main" element={                  
<>

  <div style={{ gridTemplateColumns: myRoom? '75% 25%':'100%', marginBottom:'5px'}} className="main">


  <Main {...componentsprops} {...ProductsProps} />

    <Aside {...componentsprops}      
            activeuser={activeuser}
            setActiveUser={setActiveUser} 
            members={members}
            usermode={usermode}
            myRoom={myRoom} 
            />

</div>
</>

} />

        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/about" element={<h2>About</h2>} />
        <Route path="/contact" element={<h2>Contact</h2>} />

            <Route path="/products" element={<>{userData && 

            <>                 
                  <ProductsNavigation items={['home', 'products']} {...NavigationProps} />

                {/* <AllProductsConteiner {...ProductsConteinerProps} /> */}
                <Category
                        incart={incart}
                        setInCart={setInCart}
                        favorits={favorits}
                        setFavorits={setFavorits}
                        loading={loading}
                        setProduct={setProduct} 
                        setLoading={setLoading}
                        userData={userData}
                    />


            </>
             }</>} />

              <Route path="/category/" element={<>
                <ProductsNavigation items={['home', 'products', 'category']} {...NavigationProps}  />
                {/* <Category
                        incart={incart}
                        setInCart={setInCart}
                        favorits={favorits}
                        setFavorits={setFavorits}
                        loading={loading}
                        setProduct={setProduct} 
                        setLoading={setLoading}
                    /> */}

              </>} />

            {/* View I Products */}
              <Route path={`/product-ID/:productId`} element={ 
                <div>

                  <ProductsNavigation items={['home', 'products']} {...NavigationProps} />
                
                        <ViewConteiner>
                            {product && 
                              <>
                                <View {...ViewProductProps} />
                                <ViewProductAside {...ViewProductAsideProps} />
                              </>
                            }                                      
                          </ViewConteiner>

                            <>
                              <SimilarProductHead>Similar products</SimilarProductHead >
                              <SimilarProductConteiner> {'//'} </SimilarProductConteiner>
                            </>
                </div>
              } />

        

        
      </Routes>



</section>

    <Footer />

</div>


      </>

  );
}

export default App;
