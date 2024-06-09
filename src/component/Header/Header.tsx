
import React, {useState} from 'react';

import styled from "styled-components";

import { Link, useNavigate } from 'react-router-dom';


import userIcin from "../../icon/user.png";
import arrow from '../../icon/arrow.png';

import FindComponent from '../Find/FindComponent';
import Meniu from '../Navigation/Meniu';
import {
    HeaderComponent, LoginBtn, Logo
    } from './Tools';
import HeaderNavigate from './HeaderNavigate';

import { ButtonComp } from '../Navigation/Meniu';

  const UserInfo = styled.div<{ active: boolean }>`
        display: flex;
        // position: absolute;
        position: relative;
        margin-top: 5px;
        margin-right: 28px;
        transition: 0.4s ease-in-out;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 800;
        flex-direction: column;
        z-index: 5;
        transition: 0.3s eae-in-out;


  &:hover {
    background-color: ${props => !props.active ? 'rgb(1, 1, 1, 0.1)' : 'none'};
  }

  &:before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 40px; 
    background: none;
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
      transform: scale(0);
      transition: 0.3s ease-in-out;
  

    &:hover {
      color: yellow;
      box-shadow: 0px 2px 2px 0.5px yellow;
      transform: scale(1.05) !important;
    }
  }

  @media only screen and (max-width: 750px) {
    right: 60px;
    margin-right: 0px;

  }

  ${({ active }) =>
    active &&
    `
    &:before {
      height: 100%; 
      background-color: rgb(51, 51, 51); 
      transition: width 0.3s ease-in-out, height 1.1s ease-in-out; 
      border-radius: 10px;
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
    setTimeout(() => {
          anime();
    }, 200);
  }


const anime = () => {
  const items = Array.from(document.getElementsByClassName('item')) as HTMLDivElement[];

  items.forEach((element, index) => {
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, index * 200);
  });
};

 const styleInfoCont = {
  boxShadow: !active? '0px 2px 2px -1px rgb(1,1,1)': '0px 2px 2px -1px rgb(255,255,255)',
  borderRadius: !active? '8px' : undefined,
  color: active? 'yellow' : 'black',
  transition: '0.5s ease-in-out',
  
  
}
  const navigate = useNavigate();

  const goHome =()=>{
    navigate('/');
    window.location.reload();
  };

  
  return (
    <HeaderComponent>
          <Logo onClick={goHome}>MyShop.App</Logo> 

<div style={{ display: 'flex' , justifyContent: 'flex-end'}}>


<HeaderNavigate  usermode={usermode}/>



<div  style={{height: '80px', display: 'inline-block'}}>

{usermode && 
  <UserInfo active={active}>
  <div onClick={OpenInfo}  style={styleInfoCont} >
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


      {!usermode &&
        <LoginBtn onClick={loginbtn}>
          <samp>
            <img width={30} src={userIcin} alt="user icon" />
          </samp>
          <Link to="/login"><samp>Login</samp></Link>
          
        </LoginBtn>
      }
<ButtonComp  toggleMenu={toggleMenu}  />
        </div> 


        </div>

        <FindComponent />

        <Meniu {...MeniuProps}  menuVisible={menuVisible} toggleMenu={toggleMenu}  />

    </HeaderComponent>
  );
};

export default Header;
