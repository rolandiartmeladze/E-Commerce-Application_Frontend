import React from "react";
import styled from "styled-components";


import favicon1 from '../../icon/favcheck.png';
import cart from '../../icon/cart.png';
import UserInfo from "./UserInfo";
import ProductInfo from "./ProductInfo";



interface Props{
          members:any[];
          usermode:boolean;
          incart:string[];
          favorits:string[];
          product: any | null;
          }


const ProductAside = styled.div`
      width: 29%;
      margin-left: 8px;
      border-radius: 10px 10px 0 0;
      padding: 0px;
      padding-top: 0px;
      backdrop-filter: blur(2px);
      box-shadow: 3px 3px 300px 5px inset rgb(225, 2, 2, 0.3);
      border-radius: 10px 10px 0px 0px;
`;


const InfoConteiner = styled.div`
      width: 100%; 
      min-height: 100px;
      height: auto;
      marginTop: 8px;
      display:flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 4px 0px;
      `;

      const ViewProductAside = ({members, usermode, incart, favorits, product}:Props) => {







    return(
        <>
        <ProductAside>
<div style={{width: '100%', height: '40px',  display: 'flex', boxShadow: '0px 2px 4px 0px black', borderRadius: '10px 10px 0px 0px', alignItems:'flex-end'
}}> 

<samp style={{margin: '0px 15px', cursor:'pointer', marginBottom: '3px'}} >
              <img width={25} src={cart} alt="cart icon" />
              <span style={{color:'red', fontWeight: '700' , position:'absolute', top: '1px'}}>{incart.length}</span>
            </samp>

   
            <samp style={{margin: '0px 15px', cursor:'pointer', marginBottom: '3px'}} >
              <img width={25} src={favicon1} alt="cart icon" />
              <span style={{color:'red', fontWeight: '700' , position:'absolute', top: '1px'}}>{favorits.length}</span>
            </samp>




</div>

    <InfoConteiner>
            <UserInfo members={members} 
                      usermode={usermode} />
    
    <ProductInfo product={product} />

</InfoConteiner>

    </ProductAside>

        </>
    );
 };

 export default ViewProductAside;