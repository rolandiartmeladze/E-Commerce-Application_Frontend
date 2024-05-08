import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductComponent from  '../ProductComponent/Product';
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
    
    const [respons, setRespons] = useState<any | null>(null); 

    const NavigationProps = {setProduct, product};

        async function fetchData() {
            try { setRespons(await Product()); } 
            catch (error) { console.error('Error fetching product data:', error);}
        }
            useEffect(() => { fetchData();}, []);


    const clickF = (productId: string) => {
        viewProduct(productId, setProduct, setLoading);
        setLoading(true);
    };

    return (
        <>
        <ProductTools>
        <Navigation items={['home', 'products']} {...NavigationProps} />
        <SortProduct setRespons={setRespons} />
        </ProductTools>

            {respons && <ProductComponent products={respons} clickF={clickF} incart={incart} setInCart={setInCart} favorits={favorits} setFavorits={setFavorits} loading={loading} />}
        </>
    );
};

export default ProductsConteiner;
