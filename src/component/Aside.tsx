import React, { useState, useEffect } from 'react';import logo from './logo.svg';
import '../style/Aside.css';
import  FindIcon from '../icon/find.png';
interface ProducteData {
    setUserData: React.Dispatch<React.SetStateAction<any[]>>
    userData: any[];
  }


  const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com/";



function Aside({ userData, setUserData }:ProducteData) {

    const [findinput, setFindInput] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFindInput(newValue);
    }

    const finderequest = async () => {
        console.log(`finded ${findinput}`);
        try {
            const findeValue = findinput; 
    
            const usersResponse = await fetch(`${serverUrl}/findProduct?findinput=${findeValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!usersResponse.ok) {
                throw new Error('Failed to fetch users data');
            }
    
            const usersData = await usersResponse.json();
            setUserData(usersData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
        useEffect(() => {
            const filteredUserData = userData.filter(user => user.Name.includes(findinput));
            setUserData(filteredUserData);

            finderequest();
    
        }, [findinput]);
    




        return (
<>
<div className='Aside'>
    <h1>User info </h1>
    <div className='Finde'>
        <input id='FindProduct' onChange={handleChange} value={findinput}  type='text' placeholder='ძებნა' /> 
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
</>
        );
}

export default Aside;
