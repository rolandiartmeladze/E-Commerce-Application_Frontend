
import React, {useState} from 'react';


import { Link, useNavigate } from 'react-router-dom';



import FindComponent from '../Find/FindComponent';
import Meniu from '../Navigation/Meniu';
import {
    HeaderComponent, LoginBtn, Logo,
    userIcin
    } from './Tools';
import HeaderNavigate from './HeaderNavigate';
import { ButtonComp } from '../Navigation/Meniu';
import UserElement from './HeadeUserElement';


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
    const toggleMenu = () => { setMenuVisible(!menuVisible) };
      const loginbtn = () => { !login ? setLogIn(true) : setLogIn(false) };

        const MeniuProps ={ usermode, setProduct, menuVisible, toggleMenu};
        const props = {usermode};



  const navigate = useNavigate();

  const goHome =()=>{
    navigate('/');
    window.location.reload();
  };

  const headerCont = { display: 'flex' , justifyContent: 'flex-end'};

  const userCont = {height: '80px', display: 'inline-block'};
  

  return (
    <HeaderComponent>
          <Logo onClick={goHome}>MyShop.App</Logo> 

<div style={headerCont}>
  
  <HeaderNavigate  {... props} />

<div  style={userCont}>

  <UserElement {... props} />

      {!usermode &&
        <LoginBtn onClick={loginbtn}>
          <samp> <img width={30} src={userIcin} alt="user icon" /> </samp>
          <Link to="/login"><samp>Login</samp></Link> 
        </LoginBtn>
      }
    <ButtonComp  toggleMenu={toggleMenu}  />
        </div> 
        </div>

      <FindComponent />

        <Meniu {...MeniuProps} />

    </HeaderComponent>
  );
};

export default Header;
