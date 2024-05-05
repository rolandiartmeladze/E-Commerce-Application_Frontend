
import React from "react";
import styled from "styled-components";

import addcart from '../../icon/addcart.png';
import cart from '../../icon/cart.png';


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
          & img {width: 30px;}
`;


const Cart = ({ itemId, incart, setInCart, product}) => {
    // let product = null;
    return (
      <AddCartIcon 
      onClick={(e) => { 
                e.stopPropagation();
                e.preventDefault(); 
                AddCart(itemId, setInCart) 
                 }}
              product={product}
              >
        <img src={incart.includes(itemId) ? cart : addcart} alt="cart icon" />
      </AddCartIcon>
    );
  };
  
  export {Cart};



const AddCart = async (itemId, setInCart) => {
    const token = localStorage.getItem('token');
    let usermode = token ? true : false;
    let serverlink = "https://lavish-husky-gaura.glitch.me";

    if (usermode) {
      try {
        const userID = token;
        const checkCartItem = await fetch(`${serverlink}/addCarItem/${userID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId }),
        });
  
        if (!checkCartItem.ok) { throw new Error('not working'); }
        const cartResponse = await checkCartItem.json();
        setInCart(cartResponse);
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
  };
  
  export { AddCart };
  