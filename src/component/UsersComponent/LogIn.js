import React, { useEffect, useState } from "react";
import serverUri from '../../component/serverUrl';
import { Link, useNavigate } from 'react-router-dom'; 

import styled from "styled-components";

import Mail from '../../icon/mail.svg';
import Pass from '../../icon/pass.svg';
import View from '../../icon/view.svg';
import hide from '../../icon/passlock.svg';


 const Header = styled.h1`
 
    width: 100%;
    background-color: gainsboro;
    font-size: 25px;
    text-align: left;
    margin: auto;
    padding: 5px 0px;
    position: relative;
     
     .close{
        font-size: 15px;
        padding: 5px 9px;
        position: absolute;
        top: 7px;
        right: 20px;
        cursor: pointer;
        color: rgb(14, 10, 10);
        font-weight: 800;
        box-shadow: 0px 1px 3px 1px black inset;
        border-radius: 6px;
        transition: 0.5s ease-in-out;
            &:hover{
                color: brown;
                box-shadow: 0px 0.4px 1.4px 0.5px  red inset;
            }
     }
    samp{ margin: 4px;}
 `;

    const Form = styled.form`
        min-width: 320px;
        max-width: 550px;
        width: 50%;
        margin: 20px auto;
        translate: -200%;
        transform: scale(0.5);
        box-shadow: 1px 1px 4px 2px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
        background-color: rgb(192, 192, 192, 0.4);
        transition: 0.8s ease-in-out;

        .item-cont{
            padding: 2px;
            font-weight: 900;
            margin: 4px;
            box-shadow: 0.5px 0.3px 2px 0.3px black;
            width: 75%;
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            align-items: center;

                .view{
                    margin: 0px 10px;
                    cursor: pointer;
                }
                    input{
                        text-align: left;
                        height: 100%;
                        background: none;
                        border: none;
                        outline: none;
                        padding: 6px;
                        font-weight: 900;
                        flex: 1;        
                    }
        }
        .prop{
            box-shadow: none;
            justify-content: center;
            flex-direction: column;
            flex: 1;
            display: flex;
            align-items: center;
            samp{
                cursor: pointer;
                padding: 5px;
            } 
        }
        .add{
            box-shadow: none;
            justify-content: flex-end;
            flex-direction: row;
               .singup, button{
                    background-color: rgb(165, 42, 42, 0.3);
                    border: none;
                    cursor: pointer;
                    margin: 5px;
                    font-weight: 900;
                    border-radius: 4px;
                    box-shadow: 0.6px 0.6px 3px 0.8px black;
                    position: relative;
                    justify-content: center;
                    padding: 10px 20px;
                    &:hover{box-shadow: 0.3px 0.3px 1px 0.5px rgb(0, 0, 0, 0.6);} 
                }
        }

            h2{margin: 8px 8px;}
    `;
        const Footer = styled.footer`
        background-color: gainsboro;
        margin-bottom: -8px;
        padding: 6px;
        h3{
            margin: 3px;
            text-align: left;
            color: red;
            samp{
                color: blue;
                text-decoration: underline;
                cursor: pointetr;
                cursor: pointer;
                &:hover{
                    color: black;
                }
            }
        }
        `;


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
                            
                        }, 500);
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



            <Form id='LoginForm'>
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
