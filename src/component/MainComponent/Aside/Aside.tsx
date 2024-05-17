import React, { useState } from "react"; 
import styled from "styled-components";

import '../../../style/Aside.css';


interface Props{
    product:any;
}

const Aside =({product}:Props)=>{

    const [soldAmount ,setSoldAmount] = useState(1);
    const Amount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
            const QuantityInput = document.getElementById('QuantityInput') as HTMLInputElement;

        if (value > 0) {
            if (value >= product.quantity) { 
                QuantityInput.value = product.quantity;
                QuantityInput.style.color = 'red';
                setSoldAmount(product.quantity);
            } 
                else {setSoldAmount(value); QuantityInput.style.color = 'black';}    
            }
        else{QuantityInput.value = ''; setSoldAmount(0);}
    };



    return(
        <>
                        <div className='Aside'>
                    
                    <h1>info </h1>




                        <ul>
                            <li>Name:<samp>{product?.name}</samp> </li>
                            <li>Address:<samp>{product?.address}</samp></li>
                            <li className='QuantityLi'>quantity:<> <samp> {product?.quantity}   {product?.quantityUnit}</samp></><samp style={{ width:'100%',marginLeft: '0px'}}>
                                <input  
                                id="QuantityInput" 
                                className='QuantityInput' 
                                disabled={!product} 
                                placeholder='0' 
                                type='number' 
                                value={soldAmount}
                                onChange={Amount} 
                                />
                                </samp></li>
                            <li>Price:<samp>{product?.price} {product?.currency}</samp></li>
                            <li>Total:<samp>{product?.price * soldAmount} {product?.currency}</samp></li>
                        </ul>

                        <div className='Btn'>
                            <button 
                            // onClick={sale}
                            >sale</button>
                        </div>                     

                </div>

        </>
    );
}
export default Aside;