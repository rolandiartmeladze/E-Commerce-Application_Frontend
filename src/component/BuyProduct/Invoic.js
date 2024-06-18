import React, { useState } from 'react';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import invoiceIcon from '../../icon/invoice.png';

const Invoicuserconteiner = styled.div`

      // position: absolute; 
      // z-index:  6;
      width:100%; 
      height:  100%; 
      background-color: white;
      
  section{
  h1{
  text-align: left;}
  display: flex;
    justify-content: space-between;
border-bottom: 1px solid;

    // background: none;
    font-size: 90%;
    width: auto;
    margin: 0px;
    display: flex;

    .left{
    flex-grow: 0;
li{
display: flex;
    justify-content: flex-start;
        h4{
    margin: 0px;}

    }
    }
    .rigth{
    flex-grow: 0;
    li{
    margin:0px;
    h4{
    margin: 0px;}
    display:flex;
justify-content: flex-start;
    width: auto;
    span{
    color: red;
    }
    }

    }

  }


      .header{
width: 98%;
    margin: auto;
    height: auto;
    min-height: 150px;
    background-color: blue;
    padding: 8px;
    display: flex;
    justify-content: space-between;

    
          ul{
              h2{
                color: darkgray;
                text-decoration: underline;
                margin-bottom: 6px;
                margin: 0px;
                }
          flex-grow: 0;
          align-items: flex-start;
          display: flex; 
          float: right; 

          li{

          span{
          margin-left: 3px;
          }
          h4{
          margin:0;
          color: black;
          background: none;
          }
          background: none;
          font-size: 90%; 
          width: auto;
          margin: 0px;
display: flex;
    // flex-direction: column;
    // align-items: flex-start;
          }
          }


          .logo {
          display: flex; 
          align-items: flex-start; 
          flex-direction: column; 
          margin: 20px; 
          }
}


        h5{
          text-align: left;
          margin: 4px 3px;
          display: inline;
        }
        h4{
          margin: 5px;
          text-align:left;
        }
        h3{
              margin: 5px;
              text-align: left; 
              color:red; 
              background-color: rgb(0, 0, 200, 0.3); 
              padding: 4px;
        }

          ul{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            li{
              width: 90%;
              box-shadow: none;
              display: inline;
              margin: 1px; 
              padding: 3px;
              margin-left: 12px;
              padding-left: 0px;
                h5{
                  border-bottom: 0.1px solid black;
                }
  
  

            }
          }

            table{
              width: 100%;
              margin: auto;
              background-color: rgb(0, 0, 0, 0.2);
              
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

        <Invoicuserconteiner  id="invoic">
          <header className='header'>
            <div className='logo' style={{ }}>
              <samp><img width={50} src={invoiceIcon} alt='' /></samp>
              <h1 style={{ fontWeight: '900' }}>Invoice</h1>
            </div>

            <ul style={{}}>
              <h2 style={{}}>
                Your Company Name
              </h2>
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
                        <ul className='left' style={{}}>
              <li>
                <h4>Owner:</h4> 
                <span>{product?.owner}</span>
              </li>
              <li>
                <h4>Cost:</h4> 
                <span>{product?.price *1}{product?.currency}</span>
                </li>

                {/* <li>
                  <h4>Bank Name:</h4>
                  <span>Bank Of Georgia</span>
                  </li>

                  <li>
                  <h4>Account Number:</h4>
                  <span>86 GE BG 25 000 000 037 498</span>
                  </li> */}
            </ul>

            <ul className='rigth' style={{}}>
            
              <li>
                <h4>Invoice ID: </h4> 
                <span>{'N36154'}</span>
              </li>
              <li>
                <h4>Invoice data:</h4> 
                <span>{data.Now()}</span>
                </li>

                <li>
                  <h4>Last Data:</h4>
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

          {/* <footer>
  Footer
</footer> */}
        </Invoicuserconteiner>


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
