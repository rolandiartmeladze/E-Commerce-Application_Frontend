import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ConteinerItem = styled.div`
        width: 96%;
        margin: auto;
        margin-top: 4px;
        padding: 3px 0px;
        box-shadow: 0px 0px 1px 0.3px black inset;
        position: relative;
        display: flex;
        align-items: center;

        & span {
            position: absolute;
            top: -3px;
            color: red;
            right: 5px;
            }
            & h5{
                margin: 0 4px;
            }
                & img {
                width: 25px;
                margin: 0px 4px;
                }
        `;

const ItemInput = styled.input`
        padding: 4px;
        background: none;
        border: none;
        outline: none;
        margin-left: 2px; 
        color: red; 
        width: 60%; 
        margin: auto; 
        font-weight: 900;

        &::placeholder {
            color: red;
        }
        `;

    interface productProps{
        product:any;
    }

const ProductInfo = ({ product }:productProps) => {

    const [productNum, setProductNum] = useState<number>(1);
    const [prosuctCost, setProductCost] = useState<number>(product.price * productNum);

        const Amount  = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 0) {
                    if (value >= product.quantity) {setProductNum(product.quantity);} 
                    else {setProductNum(value);}
                    } 
                else {setProductNum(0);}    
                    setProductCost(product.price * productNum)
            };
                useEffect(() => {
                    setProductCost(product.price * productNum);
                }, [product.price, productNum]);


    return(
            <>
            <h5 style={{margin:'7px'}}>Product</h5>

            <ConteinerItem>
                <h5>Name:</h5>
                <samp>{product?.name}</samp>
            </ConteinerItem>

                <ConteinerItem>
                    <h5>{'Quantity / '}{product.quantityUnit}:</h5>
                        <ItemInput onChange={Amount} 
                                    type="number"  
                                    value={`${productNum}`}/>

                </ConteinerItem>

                    <ConteinerItem>
                        <h5>Cost:</h5> 
                        <samp>{`${prosuctCost} ${product.currency}`}</samp>
                    </ConteinerItem>
            </>
          );
};

export default ProductInfo;
