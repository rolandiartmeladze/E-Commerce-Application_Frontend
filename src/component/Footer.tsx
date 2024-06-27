import React from 'react';

import styled from 'styled-components';

const FooterConteiner = styled.footer`
  grid-column: 1;
  background-color: #333;
  color: white;
  text-align: left;
  padding: 2px 0;
  display: flex;
  flex-wrap: wrap;
  a {
    color: white;
    text-decoration: none;
  }
  ul {
    width: 32%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      background: none;
      display: inline-block;
      box-shadow: none;
      margin: 0;
    }
  }
  h4 {
    margin: 0;
    text-align: center;
    color: yellow;
  }
`;

const Admin = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 8px;
  color: cyan;
  font-weight: 700;
`;

const Footer = () => {
  return (
    <FooterConteiner>
      <ul>
        <h4>Admin</h4>
        <li> Roland Artmeladze </li>
        <li>
          {' '}
          <a href="mailto:Rartmeladze@gmail.com">Rartmeladze@gmail.com</a>{' '}
        </li>
        <li>
          {' '}
          <a href="tel:+995595035668">(+995) 595 03-56-68</a>{' '}
        </li>
      </ul>

      <ul>
        <h4>info</h4>
        <li>About Project</li>
        <li>Contacts</li>
        <li>Rante</li>
      </ul>

      <ul>
        <h4>total</h4>
        <li> Products- </li>
        <li> Members- </li>
        <li> Category- 5 </li>
      </ul>

      <Admin>@ Roland Artmeladze 2024</Admin>
    </FooterConteiner>
  );
};

export default Footer;
