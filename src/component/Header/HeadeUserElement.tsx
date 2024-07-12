import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './user-style.css';
import { Member } from '../../Tools';
import {
  userIcin,
  arrow,
  jurnal,
  add,
  productIcon,
  logoutIcon,
  smsBlack,
} from './Tools';

import Male2 from '../../img/Avarats/Male2.png';
import loadIcon from '../../icon/loading.gif';

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
  transition:
    0.3s ease-in-out,
    width 0.5s ease-in-out;

  min-width: ${(props) => (props.active ? '200px' : '150px')};

  &:before {
    position: absolute;
    content: '';
    display: block;
    width: 0%;
    height: 42px;
    background: none;
    z-index: -1;
    padding-bottom: 10px;
    padding: 5px 0px;
  }

  &:hover {
    &:before {
      transition:
        width 0.5s ease-in-out,
        height 1.1s ease-in-out;
      border-radius: 6px;
      width: 100%;
      padding: 7px 0px !important;

      background-color: ${(props) =>
        !props.active ? 'rgb(1, 51, 1, 0.9)' : 'none'};
      border-radius: ${(props) => (!props.active ? '6px' : '10px')};
    }
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

    .user-icon {
      margin: 3px;
      border-radius: 10px;
      min-height: 40px;
      min-width: 40px;
      max-width: 40px;
    }
  }

  .item {
    width: 85%;
    margin: auto;
    padding: 3px 0;
    color: white;
    box-shadow: 0px 1px 0.2px -0.5px white;
    margin-top: 7px;
    align-items: center;
    justify-content: center;
    border-radius: 0px;
    transform: scale(0);
    transition: 0.3s ease-in-out;
    justify-content: flex-start;
    position: relative;
    img {
      margin: 0px 5px;
      width: 25px;
    }

    &:before {
      position: absolute;
      content: '';
      display: block;
      width: 6px;
      height: 100%;
      left: -2px;
      bottom: -1px;
      z-index: -1;
      background-color: red;
      transition: 0.4s ease-in-out;
      border-radius: 4px 0px 0px 4px;
    }

    &:hover {
      color: yellow;
      // box-shadow: 0px 2px 2px 0.5px yellow;
      transform: scale(1.05) !important;

      &:before {
        width: 100%;
        left: 0px;
        background-color: rgb(255, 0, 0, 0.4);
      }
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
  width: 100%;
height: 100%; 
background-color: rgb(51, 51, 51); 
transition: width 0.3s ease-in-out, height 1.1s ease-in-out; 
border-radius: 10px;
}
`}
`;

interface Props {
  usermode: boolean;
}

interface OpenProps {
  link: string;
}

interface InfoItem {
  title: string;
  link: string;
  img: string;
}


const isMobile = () => window.innerWidth <= 750;
export {isMobile};
const UserElement = ({ usermode }: Props) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [interval, setInterval] = useState(0);

  const anime = () => {
    const items = Array.from(
      document.getElementsByClassName('item')
    ) as HTMLDivElement[];
    items.forEach((element, index) => {
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, index * 200);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('address');
    localStorage.removeItem('favorits');
    window.location.reload();
  };


  const OpenInfo = ({ link }: OpenProps) => {
    setActive(!active);
    const interval = active ? 0 : 500;
    
    setTimeout(() => {
      anime();
    }, 200);
    if (link !== 'null') {
      navigate(link);
    }
    if (link === '/') {
      logout();
    }

    const element = document.getElementById('infoCont');
    if (element) {
        if (active) {
            element.style.display = 'none';
            element.style.transform = 'translateX(500px)';
        }
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.display = 'flex';
        }, interval);
    }
};

  const imgstyle = {
    width: '20px',
    margin: '0 6px',
    transform: active ? 'rotate(90deg)' : 'rotate(0)',
  };

  const info: InfoItem[] = [
    { title: 'Profil', link: '/main/profil', img: userIcin },
    { title: 'Message', link: '/main/message', img: smsBlack },
    { title: 'My Products', link: '/main/products', img: productIcon },
    { title: 'Add Product', link: '/main/add', img: add },
    { title: 'Sale Jurnale', link: '/main/jurnal', img: jurnal },
    { title: 'Log Out', link: '/', img: logoutIcon },
  ];

  const [AvatarName, setAvatarName] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await Member();
      if (members) {
        setAvatarName(members.avatar);
      } else {
        setAvatarName(Male2);
      }
    };

    fetchMembers();
  }, []);

  const avatar = `https://embarrassing-unifor.000webhostapp.com/Media/Avatars/${AvatarName}.png`;


  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  


  return (
    <>
      {usermode && (
        <div id='infoCont' className={active && mobile ? 'user-element active' : 'user-element' }>

          <div
          // className='user-icon-cont'
          className={'user-icon-cont'}
          style={{width: (active || !mobile) ?  'auto' : '40px'}}
            onClick={() => {
              OpenInfo({ link: 'null' });
            }}
            
          >
            <img
              className="user-icon"
              src={AvatarName ? avatar : loadIcon}
              alt="User Icon"
            />

            {(!mobile ||  active) &&
<>
            <samp>
              <span>{localStorage.getItem('user')}</span>
              <span> {localStorage.getItem('address')?.substring(0, 15)} </span>
            </samp>

            <img style={imgstyle} src={arrow} alt="" /> 
       </>
                }

          </div>

          {active && (
            <>
              {info.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    OpenInfo({ link: item.link });
                  }}
                  className="item"
                >
                  <img src={item.img} alt="" /> {item.title}
                </div>
              ))}{' '}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserElement;
