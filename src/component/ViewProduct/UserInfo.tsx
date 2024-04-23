import React, { useState } from "react";
import styled from "styled-components";

import usericon from '../../icon/user.png';
import emailicon from '../../icon/mail.png';
import phoneicon from '../../icon/phone.png';
import locicon from '../../icon/loc1.png';

interface Props{
          members:any[];
          usermode:boolean;
          }

 const ConteinerItem = styled.div`
        width: 96%;
        margin: auto;
        margin-top: 4px;
        padding: 2px 0px;
        box-shadow: 0px 0px 1px 0.3px black inset;
        position: relative;
        display: flex;
        align-items: center;
          & span {
              position: absolute;
              top: -3px;
              color: red;
              right: 5px;
            }
              & h5{ margin: 0 4px; }
                & img {
                  width: 25px;
                  margin: 0px 4px;
                }
        `;

 const ItemInput = styled.input`
        width: 85%;
        height: 100%;
        margin: auto;
        padding: 4px;
        background: none;
        border: none;
        outline: none;

          &::placeholder {
            color: red;
          }
      `;


 const UserInfo = ({members, usermode}:Props) => {

    const token = localStorage.getItem('token');

      const [username, setUserName] = useState<string>('');
      const [useremail, setUserEmail] = useState<string>('');
      const [userphone, setUserPhone] = useState<string>('');
      const [useraddress, setUserAddress] = useState<string>('');

        const isMember = members.find(user => user._id === token);

    return(
            <>
            <h4 style={{margin:'0', marginLeft: '5px'}}>Main Info</h4>

                <ConteinerItem>
                    <samp> <img src={usericon} alt="user icon" /> </samp>
                        {!usermode && <span>*</span>}
                        <ItemInput onChange={(e) => {
                                    setUserName(e.target.value);}}
                                    type="text" 
                                    disabled={usermode} 
                                    value={usermode ? `${isMember?.name} ${isMember?.lastname}`  : username} 
                                    placeholder="Full Name" />
                </ConteinerItem>

                    <ConteinerItem>
                        <samp> <img src={emailicon} alt="user icon" /> </samp>
                            {!usermode && <span>*</span>}
                            <ItemInput onChange={(e) => {
                                        setUserEmail(e.target.value);}}
                                        type="emile" 
                                        disabled={usermode} 
                                        value={usermode ? (isMember.email) : useremail} 
                                        placeholder="Email" />
                    </ConteinerItem>

                        <ConteinerItem>
                            <samp> <img src={phoneicon} alt="user icon" /> </samp>
                                {!usermode && <span>*</span>}
                                <ItemInput onChange={(e) => {
                                            setUserPhone(e.target.value);}}
                                            type="tel" 
                                            disabled={usermode} 
                                            value={usermode ? (isMember?.phone) : userphone} 
                                            placeholder="Phone" />
                        </ConteinerItem>

                            <ConteinerItem>
                                <samp> <img src={locicon} alt="loc icon" /> </samp>
                                    {!usermode && <span>*</span>}
                                    <ItemInput onChange={(e) => {
                                                setUserAddress(e.target.value);}}
                                                type="text" 
                                                disabled={usermode} 
                                                value={usermode ? (isMember?.address) : useraddress} 
                                                placeholder="Address" />
                            </ConteinerItem>
            </>
          );
 };

 export default UserInfo;