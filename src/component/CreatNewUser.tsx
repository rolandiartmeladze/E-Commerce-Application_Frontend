import React, {useEffect, useState } from 'react';
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
const LoadConteiner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5.5px);
  bottom: 0;
  font-size: 200%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
const CreacUserBtn = styled.button`
  padding: 5px;
  background: none;
  backdrop-filter: blur(2.5px);
  border-radius: 8px;
  min-width: 100px;
  position: absolute;
  bottom: 3px;
  right: 10px;
  cursor: pointer;
`;


const CreacUserForm = styled.form`
  width: 70%;
  display: flex;
  align-content: center;
  flex-direction: column;
  margin-left: 15px;
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

  useEffect(() => {
    if (!loading) {

      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <h1 style={{width: '100%', maxHeight:'15%', backgroundColor:'gray'}}>Add New User</h1>

<div style={{width: "100%", minHeight: '65px', display: 'flex',  flexDirection: 'column',
    justifyContent: 'space-around'}}>

            {loading ? (
                  <LoadConteiner>
                    {"Loaging..."}
                  </LoadConteiner>
            ) : (
                <div style={{ display: 'none' }}></div> 
            )}


      {/* <div>{response.message}</div>
      <div>სახელი: {response.name}</div>
      <div>მისამართი: {response.address}</div> */}
      
<CreacUserForm>

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
              <CreacUserBtn
                  type='button'
                  onClick={createdUser}
                  disabled={loading}
                  >
                  {loading ? 'Creating User...' : 'Create New User'}
                </CreacUserBtn>

      </CreacUserForm>
      </div>

    </>
  );
}

export default CreatNewUser;
