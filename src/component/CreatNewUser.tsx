import React, { useState } from 'react';
import styled from 'styled-components';

// Define the styled input component

const InputItem = styled.input`
  margin-bottom: 4px;
  padding: 6px;
  padding-left: 10px;
  background: none;
  backdrop-filter: blur(0.8px);
  box-shadow: -0.3px -0.6px 3px 0.3px red inset;
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 700;
`;

function CreatNewUser() {
  const [response, setResponse] = useState({ message: '', name: '', address: '' });
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);


  const createdUser = async () => {
    setLoading(true);
    const newUser = { name: userName, address: userAddress, fasi: 0, raodenoda: 0 };
    try {
      const response = await fetch('http://localhost:80/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      const data = await response.json();
      setResponse({ message: data.message, name: data.user.name, address: data.user.address });
      setUserName('');
      setUserAddress('');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{width: '100%', maxHeight:'15%', backgroundColor:'gray'}}>Add New User</h1>

<div style={{width: "100%", minHeight: '65px', display: 'flex',  flexDirection: 'column',
    justifyContent: 'space-around'}}>

      {/* <div>{response.message}</div>
      <div>სახელი: {response.name}</div>
      <div>მისამართი: {response.address}</div> */}
<form style={{ width: '70%', display: 'flex', alignContent: 'center', flexDirection: 'column', marginLeft: '15px' }}>

<InputItem
        style={{  }}
        name='userName'
        type='text'
        placeholder='Username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <InputItem
        name='userAddress'
        type='text'
        placeholder='Address'
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
              <button
  type='button'
  onClick={createdUser}
  disabled={loading}
  style={{
    padding: '5px', 
    background: 'none', 
    backdropFilter: 'blur(2.5px)', 
    borderRadius: '8px', 
    minWidth: '100px', 
    position: 'absolute',
    bottom: '3px', 
    right: '25px',
    cursor: 'pointer'
  }}
>
  {loading ? 'Creating User...' : 'Create New User'}
</button>

      </form>
      </div>

    </>
  );
}

export default CreatNewUser;
