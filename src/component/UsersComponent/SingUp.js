import React, { useState, useEffect } from "react";
import './SingUp.css';

import { Link , useNavigate} from 'react-router-dom'; 
import Mail from '../../icon/mail.svg';
import Pass from '../../icon/pass.svg';
import Phone from '../../icon/phone.svg';
import user from '../../icon/person.svg';
import txt from '../../icon/userN.svg';


import serverUri from '../../component/serverUrl';
import styled from "styled-components";

import { Form, Header, Footer } from "./Tools";


const SignUp = () => {


    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reppassword, setRepPassword] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const serverlink = serverUri();


    const registerUser = async () => {
        try {
            const formData = {
                name: name,
                lastname: lastname,
                email: email,
                phone: phone,
                password: password,
                address: address
            };

            const response = await fetch(`${serverlink}/register`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                });

            if (response.ok) { setTimeout(() => { window.location.reload(); }, 2000); } 
            else { const errorData = await response.json();
                    setErrorMessage(errorData.message); 
                    console.log(errorMessage)
                 }
        } catch (error) { console.error('Error registering user:', error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await registerUser();
    };
        const navigate = useNavigate(); 


        useEffect(()=>{
            const singapform = document.getElementById('SingUpForm');
    
        if(singapform){
            setTimeout(() => {
                singapform.style.translate = '0';
                setTimeout(() => {
                    singapform.style.transform = 'scale(1)';
                }, 700);
    
            }, 100);
        }
    
        }, [])
    

    const closebtn = () =>{

        const singapform = document.getElementById('SingUpForm');

if(singapform){
        setTimeout(() => {
            singapform.style.transform = 'scale(0.5)';
            setTimeout(() => {
                singapform.style.translate = '-200%';
                setTimeout(() => {
                        navigate('/');
                }, 700);
            }, 400);
        }, 300);

        }    
}


    return (
<>
            <Header><samp>Sign Up Form</samp> 
 <div 
    onClick={closebtn} 
    className="close">
                {'Close'}
            </div>
{/* </Link> */}

            </Header>
            <Form  style={{ translate: '200%',  transform: 'scale(0.5)' }} id="SingUpForm">

            <div className="item-cont">
            <img src={user} alt="" />

                    <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
                </div>
                        
                <div className="item-cont">
                <img src={txt} alt="" />

                            <label>Surname:</label>
                                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Surname" required />
                        </div>

                        <div className="item-cont">
                        <img src={Mail} alt="" />

                                    <label>Emile:</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                                </div>

                                <div className="item-cont">
                                <img src={Phone} alt="" />

                                            <label>Phone:</label>
                                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" required />
                                        </div>


                                                <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="item-cont">
                                                <div className="pass">
                                                
                                                <img src={Pass} alt="" />

                                                    <label>Password:</label><samp className="example">ASDasd123!</samp>
                                                 </div>       
                                                        <input style={{marginLeft: '20%'}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                                                        <input style={{marginLeft: '20%'}} type="password" value={reppassword} onChange={(e) => setRepPassword(e.target.value)} placeholder="Repeat Password" required />
                                                </div>

                                                <div className="item-cont">
                                                            <label>Address:</label>
                                                                <input type="tel" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
                                                        </div>

                                                                <div className="sing-up-btn-conteiner">
                                                                    <button className="sing-up-btn" onClick={handleSubmit}>Register</button>            
                                                                </div>

            </Form>
            <Footer>
                     <h3>If you have a problem or find a bug, please contact the administrator  <samp>Contact</samp></h3>
       
            </Footer>

        </>
    );
};

export default SignUp;
