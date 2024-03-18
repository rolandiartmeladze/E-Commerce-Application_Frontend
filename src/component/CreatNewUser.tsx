import React, {useEffect, useState } from 'react';
import styled from 'styled-components';

// Define the styled input component
interface UserContainerProps {
  dataResponse: any[]; 
  setDataResponse: React.Dispatch<React.SetStateAction<any[]>>

}


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
  position: relative;
  cursor: pointer;
    max-width: 100px;
    margin-bottom: 3px;
    margin-right: 12px;
    transition: 0.3 ease-in-out;

    &:hover {
      color: red;
      font-weight: 700;
      border: solid 2px red;
    }
    `;

const CreacUserForm = styled.form`
  width: 70%;
  display: flex;
  align-content: center;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 10px;
`; 

const CreacUserHead = styled.h1`
      width:100%; 
      max-height:15%; 
      background-color: gray;
`;

const CreacUserConteiner = styled.div`
      width: 100%;
      min-height: 65px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
`;

function CreatNewUser({ dataResponse, setDataResponse}: UserContainerProps) {



  const [response, setResponse] = useState({ message: '', name: '', address: '' });
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);

      // მომხმარებლის შექმნის შემდეგ 
      // აგზავნის მოთხოვნას GET მონაცემთა ბაზაში
      // განახლიბული მონაცემების ასახვისთვის
      // ___001
      
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:80/checkUsers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const data = await response.json();
          setDataResponse(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      

      // ფუნქცია აგზავნის მოთხოვნას POST მონაცემთა ბაზაში 
      // ახალი მომხმარებლის დასამატებლად
      // form ელემენტიდან მიღებული მონაცემების მიხედვით

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
          console.log(dataResponse);


            // __001
          fetchData();
        }
      };



    // დაყოვნება სანამ მოთხოვნა დააბრუნებს შედეგს 
    // ახალი მომხმარებლის შექმნის შესახებ
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
      <CreacUserHead>Add New User</CreacUserHead>

          <CreacUserConteiner>
                  {/*  POST მოთხოვნისგან პასუხის მომლოდინე */}
                      {loading ? 
                            (<LoadConteiner> {"Loaging..."} </LoadConteiner> ) 
                            : 
                            ( <div style={{ display: 'none' }}></div>)
                      }

                            {/* ახალი მომხმარებლის მონაცემები */}
                                <CreacUserForm>

                                    <InputItem name='userName'
                                              type='text'
                                              placeholder='Full Name'
                                              value={userName}
                                              onChange={(e) => setUserName(e.target.value)} />

                                          <InputItem name='userAddress'
                                                    type='text'
                                                    placeholder='Address'
                                                    value={userAddress}
                                                    onChange={(e) => setUserAddress(e.target.value)} />


                                </CreacUserForm>

<div style={{width: '100%', display:'flex', justifyContent: 'flex-end'}}>

                                <CreacUserBtn type='button'
                                                      onClick={createdUser}
                                                      disabled={loading}>
                                                      {loading ? 'Creating User...' : 'Create New User'}
                                                        </CreacUserBtn>
</div>



          </CreacUserConteiner>

    </>
  );
}

export default CreatNewUser;
