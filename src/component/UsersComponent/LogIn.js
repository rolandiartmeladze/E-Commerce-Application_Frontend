import React, { useEffect, useState } from "react";
import serverUri from '../../component/serverUrl';
import { Link, useNavigate } from 'react-router-dom'; 

import styled from "styled-components";

import Mail from '../../icon/mail.svg';
import Pass from '../../icon/pass.svg';
import View from '../../icon/view.svg';
import hide from '../../icon/passlock.svg';

import { Form, Header, Footer } from "./Tools";



const Login = () => {
    
    const serverlink = serverUri();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate(); 

    useEffect(()=>{
        const loginform = document.getElementById('LoginForm');

    if(loginform){
        setTimeout(() => {
            loginform.style.translate = '0';
            setTimeout(() => {
                loginform.style.transform = 'scale(1)';
            }, 700);

        }, 100);
    }

    }, [])



    


    const CloseLogin =( props ) =>{

        const loginform = document.getElementById('LoginForm');

if(loginform){
        setTimeout(() => {
            loginform.style.transform = 'scale(0.5)';
            setTimeout(() => {
                loginform.style.translate = '-200%';
                setTimeout(() => {
                    if(props==='close'){
                        navigate('/');
                    }else if(props==='singup'){
                        navigate('/singup');
                    }
                    
                }, 700);
            }, 400);
        }, 300);

        }    
}



    const showpass =()=>{ 
            const item = document.getElementById('password');
            
            if(showPass){
            setShowPass(false); 
            item.type = 'password'; 
            } else{
                setShowPass(true);
                item.type = 'text'; 
            } 
        }

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${serverlink}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Invalid email or password');
            }

            const { user } = await response.json();
            localStorage.setItem('token', user._id);
            localStorage.setItem('user', `${user.name} ${user.lastname}`);
            localStorage.setItem('address', user.address);
            localStorage.removeItem('favorits');
                    
                        
                navigate('/');

                window.location.reload();


            
            
            
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <>
            <Header>
                    <samp>Login Form</samp>   
                {/* <Link to={'/'}> */}
                    <div onClick={()=>{CloseLogin('close')}} className="close"> Close </div>
                {/* </Link> */}
            </Header>



            <Form style={{ translate: '-200%',  transform: 'scale(0.5)' }} id='LoginForm'>
                <h2> You are welcome </h2>
                <div className="item-cont">
                    <img src={Mail} alt="" />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter Email" 
                        required />

                </div>
                <div className="item-cont">
                    <img src={Pass} alt="" />
                    <input 
                        type="password" 
                        value={password} 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter Password" 
                        required />
                    <img className="view" onClick={showpass} src={showPass? hide:View} alt="" />
                
                </div>

                <div className="item-cont add">
                    <div className="prop">
                        <samp><input type="checkbox" />Remember password</samp>
                        <samp> Forget Password </samp>
                    </div>     

                        <button onClick={handleLogin}>Log In</button>
                </div>

                <div style={{justifyContent: 'center'}} className="item-cont add">
                    <div className="singup" 
                        onClick={()=>{CloseLogin('singup')}} 
                        style={{padding: '10px 30px' }}>
                        Sign Up</div>
                </div>

            </Form>
            
            <Footer>
                     <h3>If you have a problem or find a bug, please contact the administrator  <samp>Contact</samp></h3>
       
            </Footer>

        </>
    );
};

export default Login;
