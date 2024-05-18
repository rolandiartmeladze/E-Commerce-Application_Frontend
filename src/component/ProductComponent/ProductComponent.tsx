import React, {useEffect, useState} from "react";
import styled from "styled-components";


import { Link } from 'react-router-dom';
import {Cart} from './AddCart';
import {Fav} from './AddFav';
import Loaing from "../Loading";

import user from '../../icon/user.png';
import view from '../../icon/view.png';
import cost from '../../icon/cost.png';
import share from '../../icon/share.png';
import testimg from '../../img/slide_9.jpg';
import time from '../../icon/time.svg';
import category from '../../icon/category.png';
import description from '../../icon/description.svg';

interface Props{
    products: Productprops[];
    clickF:Function;
    incart:string[];
    setInCart:Function;
    favorits:string[];
    setFavorits:Function;
    loading:boolean;
}

interface Productprops{
    name:string;
    _id: string;
    id: string;
    location:string;
    quantityUnit:string;
    quantity:number;
    price:number;
    currency:string;
    owner:string;
    email:string;
    phone:string;
    comment:string;
    description:string;
    view:number;
    sale:number;
    share:number;
    category: string;
    datatime: string;
    image: any[];
    userID: string;

}

    const Conteiner = styled.div`
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content:space-around;
                a{ 
                    // min-width:  280px; 
                    // width:  23%;
                    // padding: 0px 5px;  
                    // padding-left: 0px   
                    color:  black; 
                    text-decoration: none;
                    // margin-top: 18px;
                }

                    article{ 
                        min-width: 280px;
                        width: 23%;
                        min-height: 200px;
                        height: auto;
                        background: inherit;
                        margin-top: 4px;
                        border-radius: 8px;
                        padding: 8px;
                        cursor: pointer;
                        backdrop-filter: blur(3px);
                        box-shadow: 1px 2px 6px 0.3px black;
                        padding-bottom: 5px;
                        margin: 15px  0px;

                        @media only screen and (max-width: 650px) {
                            width: 92%;
                        }
                    }
            `;

            const ImgConteiner = styled.div`
            width: 100%;
            aspect-ratio: 16 / 9; /* You can adjust the aspect ratio as needed */
            max-height: 150px; /* Specify the maximum height of the container */
            overflow: hidden; /* Ensure that the image doesn't overflow its container */
            
            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: content; 
                border-radius: 5px;
            }
        `;


            const ProductInfo = styled.div`
                    width: 100%;
                    padding-top: 4px;
            `;

                const InfoItem = styled.div`
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    margin-left: 5px;
                    margin-top: 3px;
                    font-weight: 700;
                    flex-grow: 1;
                `;

                    const ItemInfoAdd = styled.div`
                        flex-wrap: wrap;
                        height: auto;
                        max-width: 100%;
                        box-sizing: border-box; 
                        word-wrap: break-word; 
                        display: flex;
                        align-items: flex-end;
                        justify-content: flex-start;
                        margin-left: 5px;
                        margin-top: 3px;
                        font-weight: 700;
                        flex-grow: 1;
                            p{
                                width: 100%;
                                padding: 0;
                                margin: 0;
                                text-align: left;
                                samp{
                                    img{
                                        margin-right: 5px;
                                    }
                                }
                            }
                                img{
                                    border-radius: 5px;
                                }
                    `;
                        const ItemInfoEnd = styled.div`
                            display: flex;
                            align-items: flex-end;
                            justify-content: flex-start;
                            margin-left: 5px;
                            margin-top: 3px;
                            font-weight: 700;
                            flex-grow: 1;
                            margin-top: 12px;
                                img{
                                    width: 20px;
                                    margin-right: 6px;                                
                                }
                                    samp{
                                        display: flex;
                                        align-items: center;
                                        margin-right: 18px;                                
                                    }
                            `;

 const ProductComponent = ({products, clickF, incart, setInCart, loading, favorits, setFavorits }:Props) => {
    const CartProps = {incart, setInCart} 
    const FavProps = {favorits, setFavorits} 

    const [clicked, setClicked] = useState<string | null>(null);
    

    // const SortLocal: string | null = localStorage.getItem('Sort');

    // if (SortLocal !== null) {
    //     const parsedSortLocal = JSON.parse(SortLocal);
    //     console.log(parsedSortLocal.Category);
    // } else {
    //     console.log('SortLocal is null'); 
    // }
    
    return(
            <Conteiner>

                {products.map((item, index) => (

                        <article key={item._id} > 
                        <Link onClick={() => { clickF(item._id); setClicked(item._id) }}  
                        to={`/products/${item._id}`}
                        key={item._id} >

                            {loading && clicked === item._id && <Loaing />}
                
                                <ImgConteiner>
                                    <img src={`https://embarrassing-unifor.000webhostapp.com/Media/${item.userID}/${item.image[0]}`} alt="product img" />
                                </ImgConteiner>
                    
                        <ProductInfo>

                            <InfoItem>
                                {(item.name.length > 20) ? item.name.slice(0, 35) + '...' : item.name}
                            </InfoItem>

  
                                <ItemInfoAdd>
                                    <samp style={{ display: 'flex', alignItems: 'center' }}>
                                    <img width="20" src={time} alt='time icon' /> {item.datatime}
                                    </samp>
                                </ItemInfoAdd>

                                <ItemInfoAdd>
                                    <samp style={{ display: 'flex', alignItems: 'center', marginRight: '6px' }}>
                                        <img width="20" src={user} alt='owner icon' />
                                        {item.owner}
                                    </samp>
                                </ItemInfoAdd>                                         

                
                            <ItemInfoAdd>
                                <p>
                                <samp style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <img width="20" src={category} alt='category icon' />  {item.category}</samp>
                                </p>
                            </ItemInfoAdd>

                                    <ItemInfoAdd>
                                        <p style={{alignItems: 'flex-start', maxWidth: '85%'}}>
                                        <samp style={{ display: 'flex', alignItems: item.description.length > 30 ? 'flex-start' :  'flex-end' }}>
                                         <img width="20" src={description} alt='category icon' />
                                            {item.description && (item.description.length > 20) ? item.description.slice(0, 35) + '...' : item.description}</samp>
                                        </p>
                                    </ItemInfoAdd>

                            <InfoItem style={{ color: 'red' }}>{(item.price).toFixed(2)} {item.currency}</InfoItem>
                
                                <ItemInfoEnd>
                                    <samp><img src={view} alt="view icon" />{item.view}</samp>
                                    <samp><img src={cost} alt="cost icon" />{item.sale}</samp>
                                    <samp><img src={share} alt="share icon" />{item.share}</samp>
                        
                                            <Fav {...FavProps} itemId={item._id} product={null} />
                                            <Cart {...CartProps} itemId={item._id} product={null} />
                                </ItemInfoEnd>

                        </ProductInfo>
                                    
                                    </Link>
                        </article>
               
                ))}

            </Conteiner>
        );
 };

 export default ProductComponent;
