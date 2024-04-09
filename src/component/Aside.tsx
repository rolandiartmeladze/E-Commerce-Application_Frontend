import React, { useState, useEffect } from 'react';
import '../style/Aside.css';
import FindeComponent from './FindeComponent';
import { patch } from 'semver';
// import  FindIcon from '../icon/find.png';
import serverUri from '../component/serverUrl';


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

                        activeuser:object;
                        setActiveUser:Function;

                        members:any;

            
            
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
    setSoldAmount,

    activeuser,
    setActiveUser,
    members



}:ProducteData) {



    const Amount = (event: React.ChangeEvent<HTMLInputElement>) => {


        const value = parseInt(event.target.value, 10);
            const QuantityInput = document.getElementById('QuantityInput') as HTMLInputElement;

        if (value > 0) {
            if (value >= selectedUser.quantity) { 
                QuantityInput.value = selectedUser.quantity;
                QuantityInput.style.color = 'red';
                setSoldAmount(selectedUser.quantity);
            } 
                else {setSoldAmount(value);
                    QuantityInput.style.color = 'black';

                }    
            }
        else{QuantityInput.value = ''; setSoldAmount(0);}
    };






    const sale = () => {
        const productId = selectedUser._id;
        const quantity = selectedUser.Quantity;
        const newQuantity = quantity - soldAmount;
    
        // saleproduct(productId, newQuantity);

    }
            //     const productId = selectedUser._id;
            // const quantity = selectedUser.Quantity;
            // const newQuantity = quantity - soldAmount;

                //     async function saleproduct(productId:string, newQuantity:number) {
                //         try{

                        
                //         const url =  `http://localhost:80/SaleProduct/${productId}?newQuantity=${newQuantity}`;
                    
                    
                //         const options = {
                //             method: 'PUT',
                //             headers: {'Content-Type': 'application/json'}
                //         }

                //         const response  = await fetch(url, options);
                //         if(response.ok){
                //             const data = await response.json();
                //             // console.log('uprated:', data);
                //         } else{ 
                //             const errorMessage = await response.text();
                //             console.error('ont working' , errorMessage);
                //         }


                //     } catch (error){
                //         console.error('not working', error);
                //     }
                // }
    

                // console.log(activeuser)
    


    return (
            <>

                <div className='Aside'>
                    
                    <h1>Product info </h1>



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
                            <li>Name:<samp>{selectedUser?.name}</samp> </li>
                            <li>Address:<samp>{selectedUser?.address}</samp></li>
                            <li className='QuantityLi'>quantity:<> <samp> {selectedUser?.quantity} </samp></><samp style={{ width:'100%',marginLeft: '0px'}}>
                                <input  
                                id="QuantityInput" 
                                className='QuantityInput' 
                                disabled={!isselected} 
                                placeholder='0' 
                                type='number' 
                                onChange={Amount} 
                                />
                                </samp></li>
                            <li>Price:<samp>{selectedUser?.price} {selectedUser?.currency}</samp></li>
                            <li>Total:<samp>{selectedUser?.price * soldAmount} {selectedUser?.currency}</samp></li>
                        </ul>

                        <div className='Btn'>
                            <button onClick={sale}>sale</button>
                        </div>

                        <ul style={{marginTop:'45px'}}>
                        <h3>Test Members</h3>
                    {members?.slice(0, 1).map((item:any, index:number) => (
                    <li  style={{display:'flex', flexDirection:'column' , alignItems:'flex-start'}} key={index}>
                        <div>
                        <samp>{item.name}</samp> <samp>{item.lastname}</samp>
                        </div>
                        <div>
                        <samp  style={{color: 'black'}}>{item.email}</samp><samp  style={{color: 'black'}}>{'rolandi123'}</samp>
                        </div>
                        </li>
                    ))}
                        
                           
                                
                            
                       
    </ul>         

                </div>

    
       </>
            );
}

export default Aside;
