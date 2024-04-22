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
import favicon0 from '../../icon/fav.png';
import favicon1 from '../../icon/favcheck.png';

import testimg from '../../img/slide_9.jpg';

const ProductConteiner = styled.div`
    // color:red;
    width: 85%;
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
`;

const InfoLine = styled.div`
        width:100%;
        display:flex;
        flex-wrap: wrap;
`;

const LineItem = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-right: 18px;

      
& samp {
  font-weight: 900;
  font-size:120%;
}

& img {
  width:20px;
  margin-right: 8px;
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
              const updateViewNumber = await fetch(`http://localhost:3001/updateView/${productId}`, {
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
          <InfoLine style={{justifyContent: 'space-evenly'}}>
                    <LineItem>
                      <samp>ID: </samp> 
                      {/* <samp>{product._id}</samp> */}
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


          {/* <div>Product Name: {product.name.substring(0,50)}{product.name.length > 50? '...':null}</div> */}
                {/* <samp className='productname all-product-conteiner'>{(`${product.name}`).substring(0,50)}{'...'}</samp>
                <samp className='productname all-product-conteiner'>{product.location}</samp> */}


        </MainInfo>
</ProductHeadInfo>

<div style={{paddingBottom:'0px'}} className='userInfoLineall'>

                <div  className='userInfoLineall-item'>
                        <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px'
                                }}>მარაგშია
                        </span> 
                        <span>{product.quantity} {product.quantityUnit}</span></div>
                <div  className='userInfoLineall-item'>
                        <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px'
                                }}>ფასი</span> 
                                <span>{product.price}  {product.currency}</span>
                                </div>


                                <div style={{flexDirection: 'column',  height: '40%'}}  className='userInfoLineall-item'>
                               <div style={{ alignItems: 'center' ,  display:'flex', flexDirection: 'row'}}>

                                <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px',
                                marginRight: '6px'
                                }}>
                                    {/* <img width={15} src={vewicon} alt='wiev' />   */}
                                    </span> 
                                <span style={{fontSize: '80%'}}>1250</span>
                                
                                </div>

                                <div style={{ alignItems: 'center' ,  display:'flex', flexDirection: 'row'}}>
                                <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px',
                                marginRight: '6px'
                                }}>
                                    {/* <img width={15} src={shareicon} alt='wiev' />   */}
                                    </span> 
                                <span style={{fontSize: '80%'}}>150</span>
                                </div>

                                </div>

                                <li style={{width:'100%'}}><samp>Add Favorit</samp><samp> ____ Share Product</samp></li>





        </div>
        


<div className='moredetalt'>
    <ul style={{padding:'0', margin:'0'}}>
    <li><samp>Owner: </samp> <samp> {product.owner}</samp></li>
    <li><samp>Email: </samp> <samp><a>{product.email}</a></samp></li>
    <li><samp>Phone: </samp> <samp><a>{product.phone}</a></samp></li>

    {/* <li style={{alignItems: 'flex-start'}}><samp>აღწერა:</samp>
    <samp style={{fontSize:'80%'}}>
        {('ესა რის მოკლე აღწერა აღნიშნული პროდუქტისთვის რომელიც შეიძლება იყოს საკმაოდ გრრძელი ამიტომ აქ გამოჩნდება მხოლოდ ნაწილი დანარჩენი დეტალურად ნახვის შემთხვევაში').substring(0,100)}{'...'} </samp></li>
        <li style={{alignItems: 'flex-start'}}><samp>კომენტარი:</samp>
    <samp style={{fontSize:'80%'}}>
        {('ესა რის მომხარებლის მიერ დამარებული კომენტარი აღნიშნული პროდუქტისთვის რომელიც შეიძლება იყოს საკმაოდ გრრძელი ამიტომ აქ გამოჩნდება მხოლოდ ნაწილი დანარჩენი დეტალურად ნახვის შემთხვევაში').substring(0,100)}{'...'} </samp></li> */}
        
        {/* <li><samp>ნახვა:{1200}</samp><samp> ___ გაყიგვა:{10}</samp></li> */}
        <li><samp>Data:</samp><samp>30/03/2023</samp></li>
    </ul>
</div>

                <div className='userTotal'> 
                შეიძინე ახავე
                {/* <samp>
                        <h2>ღირებულება: <samp>{(300*450).toFixed(1)} {'$'}</samp></h2>
                </samp> */}
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



