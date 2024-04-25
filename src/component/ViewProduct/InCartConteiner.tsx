import React, {  useState } from "react";
import styled from "styled-components";
import './View.css';



import img from '../../img/slide_9.jpg';




interface Props{
          incart:string[];
          incartResponse:any[];
          handleClickCart:Function;
          checkcart:Function;
          }








                    const Container = styled.div`
                    width: 100%;
                    overflow: auto;
                    margin-top: 5px;
                    max-height: 265px;
                    flex: 1;
                `;
                
                      const ProductConteiner = styled.div`
                            width:  96%; 
                            margin:  auto; 
                            margin-top:  5px; 
                            box-shadow:  0px 0px 2px 0.5px black inset; 
                            border-radius:  8px; 
                            height:  60px; 
                            display: flex;
                            background-color: rgb(5, 22,200, 0.3);
                            cursor: pointer;
                            position:relative;
                      `;


                      const ImgConteiner = styled.div`
                            max-width:  70px; 
                            flex:  1; 
                            margin: 3px 5px; 
                            padding: 0px 3px; 
                            border-radius: 5px;
                            align-items: center;
                            justify-content: center;
                            display: flex;
                            box-shadow:  1px 0px 1px 0px black; 

                              & img{
                                max-width: 98%;
                                max-height: 98%;
                                border-radius: 5px;
                              }
                              
                      `;

                      const ProductInfoCont = styled.div`
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        align-items: flex-start;

                      `;

                      const ProductQuantityCont = styled.div`
                      margin-left: 10px;
                      margin-top: 4px;
                      display: flex;
                      flex-direction: row;
                      height: 25px;
                      align-items: center;

                        input {
                          max-width: 35px;
                          text-align: center;
                          border-radius: 2px;
                          border: none;
                          outline: none;
                          margin: 2px;
                          padding: 3px;

                          -moz-appearance: textfield;
                          &::-webkit-inner-spin-button {
                              -webkit-appearance: none;
                          }
                          &::-webkit-outer-spin-button {
                              -webkit-appearance: none;
                          }
                          
                      }
                      button {
                            cursor: pointer;
                        }
                      `;

                      

      const InCartConteiner = ({incartResponse, incart, handleClickCart, checkcart}:Props) => {

        const inputnumb = incartResponse.length || incart.length;


        const [quantities, setQuantities] = useState(Array(inputnumb).fill(1));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const newQuantities = [...quantities];
        newQuantities[index] = e.target.value;
        setQuantities(newQuantities);
    }


    const handleIncrement = (index:number) => {
      const newQuantities = [...quantities];
      newQuantities[index]++;
      setQuantities(newQuantities);
  };

  const handleDecrement = (index:number) => {
      const newQuantities = [...quantities];
      newQuantities[index] > 0 && newQuantities[index]--;
      setQuantities(newQuantities);
  };

      let totalCost = 0;
      incartResponse.forEach((item,index) =>{
    totalCost +=  item?.price * quantities[index];
  })


        const removecart = (ID:string) =>{
           const item = ID;
           handleClickCart(item);
            checkcart();

        }

    return(
                      
                     <>   
                      <Container className="incar-conteiner">
                    {incartResponse.map((producti, index) => (
                        <ProductConteiner key={producti._id}>
                            <ImgConteiner>
                                <img src={img} alt="img" />
                            </ImgConteiner>

                              <ProductInfoCont>
                                <samp>Name: {producti.name.substring(0, 16)}{producti.owner.length > 16 && '...'}</samp>
                                <samp>Price: {producti.price.toFixed(1)} {producti.currency}</samp>
                                <samp>Cost: {(producti.price * quantities[index]).toFixed(1)} {producti.currency}</samp>
                              </ProductInfoCont>
                                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', position:'absolute', right:'7px'}}>
                              <ProductQuantityCont>
                              <button  onClick={() => handleIncrement(index)}>+</button>
                              <input type="number" onChange={(e) => handleChange(e, index)} value={quantities[index]}  />
                              <button onClick={() => handleDecrement(index)}>-</button>
                              </ProductQuantityCont>

                              <ProductQuantityCont>
                              
                              <button onClick={()=>{removecart(producti._id)}} >Delete</button>
                              </ProductQuantityCont>
                                      </div>



                        </ProductConteiner>
                      ))}

                      </Container>
                      <div>Total Cost= {totalCost} {"$"} </div>
</>

          );
 };

 export default InCartConteiner;