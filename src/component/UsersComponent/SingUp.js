import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'; 

import serverUri from '../../component/serverUrl';
import { 
        Form, FooterComp, HeaderComp,
        Mail, Pass, Phone, user, txt, pass2, repe, View, hide, send, 
        checkPassword, showpass, checkRepPassword
        } from "./Tools";
import styled from "styled-components";


const VerifiCont = styled.div`
        .close-container{

            display: flex; 
            justify-content: flex-end;
            padding: 5px 0;
            .inputcode{
                color:red;
            }
            .btn{
                cursor: pointer;
                margin-right: 10px;
                padding: 3px 6px;
                box-shadow: 0px 1px 0px 1px beige;
                border-radius: 0px 0px 4px 4px;
                color: yellow;
                transition: 0.4s ease-in-out;
                    &:hover{
                        box-shadow: 0px 1px 0px 0.4px beige;
                    }
            }
        }


`;



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

    const inputstyle = { display: 'flex', width: '80%', marginLeft: '20%' }
    const [showPass, setShowPass] = useState(false);
    const [verif, setVerif] = useState(false);



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const verifi = () => {
        if (validateEmail(email)) {
            setVerif(!verif);
        } else {
            alert("Please enter a valid email address.");
        }
    };


    const VerifiMeil =() =>{ 

        return(
            <>
            <VerifiCont className="verificationmessage">
                <div>
            <div className="close-container">
            <div onClick={verifi} className="btn"> {'Close'}</div>

            </div>
                <div>
                    <h4>
                        თქვენ მიიღებთ კოდს მეილზე :<samp> {email} </samp>
                    </h4>
                
                </div>
                <div>
    <input className="inputcode" type="text" placeholder="enter code" />
</div>

<div>
    <button> verifi Now </button>
</div>                

</div>

            </VerifiCont>
            </>
        );
    }



    return (<>
        <HeaderComp navigate={navigate} title={'Sing Up Form'} />

            <Form id="SingUpForm">
                {verif &&  <VerifiMeil />}
            <h2> You are welcome </h2>

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
                                
                                       <samp onClick={verifi} className="meilverifi"> <img src={send} alt="" /></samp>
                                </div>

                                <div className="item-cont">
                                <img src={Phone} alt="" />

                                            <label>Phone:</label>
                                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" required />
                                        </div>


                                                <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="item-cont">
                                                <div className="pass">
                                                
                                                <img src={Pass} alt="" />

                                                    <label>Password:</label>
                                                    <samp className="example">
                                                        <span id="App">A</span>-
                                                        <span id="Low">a</span>-
                                                        <span  id="Num">1</span>-
                                                        <span id="Sim">!</span>-
                                                        <span id="length">{'>=8'}</span>
                                                        </samp>
                                                        <samp id="result"></samp>
                                                 </div>  
                                                 <div style={inputstyle}>
                                                     <img src={pass2} alt="" /> 
                                                 <input id="pass"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                            checkPassword(e.target.value);
                                                            checkRepPassword(e.target.value, password);
                                                        }}
                                                        placeholder="Enter Password"
                                                        required
                                                    />
                                                    <img style={{margin: '0px 6px', cursor: 'pointer'}} 
                                                    onClick={()=>{ showpass(showPass, setShowPass) }} 
                                                    src={showPass? hide:View} alt="" />

                                                    </div> 
                                                    <div style={inputstyle}>
                                                        <img src={repe} alt="" />
                                            <input id="RepPass" style={{borderBottom: 'red solid 2px'}} type="password" value={reppassword} onChange={(e) => {
                                                setRepPassword(e.target.value);
                                                checkRepPassword(e.target.value, password);
                                            }} placeholder="Repeat Password" required />
                                            </div>
                                                </div>

                                                <div className="item-cont">
                                                            <label>Address:</label>
                                                                <input type="tel" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
                                                        </div>

                                                                <div className="item-cont add">
                                                                    <button className="singup" onClick={handleSubmit}>Register</button>            
                                                                </div>

            </Form>

        <FooterComp />
        </>);
};

export default SignUp;