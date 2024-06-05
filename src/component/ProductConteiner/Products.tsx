import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import styled from "styled-components";
import ProductComponent from  '../ProductComponent/ProductComponent';
import viewProduct from '../ProductComponent/VievUpdate';

import Product from '../../Tools';

import { SortProduct } from "./Tools";
import { Navigation } from "./Tools";

const ProductTools = styled.div`
background: gainsboro;
    backdrop-filter: blur(5px);
    box-shadow: 0px 1px 5px 0px #000000;
    padding: 0 12px;
    position: relative;
 
    `;

    const Container = styled.div`
    .cont{

    article{
        transform: scale(0);
        transition: 0.6s ease-in-out;
        overflow: hidden;                    

    }    }

    `;

interface Props {
    incart: string[];
    setInCart: Function;
    favorits: string[];
    setFavorits: Function; 
    loading: boolean;
    setProduct: Function;
    setLoading: Function;
    product:any;
}



const ProductsConteiner = ({ incart, setInCart, favorits, setFavorits, loading, setProduct, setLoading, product }: Props) => {
    
    // setProduct(null);
    
    setLoading(true);
    const [respons, setRespons] = useState<any | null>(null); 
    // const [category, setCategory] = useState("All"); 
 
    // console.log(respons)

    // async function fetchData() {
    //     try {
    //         setRespons(await Product());
    //     } catch (error) {
    //         console.error('Error fetching product data:', error);
    //     }
    // }                
    
    // useEffect(() => {
    //     const ProductsSortParams = localStorage.getItem('Sort');
    //     if (ProductsSortParams) {
    //         const SortsItem = JSON.parse(ProductsSortParams);
    //         if (SortsItem && SortsItem.category === "All") {
    //             fetchData();
    //         }else return;
    //     }
    // }, []);
        

            respons && setLoading(false);


const location = useLocation();

    const clickF = (productId: string) => {



        viewProduct(productId, setProduct, setLoading, location);
        setLoading(true);
    };

    const NavigationProps = {setProduct, product};
     const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading}




      const AnimeII = () =>{

        const article = Array.from(document.querySelectorAll('article')) as HTMLElement[];

            article.forEach((element, index) => {
                setTimeout(() => {
                  element.style.transform = 'scale(1)';
                }, index * 300);
              });

              console.log(article)
        }    


      useEffect(()=>{AnimeII();}, [respons])




    return (
        <>
        <Container>

        <ProductTools className="container">
        <Navigation items={['home', 'products']} {...NavigationProps} />
        <SortProduct setRespons={setRespons} setLoading={setLoading}  />
        </ProductTools>
        {loading && <h2>Loading ...</h2>}
            {respons && <ProductComponent products={respons}  {...ProductProps} />}        
            </Container>

        </>
    );
};

export default ProductsConteiner;
