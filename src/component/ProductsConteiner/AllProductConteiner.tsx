import React, { useEffect, useState } from "react";
import './ProductsConteiner.css';
import './product.css';
import styled from "styled-components";

import serverUri from '../../component/serverUrl';
import LoadingComponent from "../Loading";

import user from '../../icon/user.png';
import view from '../../icon/view.png';
import cost from '../../icon/cost.png';
import share from '../../icon/share.png';
import clock from '../../icon/clock.png';
import loc from '../../icon/loc1.png';
import mail from '../../icon/mail.png';
import phone from '../../icon/phone.png';
import favicon0 from '../../icon/fav.png';
import favicon1 from '../../icon/favcheck.png';
import addcart from '../../icon/addcart.png';
import cart from '../../icon/cart.png';

import testimg from '../../img/slide_9.jpg';

const ProductConteiner = styled.div`
    width: 70%;
    max-width: none;
    margin: 3px;
    border-radius: 0;
    padding: 8px;
    backdrop-filter: blur(2px);
    box-shadow: 3px 3px 300px 5px inset rgb(15, 42, 42, 0.1);
  
    border-radius: 10px 10px 0px 0px;

`;

const ProductHeadInfo = styled.div`
      display:flex;
`;

const ImgConteiner = styled.div`
    overflow: hidden;
    max-width: 300px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    & img {
      height: auto;
      width: 96%;
      max-height: 96%;
      margin-top: 4px;
      border-radius:6px;
    }
`;

const ImgsBox = styled.div`
      width: 100%;
      height: 55px;
      padding:3px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

        & samp {
          width: 55px;
          height: 92%;
          box-shadow: 0px 0px 3px 1px black;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          
            & img {
              border-radius: 2px;
              margin:0;
            }
        }

`;

const MainInfo = styled.div`
        display:flex;
        flex-grow: 1;
        align-items: flex-start;
        flex-direction: column;
        margin-left: 6px;
`;

const InfoLine = styled.div`
        width:100%;
        display:flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 5px;
            & img {
              width: 30px;
              margin-right: 6px;
            }

        & samp {
          margin: 0;
          display: flex;
          white-space: pre-wrap;
          text-align: left;
          font-size:115%;
          font-weight: 500;
        }
      
        & h4 {
          margin: 0px;
          margin-right: 5px;
        }

`;

const LineItem = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin:4px;
margin-right: 18px;

      
& samp {
  font-weight: 600;
  font-size:100%;
}

& img {
  width:20px;
  margin-right: 8px;
}
`;

const Table = styled.table`
      text-align: left;
          & tr {margin: 8px; 
            
            & th {
              white-space: nowrap;
              vertical-align: top;
            }
           }
`;

const SimilarProductHead = styled.h1`
position: relative;
  padding: 4px;
  text-align: left;
  width: 96%;
  margin: auto;
  padding-left: 14px;
  margin-bottom: 10px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 10px;
    background-color: red; 
    border-radius: 10px 0px 0px 10px;
  }
`;

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


const AllProductsConteiner: React.FC<Props> = ({loading, setLoading, userData, favorits, 
                                                setFavorits, chekfavorits, activeuser, usermode,
                                                incart, setInCart
                                              }) => {

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
  let newItem = itemId;
  
  let storedcarts = localStorage.getItem('incart');
  let incart = storedcarts ? JSON.parse(storedcarts) : [];
  
  let updatedcarts = [...incart];
  
  const index = updatedcarts.indexOf(newItem);
      if (index === -1) {updatedcarts.push(newItem);} 
      else {updatedcarts.splice(index, 1);}
  localStorage.setItem('incart', JSON.stringify(updatedcarts));
      setInCart(updatedcarts);
};

          const serverlink = serverUri();
            const [product, setProduct] = useState<Productprops | null>(null);
            const [lastClickedProductId, setLastClickedProductId] = useState<string | null>(null);
        let products;
        if(usermode){products = userData.filter(product => !activeuser.products.includes(product._id));} 
        else{products = userData}

        console.log(product)

        const clickF =(productId:string) =>{
          viewProduct(productId);
          setLastClickedProductId(productId);
          setLoading(true);

        }

        const viewProduct = async (productId:string) =>{

            try {
              setLoading(true);
              const updateViewNumber = await fetch(`${serverlink}/updateView/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    });
                if (!updateViewNumber.ok) { throw new Error('Failed to fetch users data'); };
                const updateViewResponse = await updateViewNumber.json();
                    setProduct(updateViewResponse);
                    setLoading(false);

                    // console.log(updateViewResponse);
                    
            } catch (error) {console.log('Error:', error);}

        }

        const CartIconComponent = ({ itemId, incart, handleClickCart, product }: CartIconComponentProps) => {
          return (
            <AddCartIcon 
            onClick={(e) => { 
                      e.stopPropagation(); 
                      handleClickCart(itemId); 
                    }}
                    product={product}
                    >
              <img src={incart.includes(itemId) ? cart : addcart} alt="cart icon" />
            </AddCartIcon>
          );
        };
        const FavoriteIconComponent = ({ itemId, favorits, handleItemClick, product  }: FavoriteIconComponentProps) => {
          return (
            
            <AddfavIcon 
            product={product}
            onClick={(e) => { 
              e.stopPropagation(); 
              handleItemClick(itemId); 
              }}>
              <img src={favorits.includes(itemId) ? favicon1 : favicon0} alt="fav icon" />
            </AddfavIcon>
          );
        };

        return(
    
    <div style={{top:'0'}} className="all-product-conceiner-II">
        {usermode && <h1 className="products-header"> All Products:-<samp style={{color:'red'}}>{products.length}</samp></h1>}
<div style={{flexWrap: product === null? 'wrap' : 'nowrap'}} className="productarray">

{product === null ? 
(
  products.map((item, index) => (
    <article  onClick={() => {
      clickF(item._id);
    }} key={item._id} className="product-conteiner">

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

          <FavoriteIconComponent itemId={item._id} 
              favorits={favorits} 
              handleItemClick={handleItemClick} 
              product={product} />

              <CartIconComponent itemId={item._id} 
                  incart={incart} 
                  handleClickCart={handleClickCart} 
                  product={product} />

        </div>
      </div>
    </article>
  ))
)
: 
(
    <>
<ProductConteiner  key={product._id}>

<ProductHeadInfo>
  <ImgConteiner>
    <img src={testimg} alt='User Icon' />
      <ImgsBox>
          {[0,1,2,3,4].map((item,index)=>(
            <samp key={index}>
              <img src={testimg} alt="prodict imgs" />
            </samp>
          ))}
      </ImgsBox>
  </ImgConteiner>


        <MainInfo>
          <InfoLine>
                    <LineItem>
                      <h4>ID: </h4> 
                        <samp>{product.id}</samp>
                    </LineItem>

                        <LineItem>
                          <img src={view} alt="view icon" /> 
                            <samp>{product.view}</samp>
                        </LineItem>

                            <LineItem>
                              <img src={cost} alt="cost icon" /> 
                                <samp>{product.sale}</samp>
                            </LineItem>

                                <LineItem style={{cursor: 'pointer'}}>
                                  <img src={share} alt="cost icon" /> 
                                    <samp>{product?.share}</samp>
                                </LineItem>

                                    <LineItem>
                                      <img src={clock} alt="time icon" /> 
                                        <samp>{product.datatime}</samp>
                                    </LineItem>
          </InfoLine>

      <Table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td><samp>{product.name}</samp></td>
          </tr>
          <tr>
            <th>In stock:</th>
            <td><samp style={{color: 'red'}}>{product.quantity} {product.quantityUnit}.</samp></td>
          </tr>
          <tr>
            <th>Price:</th>
            <td><samp style={{color: 'red'}}>{product.price.toFixed(2)} {product.currency}.</samp></td>
          </tr>
        </tbody>
      </Table>
          
      <InfoLine>
            <h4><img style={{marginRight:'0'}} width={20} src={user} alt="user icon" /></h4>
              <samp>{product.owner}</samp>
          </InfoLine>


        </MainInfo>
</ProductHeadInfo>

        


<div style={{borderTop:'0.5px solid black', marginTop:'5px'}}>

          <InfoLine>         
          <h4>Description:</h4>
              <samp> {product.description} </samp>
          </InfoLine>

          <InfoLine>
          <h4>Comment:</h4>
              <samp>{product.comment}</samp>
          </InfoLine>


<div style={{marginLeft: '25px'}}>

<h3 style={{padding: '0', margin: '0', textAlign: 'left'}}>Contact Info:</h3>

          <InfoLine>
          <img src={phone} alt="emailicon" />
          <a href={`tel:${product.phone}`}>
            <samp>{product.phone}</samp>
          </a>
          </InfoLine>

          <InfoLine>
            <img src={mail} alt="emailicon" />
              <a href={`mailto:${product.email}`}>
              <samp>{product.email}</samp>
          </a>

          </InfoLine>

          <InfoLine>
          <img src={loc} alt="emailicon" />
              <samp>{product.location}</samp>
          </InfoLine>

          
    <FavoriteIconComponent itemId={product._id} favorits={favorits} handleItemClick={handleItemClick} product={product} />
    <CartIconComponent itemId={product._id} incart={incart} handleClickCart={handleClickCart}  product={product} 
                           
                            />

          </div>

        
        
</div>


        </ProductConteiner>


<div style={{width: '29%', backgroundColor: 'red', marginLeft: '8px', borderRadius: '10px 10px 0 0'}}>
    </div>

    </>

)}


</div>

{
product !== null && (
<>
<SimilarProductHead>Similar products</SimilarProductHead >
<div style={{width: '98%', margin:'auto', minHeight: '150px', marginBottom:'10px', boxShadow: '0px -2px 9px 0px black', borderRadius: '6px 6px 0 0'}}>
    </div>
    </>
) 

    
}

    </div>
 );

}

export default AllProductsConteiner;



