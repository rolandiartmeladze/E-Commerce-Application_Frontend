import React, { useEffect, useState } from 'react';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import stamp from '../../img/stamp-test.png';
import signature from '../../img/signature-test.png';

import invoiceIcon from '../../icon/invoice.png';
const InvoiceUserContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid;
  padding-bottom: 10px;

  ul {
    li {
      background: none;
      box-shadow: none;
      padding: 3px;
      margin: 1px;
      display: flex;
      width: auto;

      h4 {
        margin-right: 5px !important;
      }
    }
  }

  section {
    width: 98%;
    margin: auto;
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

  header {
    width: 100%;
    margin: auto;
    height: auto;
    background-color: blue;
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
          color: white;
        }
      }
    }

    .logo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px;
      color: white;
    }
  }

  .product-info {
    width: 98%;
    margin: auto;

    h1 {
      text-align: left;
      border-left: 3px solid;
      padding-left: 4px;
      margin-top: 3px;
    }

    table {
      margin-top: 12px;
      width: 100%;
      background-color: rgba(65, 203, 80, 0.1);

      .head {
        font-weight: 900;
        background-color: rgba(65, 113, 80, 0.2);
      }
    }
  }

  article {
    display: flex;
    margin-top: 25px;
  }

  .note {
    width: 60%;
    background-color: rgba(0, 0, 255, 0.2);
    padding: 20px;

    h3 {
      margin: 3px;
      text-align: left;
    }

    p {
      margin: 5px;
      padding: 5px;
      text-align: left;

      span {
        color: red;
      }
    }
  }

  .total {
    display: flex;
    padding: 20px;
    background-color: rgba(0, 0, 255, 0.6);
    width: 40%;
    align-items: flex-end;
    flex-direction: column;
    justify-content: center;

    div {
      font-weight: 900;
    }

    h1 {
      color: white;
      border: none;
    }
  }

  .signature-cont {
    width: 98%;
    margin: auto;
    position: relative;
    height: 180px;

    .signature {
      right: 60px;
      position: absolute;
      top: 40px;

      img {
        width: 150px;
      }
    }

    .stamp {
      opacity: 0.1;
      right: 80px;
      position: absolute;
      top: 20px;

      img {
        width: 100px;
      }
    }
  }

  .contact {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
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


const HeadItem = styled.div`
padding: 6px;
    display: flex;
    right: 10px;
    top: 0px;
    /* padding: 2px; */
    justify-content: flex-end;
`;
const Invoic = ({product, productnumb}) => {

  // generate invoice ID => 
  const [invoiceid, setInvoiceId] = useState('');

  useEffect(()=>{

    const generateInvoiceID =()=>{

      var leter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numb = "1234567890";

      // let char = '';
      // let num = '';
      // const randomchar =()=> Math.floor(Math.random() * leter.length);
      // for(let i=0; i<=1; i++){
      //   const select = randomchar();
      //   char += leter[select];

      // };
      // for(let i=0; i<=5; i++){
      //   const randomnumber =()=> Math.floor(Math.random() * numb.length);
      //   const select = randomnumber();
      //   num += numb[select];

      // }


      // setInvoiceId(`${char}${num}`);



      //UPDATE 
      const getRandom = (str, length) =>
        Array.from({ length }, () => str[Math.floor(Math.random() * str.length)]).join('');

          const charPart = getRandom(leter, 2);
          const numPart = getRandom(numb, 6);

      setInvoiceId(`${charPart}${numPart}`);



    }
    generateInvoiceID();
  },[])

  const Download = () => {
    const element = document.getElementById('invoice');

    setTimeout(() => {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgHeight = canvas.height * 208 / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
        pdf.save(`${invoiceid}.pdf`);
      });

    }, 1000);
  }    

const navigate = useNavigate();
    const closeinvoic = () =>{navigate(`/products/${product._id}`)}

      const Cost = product?.price * productnumb;

// format date Function with invois generate data and las data ..

      const InvoiceData = new Date();

          const addDay = (date, days) => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
          }

      const lastDay = addDay(InvoiceData, 5);

          const formatData = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
          }

  return (
      <>

<HeadItem >             
         <BtnsConteiner>
               <button onClick={Download}>Download</button>
               <button>Share Now</button>
               <button onClick={closeinvoic}>Close</button>
         </BtnsConteiner>
         </HeadItem>

<InvoiceUserContainer id="invoice">
    <header>
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
          <h4>Time:</h4>
          <span>{formatData(InvoiceData)}</span>
        </li>

        <li>
          <h4>Cost:</h4>
          <span>{Cost} {product?.currency}.</span>
        </li>
      </ul>

      <ul className='right'>
        <li>
          <h4>Invoice ID:</h4>
          <span>{invoiceid}</span>
        </li>
        <li>
          <h4>Product ID:</h4>
          <span>{product?.id}</span>
        </li>

        <li>
          <h4>Last Date:</h4>
          <span>{formatData(lastDay)}</span>
        </li>
      </ul>
    </section>

    <div className='product-info'>
      <h1>Product:</h1>
      <table>
        <tbody>
          <tr className='head'>
            <td>Name</td> <tb>Price</tb>
            <td>Quantitiy</td> <td>Cost</td>
          </tr>
          <tr>
            <td>{product?.name}</td>
            <tb>{product?.price.toFixed(2)} {product?.currency}</tb>
            <td>{productnumb} {product?.quantityUnit}</td>
            <td>{Cost.toFixed(2)} {product?.currency}</td>
          </tr>

        </tbody>
      </table>
      <article>
        <div className='note'>
          <h3>!NOTES:</h3>
          <p>
          To complete the payment, please include the following in the destination.
          </p>
          <p>
          <b>Destination:</b> 
          <span > {`${product?.id}/ (Name of the payer)`}</span>
          </p>
          
        </div>
        <div className='total'>

         <div>Total:</div>
    <h1>{product?.currency} {Cost.toFixed(2)}</h1>
        </div>
      </article>
    </div>

    <div className='signature-cont'>

    <div className='signature'>
      <img src={signature} alt='' />
    </div>

    <div className='stamp'>
      <img src={stamp} alt='' />
    </div>

    </div>

    <div className='contact'>
    <b>CONTACT</b> 
    <samp>{'Email:'}{product?.email} </samp>  
    <samp>{'Phone:'}{product?.phone} </samp>
    <samp>{'Address:'}{product?.location} </samp>

    </div>
  </InvoiceUserContainer>

      </>
    );
   }

   export default Invoic;
