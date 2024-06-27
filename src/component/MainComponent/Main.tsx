import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Container from './ProductsConteiner/Conteiner';
import Aside from './Aside/Aside';
import FetchData from './mainRequest';
import Loading from '../Loading';

const Box = styled.div`
  grid-row: 2;
  grid-column: 1;
  display: grid;
  grid-template-columns: 75% 25%;
  position: relative;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

interface Product {
  _id: string;
  name: string;
  address: string;
  quantityUnit: string;
  quantity: number;
  price: number;
  currency: string;
  owner: string;
  userID: string;
  image: any[];
  view: number;
  sale: number;
  share: number;
}

function Main() {
  const [myProducts, setMyProducts] = useState<Product[] | null>(null);
  const [selected, setSelected] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    FetchData(setMyProducts);
  }, []);
  // useEffect(()=>{ FetchData(setMyProducts); },[myProducts])

  return (
    <Box>
      {(!myProducts || loading) && <Loading />}
      {myProducts && (
        <Container products={myProducts} setSelected={setSelected} />
      )}
      {myProducts && (
        <Aside
          product={selected}
          setLoading={setLoading}
          setProduct={setSelected}
          setMyProducts={setMyProducts}
        />
      )}
    </Box>
  );
}

export default Main;
