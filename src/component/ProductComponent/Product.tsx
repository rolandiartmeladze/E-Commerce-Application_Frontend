import React, {useState} from "react";
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
}

const Conteiner = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        justify-content:space-around;
        a{ 
            min-width:  280px; 
            width:  23%;     
            color:  black; 
            text-decoration: none;
        }

        article{ 
            min-width: 280px;
            width: 23%;
            min-height: 200px;
            height: auto;
            background: inherit;
            margin-top: 20px;
            border-radius: 8px;
            padding: 8px;
            cursor: pointer;
            backdrop-filter: blur(3px);
            box-shadow: 1px 2px 6px 0.3px black;
            padding-bottom: 5px;
        }
        `;
        const ImgConteiner = styled.div`
            width: 100%;
            max-height: 150px;
        img{
         max-width: 98%;
         max-height: 100%;
         border-radius: 5px;
        }
        
        `;


 const Product = ({products, clickF, incart, setInCart, loading, favorits, setFavorits }:Props) => {
    const CartProps = {incart, setInCart} 
    const FavProps = {favorits, setFavorits} 

    const [clicked, setClicked] = useState<string | null>(null);

    return(
        <>
        <Conteiner>

        {products.map((item, index) => (
            <Link to={`/product-ID/${item._id}`}>
                <article  
                    onClick={() => { 
                        clickF(item._id); 
                        setClicked(item._id)}} 
                    key={item._id} >
        
                {loading && clicked === item._id && <Loaing />}
        
                    <ImgConteiner>
                        <img src={testimg} alt="product img" />
                    </ImgConteiner>
        
                <div className="product-info">
                <div className="product-info-item">
                    {(item.name.length > 20) ? item.name.slice(0, 35) + '...' : item.name}
                </div>
                <div className="product-info-item add">
                    <p>
                    <samp style={{ display: 'flex', alignItems: 'center' }}>
                        <img style={{ marginRight: '5px' }} width="20" src={user} alt='owner icon' />
                        {item.owner}
                    </samp>
                    </p>
                </div>
                <div className="product-info-item add">
                    <p>
                    <samp>{item.description && (item.description.length > 20) ? item.description.slice(0, 35) + '...' : item.description}</samp>
                    </p>
                </div>
        
                <div className="product-info-item"><samp>Category: {item.category}</samp></div>
                <div style={{ color: 'red' }} className="product-info-item">{(item.price).toFixed(2)} {item.currency}</div>
        
                <div style={{ marginTop: '8px' }} className="product-info-item end">
                    <samp><img src={view} alt="view icon" />{item.view}</samp>
                    <samp><img src={cost} alt="cost icon" />{item.sale}</samp>
                    <samp><img src={share} alt="share icon" />{item.share}</samp>
        
        
                            <Fav {...FavProps} itemId={item._id} product={null}/>
                            <Cart {...CartProps} itemId={item._id} product={null} />
        
                </div>
                </div>
            </article>
          </Link>
        ))}
        </Conteiner>

      </>

    );
 }

 export default Product;
