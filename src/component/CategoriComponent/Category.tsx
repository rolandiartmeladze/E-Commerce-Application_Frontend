import React, { useState } from "react";
import styled from "styled-components";

import {CategoryResponse} from '../Navigation/Meniu';
import ProductComponent from  '../ProductComponent/Product';

// import { clickF } from "../ProductsConteiner/AllProductConteiner";
import viewProduct from '../ProductComponent/VievUpdate';


interface Props{
    incart:string[];
    setInCart:Function;
    favorits:string[];
    setFavorits:Function; 
    loading:boolean;
    // clickF:Function;
    setProduct:Function;
    setLoading:Function;

}

    const Category = ({incart, setInCart, favorits, setFavorits, loading, setProduct, setLoading}:Props)=>{

        const clickF =(productId:string) =>{
            viewProduct(productId, setProduct, setLoading);
            setLoading(true);
            // sesInProduct(true);
            }

      const  categoryproduct = CategoryResponse();

        console.log(categoryproduct);

        const [category, setCategory] = useState<any>(null);


        const Props ={ clickF, incart, setInCart, favorits, setFavorits, loading};

        return(


            <ProductComponent products={categoryproduct} {...Props}/>


            // <h1>Category</h1>
        );
    };

    export default Category;