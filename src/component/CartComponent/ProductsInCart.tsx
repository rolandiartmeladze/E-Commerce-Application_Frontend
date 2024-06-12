import React, {useEffect, useState} from "react";

import styled from "styled-components";

import ProductComponent from "../ProductComponent/ProductComponent";
import viewProduct from "../ProductComponent/VievUpdate";

import CartIcon from '../../icon/cart.png';

import { useLocation } from "react-router-dom";
import Loading from "../Loading";

 const CartContainer = styled.div`
 position:relative;
  h1{
 text-align: left;
    margin: 0;
    font-weight: 900;
    background: rgb(0, 222, 13, 0.2);
    padding: 6px;
    border-bottom-left-radius: 6px;
}
 `;

  interface Props{
    setProduct:Function;
  }

 const InCart = ({setProduct}:Props)=>{

  const [loading, setLoading] = useState<boolean>(false);

    const [incart, setInCart] = useState<any[]>(JSON.parse(localStorage.getItem('incart') ?? '[]'));
    const [favorits, setFavorits] = useState<any[]>(JSON.parse(localStorage.getItem('favorits') ?? '[]'));

    const [response, setResponse] = useState<any[]>([]);
    const location = useLocation();

    const clickF = (productId: string) => {

        viewProduct(productId, setProduct, setLoading, location);
        setLoading(true);
    };



const fetchData = async () => { 
    try {  
      setLoading(true);

      const option = { incart: incart };
      const checkCartItem = await fetch(`https://quasar-wind-trader.glitch.me/checkCartItems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(option),
      });

      if (!checkCartItem.ok) {
        throw new Error('not working');
      }
      
      const cartResponse = await checkCartItem.json();
      setResponse(cartResponse);
      setLoading(false);
      }

     catch (error) {
      console.log(error, "not Found");
    }
  };

  useEffect(()=>{
    fetchData();
  }, [incart])
  const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading};

  return(
   <CartContainer> 
     <h1 style={{color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}><img width={35} src={CartIcon} alt="" /> Products In Cart</h1>
        <div>
    {loading && <Loading />}
    {response.length <=0 && <h2>Products not found</h2>}
        <ProductComponent products={response}  {...ProductProps} />
                </div>

</CartContainer>
       
  );


};

export default InCart;
