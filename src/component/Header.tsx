
import React, {useState} from 'react';

import "../style/Header.css";
import styled from "styled-components";

import { Link } from 'react-router-dom';


import userIcin from "../icon/user.png";
import meniuicon from '../icon/menu.svg';
import arrow from '../icon/arrow.png';

import FindComponent from './Find/FindComponent';
import Meniu from './Navigation/Meniu';

const Logo = styled.h1`
  margin: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 4px;
  left: 25px;
`;

const Userinfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const LoginBtn = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
  top: 10px;
  padding: 2px;
  padding-right: 8px;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0.3px 0.3px 2px 0.1px black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.8s ease-in-out;
  background-color: rgb(10, 15, 30, 0.3);

        &:hover{
  box-shadow: 0.3px 0.3px 2px 0.1px black inset;
  background-color: rgb(210, 105, 30, 0.1);
}

samp {
  margin: 2px;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 750px) {

  right: 60px;

}

`;


const MeniuBtn = styled.div`
    display: none;
    @media only screen and (max-width: 750px) {

      display:flex;
      rigth: 10px;

      position: absolute; 
      right: 10px;
      top: 5px;
      cursor:pointer;
      &:hover{
        box-shadow:0px 0px 1px 0px;
      }
    }
    
`;

  const HeaderComponent = styled.div`
    padding: 0px 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    // height: 20%;
    max-height: 250px;
    box-shadow: 2px 2px 6px 0.5px rgb(0, 0, 0 , 0.8);
    backdrop-filter: blur(2px);
    position: relative;
    min-height: 100px;
    grid-row: 1;
    grid-column: 1;
    background-color: rgb(51, 51, 51, 0.2);
    margin-bottom: 4px;
    z-index: 1000;


  `;

  const UserInfo = styled.div<{ active: boolean }>`
  display: flex;
  position: absolute;
  top: 5px;
  right: 8px;
  transition: 0.4s ease-in-out;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 800;
  flex-direction: column;
  z-index: 5;
  

  &:before {
    transition: 0.5s eae-in-out;
    position: absolute;
    content: "";
    display: block;
    width: 0px;
    height: 100%; /* Example height */
    background-color: rgb(51, 51, 51); /* Example color */
    transition: width 0.3s ease; /* Smooth transition */

    z-index: -1;
    padding-bottom: 10px;
  }


  div {
    padding: 5px 0;
    height: auto;
    display: flex;
    align-items: flex-end;

    samp {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    img {
      margin: 0;
      max-width: 40px;
    }
  }

  .item {
    width: 85%;
    margin: auto;
    color: white;
    box-shadow: 0px 2px 2px 0.5px white;
    margin-top: 7px;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;

    &:hover {
      color: yellow;
      box-shadow: 0px 2px 2px 0.5px yellow;
    }
  }

  @media only screen and (max-width: 750px) {
    right: 60px;
  }

  ${({ active }) =>
    active &&
    `
    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 100%;
      height: 100%; 
      background-color: rgb(51, 51, 51); 
      transition: width 0.3s ease; 
      z-index: -1;
      padding-bottom: 10px;
      border-radius: 10px 10px 10px 10px;
    }
  `}
`;


interface HeaderProps {
  login: any;
  setLogIn: any;
  usermode: boolean;
  setProduct: Function;
}



const Header: React.FC<HeaderProps> = ({
      login,
      setLogIn,
      usermode,
      setProduct,
}) => {


  // const [menuVisible, setMenuVisible] = useState(false);
// const menuRef = useRef(null);

// function toggleMenu() {
//   setMenuVisible(!menuVisible);
// }


const [menuVisible, setMenuVisible] = useState(false);
const [active, setActive] = useState(false);

const toggleMenu = () => {
  setMenuVisible(!menuVisible);
}



  const loginbtn = () => {
    !login ? setLogIn(true) : setLogIn(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("address");

    localStorage.removeItem("favorits");
    window.location.reload();
  };


  const MeniuProps ={ usermode, setProduct};

  const OpenInfo = ()=>{
    active? setActive(false):setActive(true);
  }
const style ={
  backgroundColor:'rgb(51, 51, 51)'
}

  return (
    <HeaderComponent>
         <Link to={'/'}> <Logo>MyShop.App</Logo> </Link>

{usermode && 
  <UserInfo active={active}>
  <div onClick={OpenInfo}  style={{
  boxShadow: !active? '0px 2px 2px -1px rgb(1,1,1)': '0px 2px 2px -1px rgb(255,255,255)',
  borderRadius: !active? '8px' : undefined,
  color: active? 'yellow' : 'black',
  
  
}} >
  <img className="user-icon" src={userIcin} alt="User Icon" />
  <samp><span>{localStorage.getItem("user")}
    </span>
    <span>
     {localStorage.getItem("address")?.substring(0,15)} 
    </span>
  </samp>
  
  <img style={{
    width: '20px',
    margin: '0 6px',
    transform: active? 'rotate(90deg)': 'rotate(0)',
  }} src={arrow} alt="" />
  </div>

{ active &&<> 

  <Link to="/main/message" onClick={OpenInfo}>
    <div className='item'> Message </div>
  </Link>


  <Link to="/main/products" onClick={OpenInfo}>
    <div className='item'> My Products </div>
  </Link>

  <Link to="/main/add"  onClick={OpenInfo}>
    <div className='item'>Add Product</div>
  </Link>
  
    <Link to="/main/jurnal"  onClick={OpenInfo}>
      <div className='item'>Sale Jurnale</div>
    </Link>

  <Link to="/">
    <div onClick={()=>{logout(); OpenInfo()}} className='item'> Log Out </div>
  </Link>
  </> 

}

</UserInfo>
}
      <div style={{height: '80px'}}>


      {!usermode &&
        <LoginBtn onClick={loginbtn}>
          <samp>
            <img width={30} src={userIcin} alt="user icon" />
          </samp>
          <Link to="/login"><samp>Login</samp></Link>
          
        </LoginBtn>
      }
        <MeniuBtn onClick={()=>{toggleMenu()}}>
        <img src={meniuicon} alt="" /> 
        </MeniuBtn>

        </div>


        <FindComponent />




        <Meniu {...MeniuProps}  menuVisible={menuVisible} toggleMenu={toggleMenu}  />


        {/* <Meniu /> */}

    </HeaderComponent>
  );
};

export default Header;
