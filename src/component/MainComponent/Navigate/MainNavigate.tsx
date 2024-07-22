import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import producticon from '../../../icon/products.svg';
import addproducticon from '../../../icon/addproduct.svg';
import jurnaliicon from '../../../icon/jurnal.png';
import { isMobile } from '../../Header/HeadeUserElement';
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


        
        @media (max-width: 768px) {


            display: flex;
            height: auto;
            width: 100%;
            background-color: rgb(1, 1, 1, 0.3);
            flex-wrap: wrap;
            padding: 8px 0px;
            justify-content: space-around;
                    img{
            width: 25px;
            margin-right: 3px;

        }

    }
    a{
        margin: 4px 8px;
          @media (max-width: 768px) {
            box-shadow: 0px -3px 5px 0px green inset;
            padding: 6px 4px;
            flex-grow: 1;
            border-radius: 6px;
            corsor: pointer;
            justify-content: center;
            transition: 0.5s ease-in-out;

            &:hover{
                box-shadow: 0px -3px 1000px 0px rgb(0, 200, 0, 0.3) inset;
            }
          }
        }
`;

const MainNavigate = () => {
  const [clicked, setClicked] = useState(1);

  const getLinkStyle = (key: number) => ({
    color: clicked === key ? 'red' : 'black',
    textDecoration: clicked === key ? 'underline' : 'none',
  });

  const mobile = isMobile();


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
          <img src={addproducticon} alt="Add" />{mobile? 'New': ' New Product'}
        </Link>

        <Link
          to="/main/jurnal"
          style={getLinkStyle(3)}
          onClick={() => setClicked(3)}
        >
          <img src={jurnaliicon} alt="Jurnal" /> {mobile? 'Jurnal': 'sale Jurnal'}
        </Link>
      </Navigate>

      <Outlet />
    </>
  );
};

export default MainNavigate;
