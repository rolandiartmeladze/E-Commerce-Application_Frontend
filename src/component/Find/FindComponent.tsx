import React, { useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  bottom: 5px;
  display: flex;
  width: 98%;
  justify-content: center;
  margin: auto;
  margin-bottom: 8px;
  @media screen and (max-width: 550px) {
    width: 92%;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  text-align: center;
  width: 80%;
  border: 1px solid #daac;
  border-radius: 5px;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.3);
  outline: none;
  transition: 0.4s ease-in-out;
  &::placeholder {
    font-weight: 800;
  }
  &:focus {
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const StyledButton = styled.button`
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  padding: 2px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const FindComponent = () => {
  const navigate = useNavigate();
  const [findInput, setFindInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFindInput(newValue);
  };
  const Find = () => {
    findInput.length > 0 && navigate(`/FindResult?Find=${findInput}`);
  };
  return (
    <SearchContainer>
      <StyledInput
        id="FindProduct"
        onChange={handleChange}
        type="text"
        placeholder="Find Product"
      />
      <StyledButton onClick={Find}>{'Find'}</StyledButton>
    </SearchContainer>
  );
};

export default FindComponent;
