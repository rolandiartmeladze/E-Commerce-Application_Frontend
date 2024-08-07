import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import FindComponent from '../Find/FindComponent';
import Meniu from '../Navigation/Meniu';
import { HeaderComponent, LoginBtn, Logo, userIcin } from './Tools';
import HeaderNavigate from './HeaderNavigate';
import { ButtonComp } from '../Navigation/Meniu';
import UserElement from './HeadeUserElement';

import { isMobile } from './HeadeUserElement';

import logo from '../../img/logo.png';

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
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const loginbtn = () => {
    !login ? setLogIn(true) : setLogIn(false);
  };

  const MeniuProps = { usermode, setProduct, menuVisible, toggleMenu };
  const props = { usermode };

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
    window.location.reload();
  };

  const headerCont = { display: 'flex', justifyContent: 'flex-end',     marginBottom: '15px'};

  
  const mobil = isMobile();

  return (
    <HeaderComponent>
      <Logo onClick={goHome}>
          { mobil ? <img width={50} src={logo} alt='' /> : 'MyShop.App' }
        </Logo>

      <div style={headerCont}>
        <HeaderNavigate {...props} />

        <div className={'userCont'}>

          
          <UserElement {...props} />

          {!usermode && (
            <LoginBtn onClick={loginbtn}>
                           <Link to="/login">
 <samp>
                <img width={40} src={userIcin} alt="user icon" />{' '}
              </samp>
              {/* {!mobil && <samp>Login</samp> } */}
                {/*  */}
              </Link>
            </LoginBtn>
          )}
          <ButtonComp toggleMenu={toggleMenu} />
        </div>
      </div>

      <FindComponent />

      <Meniu {...MeniuProps} />
    </HeaderComponent>
  );
};

export default Header;
