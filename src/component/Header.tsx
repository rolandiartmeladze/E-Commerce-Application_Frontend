
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


  `;

  const UserInfo = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 8px;
  transition: 0.4s ease-in-out;
  border-radius: 6px;
  // min-width: 100px;
  // width: auto;
  cursor: pointer;
  font-weight: 800;
  flex-direction: column;
  z-index: 5;
  div{
    padding: 5px 0px;
    height: auto;
    display: flex;
    align-items: flex-end;
    samp{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
        }
    img{
      margin: 0;
      max-width: 40px;
    }
  }
  .item{
    width: 85%;
    margin-left: 8%;

    samp{
      color: white;
      text-decoration: underline;

      &:hover{
        color: yellow;

      }
  }
    }
  

  @media only screen and (max-width: 750px) {

    right: 60px;

  
  }
  
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


  return (
    <HeaderComponent>
         <Link to={'/'}> <Logo>MyShop.App</Logo> </Link>

{usermode && 
<UserInfo style={{
    backgroundColor: active? 'rgb(66, 44, 55)': 'rgb(66, 44, 55, 0.0)',
  }} >
  <div onClick={()=>{
  OpenInfo();
}}  style={{
  boxShadow: !active? '0px 2px 2px -1px rgb(1,1,1)': undefined,
  borderRadius: !active? '8px' : undefined,
  
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
  <div className='item'>
  <Link to="/main/products">
  <samp>My Products</samp>
  </Link>
  </div>

  <div className='item'>
  <Link to="/main/add">

  <samp>Add Product</samp>
  </Link>
  </div>
  <div className='item'>
  <Link to="/main/jurnal">

  <samp>Sale Jurnale</samp>
  </Link>
  </div>


  <div className='item'>
  <Link to="/">
          <samp onClick={logout}>Log Out</samp></Link>
        
  </div>
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
