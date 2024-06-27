import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../BuyProduct/Userinfo';

const BuyFromCartCont = styled.div`
      position: absolute;
      width: 98%;
      min-height: 96%;
      height: auto;
      margin: auto;
      background-color: white;
      z-index: 5;
      backdrop-filter: blur(12px);
      box-shadow: 0 0 3px 2px black;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      
      section{
        display: flex;
        flex-wrap: wrap;
      }
      h5{
        margin: 3px;
        text-align: left;
    }
    ul{
        width: 48%;
        li{
            box-shadow: none;
            padding: 2px;
            margin: 1px;
            h5{
                border-bottom: 1px solid black;
            }
        
        }
    }
    }

    `;

const Conteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
        text-align: left;
        border-radius: 10px 10px 0px 0px;
        margin: 0;
        background-color: brown;
        display: flex;

        font-weight: 400;
    font-size: 150%;
    display: flex;
    padding: 5px;
}
    `;
const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 60%;
  @media (max-width: 750px) {
    padding-top: 35px;
    width: 98%;
  }
`;

const ProductsTable = styled.table`
  background-color: rgb(24, 22, 19, 0.4);
  padding: 10px;
  margin-top: 0px;
  color: white;
`;

const ProductsTableHead = styled.tr`
  box-shadow: 0 0 1px 0.5px black;
  padding: 2px;
`;

const ProductName = styled.td`
  text-align: left;
  max-width: 160px;
`;

const Footer = styled.div`
  width: 100%;
  text-align: left;
  background-color: wheat;
  padding: 0px 0px 10px 0px;
  margin: 0px;
  border-radius: 0px 0px 10px 10px;
  h4 {
    margin: 4px;
    margin-left: 12px;
  }
`;

const Headercont = styled.header`
  width: 100%;
  background-color: rgb(24, 22, 19, 0.3);
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
`;

interface Props {
  products: any[];
  cost: number;
  quantities: any[];
  usermode: boolean;
  members: any[];
}
interface Props1 {
  product: any;
  members: any[];
}
const BuyProduct = ({ product, members }: Props1) => {
  let quantity = document.getElementById('productquantity') as HTMLInputElement;
  let numb = quantity?.value;

  const data = {
    Now: () => {
      return new Date().toLocaleString();
    },
  };

  const token = localStorage.getItem('token');

  const isMember = members.find((user) => user._id === token);

  return (
    <BuyFromCartCont>
      <Headercont>
        <h5>Invoic ID: </h5>
        <samp>N36154</samp> {' <> '}
        <h5>Data Time: </h5> <samp>{data.Now()}</samp>
      </Headercont>

      <section>
        <ul>
          <h5>გადამხდელი</h5>

          <li>
            <h5>Name</h5>
            <samp>
              {isMember?.name} {isMember?.lastname}
            </samp>
          </li>
        </ul>
        <ul>
          <h5>მიმღები</h5>
          <li>
            <h5>Name</h5>
            <samp>{product.owner}</samp>
          </li>
          <li>
            <h5>Bank:</h5> <samp>{'Bank Of Georgia'}</samp>
          </li>
          <li>
            <h5>Accounc:</h5> <samp>{'22 GE 65 BG 00 00 00 20 01 19 97'}</samp>
          </li>
          <li>
            <h5>Destination:</h5> <samp>{'Invoic N245638'}</samp>
          </li>
        </ul>

        <div style={{ width: '100%' }}>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>quantity</td>
                <td>Price</td>
                <td>Cost</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </BuyFromCartCont>
  );
};
export { BuyProduct };

const BuyFromCart = ({
  products,
  cost,
  quantities,
  usermode,
  members,
}: Props) => {
  return (
    <>
      <Conteiner id="BuyConteiner">
        <ProductList>
          <UserInfo usermode={usermode} members={members} />

          <Header>
            {' '}
            <samp>თქვენ შეარჩიეთ - {products.length} პროდუქტი </samp>
          </Header>

          <ProductsTable>
            <tbody>
              <ProductsTableHead>
                <td>Name</td>
                <td>quantity</td>
                <td>price</td>
                <td>cost</td>
              </ProductsTableHead>

              {products.map((product, index) => (
                <tr key={product._id}>
                  <ProductName>
                    <samp>{index + 1}: -</samp>
                    {product.name}
                  </ProductName>
                  <td>
                    {quantities[index].quantity}
                    {product.quantityUnit}
                  </td>
                  <td>
                    {product.price.toFixed(1)}
                    {product.currency}
                  </td>
                  <td>
                    {(quantities[index].quantity * product.price).toFixed(1)}
                    {product.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductsTable>

          <Footer>
            <h4> საერთო ღირებულებით - {cost} ₾.</h4>
          </Footer>
        </ProductList>
      </Conteiner>
    </>
  );
};

export default BuyFromCart;
