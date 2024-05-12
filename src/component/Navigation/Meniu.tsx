import React, { useRef, useState, useEffect} from "react";

import { Link, useNavigate } from 'react-router-dom'; 

import styled from "styled-components";
import CloseIcon from '../../icon/close.svg';





const MeniuCmponent = styled.div`
  background-color: rgba(100, 1, 47, 0.4);
  height: 40px;
  padding: 2px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0px -1px 1px 0px black;
  margin-bottom: 0px;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    margin: 0;
    align-items: stretch;
    height: 100%;
    margin-right: 5px;

    li {
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

  @media only screen and (max-width: 750px) {
    background-color: rgb(50, 40, 20);
    display: none;
    align-items: flex-start;   
    height: auto;
    position: absolute;
    top: 0px;
    width: 98%;  
    flex-direction: column;  
    z-index: 2;    
    margin: auto;
    border-radius: 0px 0px 15px 15px;
    ul {
      width: 90%;
      flex-direction: column;   
      margin: auto;
      padding: 8px 0px;
      li {
        padding: 6px;
        margin: 5px 4px;
        justify-content: center;
        background: none;
        box-shadow: 0px 3px 3px -2px gray;
        backdrop-filter: none;        
        &:hover {
          backdrop-filter: none;  
          box-shadow: 0px 3px 3px -2px yellow;
          color: yellow;
        }
        &:hover:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: none;
          z-index: -1;
        }
      }
    }
    a {
      width: 100%;
      padding: 0;
      color: white;
    }
  }
`;

const CloseComponent = styled.div`
      width: 100%;
      height: 40px;
      samp{
        transition: 0.4s ease-in-out;
        position: absolute;
        right: 10px;
        top:6px;
        cursor: pointer;
        border-radius: 5px;
        &:hover{
          box-shadow: 0px 0px 2px 0px red;
        }
      }

      @media only screen and (min-width: 751px) {
      display: none;
      }
`;


 interface MeniuProps{
    setUserData:Function;
    fetchData:Function;
    usermode:boolean;
    setMyRoom:Function;
    setProduct:Function;
    menuVisible:boolean; 
    toggleMenu:Function;
 }



const Meniu = ({setUserData, fetchData, usermode, setMyRoom, setProduct,  menuVisible, toggleMenu}:MeniuProps) => {
  
  const menuRef = useRef(null);


  const menuStyles = {
    display: menuVisible ? 'flex' : 'none',
    // Add more styles as needed
};

    let items = ['home', 'myRoom', 'products',"About",'Contact'];

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array to run this effect only once
  
    const isMobile = windowWidth <= 750;

    const meniuOFF = () =>{
      return toggleMenu();
    }

    return (
      <MeniuCmponent ref={menuRef}  style={isMobile ? menuStyles : undefined}>


        <CloseComponent>
          <samp onClick={()=>{toggleMenu()}}>
      <img src={CloseIcon} alt="Colse icon" />
          </samp>
            </CloseComponent>


          <ul key='meniunav'>
              {items.map((itemName, index) => {
                  let key = `${itemName}-${index}`; 
                  return (
                      <React.Fragment key={key}>
                          {itemName === 'home' && (
                              <Link onClick={meniuOFF} to={`/`} key={key}>
                                  <li>{'Home'}</li>
                              </Link>
                          )}
                          {usermode && itemName === 'myRoom' && (
                              <Link onClick={() => { setMyRoom(true); toggleMenu()} } to={`/main`} key={key}>
                                  <li>{'My Room'}</li>
                              </Link>
                          )}
                          {itemName === 'products' && (
                              <Link onClick={() => { setProduct(null); toggleMenu() }} to={`/products`} key={key}>
                                  <li>{'Products'}</li>
                              </Link>
                          )}
                          {itemName === 'About' && (
                              <Link onClick={meniuOFF} to={`/about`} key={key}>
                                  <li>{'About'}</li>
                              </Link>
                          )}
                          {itemName === 'Contact' && (
                              <Link onClick={meniuOFF} to={`/contact`} key={key}>
                                  <li>{'Contact'}</li>
                              </Link>
                          )}
                      </React.Fragment>
                  );
              })}
          </ul>
      </MeniuCmponent>
  );
} 
  


  export default Meniu;