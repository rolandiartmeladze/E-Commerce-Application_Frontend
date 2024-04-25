import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import './View.css';


import favicon1 from '../../icon/favcheck.png';
import cartIcon from '../../icon/cart.png';

import img from '../../img/slide_9.jpg';

import UserInfo from "./UserInfo";
import ProductInfo from "./ProductInfo";
import { error } from "console";



interface Props{
          members:any[];
          usermode:boolean;
          incart:string[];
          favorits:string[];
          product: any | null;
          handleClickCart:Function;
          activeuser: any;
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

                    const Container = styled.div`
                    width: 100%;
                    overflow: auto;
                    margin-top: 5px;
                    max-height: 265px;
                    flex: 1;
                `;
                
                      const ProductConteiner = styled.div`
                            width:  98%; 
                            margin:  auto; 
                            margin-top:  5px; 
                            box-shadow:  0px 0px 2px 0.5px black inset; 
                            border-radius:  8px; 
                            height:  60px; 
                            display: flex;
                            background-color: rgb(5, 22,200, 0.3);
                            cursor: pointer;
                      `;


                      const ImgConteiner = styled.div`
                            max-width:  70px; 
                            flex:  1; 
                            margin: 3px 5px; 
                            padding: 0px 3px; 
                            border-radius: 5px;
                            align-items: center;
                            justify-content: center;
                            display: flex;
                            box-shadow:  1px 0px 1px 0px black; 

                              & img{
                                max-width: 98%;
                                max-height: 98%;
                                border-radius: 5px;
                              }
                              
                      `;

                      const ProductInfoCont = styled.div`
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: flex-start;

                      `;

                      const ProductQuantityCont = styled.div`
                      margin-left: 10px;
                      margin-top: 4px;
                      display: flex;
                      flex-direction: row;
                      height: 25px;
                      align-items: center;

                        input {
                          max-width: 35px;
                          text-align: center;
                          border-radius: 2px;
                          border: none;
                          outline: none;
                          margin: 2px;
                          padding: 3px;

                          -moz-appearance: textfield;
                          &::-webkit-inner-spin-button {
                              -webkit-appearance: none;
                          }
                          &::-webkit-outer-spin-button {
                              -webkit-appearance: none;
                          }
                          
                      }
                      button {
                            cursor: pointer;
                        }
                      `;

                      

      const ViewProductAside = ({members, usermode, incart, favorits, product, handleClickCart}:Props) => {

        const [cart, serCart] = useState(false);
        const [fav, setFav] = useState(false);

        const bgcolor =`linear-gradient(to top, rgba(25, 0, 0, 0.6) 0%, rgba(255, 0, 0, 0) 40%)`;

        const [incartResponse, setInCartResponse] = useState<any[]>([]);

        const inputnumb = incartResponse.length || incart.length;




        const cartbtn  = async ()  =>{


              cart? serCart(false) : serCart(true);
              fav && setFav(false);

              console.log(incart)


              
              try {
                
                const option = {
                incart:incart
            }
                const checkCartItem = await fetch(`http://localhost:3001/checkCartItems`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(option),
                    });

                  if(!checkCartItem.ok){ throw new Error('not working'); }
                  const cartResponse = await checkCartItem.json();
                  setInCartResponse(cartResponse);
              } catch (error) {
                // console.log(error, "not Found");
              }

              };


            const favbtn  = async ()  =>{
                  fav? setFav(false): setFav(true);
                  cart && serCart(false);
                  };

                const closebtn  = ()  =>{
                      fav && setFav(false);
                      cart && serCart(false);
                      };


    const InCartBtn = () => {
      return(
        <CartBtn style={{background: cart? bgcolor : 'none'}} onClick={cartbtn}>
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

              const [quantities, setQuantities] = useState(Array(inputnumb).fill(1));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const newQuantities = [...quantities];
        newQuantities[index] = e.target.value;
        setQuantities(newQuantities);
    }


    const handleIncrement = (index:number) => {
      const newQuantities = [...quantities];
      newQuantities[index]++;
      setQuantities(newQuantities);
  };

  const handleDecrement = (index:number) => {
      const newQuantities = [...quantities];
      newQuantities[index] > 0 && newQuantities[index]--;
      setQuantities(newQuantities);
  };

      let totalCost = 0;
      incartResponse.forEach((item,index) =>{
    totalCost +=  item?.price * quantities[index];
  })


        const removecart = (ID:string) =>{
           const item = ID;
           handleClickCart(item);
        }

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
                      <>
                      
                        
                      <Container className="incar-conteiner">
                    {incartResponse.map((producti, index) => (
                        <ProductConteiner key={producti._id}>
                            <ImgConteiner>
                                <img src={img} alt="img" />
                            </ImgConteiner>

                              <ProductInfoCont>
                                <samp>Name: {producti.name.substring(0, 20)}{producti.owner.length > 20 && '...'}</samp>
                                <samp>Price: {producti.price.toFixed(1)} {producti.currency}</samp>
                                <samp>Cost: {(producti.price * quantities[index]).toFixed(1)} {producti.currency}</samp>
                              </ProductInfoCont>
                                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                              <ProductQuantityCont>
                              <button  onClick={() => handleIncrement(index)}>+</button>
                              <input type="number" onChange={(e) => handleChange(e, index)} value={quantities[index]}  />
                              <button onClick={() => handleDecrement(index)}>-</button>
                              </ProductQuantityCont>

                              <ProductQuantityCont>
                              
                              <button onClick={()=>{removecart(producti._id)}} >Delete</button>
                              </ProductQuantityCont>
                                      </div>



                        </ProductConteiner>
                      ))}

                      </Container>
                      <div>Total Cost= {totalCost} {product.currency} </div>
                      <div>footer</div>
                      </>}

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