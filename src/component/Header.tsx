import React from "react";
import "../style/Header.css";
import styled from "styled-components";

import { Link } from 'react-router-dom';


import userIcin from "../icon/user.png";
import FindeComponent from "./FindeComponent";

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

  const HeaderComponent = styled.div`
    /* background:inherit; */
    padding: 10px;

    margin: 0;
    height: 20%;
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

interface HeaderProps {
  singup: any;
  setSingUp: any;
  login: any;
  setLogIn: any;
  usermode: boolean;
  chekfavorits: any;
  findstatus: boolean;
  setFindStatus: any;
  loading: boolean;
  setLoading: any;
  userData: any;
  setUserData: any;
  notfound: boolean;
  setNotound: any;
  findInput: string;
  setFindInput: any;
  myRoom:boolean;
  setMyRoom:Function;

}

const Header: React.FC<HeaderProps> = ({
  singup,
  setSingUp,
  login,
  setLogIn,
  usermode,
  chekfavorits,
  findstatus,
  setFindStatus,
  loading,
  setLoading,
  userData,
  setUserData,
  notfound,
  setNotound,
  findInput,
  setFindInput,
  myRoom,
  setMyRoom

}) => {
  const loginbtn = () => {
    !login ? setLogIn(true) : setLogIn(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("address");
    chekfavorits();
    localStorage.removeItem("favorits");
    window.location.reload();
  };

  const home = () => {
    window.location.reload();
  };

  return (
    <HeaderComponent>
      {/* ავტორიზებული მომხმარებლის მონაცემები ან ლოგო */}
      <>
        {usermode ? (
          <div className="userinhear">
            <img className="user-icon" src={userIcin} alt="User Icon" />
            <Userinfo>
              <h2>{localStorage.getItem("user")}</h2>
              <h4>{localStorage.getItem("address")}</h4>
            </Userinfo>
          </div>
        ) : (
          <Logo onClick={home}>MyShop.App</Logo>
        )}
      </>

      {/* სისტემაში შესვლა */}
      {!usermode &&
        <div onClick={loginbtn} className="userBtn">
          <samp>
            <img width={30} src={userIcin} alt="user icon" />
          </samp>
          <Link to="/login"><samp>Login</samp></Link>
          
        </div>
      }

      {/* სისტემიდან გამოსვლა */}
      {usermode && (
        <>
        <div
          style={{ padding: "3px 8px ", right: "12px" }}
          onClick={logout}
          className="userBtn"
        >
                
                <Link to="/">
          <samp>Log Out</samp></Link>
        </div>
        </>

      )}

      {/* ძებნის ფუნქცია არაავტორიზებული მომხმარებლისთვი */}
      <FindeComponent 
        userData={userData}
        setUserData={setUserData}
        loading={loading}
        setLoading={setLoading}
        findstatus={findstatus}
        setFindStatus={setFindStatus}
        notfound={notfound}
        setNotound={setNotound} 
        findInput={findInput}
        setFindInput={setFindInput}
        usermode={usermode}
        myRoom={myRoom} 
      />
    </HeaderComponent>
  );
};

export default Header;
