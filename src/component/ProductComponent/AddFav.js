import React, { useState } from 'react';
import styled from 'styled-components';

import favicon0 from '../../icon/fav.png';
import favicon1 from '../../icon/favcheck.png';
import loadicon from '../../icon/loading.gif';

const AddfavIcon = styled.samp`
  position: absolute;
  right: ${(props) => (props.product !== null ? '15px' : '-12px')};
  bottom: ${(props) => (props.product !== null ? '8px' : '50px')};
  box-shadow: 1px 1px 0px 0px black;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  padding: 4px;
  z-index: 6;
  transition: 0.4s ease-in-out;

  &&:hover {
    box-shadow: 1px 1px 0px 0px red;
  }
  img {
    width: 30px !important;
  }
`;

const Fav = ({ itemId, favorits, setFavorits, product }) => {
  const [load, setLoad] = useState(false);

  return (
    <AddfavIcon
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        AddFav(itemId, setFavorits, setLoad);
      }}
      product={product}
    >
      <img
        src={load ? loadicon : favorits.includes(itemId) ? favicon1 : favicon0}
        alt="fav icon"
      />
    </AddfavIcon>
  );
};
export { Fav };

const AddFav = async (itemId, setFavorits, setLoad) => {
  setLoad(true);
  const token = localStorage.getItem('token');

  const newItem = itemId;
  if (token) {
    try {
      const addFavorites = await fetch(
        `http://localhost:3001/favoriteItem/${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId }),
        }
      );

      if (!addFavorites.ok) {
        throw new Error('Request failed');
      }

      const result = await addFavorites.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('No token found');
  }

  let storedFavorites = localStorage.getItem('favorits');
  let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  let updatedFavorites = [...favorites];

  const index = updatedFavorites.indexOf(newItem);
  if (index === -1) {
    updatedFavorites.push(newItem);
  } else {
    updatedFavorites.splice(index, 1);
  }
  localStorage.setItem('favorits', JSON.stringify(updatedFavorites));
  setFavorits(updatedFavorites);
  setLoad(false);
};
export { AddFav };
