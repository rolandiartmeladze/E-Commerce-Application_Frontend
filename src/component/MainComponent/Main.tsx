import React, { useEffect, useState } from 'react';

import { useNavigation } from 'react-router-dom';

import './ProductsConteiner.css';
import '../UsersComponent/SingUp.css';
import arrowIcon from '../../icon/arrow.png';



import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import AddProductBtn from './AddProductBtn';
import AddProduct from './AddProduct/Add';
import { Link, useNavigate } from 'react-router-dom';




import Container from './ProductsConteiner/Conteiner';
import Aside from './Aside/Aside';



interface MainProps {
}
      interface Product { _id: string; }
      interface ActiveUser { 
                products: Product[]; 
                favorits: Favorits[]; 
                }

      interface Favorits {
                _id: string;
                name: string;
                }
      

      interface Product{
                _id: string;
                name:string;
                address:string;
                quantityUnit:string;
                quantity:number;
                price:number;
                currency:string;
                owner:string;
                userID:string;
                image:any[];
                view:number;
                sale:number;
                share:number; 
                }
    
      
function Main({ }: MainProps) {

                        const [myProducts, setMyProducts] = useState<Product[] | null>(null)
                        const [selected, setSelected] = useState<Product[] | null>(null)

                useEffect(()=>{
                        async function FetchData() {
                                try {                        
                                        const token = localStorage.getItem('token');

                                const MainProduct = await fetch(`http://localhost:3001/Main/${token}`, {
                                        method: 'GET',
                                        headers: {'Content-Type': 'application/json'}
                                        });

                                        if(!MainProduct.ok){throw new Error('Failed to fetch users data');}
                                        // const Products = await MainProduct.json();
                                        setMyProducts(await MainProduct.json())
                                                // console.log(Products);
                                } catch (error) {
                                        
                                }
                        }
                                FetchData()

                },[])



        // const addProductFunction = () => {addproduct? setAddProduct(false):setAddProduct(true)};


        //         const closefinde = () => {
        //                     setFindStatus(false)
        //                     setNotound(false);
        //                     fetchData();
        //                     setFindInput('');
        //                 }

        //                 const myproduct: Product[] = (activeuser as ActiveUser)?.products || [];
        //                 const favproduct: Favorits[] = (activeuser as ActiveUser)?.favorits || [];


        //                 const [ismain ,setIsMain] = useState(true);
        //                 const [isfav ,setIsFav] = useState(false);


        //                 const myroom = () => {
                                
        //                         if(myRoom){
        //                         setMyRoom(false);
        //                         //  setIsMain(false); 
        //                         //  setIsFav(false);      
        //                         } else {
        //                                 setMyRoom(true);
        //                                 setIsMain(true);
        //                         }
                                  
                                
        //                 }

        //                 const setfavoritmode = () =>{
        //                         if(!isfav && (favproduct.length > 0)){
        //                                 setIsFav(true); 
        //                                 setIsMain(false);
        //                                 setMyRoom(true);
        //                         }
                                  
                                
        //                   }

        //                   const setmyproductmode = () =>{
        //                         !ismain && setIsFav(false); setIsMain(true);
        //                         setMyRoom(true);
        //                   }

                         const navigate = useNavigate()
                          const addProductF = () => {
                                navigate('/main/add');
                              };
                              
                                                

return (
<>


{myProducts && <Container products={myProducts} setSelected={setSelected} />}
{myProducts && <Aside product={selected} />}


</>
        );
}

export default Main;
