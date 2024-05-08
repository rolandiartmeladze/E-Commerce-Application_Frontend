import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'; 

import styled from "styled-components";







const MeniuCmponent = styled.div`
  background-color: rgba(100, 1, 47, 0.4);
  height: 40px;
  padding: 2px 0px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 2px 5px 0.5px black;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 7px;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    margin: 0px;
    align-items: stretch;
    height: 100%;
    margin-right: 5px;

    li {
      display: flex;
      flex-grow: 1;
      height: 100%; 
      margin: 0px;
      margin-left: 3px;
      padding: 0px 10px;
      text-decoration: none;
      backdrop-filter: contrast(1.5);   
      font-weight: 700;
      box-shadow: 0px 0px 1px 0.5px brown;
      transition: 0.4s ease-in-out;

      &:hover {
        backdrop-filter: contrast(0.5);  
        box-shadow: 0px 0px 1px 0.5px yellow;
        color: yellow;
      }

      &:hover:before {
        
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 50, 100, 0.2), rgba(0, 66, 0, 0.25) 40%, rgba(100, 250, 0, 0.3) 70%);
        z-index: -1;
      }
    }
  }
`;




 interface MeniuProps{
    setUserData:Function;
    fetchData:Function;
    usermode:boolean;
    setMyRoom:Function;
    setProduct:Function;
 }



const Meniu = ({setUserData, fetchData, usermode, setMyRoom, setProduct}:MeniuProps) => {
  
      const navigate = useNavigate(); 

    let items = ['home', 'myRoom', 'products',"About",'Contact'];
  
    return(
      <MeniuCmponent>
        
<ul>




          {items.map((itemName, index) => (
              <>
                {itemName === 'home' && (
                  <Link key={index} to={`/`}>
                    <li>{'Home'}</li>
                  </Link>
                )}
                    {usermode &&
                    itemName === 'myRoom' && (
                    <Link onClick={()=>{setMyRoom(true)}} key={index} to={`/main`}>
                        <li>{'My Room'}</li>
                    </Link>
                    )}                   
                        {itemName === 'products' && (
                        <Link onClick={()=>{setProduct(null)}} key={index} to={`/products`}>
                            <li>{'Products'}</li>
                        </Link>
                        )}  

                        {itemName === 'About' && (
                        <Link key={index} to={`/about`}>
                            <li>{'About'}</li>
                        </Link>
                        )}  

                            {itemName === 'Contact' && (
                            <Link key={index} to={`/contact`}>
                                <li>{'Contact'}</li>
                            </Link>
                            )}  

              </>
            ))}

{/* <Selected {...Props} /> */}
</ul>


    
     
      
      </MeniuCmponent> 
    
    );
  }  
  


  export default Meniu;