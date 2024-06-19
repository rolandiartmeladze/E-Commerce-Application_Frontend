import React, { useState } from 'react';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import invoiceIcon from '../../icon/invoice.png';

const InvoiceUserContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;

  ul{
    li{
    background: none;
    box-shadow: none;
    padding: 3px;
    margin:1px;
    display: flex;
    width: auto;

      h4{
        margin-right: 5px !important;
      }
    }
  }

  section {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;

    h1 {
      text-align: left;
    }

    .left,
    .right {
      flex-grow: 0;
    }

    .left {
      li {
        justify-content: flex-start;
        h4 {
          margin: 0;
        }

        span {
          color: blue;
        }
      }
    }

    .right {
      li {
        justify-content: flex-start;
        h4 {
          margin: 0;
          margin-right: 4px;
        }

        span {
          color: red;
        }
      }
    }
  }

  .header {
    width: 98%;
    margin: auto;
    height: auto;
    background-color: blue;
    padding: 8px;
    display: flex;
    justify-content: space-between;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h2 {
        color: darkgray;
        text-decoration: underline;
        margin: 0 0 6px 0;
      }

      li {
        align-items: flex-start;
        margin: 1px 0;
        padding: 3px 0 3px 0px;

        h4 {
          margin: 0;
          color: black;
        }

        span {
          margin-left: 3px;
        }
      }
    }

    .logo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px;
    }
  }
`;

const InvoicHead = styled.div`
      text-align: left; 
      background-color: rgb(0, 50, 0, 0.2); 
      padding: 6px;
       
`;

const BtnsConteiner = styled.div`
      right: 10px;
      top: 0px;
      padding: 2px;
      button{
        cursor: pointer;
        padding: 4px 5px; 
        margin: 0px 2px;
        border-radius: 5px;
      }

@media (max-width: 750px) {
  display:flex;
  flex-direction: column;
  z-index: 3;
  button{
    margin: 1px;
  }

}

`;

const Invoic = ({product}) => {

  const [generatingPDF, setGeneratingPDF] = useState(false);

  const Download = () => {
    setGeneratingPDF(true);
    const element = document.getElementById('invoic'); 

    setTimeout(() => {
          html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgHeight = canvas.height * 208 / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
        pdf.save('invoice.pdf');
        setGeneratingPDF(false);
    });

    }, 1000);
}    

const navigate = useNavigate();


    const closeinvoic = () =>{
          navigate(`/products/${product._id}`);
      }

      const data = {
        Now: () => {
          return new Date().toLocaleString(); 
        }
      };



    // let username = document.getElementById('UserName');
    // let useremail = document.getElementById('UserEmail');
    // let userphone = document.getElementById('UserPhone');
    // let useraddress = document.getElementById('UserAddress');

      let cost = 0;

      const productCost = product?.price * 1;
      cost += productCost;




    


    return (
      <>

<div>             
  {/* {!generatingPDF&& ( */}
         <BtnsConteiner>
               <button onClick={Download}>Download</button>
               <button>Share Now</button>
               <button onClick={closeinvoic}>Close</button>
         </BtnsConteiner>
{/* )} */}
</div>

<InvoiceUserContainer id="invoice">
    <header className='header'>
      <div className='logo'>
        <img width={50} src={invoiceIcon} alt='Invoice Icon' />
        <h1 style={{ fontWeight: '900' }}>Invoice</h1>
      </div>

      <ul>
        <h2>Your Company Name</h2>
        <li>
          <h4>Address:</h4>
          <span>{product?.location}</span>
        </li>
        <li>
          <h4>Postal Code:</h4>
          <span>53000</span>
        </li>
        <li>
          <h4>Bank Name:</h4>
          <span>Bank Of Georgia</span>
        </li>
        <li>
          <h4>Account Number:</h4>
          <span>86 GE BG 25 000 000 037 498</span>
        </li>
      </ul>
    </header>

    <section>
      <ul className='left'>
        <li>
          <h4>Owner:</h4>
          <span>{product?.owner}</span>
        </li>
        <li>
          <h4>Cost:</h4>
          <span>{product?.price}{product?.currency}</span>
        </li>
      </ul>

      <ul className='right'>
        <li>
          <h4>Invoice ID:</h4>
          <span>{'N36154'}</span>
        </li>
        <li>
          <h4>Invoice Date:</h4>
          <span>{data.Now()}</span>
        </li>
        <li>
          <h4>Last Date:</h4>
          <span>{data.Now()}</span>
        </li>
        <li>
          <h4>Product ID:</h4>
          <span>{product?.id}</span>
        </li>
      </ul>
    </section>

    <div>
      <h1>Product:</h1>
    </div>
  </InvoiceUserContainer>

      </>
    );
   }

   export default Invoic;


//    <Invoicuserconteiner id="invoic">
//    <InvoicHead>
//      <h5>Invoic ID: </h5><samp>N36154</samp>  {'<>'}
//      <h5>Data Time: </h5> <samp>{data.Now()}</samp>

//              {!generatingPDF&& (
//          <BtnsConteiner>
//                <button onClick={Download}>Download</button>
//                <button>Share Now</button>
//                <button onClick={closeinvoic}>Close</button>
//          </BtnsConteiner>
// )}

//    </InvoicHead>


// <div style={{display:'flex', flexWrap:'wrap'}}>
//    <ul>
//      <h5>User:</h5>
//        <li><h5>Name:</h5> <samp>{product.name}</samp></li>
//        <li><h5>Email:</h5> <samp>{product.email}</samp></li>
//        <li><h5>Phone:</h5> <samp>{product.phone}</samp></li>
//        <li><h5>Address:</h5> <samp>{product.location}</samp></li>
//    </ul>

//      <ul>
//        <h5>Bank:</h5>
//          <li><h5>Bank Name:</h5> <samp>{'Bank Of Georgia'}</samp></li>
//          <li><h5>Accounc Number:</h5>  <samp>{'22 GE 65 BG 00 00 00 20 01 19 97'}</samp></li>
//          <li><h5>Owner:</h5>  <samp>{'Roland Artmeladze'}</samp></li>
//          <li><h5>Destination:</h5>  <samp>{'Invoic N245638'}</samp></li>
//      </ul>
// </div>

// <h4 style={{marginLeft: '20px'}}>Products:</h4>

//    <table>
//      <tbody>
//      <tr style={{backgroundColor:'rgb(0, 0, 0, 0.3)'}}>
//        <td>Name</td><td>quantity</td><td>Price</td><td>Cost</td></tr>
//        <tr key={product._id}>
//          <td>
//          {product.name}
//          </td>
//          <td>
//            {"1"} {product.quantityUnit}
//            </td>
//            <td>
//              {product.price} {product.currency}
//              </td>
//              <td>
//                {1 * product.price} {product.currency}
//                </td>
//                </tr>
//      </tbody>              
//    </table>
//  <h3> Total: {cost} ₾.</h3>





//    </Invoicuserconteiner>
