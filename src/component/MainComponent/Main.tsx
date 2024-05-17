import React, { useEffect, useState } from 'react';

// import { useNavigation } from 'react-router-dom';

import styled from 'styled-components';

import './ProductsConteiner.css';
import '../UsersComponent/SingUp.css';
import arrowIcon from '../../icon/arrow.png';



import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import AddProductBtn from './AddProductBtn';
import AddProduct from './AddProduct/Add';
import { Link, useNavigate } from 'react-router-dom';




import Container from './ProductsConteiner/Conteiner';
import Aside from './Aside/Aside';
import MainNavigate from './Navigate/MainNavigate';



const Box = styled.div`
        grid-row: 2;
        grid-column: 1;
        display: grid;
        grid-template-columns: 75% 25%;      
`;


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
                        const [loading, setLoading] = useState<boolean>(false);
                useEffect(()=>{
                        async function FetchData() {
                                try {          
                                        let serverlink = "https://lavish-husky-gaura.glitch.me";

                                        setLoading(true);              
                                        const token = localStorage.getItem('token');

                                const MainProduct = await fetch(`${serverlink}/Main/${token}`, {
                                        method: 'GET',
                                        headers: {'Content-Type': 'application/json'}
                                        });

                                        if(!MainProduct.ok){throw new Error('Failed to fetch users data');}
                                        // const Products = await MainProduct.json();
                                        setMyProducts(await MainProduct.json());
                                        setLoading(false);
                                                // console.log(Products);
                                } catch (error) {
                                        
                                }
                        }
                                FetchData()

                },[])


                         const navigate = useNavigate()
                          const addProductF = () => {
                                navigate('/main/add');
                              };
                              
                                                

return (
<>
{loading && <h1>Loading...</h1>}
<Box>
{myProducts && <Container products={myProducts} setSelected={setSelected} />}
{myProducts && <Aside product={selected} />}
</Box>


</>
        );
}

export default Main;
