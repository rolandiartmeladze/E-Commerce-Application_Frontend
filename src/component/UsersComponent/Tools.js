import React from "react";

import Mail from '../../icon/mail.svg';
import Pass from '../../icon/pass.svg';
import Phone from '../../icon/phone.svg';
import user from '../../icon/person.svg';
import txt from '../../icon/userN.svg';
import pass2 from '../../icon/pass2.svg';
import repe from '../../icon/repeat.svg';
import View from '../../icon/view.svg';
import hide from '../../icon/passlock.svg';
import send from '../../icon/send.svg'
import gmail from '../../icon/mail.png';




import styled from "styled-components";

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

    #result{
    color: green;
    display: flex;
    align-items: center;
    margin: 0 8px;
    text-decoration: underline;
    }

 .pass{
    display: flex;


            img{
                margin: 0px 3px;
            }

            label{
                display:inline-block; 
                height: 100%;
            }

            .example{
                margin: 0px 3px;
                color: black;

                display: flex;
                align-items: center;
                span{ color: rgb(255, 0, 0 , 0.4); }
            }
 }

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


        .meilverifi{
            cursor: pointer;
            padding: 4px;
            color: red;
            box-shadow: 0px 0px 0px 1px;
            display: flex;
            justify-content: center;
            align-items: center;  
            transition: 0.4s ease-in-out;     
            &:hover {
                transform: scale(1.05);
            }
        }


        .verificationmessage{
            width: 90%;
            position: absolute;
            background-color: rgb(5, 60, 90);
            height: auto;
            top: 3%;
            min-height: 94%;
            border-radius: 8px;
            z-index: 3;
                        }

`;


const VerifiCont = styled.div`
        .close-container{

            display: flex; 
            justify-content: flex-end;
            padding: 5px 0;
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
        .inputcode{
            margin: 6px 0px;
            input{
                color:white;
                padding: 6px;
                background: none;
                width: 70%;
                border:none;
                outline: none;
                box-shadow: 0px 0.5px 1px 0.3px white;
                font-size: 18px;
                text-align: center;
                border-radius: 6px;
                &::placeholder{
                    color: yellow;
                }
            }

        }

        .note{
            font-weight: bolder;
            color: brown;
            background-color: rgb(255, 255, 255, 0.6);
            box-shadow: 0px 0px 0px 0.3px red;
            width: 96%;
            margin: 3px auto;
            text-align: left;
            padding: 5px;
            border-radius: 0px 0px 6px 6px;
            font-size: 14px;
            span{
                font-size: 20px;
                margin: 0px 4px;
            }
        
        }

        .email{
            display: flex;
            font-weight: bolder;
            text-align: left;
            padding: 3px;
            margin: 4px;
            align-items: center;
            text-decoration: underline;
            color: white;
            img{
                width: 30px;
            }
        }

        .again{ 
            display: flex;
            padding: 3px;
            margin: 10px 0px;
            position: relative;
            align-items: center;
            justify-content: center;

            // .timer{
            //     background-color: green;
            //     position: absolute;
            //     padding: 0px 25px;
            //     height: 100%;
            //     top: 0;
            //     display: flex;
            //     align-items: center;
            //     justify-content: center;
            //     font-weight: bolder;
            //     border
            // }

            .disabled {
                pointer-events: none; 
                opacity: 0.5;        
              }

            .btntray{
                display: inline;
                background-color: wheat;
                padding: 6px 8px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                samp{
                    img{
                        widtg: 20px;
                    }
  
                }


                        }

        }

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


    const TryAgainButton = ({ timer, wait, trayagain }) => {
        return (
          <div className="again">
            <div onClick={trayagain} className={`btntray ${wait ? 'disabled' : ''}`}>
              <samp>{wait ? `${timer} S` : 'Try again'}</samp>
              {wait && <samp style={{ height: '100%', display: 'flex', justifyContent: 'center' }}><img src={repe} alt='' /></samp>}
            </div>
          </div>
        );
      };


    const HeaderComp = ({navigate, title, props}) =>{
        return(
            <Header><samp>{title}</samp> 
                <div onClick={()=>{close(navigate, props)}} className="close"> {'Close'}</div>
            </Header>
        );
    }

    const FooterComp = ()=>{
        return(            
        <Footer>
            <h3>If you have a problem or find a bug, please contact the administrator  <samp>Contact</samp></h3>
        </Footer>
        )
    };

    const checkPassword = (password) => {
        const lower = password.toLowerCase();
        const upper = password.toUpperCase();
        const hasNumber = /\d/.test(password); 
        const hasSpecialChar = /[!@#$%^&*()]/.test(password); 
        const hasMinLength = password.length >= 8;
    
        const isWeak = (password === lower) || (password === upper) || /^[a-zA-Z]+$/.test(password);
    
        const App = document.getElementById('App');
        const Low = document.getElementById('Low');
        const Num = document.getElementById('Num');
        const Sim = document.getElementById('Sim');
        const Len = document.getElementById('length');
    
        const result = document.getElementById('result');
    
            if (password !== lower) {App.style.color = 'green'} 
                else {App.style.color = 'rgb(255, 0, 0 , 0.4)'}
    
                if (password !== upper) {Low.style.color = 'green'} 
                    else {Low.style.color = 'rgb(255, 0, 0 , 0.4)'}
    
                    if (hasNumber) {Num.style.color = 'green'} 
                        else {Num.style.color = 'rgb(255, 0, 0 , 0.4)'}
    
                        if (hasSpecialChar) {Sim.style.color = 'green'} 
                            else {Sim.style.color = 'rgb(255, 0, 0 , 0.4)'}
    
                            if (hasMinLength) {Len.style.color = 'green'} 
                                else {Len.style.color = 'rgb(255, 0, 0 , 0.4)'}
    
                                if (isWeak && password.length >4) {
                                    result.style.color = "brown"
                                    result.textContent = "weak"} 
                                    else if(!isWeak && password.length >7) {
                                        result.style.color = "green"
                                        result.textContent = "strong"}
                                        else {result.textContent = ""}
        };
    
const checkRepPassword = (reppassword, password) => {
    const repPass = document.getElementById('RepPass');
         if(reppassword === password && reppassword.length > 0){repPass.style.borderBottomColor = 'green'}
         else {repPass.style.borderBottomColor = 'red'}
 }
 
const showpass =(showPass, setShowPass)=>{ 
    const pass = document.getElementById('pass');
    const reppass = document.getElementById('RepPass');
    if(pass && reppass){
        if(showPass){
            setShowPass(false); 
            pass.type = 'password'; 
            reppass.type = 'password'; 
        } else{
            setShowPass(true);
            pass.type = 'text'; 
            reppass.type = 'text'; 
        }     
    }

    const item = document.getElementById('password');
    if(item) {
        if(showPass){
            setShowPass(false); 
            item.type = 'password'; 
        } else{
            setShowPass(true);
            item.type = 'text'; 
        } 
    }   
}

const close = (navigate, props) =>{

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

        const loginform = document.getElementById('LoginForm');
        if(loginform){
                setTimeout(() => {
                    loginform.style.transform = 'scale(0.5)';
                    setTimeout(() => {
                        loginform.style.translate = '-200%';
                        setTimeout(() => {
                            if(props==='singup'){navigate('/singup')}
                                else{navigate('/')}
                        }, 700);
                    }, 400);
                }, 300);
                }    
}

export {checkPassword, checkRepPassword, showpass, close, FooterComp, HeaderComp, TryAgainButton};

    export {Mail, Pass, Phone, user, txt, pass2, repe, View, hide, send, gmail};

        export { Form, VerifiCont};