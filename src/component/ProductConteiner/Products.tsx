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

    //    const location =  


        viewProduct(productId, setProduct, setLoading, location);
        setLoading(true);
    };

    const NavigationProps = {setProduct, product};
     const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading}

    return (
        <>
        <ProductTools>
        <Navigation items={['home', 'products']} {...NavigationProps} />
        <SortProduct setRespons={setRespons} setLoading={setLoading}  />
        </ProductTools>
        {loading && <h2>Loading ...</h2>}
            {respons && <ProductComponent products={respons}  {...ProductProps} />}
        </>
    );
};

export default ProductsConteiner;
