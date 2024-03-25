import React, { useState, useEffect } from 'react';
import '../style/Aside.css';
import  FindIcon from '../icon/find.png';


interface ProducteData {
    setUserData: Function;
    userData: any[];

        loading: boolean;
        setLoading: Function;

            findstatus: boolean;
            setFindStatus:Function;

                notfound:boolean;
                setNotound:Function;

                    findInput:string;
                    setFindInput: Function;
  }


  const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";


function Aside({ 
    findstatus,
    setFindStatus,
    loading, 
    setLoading, 
    userData, 
    setUserData ,
    notfound,
    setNotound,
    findInput,
    setFindInput


}:ProducteData) {


        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setFindInput(newValue);
        };

            // აგზავნის მოთხოვნას მითითებული საძიებო სიტყვის შესაბამისის შედეგის საჩვენებლად
            const findRequest = async () => {

                if(findInput.length >0){

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
                            if(findResult.length === 0){ setNotound(true); setFindStatus(false); }
                            else{setNotound(false);}                  
    
                        } 
                    catch (error) {console.error( error);} 
                    finally { setLoading(false);  if(userData.length > 0){setFindStatus(true)} }
                }
                else{

                    const input: HTMLInputElement | null = document.getElementById("FindProduct") as HTMLInputElement;
                    if(input){
                    input.style.borderColor = "red";
                    input.placeholder = "Enter a search term";
                    setTimeout(() => {
                        input.style.borderColor = "black";
                        input.placeholder = "search term";
    
                    }, 500);
                    }
                    
                }

            };

    return (
            <>

                <div className='Aside'>
                    
                    <h1>User info </h1>

                    <div className='Finde'>
                        <input id='FindProduct' 
                            onChange={handleChange} 
                            value={findInput} 
                            type='text' 
                            placeholder='search term'/> 
                            <samp onClick={findRequest}>
                                <img src={FindIcon} alt='find icon' />
                            </samp>
                    </div>

                        <ul>
                            <li>Name:<samp>{'Name'}</samp> </li>
                            <li>Address:<samp>{'address'}</samp></li>
                            <li>Quantity:<samp>{'Quantity'}</samp></li>
                            <li>Price:<samp>{'Price'}</samp></li>
                            <li>Total:<samp>{'Total'}</samp></li>
                        </ul>

                        <div className='Btn'>
                            <button>sale</button>
                        </div>

                </div>

            </>
            );
}

export default Aside;
