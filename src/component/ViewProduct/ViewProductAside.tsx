import React, {  useEffect, useState } from "react";
import styled from "styled-components";
import './View.css';


import favicon1 from '../../icon/favcheck.png';
import cartIcon from '../../icon/cart.png';


import UserInfo from "./UserInfo";
import ProductInfo from "./ProductInfo";
import InCartConteiner from "./InCartConteiner";



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

                      

      const ViewProductAside = ({members, usermode, incart, favorits, product, handleClickCart, loading, setLoading}:Props) => {

        const [cart, setCart] = useState(false);
        const [fav, setFav] = useState(false);

        const bgcolor =`linear-gradient(to top, rgba(25, 0, 0, 0.6) 0%, rgba(255, 0, 0, 0) 40%)`;

        const [incartResponse, setInCartResponse] = useState<any[]>([]);


                const checkcart = async ()=>{
          
                  
                      try {
                        const option = {incart:incart}
                        const checkCartItem = await fetch(`https://lavish-husky-gaura.glitch.me/checkCartItems`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(option),
                            });

                          if(!checkCartItem.ok){ throw new Error('not working'); }
                          const cartResponse = await checkCartItem.json();
                          setInCartResponse(cartResponse);
                          setLoading(false);

                      } catch (error) {console.log(error, "not Found");}
               
                      }

        const cartbtn  = async ()  =>{


              cart? setCart(false) : setCart(true);
              fav && setFav(false);

              checkcart();

              };


            const favbtn  = async ()  =>{
                  fav? setFav(false): setFav(true);
                  cart && setCart(false);
                  };

                const closebtn  = ()  =>{
                      fav && setFav(false);
                      cart && setCart(false);
                      checkcart();
                      };


    const InCartBtn = () => {
      return(
        <CartBtn style={{background: cart? bgcolor : 'none'}} onClick={cartbtn} >
          <img width={25} src={cartIcon} alt="cart icon" />
          <CartNum>{incart.length}</CartNum>
        </CartBtn>
      );
      };

          const InFavBtn = () => {
            return(
              <CartBtn style={{background: fav? bgcolor : 'none'}}  onClick={favbtn}>
                <img width={25} src={favicon1} alt="cart icon" />
                <CartNum>{favorits.length}</CartNum>
              </CartBtn>
            );
            };



            const CloseBtn = () => {
              return(
                <Btncon>
               <Closebtn onClick={closebtn}>
                  Close
                </Closebtn>                
                </Btncon>

              );
              }


              // if(incartResponse.length < 0){
              //   cartbtn();
              // }
            


    return(
            <ProductAside>

                <AsideHead> 
                    <InCartBtn />
                    <InFavBtn />
                </AsideHead>

                    <InfoConteiner>
                      {fav || cart? 
                      <>
                      <CloseBtn />
                      {cart&& 
                      <InCartConteiner 
                      incartResponse={incartResponse} 
                      incart={incart} 
                      handleClickCart={handleClickCart} 
                      checkcart={checkcart}
                      loading={loading}
                      setLoading={setLoading}   
                      cartbtn={cartbtn}     
                      setFav={setFav}                     
                      />
                      }
                      <div>footer</div>

                      {fav&& <div>cart</div>}
                      </> :null}
                       


                        {!fav && !cart && (
                          <>
                          <UserInfo members={members} 
                                    usermode={usermode} />
                          <ProductInfo product={product} />
                          </>
                        )}

                    </InfoConteiner>

            </ProductAside>

          );
 };

 export default ViewProductAside;