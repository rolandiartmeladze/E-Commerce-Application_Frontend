import React, { useEffect, useState } from "react";
import './ProductsConteiner.css';
import './product.css';
import styled from "styled-components";

import serverUri from '../../component/serverUrl';
import LoadingComponent from "../Loading";
import ViewProductAside from "../ViewProduct/ViewProductAside";

import user from '../../icon/user.png';
import view from '../../icon/view.png';
import cost from '../../icon/cost.png';
import share from '../../icon/share.png';

import favicon0 from '../../icon/fav.png';
import favicon1 from '../../icon/favcheck.png';
import addcart from '../../icon/addcart.png';
import cart from '../../icon/cart.png';

import testimg from '../../img/slide_9.jpg';


import View from "../ViewProduct/View";

import viewProduct  from '../ProductComponent/VievUpdate';

import { Link } from 'react-router-dom';

import ProductComponent from '../ProductComponent/Product';


const AddCartIcon = styled.samp<{ product: object | null }>`
        position: absolute; 
        right: ${props => props.product !== null ? '65px' : '-12px'};
        bottom: 8px;
        box-shadow: 1px 1px 0px 0px black;
        border-bottom-right-radius: 8px;
        padding: 4px;
        cursor: pointer;
        transition: 0.4s ease-in-out;

          &&:hover { box-shadow: 1px 1px 0px 0px red;}
          & img {width: 30px;}
`;

const AddfavIcon = styled.samp<{ product: object | null }>`
        position: absolute; 
        right: ${props => props.product !== null ? '15px' : '-12px'};
        bottom: ${props => props.product !== null ? '8px' : '50px'};
        box-shadow: 1px 1px 0px 0px black;
        border-bottom-right-radius: 8px;
        cursor: pointer;
        padding: 4px;
        z-index: 6;
        transition: 0.4s ease-in-out;

          &&:hover { box-shadow: 1px 1px 0px 0px red;}
          & img {width: 30px;}
`;



      interface ActiveUserProps {products: string[];}

interface Props{
    userData: Productprops[];
    usermode:boolean;
    favorits:any[]; 
    setFavorits:Function;

    incart:any[]; 
    setInCart:Function;

    chekfavorits:Function;
    activeuser:ActiveUserProps;
    loading:boolean
    setLoading:Function;
    members:any[];

    sesInProduct:Function;

    product:any | null; 
    setProduct:Function;

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
interface CartIconComponentProps {
  itemId: string;
  incart: string[]; 
  handleClickCart: (itemId: string) => void; 
  product:any;
}

interface FavoriteIconComponentProps {
  itemId: string;
  favorits: string[];
  handleItemClick: (itemId: string) => void; 
  product:any;
}


const FavoriteIconComponent = ({ itemId, favorits, handleItemClick, product  }: FavoriteIconComponentProps) => {
  return (
    
    <AddfavIcon 
    product={product}
    onClick={(e) => { 
      e.stopPropagation(); 
      e.preventDefault();
      handleItemClick(itemId); 
      }}>
      <img src={favorits.includes(itemId) ? favicon1 : favicon0} alt="fav icon" />
    </AddfavIcon>
  );
};

const CartIconComponent = ({ itemId, incart, handleClickCart, product }: CartIconComponentProps) => {
  return (
    <AddCartIcon 
    onClick={(e) => { 
              e.stopPropagation();
              e.preventDefault(); 
              handleClickCart(itemId); 
            }}
            product={product}
            >
      <img src={incart.includes(itemId) ? cart : addcart} alt="cart icon" />
    </AddCartIcon>
  );
};
export { CartIconComponent };
export { FavoriteIconComponent };



const AllProductsConteiner: React.FC<Props> = ({loading, setLoading, userData, favorits, 
                                                setFavorits, chekfavorits, activeuser, usermode,
                                                incart, setInCart, members, sesInProduct,     
                                                product, 
                                                setProduct
                                            
                                            
                                              }) => {

              const serverlink = serverUri();
const handleItemClick = async (itemId: string) => {
    let newItem = itemId;
    
    let storedFavorites = localStorage.getItem('favorits');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    let updatedFavorites = [...favorites];
    
    const index = updatedFavorites.indexOf(newItem);
        if (index === -1) {updatedFavorites.push(newItem);} 
        else {updatedFavorites.splice(index, 1);}
    localStorage.setItem('favorits', JSON.stringify(updatedFavorites));
        setFavorits(updatedFavorites);
};



const handleClickCart = async (itemId: string) => {

          const token = localStorage.getItem('token');
          let newItem = itemId;

              if(usermode){
                try {  
                  const userID = token;
                  const checkCartItem = await fetch(`${serverlink}/addCarItem/${userID}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({itemId}),
                        });

                    if(!checkCartItem.ok){ throw new Error('not working'); }
                    const cartResponse = await checkCartItem.json();
                    setInCart(cartResponse)
                } catch (error) {console.log(error, "not Found");}
              }
        
        let storedcarts = localStorage.getItem('incart');
        let incart = storedcarts ? JSON.parse(storedcarts) : [];
        let updatedcarts = [...incart];
        
        const index = updatedcarts.indexOf(newItem);
            if (index === -1) {updatedcarts.push(newItem);} 
            else {updatedcarts.splice(index, 1);}
        localStorage.setItem('incart', JSON.stringify(updatedcarts));
            setInCart(updatedcarts);
};

            // const [product, setProduct] = useState<Productprops | null>(null);
            const [lastClickedProductId, setLastClickedProductId] = useState<string | null>(null);
            // const [buy, setBuy] = useState<boolean>(false);

            
        let products;
        if(usermode){products = userData.filter(product => !activeuser.products.includes(product._id));} 
        else{products = userData}

        const clickF =(productId:string) =>{
              viewProduct(productId, setProduct, setLoading);
              setLastClickedProductId(productId);
              setLoading(true);
              sesInProduct(true);
              }

        
        return(
    
    <div style={{top:'0'}} className="all-product-conceiner-II">
      
       {usermode&& <><h1 className="products-header">Product: {userData.length}</h1> </>
        
        }
        
<ProductComponent 
                  products={products}  
                  clickF={clickF} 
                  incart={incart} 
                  setInCart={setInCart} 
                  favorits={favorits}
                  setFavorits={setFavorits}
                  loading={loading}
                  />


<div style={{flexWrap:'wrap'}} className="productarray">

  {
    products.map((item, index) => (


      <Link 
      style={{minWidth: '280px', width: '23%',     color: 'black', textDecoration: 'none'}} 
      to={`/product-ID/${item._id}`}>

      <article  onClick={() => { clickF(item._id); }} 
                key={item._id} 
                className="product-conteiner">

        {loading && lastClickedProductId === item._id && <LoadingComponent />}

          <div className="img-conteiner">
            <img src={testimg} alt="product img" />
          </div>

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

          {/* <FavoriteIconComponent 
              itemId={item._id} 
              favorits={favorits} 
              handleItemClick={handleItemClick} 
              product={product} 
              />

              <CartIconComponent 
                  itemId={item._id} 
                  incart={incart} 
                  handleClickCart={handleClickCart} 
                  product={product} 
                  /> */}

        </div>
      </div>
    </article>
    </Link>
  ))

  }



</div>


    </div>
 );

}

export default AllProductsConteiner;



