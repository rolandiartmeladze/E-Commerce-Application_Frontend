import React from "react";

import styled from "styled-components";

import vewicon from '../../../icon/view.png';
import shareicon from '../../../icon/share.png';
import saleicon from '../../../icon/cost.png';


 const ConteinerComponent = styled.div`
        display:flex;
        flex-wrap: wrap;
        gap: 15px;
        padding: 8px;
        justify-content: space-around;
        align-items: flex-start;
 `;

    const Product = styled.article`
            width: 22%;
            max-width: 250px;
            min-width: 180px;
            margin: 0px;
            padding: 5px;
            box-shadow: 0px 0px 3px 0.5px black;
            cursor: pointer;
            background-color: rgba(97, 228, 251, 0.2);
            border-radius: 8px;
            border: 2px rgb(253, 253, 253, 0.0) solid;
            position: relative;

                &: hover{
                    border: 2px rgb(37, 6, 211) solid;
                }
        `;

        const Points = styled.div`
                position: absolute;
                padding: 0;
                top: -12px;
                color: rgb(15, 7, 39);
                right: 10px;
                font-size: 160%;
                font-weight: 900;
                cursor: pointer;
                z-index: 3;
                transition: 0.3s ease-in-out;
                        &:hover{
                            font-size: 170%;
                            color: rgb(255, 0, 0);
                        }
        `;

            const ProductHead = styled.header`
                    width: 100%;
                    margin: 0px;
                    height: 100px;
                    padding: 4px 0px;
                    border-radius: 0px 0px 8px 8px;
                    box-shadow: 0px 1px 1.5px 0px;
                    position: relative;
                    
                        img{
                            width: auto;
                            height: auto;
                            max-width: 96%;
                            margin: 0;
                            max-height: 100%;
                            border-radius: 6px;
                        }

            `;

                const InfoName = styled.div`
                    display: flex;
                    position: relative;
                    width: 100%;
                    margin-top: 5px;
                    flex-direction: column;
                    padding-left: 6px;

                        &:before{
                            position:absolute;
                            content: '';
                            height: 100%;
                            width: 5px;
                            background-color: gray;
                            left: 0px;
                        }
                        samp{
                            display: flex;
                            font-weight: 800;
                            text-align: left;
                            width: 100%;
                            flex-wrap: wrap;
                            margin-left: 4px;
                        }
                `;

                    const Info = styled.div`
                        display: flex;
                        justify-content: space-between;

                            ul{
                                div{
                                    display: flex;
                                    align-items: center; 

                                    b{ margin-right: 4px; }  
                                    img{ margin-left: 4px; }  
                                
                                }
                            }
                    `;


 interface Props{
    _id: string
    name:string;
    address:string;
    quantityUnit:string;
    quantity:number;
    price:number;
    currency:string;
    owner:string;
    userID:string;
    image:any[];
    view:number;
    sale:number;
    share:number;
    }

    const Container : React.FC<{ products: Props[], setSelected:Function }> = ({ products, setSelected }) => {

            const Media = 'https://embarrassing-unifor.000webhostapp.com/Media';

        return(
                <ConteinerComponent>
                    {products.map((item, index) => (
                    
                        <Product onClick={()=>{setSelected(item)}} key={item._id}>

                                <Points>...</Points>

                                <ProductHead>
                                    <img src={`${Media}/${item.userID}/${item.image[0]}`} alt='User Icon' />
                                </ProductHead>

                                        <InfoName> 
                                            <samp>
                                                {(item.name.length > 20) ? item.name.slice(0, 30) + '...' : item.name} 
                                            </samp>
                
                                            <samp>{item.address}</samp>
                                        </InfoName>

                                    <Info>
                                        <ul>
                                            <div><b>stock:</b><samp>{item.quantity} {item.quantityUnit}</samp></div>
                                            <div><b>price:</b><samp>{(item.price).toFixed(1)} {item.currency}</samp></div>
                                            <div><b>cost:</b><samp>{(item.quantity * item.price).toFixed(1)} {item.currency}</samp></div>
                                        </ul>

                                            <ul style={{ display: 'flex' , alignItems: 'flex-end', flexDirection: 'column'}}>
                                                <div>{item.view}<img width={15} src={vewicon} alt='view' /></div>
                                                <div>{item.sale}<img width={15} src={saleicon} alt='sale' /></div>
                                                <div>{item.share}<img width={15} src={shareicon} alt='share' /></div>
                                            </ul>
                                    </Info>
                
                        </Product>
                                
                        ))
                
                    }
                </ConteinerComponent>
            );
        }

    export default Container;
