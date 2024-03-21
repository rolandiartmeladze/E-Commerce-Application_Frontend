import React, { useState, useEffect } from 'react';

import '../style/ChangeAdvenceInfo.css';
import styled from 'styled-components';


import AddIcon from '../icon/add.png';
import ArrowRigth from '../icon/arrow.png';

interface UserContainerProps {
    setAdvanceData: React.Dispatch<React.SetStateAction<any[]>>
    advanceData: object;
  }


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

//     const PriseInput = styled.input`
//     padding: 6px;
//     padding-left: 10px;
//     background: none;
//     backdrop-filter: blur(0.8px);
//     box-shadow: -0.3px -0.6px 3px -0.3px red inset;
//     outline: none;
//     border: none;
//     borderRadius: 0px;
//     font-weight: 700;
//     width: 30%; 
//     text-align: center; 
//     margin-bottom: 0; 
    
// `;

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


function Addnewuser({  advanceData, setAdvanceData }: UserContainerProps) {

    const [updateAdvance, setUpdateAdvance] = useState(false);
    // const [advance, setAdvance] = useState({});
    const [product, setProduct] = useState(false);

    const addProductFunction = async () => {
        product ? setProduct(false) : setProduct(true);
        setUpdateAdvance(false);
    }            


    const updateAdvanceFunction = () => {
            updateAdvance ? setUpdateAdvance(false) : setUpdateAdvance(true);
            setProduct(false);
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

                // const [itemName, setItemName] = useState('');
                // const [location, setLocation] = useState('');
                // const [description, setDescription] = useState('');
                // const [quantity, setQuantity] = useState('');
                // const [price, setPrice] = useState('');
    
    

            const creatAdvanceinfo = async () => {

                // console.log(advanceData)

                const advanceForm = document.getElementById('advanceForm');
                const advanceFormInputs:
                  | HTMLCollectionOf<HTMLInputElement>
                  | undefined = advanceForm?.getElementsByTagName("input");
                
                    const currencyElement = document.getElementById('currency') as HTMLSelectElement | null;
                    const quantityElement = document.getElementById('Quantityunit') as HTMLSelectElement | null;
                    
                        // const purchasePrice = document.getElementById('purchasePrice') as HTMLSelectElement | null;
                        // const sellingPrice = document.getElementById('sellingPrice') as HTMLSelectElement | null;
            
                if (
                    advanceFormInputs 
                    && currencyElement 
                    && quantityElement 
                    // &&  purchasePrice 
                    // && sellingPrice
                    ) {

                    const inputsArray = Array.from(advanceFormInputs);

                        const selectedCurrency = currencyElement.value;
                        const selectedQuantity = quantityElement.value;  

                    // const purchasePriceValue = purchasePrice.value;    
                    // const sellingPriceValue = sellingPrice.value;    
            
                        const AdvanceInfo: Record<string, any> = {
                            'basice':[],
                            'more':{
                                'selectcurrency':[ "₾", "$", "€", "£", "₺" ],
                                'selectquantity':[ "L", "pcs", "kg", "m", ],
                            }
                        };

                        inputsArray.forEach((item, index) => {
                            // const propertyName = `Info${index}`;
                            AdvanceInfo.basice.push(item.value);
                        });


                    // add Currency/Quantity
                    AdvanceInfo.more.currency = selectedCurrency;
                    AdvanceInfo.more.quantity = selectedQuantity;

                    // add price info
                    // AdvanceInfo.purchasePrice = purchasePriceValue;
                    // AdvanceInfo.sellingPrice = sellingPriceValue;
            
                    console.log(AdvanceInfo);



                    setLoading(true);
                    try {


                        // if(advanceData){
                            const advanceResponse = await fetch('http://localhost:80/checkAdvance', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
                                  if (!advanceResponse.ok) {throw new Error('Failed to fetch advance data');}
                                  const advanceData = await advanceResponse.json();
                                  setAdvanceData(advanceData);
                
                        // }
                        // else{
                            // const response = await fetch('http://localhost:80/changeAdvance', {
                            //     method: 'POST',
                            //     headers: {
                            //         'Content-Type': 'application/json'
                            //     },
                            //     body: JSON.stringify(AdvanceInfo)
                            // });
                            
                            // const data = await response.json();
                            // setResponse({ message: data.message });
                        // }
                        
                    } catch (error) {
                        console.error('Error:', error);
                    }
                     finally {
                      setLoading(false);

            
            
                    }
            
                }
            };





        
            const creatnewproduct = async () => {


                const advanceForm = document.getElementById('advanceForm');
                const advanceFormInputs:
                  | HTMLCollectionOf<HTMLInputElement>
                  | undefined = advanceForm?.getElementsByTagName("input");

                  if (
                    advanceFormInputs 
                    ) {

                    const inputsArray = Array.from(advanceFormInputs);

                    const AdvanceInfo: Record<string, any> = {
                        'basice':[],
                        'more':{
                            'selectcurrency':[ "₾", "$", "€", "£", "₺" ],
                            'selectquantity':[ "L", "pcs", "kg", "m", ],
                        }
                    };

                    inputsArray.forEach((item, index) => {
                        AdvanceInfo.basice.push(item.value);
                    });



                setLoading(true);
                const newUser = AdvanceInfo;
        
                    console.log(AdvanceInfo)
                    console.log(newUser);
                    
                    
        
                    // __001
                }
              };
              const { basice } = advanceData as { basice: any[] };

        
            //   const basiceinfo = advanceData.basice;
        
            console.log(basice)


            const [inputValues, setInputValues] = useState<string[]>([]);

            const setInputValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                const newValue = e.target.value;
                // Handle the new value as needed, for example, update the state or an array
                // Here, assuming you're updating a state array named 'inputValues'
                setInputValues(prevValues => {
                    const updatedValues = [...prevValues];
                    updatedValues[index] = newValue;
                    return updatedValues;
                });
            };
            
return (
<>

            <div className={
                !updateAdvance && !product ?
                'update-advanse' :
                'update-advanse update-advanse-active'
            }>



<div className={'update-advanse-head'}  >
<h1 style={{
                    display:'flex',
                    alignItems:'center'}} onClick={updateAdvanceFunction}


>
                <samp style={{ color: !updateAdvance ? 'black' : 'red', padding: '7px' }}>Change Advance User Info</samp>
                
                <samp style={{display: 'flex'}}> 
                    <img className={ 
                    !updateAdvance ? 
                    'aarowRight' 
                    :
                    'aarowRight aarowRight-active'
                    } 
                    src={ArrowRigth} 
                    alt=""
                    id='advanceHead'
                     />
                </samp>
                </h1>


                <h1 style={{
                    display:'flex',
                    alignItems:'center',
                    marginLeft: '15px'
                }} onClick={addProductFunction}>
            <samp style={{ color: !product ? 'black' : 'red', padding: '7px'}}> Add Product </samp>
                <samp style={{display: 'flex'}}> 
                    <img className={ 
                    !product ? 
                    'aarowRight' 
                    :
                    'aarowRight aarowRight-active'
                    } 
                    src={ArrowRigth} 
                    alt="" 
                    id='Product'
                    />
                </samp>


        </h1>

    
        
        </div>


            <section className = {
                !updateAdvance && !product ? 
                'change-info-conteiner' : 'change-info-conteiner-active change-info-conteiner' 
                }>

                <article style={{ overflowY: 'scroll'}}>
                    <h1>{
                    updateAdvance? ' Add Basice Info': 'Add product info'
                    }</h1>
                    <form id='advanceForm' className='advance-info-form'>


                {/* ეს კოდი ქმნის პროდუქტის დასამატებლად საჭირო მონაცემების შესაყვანად 
                <input /> html ელემენტს, მონაცემთა ბაზაში წინასწარ განსაზღვრული მონაცემების მიხედვე.
                მომხმარებელს შეუძლია აღნიშნულ მონაცემებს დაამატოს მისთვის სასურველი ელემენტი 
                განსაზღვრული ლოგიკის შესაბამისად და შედეგი შეინახოს მონაცემტა ბაზაში შემდგომი გამოყენებისთვის, 
                ასევე წაშალოს ისინი საბაზისო მონაცემების გარდა.   */}
                    {
                        basice?.map((item, index) => (
                            updateAdvance ?
                                <InputItem 
                                    key={index} 
                                    type="text" 
                                    disabled={updateAdvance} 
                                    value={item} 
                                />
                                :
                                    <InputItem 
                                        key={index} 
                                        type="text" 
                                        placeholder={item} 
                                        value={inputValues[index] || ''} 
                                        onChange={(e) => setInputValue(e, index)} 
                                    />
                        ))
                    }

                    {/* კოდის ეს ფრაგმენტი პასუხისმგებელია ძირითადი მონაცემების გარდა 
                    მომხმარებლისთვის სასურველი სხვა მონაცემების შესაყვანად საჭირო შესაბამისი ველების დასამატებლად
                    ეს ფრაგმენტი აქტიურია მხოლოდ იმ შემთხვევაში როდესაც რიდესაც აქტიურია ძირითადი მონაცემების შეცვლის სექცია  updateAdvance = True */}
                        {updateAdvance?
                        <>{ 
                            inputFields.map((input, index) => (
                                <React.Fragment key={index}>{input}</React.Fragment>
                            ))
                          }

                            <div style={{display: product? 'none': 'flex'}} className='add-btn-conteiner'>
                            <samp>Add More</samp>
                                <CreacUserBtn  onClick={handleAddInput}>
                                    <img style={{width: '25px'}} src={AddIcon} alt="add info" />
                                </CreacUserBtn>
                            </div>
                        </> 
                        :null
                        }
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
                                    <select className='currency-select' id="Quantityunit">
                                            <option value="L">L</option>
                                            <option value="pcs">pcs</option>
                                            <option value="kg">kg</option>
                                            <option value="m">m</option>
                                            </select>

                            </div>
                    </article>

                        {/* <article> 
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
                        </article> */}

            </section>

            <div 
            
            onClick={updateAdvance? creatAdvanceinfo: creatnewproduct}

            className='advance-info-btn-conteiner' 
            style={{display: updateAdvance || product ? 'flex' : 'none'}}
            >
                <button disabled={loading} className='advance-info-btn'>Change Advence</button>
            </div>
    </div>

</>
        );
}

export default Addnewuser;
