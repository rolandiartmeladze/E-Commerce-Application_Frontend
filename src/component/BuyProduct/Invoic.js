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
  margin: 4px 0px;
}
ul{

  li{
    width: 90%;
    margin-left: 12px;
    box-shadow: none;
    border-bottom: 0.1px solid black;
  }
}

table{
  width: 90%;
  margin: auto;
  background-color: rgb(0, 0, 0, 0.2);
  border-radius: 8px;
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
          // setCheck(false);
          setInvoic(false);
        } 
      }

      const data = {
        Now: () => {
          // Define the behavior of the Now function
          return new Date().toLocaleString(); // Example: Return current date and time as a string
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


    

    // return invoice;

    return (
      <>
      <Invoicuserconteiner id="invoic">
      <ul>
        <h5>User:</h5>
        <li>Name: {invoice["user info"].name}</li>
        <li>Email: {invoice["user info"].email}</li>
        <li>Phone: {invoice["user info"].phone}</li>
        <li>Address: {invoice["user info"].address}</li>
        
        <h5 style={{marginTop:'15px'}}>Bank:</h5>

        <li>Bank Name: {'Bank Of Georgia'}</li>
        <li>Accounc Number:  {'22 GE 65 BG 00 00 00 20 01 19 97'}</li>
        <li>Owner:  {'Roland Artmeladze'}</li>
        <li>Destination:  {'Invoic N245638'}</li>
        

      </ul>
   <h5 style={{marginLeft: '20px'}}>Products:</h5>

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
      <h3 style={{margin: '5px', textAlign:'left', marginLeft:'10px', color:'red', backgroundColor: 'rgb(0, 0, 200, 0.3)', padding: '4px', borderRadius: '6px'}}> Total: {cost} ₾.</h3>

<div style={{textAlign: 'left', marginLeft: '15px', position:'absolute', bottom: '5px'}}>
Data Time: {data.Now()}
</div>

{!generatingPDF&& (
<div style={{position: 'absolute', right: '10px', top: '5px'}}>

<button onClick={Download}>Download</button>
<button>Share Now</button>
<button onClick={closeinvoic}>Close</button>

</div>
)}


        </Invoicuserconteiner>


      </>
    );
   }

   export default Invoic;

