import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './View.css';
import img from '../../img/slide_9.jpg';

interface Props {
  incart: string[];
  handleClickCart: Function;
  loading: boolean;
  setLoading: Function;
  cartbtn: Function;
  setFav: Function;
}


const Container = styled.div`
  width: 100%;
  overflow: auto;
  margin-top: 5px;
  max-height: 265px;
  flex: 1;
`;

const ProductConteiner = styled.div`
  width: 96%;
  margin: auto;
  margin-top: 5px;
  box-shadow: 0px 0px 2px 0.5px black inset;
  border-radius: 8px;
  height: 60px;
  display: flex;
  background-color: rgba(5, 22, 200, 0.3);
  cursor: pointer;
  position: relative;
`;

const ImgConteiner = styled.div`
  max-width: 70px;
  flex: 1;
  margin: 3px 5px;
  padding: 0px 3px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  box-shadow: 1px 0px 1px 0px black;

  & img {
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
  margin-top: 3px;
  display: flex;
  height: 50%;
  align-items: center;
  flex-direction: row-reverse;

  input {
    max-width: 20px;
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
    padding: 2px;
  }

  samp {
    height: 100%;
    display: flex;
    flex-direction: column;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 2px;
      height: 50%;
    }
  }
`;

const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5.5px);
  bottom: 0;
  top: 0px;
  font-size: 100%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
  color: red;
`;




interface CartItem {
  _id: string;
  // Other properties if they exist
}


const InCartConteiner = ({
  
  incart,
  handleClickCart,
  loading,
  setLoading,
}: Props) => {


  
  const [incartResponse, setInCartResponse] = useState<any[]>([]);


  

  // const initialQuantities = incartResponse.map(item => ({ id: item._id, quantity: 1 }));

  // Set the initial state of quantities
  const [quantities, setQuantities] = useState<{ id: string; quantity: number }[]>([]);

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);



      const fetchData = async () => {
      try {
        const option = { incart: incart };
        const checkCartItem = await fetch(`https://lavish-husky-gaura.glitch.me/checkCartItems`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(option),
        });
  
        if (!checkCartItem.ok) {
          throw new Error('not working');
        }
        
        const cartResponse = await checkCartItem.json();
        setInCartResponse(cartResponse);
        setLoading(false);

        if(quantities.length<=0){
const initialQuantities = cartResponse.map((item: CartItem)=> ({ id: item._id, quantity: 1 }));
      setQuantities(initialQuantities);

        }

      } catch (error) {
        console.log(error, "not Found");
      }
    };




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index].quantity = Number(e.target.value);
    setQuantities(newQuantities);
  }

  const handleIncrement = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index].quantity++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index: number) => {
    const newQuantities = [...quantities];
    newQuantities[index].quantity > 0 && newQuantities[index].quantity--;
    setQuantities(newQuantities);
  };


  useEffect(() => { fetchData(); }, [incart]);



  useEffect(() => {
    const totalcostF = async () => {
      let newTotalCost = 0;
      incartResponse.forEach((item, index) => {
        newTotalCost += item.price * quantities[index].quantity;
        console.log(quantities[index].quantity);
      });
      setTotalCost(newTotalCost);
      console.log(newTotalCost);
    };
  
    totalcostF();

    console.log(quantities)
  }, [incartResponse, quantities]);





  const removecart = async (ID: string, index: number) => {
    setLoading(true);
  
    handleClickCart(ID);
    setClickedIndex(index);



    console.log(quantities)

  

  };
          
  


  return (
    <>   
      <Container className="incar-conteiner">
        {incartResponse.map((producti, index) => (
          <ProductConteiner  id={`product${index}`} key={producti._id}>
            {loading && clickedIndex === index &&  <Loading >Please Wait</Loading>}
            <ImgConteiner>
              <img src={img} alt="img" />
            </ImgConteiner>
            <ProductInfoCont>
              <samp>Name: {producti.name.substring(0, 16)}{producti.owner.length > 16 && '...'}</samp>
              <samp>Price: {producti.price.toFixed(1)} {producti.currency}</samp>
              
              <samp>Cost: {(producti.price * quantities[index].quantity).toFixed(1)} {producti.currency}</samp>
              
            </ProductInfoCont>
            <div style={{display:'flex', height: '90%',  flexDirection: 'column', alignItems: 'center', position:'absolute', right:'5px'}}>
              <ProductQuantityCont >
                <samp>
                  <button  onClick={() => handleIncrement(index)}>+</button>
                  <button onClick={() => handleDecrement(index)}>-</button>
                </samp>
                <input type="number" onChange={(e) => handleChange(e, index)} value={quantities[index].quantity}  />
              </ProductQuantityCont>
              <ProductQuantityCont id={producti._id}>
                <button  onClick={() => removecart(producti._id, index)}> Delete</button>
              </ProductQuantityCont>
            </div>
          </ProductConteiner>
        ))}
      </Container>
      <div>Total Cost= {totalCost.toFixed(1)} {"$"} </div>
    </>
  );
};

export default InCartConteiner;
