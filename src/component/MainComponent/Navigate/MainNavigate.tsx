import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import producticon from '../../../icon/products.svg';
import addproducticon from '../../../icon/addproduct.svg';
import jurnaliicon from '../../../icon/jurnal.png';

const Navigate = styled.nav`
    display: flex;
    height: 35px;
    width: 100%;
    background-color: rgb(1, 1, 1, 0.3);
    flex-direction: row;
    flex-wrap: wrap;
    
        a{
            margin: 0px 8px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &:hover{
                color:red;
            }
        }
        img{
            width: 25px;
            argin-right: 6px;

        }


        
        @media (max-width: 500px) {


            display: flex;
            height: auto;
            width: 100%;
            background-color: rgb(1, 1, 1, 0.3);
            flex-wrap: wrap;
            padding: 8px 0px;
    a{
        margin: 4px 8px;

        }
`;

const MainNavigate = () => {
  const [clicked, setClicked] = useState(1);

  const getLinkStyle = (key: number) => ({
    color: clicked === key ? 'red' : 'black',
    textDecoration: clicked === key ? 'underline' : 'none',
  });

  return (
    <>
      <Navigate>
        <Link
          to="/main/products"
          style={getLinkStyle(1)}
          onClick={() => setClicked(1)}
        >
          <img src={producticon} alt="Productd" /> Product
        </Link>

        <Link
          to="/main/add"
          style={getLinkStyle(2)}
          onClick={() => setClicked(2)}
        >
          <img src={addproducticon} alt="Add" /> New Product
        </Link>

        <Link
          to="/main/jurnal"
          style={getLinkStyle(3)}
          onClick={() => setClicked(3)}
        >
          <img src={jurnaliicon} alt="Jurnal" /> sale Jurnal
        </Link>
      </Navigate>

      <Outlet />
    </>
  );
};

export default MainNavigate;
