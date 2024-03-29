import React, { useState, useEffect } from 'react';
import '../style/Aside.css';
import FindeComponent from './FindeComponent';
import { patch } from 'semver';
// import  FindIcon from '../icon/find.png';


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

                    isselected:boolean; 
                    setIsSelected:Function;

                    setSelectedUser:Function;
                    selectedUser:any;
                    
                        soldAmount:number;
                        setSoldAmount:Function;

            
            
  }




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
    setFindInput,
    isselected, 
    setIsSelected,
    setSelectedUser,
    selectedUser,
    soldAmount,
    setSoldAmount



}:ProducteData) {




    const Amount = (event: React.ChangeEvent<HTMLInputElement>) => {


        const value = parseInt(event.target.value, 10);
            const QuantityInput = document.getElementById('QuantityInput') as HTMLInputElement;

        if (value > 0) {
            if (value >= selectedUser.Quantity) { 
                QuantityInput.value = selectedUser.Quantity;
                QuantityInput.style.color = 'red';
                setSoldAmount(selectedUser.Quantity);
            } 
                else {setSoldAmount(value);}    
            }
        else{QuantityInput.value = ''; setSoldAmount(0);}
    };

      const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";


    // const SalePoduct = async ()  => {


    // }


    const sale = async () => {
        if (soldAmount > 0) {
            const productId = selectedUser._id;
            const quantity = selectedUser.Quantity;
            const newQuantity = quantity - soldAmount;

    
            try {
                const response = await fetch(`http://localhost/SaleProduct/${productId}?newQuantity=${newQuantity}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }

            console.log(productId)

        }
    };
    

    return (
            <>

                <div className='Aside'>
                    
                    <h1>User info </h1>



<FindeComponent userData={userData} 
    setUserData={setUserData} 
    loading={loading}
    setLoading={setLoading}
    findstatus={findstatus}
    setFindStatus={setFindStatus}
    notfound={notfound}
    setNotound={setNotound}
    findInput={findInput}
    setFindInput={setFindInput} />

                        <ul>
                            <li>Name:<samp>{selectedUser?.Name}</samp> </li>
                            <li>Address:<samp>{selectedUser?.Address}</samp></li>
                            <li className='QuantityLi'>Quantity:<> <samp> {selectedUser?.Quantity} </samp></><samp style={{ width:'100%',marginLeft: '0px'}}>
                                <input  
                                id="QuantityInput" 
                                className='QuantityInput' 
                                disabled={!isselected} 
                                placeholder='0' 
                                type='number' 
                                onChange={Amount} 
                                />
                                </samp></li>
                            <li>Price:<samp>{selectedUser?.Price} {selectedUser?.Currency}</samp></li>
                            <li>Total:<samp>{selectedUser?.Price * soldAmount} {selectedUser?.Currency}</samp></li>
                        </ul>

                        <div className='Btn'>
                            <button onClick={sale}>sale</button>
                        </div>

                </div>

            </>
            );
}

export default Aside;
