import React, {useContext, useState, useEffect } from 'react';

import '../style/UserConteiner.css';
import styled from 'styled-components';


import AddIcon from '../icon/add.png';
import ArrowRigth from '../icon/arrow.png';


      const InputItem = styled.input`
                margin-bottom: 4px;
                padding: 6px;
                padding-left: 10px;
                background: none;
                backdrop-filter: blur(0.8px);
                box-shadow: -0.3px -0.6px 3px 0.3px red inset;
                outline: none;
                border: none;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                font-weight: 700;
    `;
    const CreacUserBtn = styled.div`
                padding: 2px;
                border-radius: 50%;
                position: relative;
                cursor: pointer;
                transition: 0.3 ease-in-out;
                box-shadow: 0.5px 0.5px 2px 0.2px green;
                display: flex;
                float: right;
                margin: 10px;
                margin-left: 4px;
                &:hover{
                        box-shadow: 0.8px 0.8px 6px 0.5px red;
                }
    `;


function ChangeAdvenceInfo() {

        const [updateAdvance, setUpdateAdvance] = useState(false);


            const updateAdvanceFunction = () => {
                updateAdvance ? setUpdateAdvance(false) : setUpdateAdvance(true);
            };
            
           
            const [inputFields, setInputFields] = useState<JSX.Element[]>([]);

            const handleAddInput = () => {
              setInputFields(prevInputFields => [
                ...prevInputFields,
                <InputItem key={prevInputFields.length} type="text" />
              ]);
            };


                  return (
<>

    <div className = {
        !updateAdvance? 
        'update-advanse' 
        : 
        'update-advanse update-advanse-active'
        }>

        <h1 
        className={'update-advanse-head'} 
        onClick={updateAdvanceFunction}>
            <samp style={{ padding:'7px'}}> Change Advance User Info</samp>
                <samp style={{display: 'flex'}}> 
                    <img className={ 
                    !updateAdvance ? 
                    'aarowRight' 
                    :
                    'aarowRight aarowRight-active'
                    } 
                    src={ArrowRigth} 
                    alt="" />
                </samp>
        </h1>
            <section className = {
                !updateAdvance? 
                'change-info-conteiner' : 
                'change-info-conteiner-active change-info-conteiner' 
                }>
                <article style={{ overflowY: 'scroll'}}>
                    <h1>Basice User Info</h1>

                        <form className='advance-info-form'>

                            <InputItem name='userName' type='text' placeholder='Full Name' value ='UserName' />
                                <InputItem name='userAddress' type='text' placeholder='Address' value ='UserAddress' />
                                    {inputFields.map((input, index) => (
                                        <React.Fragment key={index}>{input}</React.Fragment>
                                    ))}

                                        <div className='add-btn-conteiner'>
                                        <samp>Add More</samp>
                                            <CreacUserBtn  onClick={handleAddInput}>
                                                <img style={{width: '25px'}} src={AddIcon} alt="add info" />
                                            </CreacUserBtn>
                                        </div>
                        </form>

                </article>

                    <article> <h1> Currency/Quantity </h1> </article>
                    <article> <h1> Product Cost </h1> </article>
            </section>

            <div style={{ display: updateAdvance ? 'flex' : 'none' , alignItems: 'flex-start', width: '100%', justifyContent: 'flex-end'}}>
                <button className='advance-info-btn'>Change Advence</button>
            </div>
    </div>

</>
        );
}

export default ChangeAdvenceInfo;
