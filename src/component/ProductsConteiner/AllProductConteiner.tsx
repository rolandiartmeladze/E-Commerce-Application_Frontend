import React, { useEffect, useState } from "react";
import './ProductsConteiner.css';
import './product.css';
import styled from "styled-components";

import serverUri from '../../component/serverUrl';


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

import testimg from '../../img/slide_9.jpg';

const ProductConteiner = styled.div`
    // color:red;
    width: 70%;
    max-width: none;
    margin: 3px;
    border-radius: 0;
    padding: 8px;
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

interface ActiveUserProps {products: string[];}

interface Props{
    userData: Productprops[];
    usermode:boolean;
    favorits:any[]; 
    setFavorits:Function;
    chekfavorits:Function;
    activeuser:ActiveUserProps;
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


const AllProductsConteiner: React.FC<Props> = ({ userData, favorits, setFavorits, chekfavorits, activeuser, usermode}) => {

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

          const serverlink = serverUri();
            const [product, setProduct] = useState<Productprops | null>(null);

        let products;
        if(usermode){products = userData.filter(product => !activeuser.products.includes(product._id));} 
        else{products = userData}

        console.log(product)

        const viewProduct = async (productId:string) =>{
            try {
              const updateViewNumber = await fetch(`${serverlink}/updateView/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    });
                if (!updateViewNumber.ok) { throw new Error('Failed to fetch users data'); };
                const updateViewResponse = await updateViewNumber.json();
                    setProduct(updateViewResponse);
                    // console.log(updateViewResponse);
                    
            } catch (error) {console.log('Error:', error);}

        }



        return(
    
    <div style={{top:'0'}} className="all-product-conceiner-II">
        {usermode && <h1 className="products-header"> All Products:-<samp style={{color:'red'}}>{products.length}</samp></h1>}
<div style={{flexWrap: product === null? 'wrap' : 'nowrap'}} className="productarray">

{product === null ? 
(
  products.map((item) => (
    <article onClick={() => viewProduct(item._id)} key={item._id} className="product-conteiner">
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

        <div style={{ justifyContent: !usermode ? 'space-around' : 'flex-start', marginTop: '8px' }} className="product-info-item end">
          <samp><img src={view} alt="view icon" />{item.view}</samp>
          <samp><img src={cost} alt="cost icon" />{item.sale}</samp>
          <samp><img src={share} alt="share icon" />{0}</samp>
          {usermode &&
            (<samp onClick={() => handleItemClick(item._id)} style={{ position: 'absolute', right: '3px', bottom: '8px' }}>
              <img style={{ width: '30px' }} width={30} src={favorits.includes(item._id) ? favicon1 : favicon0} alt="fav icon" />
            </samp>)}
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
              <samp>
                {product.comment}
                </samp>
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

          </div>

        
        
</div>


        </ProductConteiner>
<div style={{width: '15%'}}>
    </div>    
    </>

)}



</div>
    </div>
 );

}

export default AllProductsConteiner;



