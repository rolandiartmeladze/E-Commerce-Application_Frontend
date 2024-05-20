import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Container from './ProductsConteiner/Conteiner';
import Aside from './Aside/Aside';

const Box = styled.div`
        grid-row: 2;
        grid-column: 1;
        display: grid;
        grid-template-columns: 75% 25%;     
        
        @media (max-width: 750px) {
        display: flex;
        flex-direction: column-reverse;
        }
        `;

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
    
      
function Main() {

                const [myProducts, setMyProducts] = useState<Product[] | null>(null)
                const [selected, setSelected] = useState<Product[] | null>(null)
                const [loading, setLoading] = useState<boolean>(false);
                useEffect(()=>{
                        async function FetchData() {
                                try {                                        
                                        setLoading(true);              
                                        let serverlink = "https://lavish-husky-gaura.glitch.me";
                                        const token = localStorage.getItem('token');
                                        const MainProduct = await fetch(`${serverlink}/Main/${token}`, {
                                                method: 'GET',
                                                headers: {'Content-Type': 'application/json'}
                                                });

                                        if(!MainProduct.ok){throw new Error('Failed to fetch users data');}
                                                setMyProducts(await MainProduct.json());
                                                setLoading(false);
                                } catch (error) {console.log(error)}
                        }
                        FetchData()

                },[])

return (
        <Box>
                {loading && <h1>Loading...</h1>}
                {myProducts && <Container products={myProducts} setSelected={setSelected} />}
                {myProducts && <Aside product={selected} />}
        </Box>
        );
}

export default Main;
