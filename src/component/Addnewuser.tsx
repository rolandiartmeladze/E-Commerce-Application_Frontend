import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import '../style/ChangeAdvenceInfo.css';

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

    const { basice } = advanceData as { basice: any[] };
    const { more } = advanceData as { more: object; };
    const { selectcurrency } = more ? more as { selectcurrency: any[] } : { selectcurrency: [] };              
    const { selectquantity } = more ? more as { selectquantity: any[] } : { selectquantity: [] };              



    // განსაზღვრავს ლოდინის მომენტს მომხმარებლის 
    // მიერ გაგზავნილი მოთხოვნის შესაბამისად  
    const [loading, setLoading] = useState(false);


    // განსაზღვრავს კონკრეტულ მომენტში რომელი სეცია უნდა იყოსს აქტიური 
    // მონაცემების სწორ მისამართზე გაგზავნისთვის
    const [updateAdvance, setUpdateAdvance] = useState(false);
    const [product, setProduct] = useState(false);
    const addProductFunction = () => {
        product ? setProduct(false) : setProduct(true);
        setUpdateAdvance(false);
        }            
        const updateAdvanceFunction = () => {
                updateAdvance ? setUpdateAdvance(false) : setUpdateAdvance(true);
                setProduct(false);
            };
    //___

            // მომხმარების სურვილის შემთხვევაში ქმნის
            // დამატებითი შეყვანის ველებს 
            const [inputFields, setInputFields] = useState<JSX.Element[]>([]);
            const handleAddInput = () => {
                setInputFields(prevInputFields => [
                    ...prevInputFields,
                    <InputItem key={prevInputFields.length} type="text" />
                ]);
                };
            //___

                // იღებსე სერვერის მიერ დაბრუნებულ პასუხს 
                // განსაზღვრული ლოგიკის მიხედვეით
                const [response, setResponse] = useState({ message: ''});
    


                const advanceForm = document.getElementById('advanceForm');
                const advanceFormInputs: | HTMLCollectionOf<HTMLInputElement> | undefined = advanceForm?.getElementsByTagName("input");
                
                    const currencyElement = document.getElementById('currency') as HTMLSelectElement | null;
                    const quantityElement = document.getElementById('Quantityunit') as HTMLSelectElement | null;



                    const optimiseinfo = () => {

                        if (advanceFormInputs && currencyElement && quantityElement ) {

                            const inputsArray = Array.from(advanceFormInputs);
                                const selectedCurrency = currencyElement.value;
                                const selectedQuantity = quantityElement.value; 
                                    const AdvanceInfo: Record<string, any> = {};

                                        if(!updateAdvance){
                                            AdvanceInfo.Currency = selectedCurrency;
                                            AdvanceInfo.Quantityiunit = selectedQuantity;    
                                        } else {
                                            if(!AdvanceInfo.more){AdvanceInfo.more = {};}
                                                AdvanceInfo.more.currency = selectedCurrency;
                                                AdvanceInfo.more.quantity = selectedQuantity;                    
                                                AdvanceInfo.more.selectcurrency = selectcurrency;
                                                AdvanceInfo.more.selectquantity = selectquantity;
                                                }
                                            
                                                inputsArray.forEach((item, index) => {
                                                    if (!updateAdvance) {
                                                        AdvanceInfo[basice[index]] = item.value;
                                                        } else {
                                                            if (!AdvanceInfo.basice) {AdvanceInfo.basice = [];}
                                                                AdvanceInfo.basice.push(item.value);
                                                        }
                                                });
                                                

                                                return AdvanceInfo;
                        }
                    }



            const updateadvance = async () => {

                const advanceInfo = optimiseinfo();

                console.log(advanceInfo)

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
        

            };





        
            const addnewproduct = async () => {
                const advanceInfo = optimiseinfo();

                console.log(advanceInfo)

                try {
                    const response = await fetch('http://localhost:80/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(advanceInfo)
                    });
                          const data = await response.json();
                          if (data.user) {
                            setResponse({ message: data.message});
                        } else {
                            setResponse({ message: data.message}); 
                        }
                    } catch (error) {
                    console.error('Error creating user:', error);
          
                  } finally {
                    setLoading(false);
                    // console.log(userData);
                      console.log(advanceInfo)
          
                      // __001
                    // fetchData();
                  }
              };


        
              

            //   const basiceinfo = advanceData.basice;
        
            console.log(basice)


            const [inputValues, setInputValues] = useState<string[]>([]);

            const setInputValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
                const newValue = e.target.value;
                setInputValues(prevValues => {
                    const updatedValues = [...prevValues];
                    updatedValues[index] = newValue;
                    return updatedValues;
                });
            };
            
            const handleClick = (type: string) => {
                if (type === 'advance') {
                    updateAdvanceFunction();
                } else if (type === 'product') {
                    addProductFunction();
                }
            };


return (
<>

            <div className={
                !updateAdvance && !product ?
                'update-advanse' :
                'update-advanse update-advanse-active'
            }>



                    <div className={'update-advanse-head'}>
                        <h1 style={{ display: 'flex', alignItems: 'center' }} onClick={() => handleClick('advance')}>
                            <samp style={{ color: !updateAdvance ? 'black' : 'red', padding: '7px' }}>Change Advance User Info</samp>
                            <samp style={{ display: 'flex' }}>
                                <img className={!updateAdvance ? 'aarowRight' : 'aarowRight aarowRight-active'} src={ArrowRigth} alt=""  />
                            </samp>
                        </h1>

                        <h1 style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }} onClick={() => handleClick('product')}>
                            <samp style={{ color: !product ? 'black' : 'red', padding: '7px' }}>Add Product</samp>
                            <samp style={{ display: 'flex' }}>
                                <img className={!product ? 'aarowRight' : 'aarowRight aarowRight-active'} src={ArrowRigth} alt=""  />
                            </samp>
                        </h1>
                    </div>


            <section className = {
                !updateAdvance && !product ? 
                'change-info-conteiner' : 'change-info-conteiner-active change-info-conteiner' 
                }>

                <article style={{ overflowY: 'scroll',width:'60%'}}>
                    <h1>{updateAdvance? ' Add Basice Info': 'Add product info'}</h1>

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

                            <div className='add-btn-conteiner'>
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

                    <article style={{width: '35%'}}> 
                        <h1> Currency/Quantity </h1> 

                        <div className='selection-conteiner'>
                            <h2 className='currency-label'>Choose a Currency:</h2>
                                <select className='currency-select' id="currency">
                                    {selectcurrency?.map((corrency, index) => (<option key={index} value={corrency}>{corrency}</option>))}
                                </select>
                        </div>

                            <div className='selection-conteiner'>
                                <h2 className='currency-label'>Choose a Quantity:</h2>
                                    <select className='currency-select' id="Quantityunit">
                                        {selectquantity?.map((quantity, index) => (<option key={index} value={quantity}>{quantity}</option>))}
                                    </select>
                            </div>

                    </article>

            </section>

            <div 
            onClick={updateAdvance? updateadvance: addnewproduct}
            className='advance-info-btn-conteiner' 
            style={{display: updateAdvance || product ? 'flex' : 'none'}}
            >
                <button disabled={loading} className='advance-info-btn'> {updateAdvance? 'Change Advence':'Add New Product'}</button>
            </div>
    </div>

</>
        );
}

export default Addnewuser;
