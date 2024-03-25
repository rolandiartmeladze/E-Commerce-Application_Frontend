import React, { useState, useEffect } from 'react';
import '../style/Aside.css';
import  FindIcon from '../icon/find.png';




interface ProducteData {
    setUserData: React.Dispatch<React.SetStateAction<any[]>>
    userData: any[];
    loading: boolean;
    setLoading: Function;
  }


  const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";



function Aside({ loading, setLoading, userData, setUserData }:ProducteData) {



const [findInput, setFindInput] = useState<string>('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFindInput(newValue);
};

// აგზავნის მოთხოვნას მითითებული საძიებო სიტყვის შესაბამისის შედეგის საჩვენებლად
        const findRequest = async () => {
            setLoading(true);
                try {
                        const FindInput = findInput;
                        const findProduct = await fetch(`${serverUrl}/findProduct?FindInput=${FindInput}`, {
                                method: 'GET',
                                headers: {'Content-Type': 'application/json'},
                        });
                        if (!findProduct.ok) {throw new Error('Failed to fetch users data');}
                        const findResult = await findProduct.json();
                        setUserData(findResult);

                    } 
                catch (error) {console.error( error);} 
                finally {setLoading(false);}

        

        };





       



        return (
<>

<div className='Aside'>
    <h1>User info </h1>
    <div className='Finde'>

<input id='FindProduct' onChange={handleChange} value={findInput} type='text' placeholder='ძებნა' /> 
<samp onClick={findRequest}><img src={FindIcon} alt='find icon' /></samp>

    </div>
        <ul>
        <li>
                სახელი:<samp>{'Name'}</samp>
            </li>
            <li>
                მისამართი:<samp>{'address'}</samp>
            </li>
            <li>
                რაოდენობა:<samp>{'Quantity'}</samp>
            </li>
            <li>
                ფასი:<samp>{'Price'}</samp>
            </li>
            <li>
                ღირებულება:<samp>{'Total'}</samp>
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
