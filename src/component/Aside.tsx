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
                სახელი:<samp>___________</samp>
            </li>
            <li>
                მისამართი:<samp>_________</samp>
            </li>
            <li>
                რაოდენობა:<samp>_______</samp>
            </li>
            <li>
                ფასი:<samp>_________</samp>
            </li>
            <li>
                ღირებულება:<samp>___________</samp>
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
