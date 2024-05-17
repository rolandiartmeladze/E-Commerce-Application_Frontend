import React, { ChangeEvent, useState } from "react"; 
import styled from "styled-components";

import '../../../style/Aside.css';

import Plus from '../../../icon/plius.svg';
import Minus from '../../../icon/minus.svg';

const AsideContainer = styled.aside`
    height: auto;
    float: right;
    margin-top: 5px;
    box-shadow: -1px 0px 2px 0.3px black;
    padding-bottom: 8px;
        
        ul{                
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            div{                
                margin: 3px;
                display: flex;
                margin: 3px;
                align-items: center;
                width: 100%;
                flex-wrap: wrap;
                border-bottom: 1px solid;
                padding-bottom: 2px;
                b{
                    margin-right: 5px;
                    margin-left: 2px;
                }
                samp{
                    color: red;
                }

            }
        }
`;
            const Quantity = styled.div`
                display: grid !important;
                grid-template-columns: 1fr 1fr 1fr  !important;
                justify-items: center;
                align-items: stretch !important;
                padding:  5px 0px !important;
                border-bottom: none !important;

                input{
                    display: inline-block;
                    text-align: center;
                    align-items: center;
                    padding: 8px;
                    margin: 2px;
                    background: inherit;
                    border: none;
                    outline: none;
                    box-shadow: 0px 2px 3px 0.3px black;
                    font-weight: 900;
                    width: 90%; 
                    box-sizing: border-box;
                    -moz-appearance: textfield;
                    &::-webkit-inner-spin-button { -webkit-appearance: none; }
                    &::-webkit-outer-spin-button { -webkit-appearance: none; }
                }
                    samp{
                        padding: 0;
                        width: 90%;
                        max-width: 50px;
                        cursor: pointer;
                        font-weight: 900;
                        font-size: 200%;
                        box-shadow: 0px 0px 1px 0px gray;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center; 
                        background-color: rgb(31,11, 41,0.4); 
                            &:hover{
                                background-color: rgb(31,111, 41,0.4); 
                            }    
                    }
    `;

interface Props{product:any;}

const Aside =({product}:Props)=>{

    const [soldAmount ,setSoldAmount] = useState(1);

    const minus = () => {product && setSoldAmount(Math.max(0, soldAmount - 1)); };

    const plus = () => {if (product && (soldAmount < product.quantity)) { setSoldAmount(soldAmount + 1);}};

    const inset = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if ( product && (!isNaN(value) && value >= 0 && value <= product.quantity)) { setSoldAmount(value); }
        };

    
    return(
                        <AsideContainer>
                    
                    <h1>info </h1>
                        <ul>
                            <div><b>Name:</b><samp>{product?.name}</samp> </div>
                            <div><b>Address:</b><samp>{product?.address}</samp></div>
                            <div><b>quantity:</b> <samp> {product?.quantity}   {product?.quantityUnit}</samp></div>
                            <div><b>Price:</b><samp>{product?.price} {product?.currency}</samp></div>
                            <Quantity>
                                <samp onClick={minus}> <img src={Minus} alt="Plus" /> </samp>
                                    <input disabled={!product} type="number"
                                            value={soldAmount} onChange={inset} />
                                <samp onClick={plus}> <img src={Plus} alt="Plus" /> </samp>
                            </Quantity>                      
                            <div><b>Total:</b><samp>{product?.price * soldAmount} {product?.currency}</samp></div>
                        </ul>

                        <div className='Btn'>
                            <button  style={{minWidth: '70px'}}
                            // onClick={sale}
                            >sale</button>
                        </div>                     

                </AsideContainer>

    );
}
export default Aside;