import React, { useState } from "react";

import './SingUp.css';

const Login = ({singup, setSingUp, login, setLogIn}) => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');


    const handleSubmit = () => {

    }

    const singupbtn = () =>{
        !singup? setSingUp(true): setSingUp(false);
        !login? setLogIn(true): setLogIn(false);
        
    }

        const closebtn = () => {
            setLogIn(false);
    
        }
    

    return(
<>

        <h1 className="sing-up-header" >LogIn Form</h1>
        <form className="sing-up-form">

            <div onClick={closebtn} className="closeloginform">
                {'Close'}
            </div>

        <div className="sing-up-input-conteiner">
                    <div className="sing-up-input-label" >Email:</div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                </div>
                        
                        <div className="sing-up-input-conteiner">
                            <div className="sing-up-input-label" >Password:</div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                        </div>

                        <div className="sing-up-btn-conteiner">
                        <button  style={{position:'relative', padding: '10px 20px'}} className="sing-up-btn" onClick={handleSubmit}>Log In</button>            
                        </div>
                        <div style={{position:'relative', display: 'flex', justifyContent: 'center' , flexDirection: 'column', alignItems: 'center'}} className="sing-up-btn-conteiner">
                        <samp style={{display:'flex', alignItems:'center'}}><samp><input type="checkbox"></input></samp>Remember password</samp>
                        <sapm style={{margin:'8px', cursor: 'pointer'}}>Forget Password</sapm>
                        <button  style={{position:'relative', right: '0', padding: '10px 20px'}} className="sing-up-btn" onClick={singupbtn}>Sing Up</button>            
                        </div>


        </form>.
</>

    );
};

export default Login;
