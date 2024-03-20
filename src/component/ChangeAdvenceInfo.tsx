import React, { useState, useEffect } from 'react';

import '../style/ChangeAdvenceInfo.css';
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

    const PriseInput = styled.input`
    padding: 6px;
    padding-left: 10px;
    background: none;
    backdrop-filter: blur(0.8px);
    box-shadow: -0.3px -0.6px 3px -0.3px red inset;
    outline: none;
    border: none;
    borderRadius: 0px;
    font-weight: 700;
    width: 30%; 
    text-align: center; 
    margin-bottom: 0; 
    
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
    const [advance, setAdvance] = useState({});
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

                const [response, setResponse] = useState({ message: ''});
                const [loading, setLoading] = useState(false);


            const creatAdvanceinfo = async () => {

                const advanceForm = document.getElementById('advanceForm');
                const advanceFormInputs:
                  | HTMLCollectionOf<HTMLInputElement>
                  | undefined = advanceForm?.getElementsByTagName("input");
                
                    const currencyElement = document.getElementById('currency') as HTMLSelectElement | null;
                    const quantityElement = document.getElementById('Quantity') as HTMLSelectElement | null;
                    
                        const purchasePrice = document.getElementById('purchasePrice') as HTMLSelectElement | null;
                        const sellingPrice = document.getElementById('sellingPrice') as HTMLSelectElement | null;
            
                if (
                    advanceFormInputs 
                    && currencyElement 
                    && quantityElement 
                    &&  purchasePrice 
                    && sellingPrice
                    ) {

                    const inputsArray = Array.from(advanceFormInputs);

                        const selectedCurrency = currencyElement.value;
                        const selectedQuantity = quantityElement.value;  

                    const purchasePriceValue = purchasePrice.value;    
                    const sellingPriceValue = sellingPrice.value;    
            
                        const AdvanceInfo: Record<string, string> = {};
                        inputsArray.forEach((item, index) => {
                            const propertyName = `UsersInfo${index}`;
                            AdvanceInfo[propertyName] = item.value;
                        });


                    // add Currency/Quantity
                    AdvanceInfo.currency = selectedCurrency;
                    AdvanceInfo.quantity = selectedQuantity;

                    // add price info
                    AdvanceInfo.purchasePrice = purchasePriceValue;
                    AdvanceInfo.sellingPrice = sellingPriceValue;
            
                    console.log(AdvanceInfo);



                    setLoading(true);
                    try {

                            const response = await fetch('http://localhost:80/changeAdvance', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(AdvanceInfo)
                            });
                            
                            const data = await response.json();
                            setResponse({ message: data.message });
                        
                    } catch (error) {
                        console.error('Error:', error);
                    }
                     finally {
                      setLoading(false);

                    //   console.log(dataResponse);
            
            
                    }
            
                }
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
                    <form id='advanceForm' className='advance-info-form'>

                        <InputItem name='userName' type='text' disabled value='Full Name' />
                        <InputItem name='userAddress' type='text' disabled value='Address' />
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

                    <article> 
                        <h1> Currency/Quantity </h1> 
                        <div className='selection-conteiner'>
                            <h2 className='currency-label'>Choose a Currency:</h2>
                                <select className='currency-select' id="currency">
                                        <option value="₾">₾</option>
                                        <option value="$">$</option>
                                        <option value="€">€</option>
                                        <option value="£">£</option>
                                        <option value="₺">₺</option>
                                        </select>

                        </div>

                            <div className='selection-conteiner'>
                                <h2 className='currency-label'>Choose a Quantity:</h2>
                                    <select className='currency-select' id="Quantity">
                                            <option value="L">L</option>
                                            <option value="pcs">pcs</option>
                                            <option value="kg">kg</option>
                                            <option value="m">m</option>
                                            </select>

                            </div>
                    </article>

                        <article> 
                            <h1> Product Cost </h1> 
                        
                            <div className='selection-conteiner'>
                                <h2 className='currency-label price-label'>purchase price:</h2>
                                    <PriseInput
                                        className='price-input' 
                                        name='purchasePrice' 
                                        id='purchasePrice' 
                                        placeholder='0.0' 
                                        type='number' 
                                        />
                            </div>

                                <div className='selection-conteiner'>
                                    <h2 className='currency-label price-label'>selling price:</h2>
                                        <PriseInput 
                                        className='price-input' 
                                        name='sellingPrice' 
                                        id='sellingPrice' 
                                        placeholder='0.0'
                                        type='number' 
                                        />
                                </div>
                        </article>

            </section>

            <div onClick={creatAdvanceinfo}
            className='advance-info-btn-conteiner' 
            style={{display: updateAdvance ? 'flex' : 'none'}}
            >
                <button disabled={loading} className='advance-info-btn'>Change Advence</button>
            </div>
    </div>

</>
        );
}

export default ChangeAdvenceInfo;
