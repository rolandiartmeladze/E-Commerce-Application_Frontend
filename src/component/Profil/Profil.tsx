import { error } from "console";
import React, {useState, useEffect} from "react";

import styled from "styled-components";

const Profil = ()=>{
    

    const [info, setInfo] = useState<object | any>({})
    const token = localStorage.getItem('token');

    
            
    useEffect(()=>{ fetchInfo(); },[])

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reppassword, setRepPassword] = useState('');
    const [address, setAddress] = useState('');
    const [account, setAccount] = useState('');
    const [bankName, setBankName] = useState('');

    async function fetchInfo() {
        try {
            const response = await fetch(`http://localhost:3001/MyInfo/${token}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();

            setInfo(data);
            setName(data.name);
            setLastName(data.lastname);
            setEmail(data?.email);
            setPhone(data?.phone);
            setAddress(data?.address);

            console.log('Data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(

        
             <form id="SingUpForm">
                {/* უზრუნველყოფს ლოდინის რეჟიმს შესაბამისი ქმედების დროს */}
                <h2> You are welcome </h2>
    
            {/* ძირითადი მონაცემების შეყვანის ველები */}
    
                <div className="item-cont">
                    {/* <img src={user} alt="" /> */}
    
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
                </div>
    
                <div className="item-cont">
                    {/* <img src={txt} alt="" /> */}
    
                    <label>Surname:</label>
                    <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Surname" required />
                </div>
    
                <div className="item-cont">
                    {/* <img src={Mail} alt="" /> */}
    
                    <label>Emile:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
    
                    {/* <samp style={verified ? verifstyle : undefined} onClick={verifi} className="meilverifi"> <img src={send} alt="" /></samp> */}
                </div>
    
                <div className="item-cont">
                    {/* <img src={Phone} alt="" /> */}
    
                    <label>Phone:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" required />
                </div>

                    <div className="item-cont">
                    <label>Address:</label>
                    <input type="tel" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
                </div>



                <div className="item-cont">
                    <label>Account:</label>
                    <input type="tel" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account Number" required />
                </div>

                <div className="item-cont">
                    <label>Bank name:</label>
                    <input type="tel" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Bank name" required />
                </div>

<div>
    Change Password
</div>
                    <div>
                        {/* <img src={pass2} alt="" /> */}
                        <input id="pass"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                // checkPassword(e.target.value);
                                // checkRepPassword(e.target.value, password);
                            }}
                            placeholder="Enter Password"
                            required
                        />
                        {/* <img style={{ margin: '0px 6px', cursor: 'pointer' }}
                            onClick={() => { showpass(showPass, setShowPass) }}
                            src={showPass ? hide : View} alt="" /> */}
    
                    </div>
                    <div>
                        <input id="RepPass" style={{ borderBottom: 'red solid 2px' }} type="password" value={reppassword} onChange={(e) => {
                            setRepPassword(e.target.value);
                            // checkRepPassword(e.target.value, password);
                        }} placeholder="Repeat Password" required />
                    </div>
                
    
    
                    {/* _____ */}
                    
                <div className="item-cont add">
                    <button className="singup">Update Info</button>
                </div>
    
            </form>
    

    );

};

export default Profil;