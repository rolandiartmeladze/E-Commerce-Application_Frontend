// FindContainer.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import FindRequest from '../Find/Find';
import ProductComponent from '../ProductComponent/ProductComponent';
import viewProduct from '../ProductComponent/VievUpdate';
import Loaing from '../Loading';

interface Props {
  setProduct: Function;
}

const FindResultInfo = styled.div`
  padding: 10px 0px;
  background-color: gainsboro;
  width: 100%;
  display: flex;
  h5 {
    margin: 0px;
    margin-left: 9px;
  }
`;
const FindContainer = ({ setProduct }: Props) => {
  const location = useLocation();
  const [respons, setRespons] = useState<any>();
  const [favorits, setFavorits] = useState<any[]>(
    JSON.parse(localStorage.getItem('favorits') ?? '[]')
  );
  const [incart, setInCart] = useState<any[]>(
    JSON.parse(localStorage.getItem('incart') ?? '[]')
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setRespons(await FindRequest(location.search));
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search]);

  const clickF = (productId: string) => {
    setLoading(true);
    viewProduct(productId, setProduct, setLoading, location);
  };

  const findInput = document.getElementById('FindProduct') as HTMLInputElement;

  const ProductProps = {
    clickF,
    incart,
    setInCart,
    favorits,
    setFavorits,
    loading,
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <FindResultInfo>
          <h5>Find result: {respons?.length}</h5>
          <button
            style={{ position: 'absolute', right: '15px', cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
              findInput.value = '';
            }}
          >
            Close
          </button>
        </FindResultInfo>
        {loading && <Loaing />}
        {error && <p>{error}</p>}
        {respons && <ProductComponent products={respons} {...ProductProps} />}
      </div>
    </>
  );
};

export default FindContainer;
