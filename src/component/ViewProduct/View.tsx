import React, {useState} from "react";
import styled from "styled-components";


import user from '../../icon/user.png';
import view from '../../icon/view.png';
import cost from '../../icon/cost.png';
import share from '../../icon/share.png';

import clock from '../../icon/clock.png';
import loc from '../../icon/loc1.png';
import mail from '../../icon/mail.png';
import phone from '../../icon/phone.png';

import testimg from '../../img/slide_9.jpg';

import { FavoriteIconComponent } from '../ProductsConteiner/AllProductConteiner';
import { CartIconComponent } from '../ProductsConteiner/AllProductConteiner';
import Invoic from "../BuyProduct/Invoic";

import { BuyProduct } from '../BuyProduct/BuyFromCart';

// import BuyFromCart from '../BuyProduct/BuyFromCart';

const ProductConteiner = styled.div`
    width: 70%;
    max-width: none;
    margin: 3px;
    border-radius: 0;
    padding: 8px;
    backdrop-filter: blur(2px);
    box-shadow: 3px 3px 300px 5px inset rgb(15, 42, 42, 0.1);
    border-radius: 10px 10px 0px 0px;
    position: relative;
    
    @media (max-width: 750px) {
      width: 98%;
      padding: 3px;
    }
    
`;

const ProductHeadInfo = styled.div`
      display:flex;
      @media (max-width: 750px) {
      flex-direction: column;

      }
  
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

    @media (max-width: 750px) {

      margin:auto;
      max-width: 320%;
      width: 98%;
            
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

//____
const BuyFromCartCont = styled.div`
      position: absolute;
      width: 98%;
      min-height: 100%;
      height: auto;
      margin: auto;
      background: none;
      z-index: 5;
      backdrop-filter: blur(12px);
      box-shadow: 0 0 3px 2px black;
      border-radius: 10px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
    `;

const BuyModeCloseBtn = styled.button`
      position: absolute; 
      right: 10px; 
      top:  10px; 
      cursor:  pointer; 
      padding:  5px 10px; 
      border-radius: 4px
      `;

      const BtnsConteiner = styled.div`
            width:  100%; 
            text-align: left;
            display:  flex;
            justify-content: center;
            margin-top: 8px ;
            margin-bottom: 10px;
            align-items: center;
            
              button{
                padding: 8px 15px; 
                border-radius: 8px; 
                cursor: pointer; 
                margin: 6px;
              }
            `;
            


interface Props{
    product:any;
    incart:any;
    favorits:any;
    handleItemClick:any;
    handleClickCart:any;
    buy:boolean;
    setBuy:Function;
    quantities:any; 
    incartResponse:any; 
    members:any[];
    // setInvoic:any;
}



const View =({product, incart, favorits, handleItemClick, handleClickCart, buy, quantities, incartResponse, setBuy, members}: Props) =>{



  const closebtn = () => {setBuy(false)}

    const [check, setCheck] = useState<boolean>(false);
    const accept = () => {setCheck(prevCheck => !prevCheck);}

      const [invoic, setInvoic] = useState<boolean>(false);
      const tackeinvois =()=>{setInvoic(prevInvoic => !prevInvoic);}

    
    
    return(
      <>
            {buy &&  
      <BuyFromCartCont id="conteiner" > 
            {invoic && <Invoic quantities={quantities} incartResponse={incartResponse} setInvoic={setInvoic} />}
   
        <BuyModeCloseBtn onClick={closebtn} >Close</BuyModeCloseBtn>

        <BtnsConteiner>
                <button onClick={tackeinvois} disabled={!check}>Tacke invoice</button>
                <button disabled={!check}>Pay Now</button>
        </BtnsConteiner>

        <BtnsConteiner>
            <samp><input onChange={accept} type="checkbox"></input> ვეთანხმები პირობებს</samp>
        </BtnsConteiner>

   </BuyFromCartCont>
}




        <ProductConteiner  key={product._id}>

        {/* <BuyProduct product={product} members={members} /> */}

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
            <td><samp style={{color: 'red'}}>{product.price} {product.currency}.</samp></td>
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
    <CartIconComponent itemId={product._id} incart={incart} handleClickCart={handleClickCart}  product={product} />
                           
                            

          </div>

        
        
</div>


        </ProductConteiner>


        </>

    );
};

export default View;