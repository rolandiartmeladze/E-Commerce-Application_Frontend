import React, { useState } from "react";

import Mail from '../../icon/mail.svg';
import Pass from '../../icon/pass.svg';
import Phone from '../../icon/phone.svg';
import user from '../../icon/person.svg';
import txt from '../../icon/userN.svg';


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
    // translate: -200%;
    // transform: scale(0.5);
    box-shadow: 1px 1px 4px 2px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background-color: rgb(192, 192, 192, 0.4);
    transition: 0.8s ease-in-out;

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
                color: rgb(255, 0, 0 , 0.4);
                display: flex;
                align-items: center;
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

    
    export { Form, Footer, Header};