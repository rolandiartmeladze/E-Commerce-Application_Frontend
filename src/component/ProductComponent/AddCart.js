
import React, { useState } from "react";
import styled from "styled-components";

import addcart from '../../icon/addcart.png';
import cart from '../../icon/cart.png';
import loadicon from '../../icon/loading.gif';


const AddCartIcon = styled.samp`
        position: absolute; 
        right: ${props => props.product !== null ? '65px' : '-12px'};
        bottom: 8px;
        box-shadow: 1px 1px 0px 0px black;
        border-bottom-right-radius: 8px;
        padding: 4px;
        cursor: pointer;
        transition: 0.4s ease-in-out;

          &&:hover { box-shadow: 1px 1px 0px 0px red;}
           img {width: 30px !important;}
`;


const Cart = ({ itemId, incart, setInCart, product}) => {

  const [load, setLoad] = useState(false);
  

    return (
      <AddCartIcon 
      onClick={(e) => { 
                e.stopPropagation();
                e.preventDefault(); 
               !load && AddCart(itemId, setInCart, setLoad) 
                 }}
              product={product}
              >
        <img src={load? loadicon : incart.includes(itemId) ? cart : addcart} alt="cart icon" />
      </AddCartIcon>
    );
  };
  export {Cart};

  const AddCart = async (itemId, setInCart, setLoad) => {
    setLoad(true);
    const token = localStorage.getItem('token');
    let usermode = token ? true : false;
    let server = "https://quasar-wind-trader.glitch.me";

    if (usermode) {
      try {
        const userID = token;
        const checkCartItem = await fetch(`${server}/api/addCarItem/${userID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId }),
        });
  
        if (!checkCartItem.ok) { throw new Error('not working'); }
        const cartResponse = await checkCartItem.json();
        setInCart(cartResponse);
        setLoad(false);
      } catch (error) {
        console.log(error, "not Found");
      }
    }
  
    let storedCarts = localStorage.getItem('incart');
    let incart = storedCarts ? JSON.parse(storedCarts) : [];
    let updatedCarts = [...incart];
  
    const index = updatedCarts.indexOf(itemId);
    if (index === -1) {
      updatedCarts.push(itemId);
    } else {
      updatedCarts.splice(index, 1);
    }
    localStorage.setItem('incart', JSON.stringify(updatedCarts));
    setInCart(updatedCarts);
    setLoad(false);
  };
  
  export { AddCart };
  