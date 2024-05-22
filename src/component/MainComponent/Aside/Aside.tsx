import React, { ChangeEvent, useEffect, useState } from "react"; 
import styled from "styled-components";

import '../../../style/Aside.css';

import Plus from '../../../icon/plius.svg';
import Minus from '../../../icon/minus.svg';


// import SaleNow from "./SaleNow";

const AsideContainer = styled.aside`
    height: auto;
    float: right;
    margin-top: 5px;
    box-shadow: -1px 0px 2px 0.3px black;
    padding-bottom: 8px;
    position:relative;
        
        ul{                
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            div{                
                display: flex;
                margin: 8px 3px;
                align-items: center;
                width: 100%;
                flex-wrap: wrap;
                border-bottom: 1px solid;
                padding-bottom: 2px;
                position: relative;
                &: before{
                    position:absolute;
                    content: '';
                    height: 100%;
                    width: 4px;
                    left: -6px;
                    bottom: -1px;
                    background-color: red;
                    padding: 1px;
                    border-radius: 4px 4px 0px 0px;
                }

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
                &: before{
                display: none;
                }
                input{
                    display: inline-block;
                    text-align: center;
                    align-items: center;
                    padding: 8px;
                    margin: 2px;
                    background: inherit;
                    border: none;
                    outline: none;
                    background-color: rgb(1,1,1,0.1);
                    box-shadow: 0px 0px 0.4px 0.3px brown inset;
                    border-radius: 3px;
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

                        const Cost = styled.div`
                        font-size: 20px;
                        border: none !important;
                        padding: 4px 0 !important;
                        width: auto !important;
                        margin-left: 10px !important;
                        position: relative;
                        z-index: 2;
                        transition: 0.3s ease;
                        
                                &:before{
                                    position: absolute;
                                    content: '';
                                    height: 80% !important;
                                    width: 6px;
                                    background-color: red;
                                    left: -6px;
                                    bottom: 3px !important;
                                    padding: 0px 1px !important;
                                    border-radius: 3px 0px 0px 3px !important;
                                 }
                                 &:after{
                                    position: absolute;
                                    content: '';
                                    height: 80%;
                                    width: 110%;
                                    background-color: rgb(1,201,1, 0.3);
                                    left: 0px;
                                    z-index: -1;

                                 }
                        `;

                        const AsideMessage = styled.div`
                                
                                position: absolute;
                                 width: 100%;
                                 height: 100%;
                                 background-color: green;
                                 z-index: 5;
                                 samp{
                                    padding: 6px;
                                    display: flex;
                                    justify-content: flex-end;
                                  button{
                                    border-radius: 5px;
                                    padding: 5px 8px;
                                    cursor: pointer;
                                 }
}
                                
                                    `;

                                    const MessageBody = styled.div`
                                    display:flex;
                                    width: 100%;
                                    height: 100px;
                                    padding: 3px;
                                    padding: 0;
                                    flex-direction: column;
                                    align-items: flex-start;
                                    `;

interface Props{
    product:any;
    setMyProducts:Function;
    setProduct:Function;
    setLoading:Function;
}

const Aside =({product, setMyProducts, setProduct, setLoading}:Props)=>{

    const token = localStorage.getItem('token');


    const [soldAmount ,setSoldAmount] = useState(1);

    useEffect(()=>{ setSoldAmount(1); }, [product])

    const minus = () => {product && setSoldAmount(Math.max(0, soldAmount - 1)); };

    const plus = () => {if (product && (soldAmount < product.quantity)) { setSoldAmount(soldAmount + 1);}};

    const inset = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if ( product && (!isNaN(value) && value >= 0 && value <= product.quantity)) { setSoldAmount(value); }
        };

          
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let period = 'AM'; 
      
      if (hours >= 12) { period = 'PM';
          if (hours > 12) {  hours -= 12; }
       }
      
      minutes = typeof minutes === 'string' ? parseInt(minutes, 10) : minutes;
      const datatime = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;


        const Info =()=> {
           const data = {
            user: token,
            product: product._id,
            name: product.name,
            price: product.price,
            amount: soldAmount,
            cost: product.price * soldAmount,
            time: datatime,
            currency: product.currency,
            unit:product.quantityUnit,
            img: product.image[0],
           }
            return data;
        }

        const [showMessage, setShowMessage] = useState(false);
        const [click, setClick] = useState<boolean>(false);

        useEffect(()=>{showMessage && setShowMessage(false)},[product])
        const saleRequest =()=>{setShowMessage(true)}
        
        const SaleNow = async (Info:any)=>{
            setClick(true);
            setLoading(true);
                try {
                   const saleProduct = await fetch(`https://quasar-wind-trader.glitch.me/api/sale/${Info.user}`, {
                        method: 'POST',
                        headers:{ 'Content-Type': 'application/json' },
                        body: JSON.stringify(Info),
                    });
                        if(!saleProduct.ok) {throw  new Error('Failed to fetch users data');}
                    const saleRespons = await saleProduct.json();
                        setProduct(null);
                        setLoading(false);
                        setShowMessage(false);
                        setClick(false);
                    console.log(saleRespons);
                } catch (error) {
                    
                }
        
        
        
        }

        
        const Message  = ()=> {
            const info = Info();

            return(
            <AsideMessage>
                <samp>

                <button onClick={()=>{setShowMessage(false)}}> Close </button>               
                 </samp>

                <MessageBody>                
                    <div>time: {info.time}</div>

                <div>name: {info.name}</div>
                <div>price: {info.price} {info.currency}</div>
                <div>amount: {info.amount} {info.unit} </div>
                <div>cost: {(info.cost).toFixed(2)} {info.currency}</div>
                </MessageBody>
                <button disabled={click} onClick={()=>{
                    SaleNow(info);
                }}> Sale Now </button>               

            </AsideMessage>
        );
        }
    
    return(
                        <AsideContainer>
                                            {showMessage && <Message />}

                    <h1 style={{textDecoration: 'underline'}}>Product Info </h1>
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

                            <Cost><b>Total:</b><samp>{((product?.price * soldAmount) || 0).toFixed(2)} {product?.currency}</samp></Cost>
                        </ul>

                        <div  className='Btn'>
                            <button disabled={!product} style={{minWidth: '70px'}}
                            onClick={()=>{saleRequest()}}>
                            sale</button>
                        </div>                     
                </AsideContainer>

    );
}
export default Aside;