import React, { useState, useEffect } from 'react';
import '../style/Aside.css';
import  FindIcon from '../icon/find.png';
import debounce from 'lodash.debounce'; 
import styled from 'styled-components';


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



interface ProducteData {
    setUserData: React.Dispatch<React.SetStateAction<any[]>>
    userData: any[];
  }


  const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";



function Aside({ userData, setUserData }:ProducteData) {



const [findInput, setFindInput] = useState<string>('');
const [loading, setLoading] = useState<boolean>(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFindInput(newValue);

            if(!loading){
                findRequest();
            }

};

const findRequest = async () => {

    try {
        setLoading(true); 

        const usersResponse = await fetch(`${serverUrl}/findProduct?findinput=${findInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!usersResponse.ok) {
            throw new Error('Failed to fetch users data');
        }

        const responseData = await usersResponse.json();
        setUserData(responseData);
    } catch (error) {
        console.error('Error fetching user data:', error);
    } finally {
        setLoading(false); // Set loading state to false when the request is complete
    }
};





        return (
<>

<div className='Aside'>
    <h1>User info </h1>
    <div className='Finde'>
        <input id='FindProduct' onChange={handleChange} value={findInput}  type='text' placeholder='ძებნა' /> 
        <samp><img src={FindIcon} alt='finde icon' /></samp>
    </div>
        <ul>
        <li>
                სახელი:<samp>___________</samp>
            </li>
            <li>
                მისამართი:<samp>_________</samp>
            </li>
            <li>
                რაოდენობა:<samp>_______</samp>
            </li>
            <li>
                ფასი:<samp>_________</samp>
            </li>
            <li>
                ღირებულება:<samp>____</samp>
            </li>
        </ul>

        <div className='Btn'>
            <button >ყიდვა</button>
        </div>



</div>

{loading ? 
                <LoadConteiner> {"Loaging..."} </LoadConteiner>:null
}
</>
        );
}

export default Aside;
