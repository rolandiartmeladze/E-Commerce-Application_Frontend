import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';


import styled from "styled-components";
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
            text-decoration: underline;

            &:hover{
                color:red;
            }
        }
        img{
            width: 25px;
            argin-right: 6px;

        }
`;



const MainNavigate =()=>{

    return(
        <>
<Navigate>
    <Link to="/main/products"><img src={producticon} alt="Productd" />
        Product</Link>
    <Link to="/main/add"><img src={addproducticon} alt="Productd" />
        New Product</Link>
    <Link to="/main/jurnal"><img src={jurnaliicon} alt="Productd" />
        sale Jurnal</Link>
    </Navigate>


    <Outlet />
        </>

        );
};

export default MainNavigate;