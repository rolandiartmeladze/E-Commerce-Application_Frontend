import React, {useState, useEffect} from "react";
import styled, { css }  from "styled-components";
import ArrowRigth from "../../../icon/arrow.png";

import addImage from '../../../icon/addimage.png';
import '../../CreatNewProduct/AddProducte.css';

const FormElement = styled.form`
display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px 0px;

    ul{
      display: flex;
    }
    
    `;


    const ProductInfo = styled.div`
    display: flex; 
    flex-direction: column;
    gap: 2px;
    margin-left: 6px;
  
    div {
      display: flex;
      align-items: flex-start;      
    }
  
    label {
      width: auto; 
      margin-right: 4px; 
      text-align: left;
      flex: 1;
    }
  
    input, textarea {
      flex: 1; 
      box-shadow: none;
      border: 1px solid #ccc;
      border-radius: 4px; 
      padding: 8px; 
      font-size: 16px; 
      color: #333; 
      outline: none; 
    }
  `;


interface Props{
  User:any;
}

const AddProduct =({User}:Props)=>{


  const currencies = ["₾", "$", "€", "£", "₺"];

  const currencyOptions = currencies.map((currency, index) => (
    <option key={index} value={currency}>
      {currency}
    </option>
  ));
  
  const quantities = ["L", "pcs", "kg", "m"];
  
  const quantityOptions = quantities.map((quantity, index) => (
    <option key={index} value={quantity}>
      {quantity}
    </option>
  ));
  
  const cattegorys = ["All","Clothing","Technique","Food","Accessories"];
  
  const categoryOptions = cattegorys.map((cattegory, index) => (
    <option key={index} value={cattegory}>
      {cattegory}
    </option>
  ));
  



    const [addMode, setAddMode] = useState<boolean>(false)

    const addProductF = () => {addMode ? setAddMode(false) : setAddMode(true);};

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');

    const [email, setEmail] = useState(User.email);
    const [phone, setPhone] = useState(User.phone);
    const [location, setLocation] = useState(User.address);



    
    

    return(
        <>          
        
        <h1>Add New Products</h1>

        <FormElement>

        <ProductInfo>
  <div>
    <label>Name:</label>
    <input
      type="text"
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
    />
  </div>

    <div>
      <label>Address:</label>
      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

          <div>
            <label>Description:</label>
            <textarea
              style={{flex: '2'}}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

            <div>
              <label>Comment:</label>
              <textarea 
                style={{flex: '2'}}
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

</ProductInfo>

<ProductInfo style={{marginLeft: '25px'}}>

  <div>
    <label>Phone:</label>
    <input value={User.phone} placeholder="phone" type="text" disabled />
  </div>

  <div>
    <label>Email:</label>
    <input value={User.email} placeholder="email" type="text" disabled />
  </div>

  <div>
    <label>Location:</label>
    <input value={User.address} placeholder="location" type="text" disabled />
  </div>


  {/* {inputFields.map((input, index) => (
    <div className="additionalInputConteiner" key={index}>
      {input}
    </div>
  ))} */}

  <div style={{marginBottom: '5px'}}
    id="addimageid"
    // onClick={() => handleItemClick("file", "img")}
    className="add-btn-conteiner"
  >
    <div className="addnewinputicon">
      <img src={addImage} alt="add info" />
    </div> Add image
  </div>

</ProductInfo>


<ProductInfo>

<div className="selection-conteiner">
          <h2 className="currency-label">Choose a Currency:</h2>
            <select className="currency-select" id="currency">
              {currencyOptions}
            </select>
        </div>

        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Quantity:</h2>
          <select className="currency-select" id="Quantityunit">
          {quantityOptions}
          </select>
        </div>

        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Category:</h2>
          <select className="currency-select" id="CategoryOptions">
          {categoryOptions}
          </select>
        </div>


</ProductInfo>

        </FormElement>
        </>
    );
};

export default AddProduct;