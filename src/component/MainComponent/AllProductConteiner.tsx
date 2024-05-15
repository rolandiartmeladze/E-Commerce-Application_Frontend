import React, { useEffect, useState } from "react";
import './ProductsConteiner.css';
import './product.css';
import styled from "styled-components";

import viewProduct  from '../ProductComponent/VievUpdate';


import ProductComponent from '../ProductComponent/ProductComponent';




      interface ActiveUserProps {products: string[];}

interface Props{
    userData: Productprops[];
    usermode:boolean;
    favorits:any[]; 
    setFavorits:Function;
    incart:any[]; 
    setInCart:Function;
    chekfavorits:Function;
    activeuser:ActiveUserProps;
    loading:boolean
    setLoading:Function;
    members:any[];
    sesInProduct:Function;
    product:any | null; 
    setProduct:Function;
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
    image: any[];
    userID: string;


}


const AllProductsConteiner: React.FC<Props> = ({loading, setLoading, userData, favorits, 
                                                setFavorits, chekfavorits, activeuser, usermode,
                                                incart, setInCart, members, sesInProduct,     
                                                product, 
                                                setProduct
                                              }) => {

            
        let products;
        if(usermode){products = userData.filter(product => !activeuser.products.includes(product._id));} 
        else{products = userData}

        const clickF =(productId:string) =>{
              viewProduct(productId, setProduct, setLoading);
              setLoading(true);
              sesInProduct(true);
              }


                const Props ={products, clickF, incart, setInCart, favorits, setFavorits, loading}

        return(
    
    <div style={{top:'0'}} className="all-product-conceiner-II">

   <ProductComponent {...Props}/>

    </div>
 );

};


export default AllProductsConteiner;



