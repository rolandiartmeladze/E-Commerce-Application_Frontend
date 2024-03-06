import React, { useState, useEffect } from 'react';import logo from './logo.svg';
import '../style/Aside.css';
import  FindIcon from '../icon/find.png';



function Aside() {

    return (
<>
<div className='Aside'>
    <h1>User info </h1>
    <div className='Finde'>
        <input  type='text' placeholder='ძებნა' /> <samp><img src={FindIcon} alt='finde icon' /></samp>
    </div>
        <ul>
        <li>
                სახელი:<samp>test user01</samp>
            </li>
            <li>
                მისამართი:<samp>წალკა</samp>
            </li>
            <li>
                რაოდენობა:<samp>0 ₾.</samp>
            </li>
            <li>
                ფასი:<samp>1,4 ₾.</samp>
            </li>
            <li>
                ღირებულება:<samp>150 ₾.</samp>
            </li>
        </ul>

        <div className='Btn'>
            <button >ყიდვა</button>
        </div>
</div>
</>
        );
}

export default Aside;
