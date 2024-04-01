import React, { useState } from "react";
import './SingUp.css';

const SignUp = ({ singup, setSingUp }) => {

    
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reppassword, setRepPassword] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

            const response = await fetch('${serverUrl}/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setTimeout(() => {
                    window.location.reload(); 
                }, 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message); 
                console.log(errorMessage)
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await registerUser();
    };

    const closebtn = () =>{
        setSingUp(false)
    }

    return (
<>
            <h1 className="sing-up-header" >Sign Up Form</h1>
            <form className="sing-up-form">
            <div style={{top:'-35px', right:'10px'}} onClick={closebtn} className="closeloginform">
                {'Close'}
            </div>


                <div className="sing-up-input-conteiner">
                    <div className="sing-up-input-label" >User Name:</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
                </div>
                        
                        <div className="sing-up-input-conteiner">
                            <div className="sing-up-input-label" >Last Name:</div>
                                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" required />
                        </div>

                                <div className="sing-up-input-conteiner">
                                    <div className="sing-up-input-label" >User Emile:</div>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                                </div>

                                        <div className="sing-up-input-conteiner">
                                            <div className="sing-up-input-label" >User Phone:</div>
                                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" required />
                                        </div>


                                                <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="sing-up-input-conteiner">
                                                    <div style={{display:'inline-block', height: '100%'}} className="sing-up-input-label" >Create Password:</div>
                                                        <input style={{marginLeft: '20%'}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                                                        <input style={{marginLeft: '20%'}} type="password" value={reppassword} onChange={(e) => setRepPassword(e.target.value)} placeholder="Repeat Password" required />
                                                </div>

                                                        <div className="sing-up-input-conteiner">
                                                            <div className="sing-up-input-label" >User Address:</div>
                                                                <input type="tel" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
                                                        </div>

                                                                <div className="sing-up-btn-conteiner">
                                                                    <button className="sing-up-btn" onClick={handleSubmit}>Register</button>            
                                                                </div>

            </form>

        </>
    );
};

export default SignUp;
