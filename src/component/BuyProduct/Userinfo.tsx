import React from 'react';

import styled from 'styled-components';

import phoneicon from '../../icon/phone.png';
import usericon from '../../icon/user.png';
import emileicon from '../../icon/mail.png';
import addressicon from '../../icon/loc1.png';

const UserInfiCnteiner = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;

  li {
    width: 47%;
    padding: 2px;

    & span {
      position: absolute;
      top: -3px;
      color: red;
      right: 5px;
    }

    input {
      width: 100%;
      padding: 6px;
      background: none;
      border: none;
      outline: none;
      flex-grow: 1;

      &::placeholder {
        color: red;
      }
    }
    img {
      width: 30px;
    }
  }
`;

interface Props {
  usermode: boolean;
  members: any[];
}

const UserInfo = ({ usermode, members }: Props) => {
  const token = localStorage.getItem('token');

  const isMember = members.find((user) => user._id === token);

  return (
    <UserInfiCnteiner>
      <li>
        {!usermode && <span>*</span>}
        <img src={usericon} alt="user icon" />
        <input
          type="text"
          disabled={usermode}
          value={usermode ? `${isMember?.name} ${isMember?.lastname}` : ''}
          placeholder="Full Name"
          id="UserName"
        />
      </li>
      <li>
        {!usermode && <span>*</span>}
        <img src={emileicon} alt="emile icon" />
        <input
          type="email"
          disabled={usermode}
          value={usermode ? `${isMember?.email}` : ''}
          placeholder="Emile"
          id="UserEmail"
        />
      </li>
      <li>
        {!usermode && <span>*</span>}
        <img src={phoneicon} alt="phone icon" />
        <input
          type="tel"
          disabled={usermode}
          value={usermode ? `${isMember?.phone}` : ''}
          placeholder="Phone"
          id="UserPhone"
        />
      </li>
      <li>
        {!usermode && <span>*</span>}
        <img src={addressicon} alt="address icon" />
        <input
          type="text"
          disabled={usermode}
          value={usermode ? `${isMember?.address}` : ''}
          placeholder="Address"
          id="UserAddress"
        />
      </li>
    </UserInfiCnteiner>
  );
};

export default UserInfo;
