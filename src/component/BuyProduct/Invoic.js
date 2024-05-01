import React, { useState } from 'react';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import styled from "styled-components";


const Invoicuserconteiner = styled.div`
      position: absolute; 
      z-index:  6;
      width:100%; 
      height:  100%; 
      background-color: white;
      border-radius: 10px;
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
      position: absolute;
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

const Invoic = ({quantities , incartResponse, setInvoic}) => {

  const [generatingPDF, setGeneratingPDF] = useState(false);

  const Download = () => {
    setGeneratingPDF(true);
    const element = document.getElementById('invoic'); // Get the container element

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


    const closeinvoic = () =>{
        let item = document.getElementById('invoic');
        if(item){
          item.style.display = 'none';
          setInvoic(false);
        } 
      }

      const data = {
        Now: () => {
          return new Date().toLocaleString(); 
        }
      };



    let username = document.getElementById('UserName');
    let useremail = document.getElementById('UserEmail');
    let userphone = document.getElementById('UserPhone');
    let useraddress = document.getElementById('UserAddress');

    const ActivProducts = [];
      let cost = 0;
      incartResponse.forEach((product, index) => {

      const productCost = product.price * quantities[index].quantity;
      cost += productCost;

      ActivProducts.push({
        'name': product.name, 
        'price': product.price, 
        'quantities':quantities[index], 
        'cost': (product.price * quantities[index].quantity),
        'quantityUnit': product.quantityUnit,
        'currency': product.currency
      })
  })

    const invoice ={
      "user info":{
      'name': username.value,
      'email': useremail.value,
      'phone': userphone.value,
      'address': useraddress.value
    }, 
      "product info": ActivProducts
      
    }


    


    return (
      <>
      <Invoicuserconteiner id="invoic">
        <InvoicHead>
          <h5>Invoic ID: </h5><samp>N36154</samp>  {'<>'}
          <h5>Data Time: </h5> <samp>{data.Now()}</samp>

                  {!generatingPDF&& (
              <BtnsConteiner>
                    <button onClick={Download}>Download</button>
                    <button>Share Now</button>
                    <button onClick={closeinvoic}>Close</button>
              </BtnsConteiner>
)}

        </InvoicHead>

 
  <div style={{display:'flex', flexWrap:'wrap'}}>
        <ul>
          <h5>User:</h5>
            <li><h5>Name:</h5> <samp>{invoice["user info"].name}</samp></li>
            <li><h5>Email:</h5> <samp>{invoice["user info"].email}</samp></li>
            <li><h5>Phone:</h5> <samp>{invoice["user info"].phone}</samp></li>
            <li><h5>Address:</h5> <samp>{invoice["user info"].address}</samp></li>
        </ul>

          <ul>
            <h5>Bank:</h5>
              <li><h5>Bank Name:</h5> <samp>{'Bank Of Georgia'}</samp></li>
              <li><h5>Accounc Number:</h5>  <samp>{'22 GE 65 BG 00 00 00 20 01 19 97'}</samp></li>
              <li><h5>Owner:</h5>  <samp>{'Roland Artmeladze'}</samp></li>
              <li><h5>Destination:</h5>  <samp>{'Invoic N245638'}</samp></li>
          </ul>
  </div>

   <h4 style={{marginLeft: '20px'}}>Products:</h4>

        <table>
          <tbody>
          <tr style={{backgroundColor:'rgb(0, 0, 0, 0.3)'}}>
            <td>Name</td><td>quantity</td><td>Price</td><td>Cost</td></tr>
          {invoice["product info"].map((item, index) => (
            <tr>
              <td>
              {item.name}
              </td>
              <td>
                {quantities[index].quantity} {item.quantityUnit}
                </td>
                <td>
                  {item.price} {item.currency}
                  </td>
                  <td>
                    {quantities[index].quantity * item.price} {item.currency}
                    </td>
                    </tr>
          ))}
          </tbody>              
        </table>
      <h3> Total: {cost} ₾.</h3>





        </Invoicuserconteiner>


      </>
    );
   }

   export default Invoic;

