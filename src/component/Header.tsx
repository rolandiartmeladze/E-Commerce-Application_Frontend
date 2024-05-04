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
    <div className="Header">
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
      {(!usermode || !myRoom) && (
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
    )}
    </div>
  );
};

export default Header;
