import React, {  useEffect, useState } from "react";
import styled from "styled-components";
import './View.css';


import favicon1 from '../../icon/favcheck.png';
import cartIcon from '../../icon/cart.png';


import UserInfo from "./UserInfo";
import ProductInfo from "./ProductInfo";
import { useNavigate } from "react-router-dom";
// import InCartConteiner from "./InCartConteiner";



interface Props{
          members:any[];
          usermode:boolean;
          incart:string[];
          favorits:string[];
          product: any | null;
          handleClickCart:Function;
          activeuser: any;
          loading:boolean;
          setLoading:Function;
          userData:any[];
          setBuy:Function;
          incartResponse:any[]; 
          setInCartResponse:Function;
          quantities:any[]; 
          setQuantities:Function;
          setProduct:Function;
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
      display: flex;
      flex-direction: column;

      @media (max-width: 900px) {

      width: 98%;
      border-radius:0px;

      }

      @media (max-width: 750px) {
        width: 98%;
      }
      
`;


const InfoConteiner = styled.div`
      width: 100%; 
      min-height: 100px;
      height: auto;
      display:flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 4px 0px;
      flex:1;

      button{
        position:absolute; 
        right: 15px; 
        padding: 3px 5px; 
        cursor: pointer;
        @media (max-width: 900px) {
          position:relative; 
        }

      }
      `;

      const CartBtn = styled.samp`
            margin: 0px 15px; 
            cursor: pointer; 
            marginBottom: 3px; 
            padding: 3px;
            `;


    const CartNum = styled.span`
          color: red; 
          font-weight: 700; 
          position: absolute; 
          top: 1px;
          `;

          const AsideHead = styled.div`
                width: 100%; 
                height: 40px;  
                display: flex; 
                box-shadow: 0px 2px 4px 0px black; 
                border-radius: 10px 10px 0px 0px; 
                align-items: flex-end;

                @media (max-width: 900px) {

                border-radius: 0px;
                }
                `;

                const Closebtn = styled.samp`
                    margin-right:  10px; 
                    cursor:  pointer; 
                    float: right; 
                    font-weight:  900; 
                    padding:  3px; 
                    border-radius:  5px; 
                    box-shadow: 1px 1px 3px 0.5px black inset;
                        &:hover{ color: red; }
                `;

                const Btncon = styled.div`
                      width: 100%; 
                      margin-top: 5px;
                    `;

                      

      const ViewProductAside = ({
            members, usermode,  
            favorits, product, 
            handleClickCart, incart,
            loading, setLoading ,
            userData, setQuantities,
            setBuy, incartResponse, 
            setInCartResponse, quantities,
            setProduct
          }:Props) => {

            const navigate = useNavigate();




    const InCartBtn = () => {
      return(
        <CartBtn onClick={()=>{navigate('/cart')}} >
          <img width={25} src={cartIcon} alt="cart icon" />
          <CartNum>{incart.length}</CartNum>
        </CartBtn>
      );
      };

          const InFavBtn = () => {
            return(
              <CartBtn onClick={()=>{navigate('/favorite')}}>
                <img width={25} src={favicon1} alt="cart icon" />
                <CartNum>{favorits.length}</CartNum>
              </CartBtn>
            );
            };





    return(
            <ProductAside>

                <AsideHead> 
                    <InCartBtn />
                    <InFavBtn />
                </AsideHead>

                    <InfoConteiner>
                       

                          <UserInfo members={members} usermode={usermode} />
                          <ProductInfo product={product} />

                          <div style={{width: '100%', display:'flex', justifyContent:'flex-end', position: 'relative', marginTop: '12px'}}>
                            <button>Buy Now</button>
                          </div>
                    </InfoConteiner>

            </ProductAside>

          );
 };

 export default ViewProductAside;