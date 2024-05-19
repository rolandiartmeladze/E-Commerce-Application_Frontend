import React, {useState, useEffect} from "react";
import styled from "styled-components";

import addImage from '../../../icon/add_photo.svg';


  const Header = styled.h1`
        border-bottom-left-radius: 5px;
        text-align: left;
        background-color: rgb(1, 1, 201, 0.4);
        padding: 3px 8px;

        @media (max-width: 500px) {
        border-radius: 0px;
        }
      `;


const FormElement = styled.form`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px 0px;
    justify-content: flex-start;
    margin-top: 12px;

    ul{display: flex;}
  `;



  const ProductInfo = styled.div`
    display: flex; 
    flex-direction: column;
    gap: 5px;
    margin: 0px 25px;
  
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
  
    input, textarea, select {
      flex: 1; 
      box-shadow: none;
      border: 1px solid #ccc;
      border-radius: 4px; 
      padding: 8px; 
      font-size: 16px; 
      color: #333; 
      outline: none; 
    }
  
    select {
      flex: 2; 
      padding: 4px;
      border: none;
      outline: none;
    }
  
    h3 {
      margin: 0px;
      text-align: left;
      display: inline-block;
      padding-bottom: 5px;
      position: relative;
  
      &:before {
        position: absolute;
        content: '';
        height: 4px;
        width: 100%;
        bottom: 0;
        background: linear-gradient(to right, rgba(1, 71, 51, 0.5) 0%, transparent 100%);
      }
    }
  
    h4 {
      margin: 0px; 
      margin-right: 5px;
    }
  
    @media (max-width: 750px) {
      width: 100%;
      margin: 6px 25px;
  
      input, textarea {
        flex: 3.5 !important;
      }
    }
  
    @media (max-width: 500px) {
      margin: 6px auto;
      width: 90%;
  
      div {
        max-width: 90%;
        flex-direction: column;
      }
  
      input, textarea {
        width: 100%;
        margin-left: 10px;

      }
  
      label {
        font-weight: bolder;
      }
    }
  `;
  
  


           const StyledProductInfo = styled.div`
                  flex-direction: column;
                  position: relative;
                    h3, h4 {margin: 0;}
                      div{
                          display:flex;
                          margin: 3px 5px;
                      }


                    &:before {
                      position: absolute;
                      content: "";
                      height: 100%;
                      width: 100%;
                      top: -4px;
                      left: -4px;
                      background: linear-gradient(to right, rgb(221,51,1,0.3) 0%, transparent 100%);
                      z-index: -1;

                      padding: 4px;
                    }
                    &:after {
                      position: absolute;
                      content: "";
                      height: 100%;
                      width: 10px;
                      top: -4px;
                      left: -14px;
                      background-color: blue;
                      padding: 4px 0px;
                      border-radius: 6px 0px 0px 6px;

                    }

                    @media (max-width: 500px) {
                      div{
                        display:flex;
                        display: flex;
                        width: 100%;
                        flex-direction: row;

                      }
                      }
              

`;

  const Button = styled.button`
        padding: 10px;
        border-radius: 4px;
        margin-right: 15px;
        float: right;
        background-color: ${({ theme }) => theme.primaryColor || 'rgb(60,113,129)'};
        color: ${({ theme }) => theme.primaryTextColor || 'white'};
        border: none;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;

        &:hover {background-color: ${({ theme }) => theme.primaryHoverColor || 'darkblue'};}
        &:active {transform: scale(0.98);}
        &:focus {
          outline: 2px solid ${({ theme }) => theme.primaryFocusColor || 'darkblue'};
          outline-offset: 2px;
        }
      `;

  const FileInputWrapper = styled.div`
        position: relative;
        display: inline-block !important;
        width: 50px;
        height: 50px;
        border-radius: 8px;
        margin: 8px;    

      `;

const FileInput = styled.input`
      position: absolute;
      left: -9999px;
    `;

const FileInputLabel = styled.label`
      display: inline-block;
      padding: 4px;
      background-color:#b83e3e6e;
      color: white;
      border: none;
      cursor: pointer;
      height: 100%;
      border-radius: 8px;
      box-shadow: 2px 2px 5px 2px black;
      transition: 0.4s ease;

      &:hover { box-shadow: 0px 0px 1px 0.5px black; }
      &:focus {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
      }
    `;


const ImagesConteiner = styled.div`
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      align-items: center !important;
      max-width: 300px;

      div{
        display: flex;  
        width: 55px;
        height: 55px;
        margin-top: 6px;
        padding: 3px;
        box-shadow: 0px 0px 3px 1px black;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 6px;

        img{
          width: auto;
          max-width: 98%;
          height: auto;
          max-height: 98%;
          border-radius: 3px;
        }
      } 

    `;

interface Props{User:any;}

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
  




    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');

    // const [location, setLocation] = useState(User.address);

    const [currency, setCurrency] = useState('₾');
    const [quantityiunit,  setQuantityiunit] = useState('L');
       const [category,  setCategory] = useState('All');
 


    const [images, setImages] = useState<File[]>([]);

    const Select = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedImages = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...selectedImages]);
        console.log(selectedImages);
      }
    };
    

      const userId = localStorage.getItem('token');
      const owner = localStorage.getItem('user');
      const location = localStorage.getItem('address');


    const Info = () =>{
  
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let period = 'AM'; 
      
      if (hours >= 12) { period = 'PM';
          if (hours > 12) {  hours -= 12; }
       }
      
      minutes = typeof minutes === 'string' ? parseInt(minutes, 10) : minutes;
      const datatime = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;

      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let id = '';
      for (let i = 0; i < 2; i++) {id += letters.charAt(Math.floor(Math.random() * letters.length));}
      for (let i = 0; i < 6; i++) {id += numbers.charAt(Math.floor(Math.random() * numbers.length));}


     const insertedItems: any = [];    
      images.forEach((item: File, index: number) => {
        if (item instanceof File) {
          let name = id;
          insertedItems.push({ [`${name}_${index}`]: item });
        } else {
          // Skip non-File items
        }
      });




      const productData = {
            name, address, quantity, price, description, comment,
            email: User.email, id, datatime, view: 0, sale: 0,
            phone: User.phone, userID: userId, share: 0,  
            location, currency, quantityiunit, category, owner,
          };
        return productData;
    }




    const addFunction = async () => {
      
      const serverlink = 'https://lavish-husky-gaura.glitch.me';

      try {
        // Step 1: Create the product
        const data = Info();
        const createProductResponse = await fetch(`${serverlink}/createProduct`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    
        if (!createProductResponse.ok) {
            throw new Error("Failed to create product");
        }
    
        const newProduct = await createProductResponse.json();
        console.log("New product created:", newProduct);
    
        // Step 2: Upload images
        const formData = new FormData();
        formData.append('newProduct', JSON.stringify(newProduct));
        formData.append('User', User._id);
    
        images.forEach((image, index) => {
            formData.append(`photo_${index}`, image);
        });
    
        const uploadImagesResponse = await fetch('https://embarrassing-unifor.000webhostapp.com/Upload.php', {
            method: "POST",
            body: formData,
        });
    
      //   const uploadImagesResponse = await fetch('/Upload.php', {
      //     method: "POST",
      //     body: formData,
      // });

        if (!uploadImagesResponse.ok) {
            throw new Error("Failed to upload images");
        }
    
        const filenames = await uploadImagesResponse.json();
        console.log("Image filenames:", filenames);
    
        // Step 3: Update product with image filenames
        const addImageResponse = await fetch(`${serverlink}/addImage/${newProduct}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filenames),
        });
    
        if (!addImageResponse.ok) {
            throw new Error("Failed to update product with image filenames");
        }
    
        const updatedProduct = await addImageResponse.json();
        console.log("Product updated with image filenames:", updatedProduct);

        const Form = document.getElementById('FormElement') as HTMLFormElement;
        Form.reset();
        setImages([]);


    } catch (error) {
        console.error("Error:", error);
    }
        


    }
    

    return(
        <>          
        
        <Header>Add New Products</Header>

        <FormElement id="FormElement">

        <ProductInfo>
          
          <h3>Product Info:</h3>

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

        <ProductInfo>
<StyledProductInfo>
<h3>Contact Info:</h3>

  <div>
    <h4>Phone:</h4>
    <div>{User.phone}</div>
  </div>

  <div>
    <h4>Email:</h4>
    <div>{User.email}</div>
  </div>

  <div>
    <h4>Location:</h4>
    <div>{User.address}</div>
  </div>

  </StyledProductInfo>


<ImagesConteiner style={{marginTop: '12px'}}>
<h3 style={{width: '100%'}}>Upload Media:</h3>

  {images.map((item, index) => (
  <div key={index}>
    <img src={URL.createObjectURL(item)} alt={`image ${index}`} />
  </div>
))}

</ImagesConteiner>


  <FileInputWrapper >

      <FileInput onChange={Select} type="file" id="file" />
      <FileInputLabel htmlFor="file">
        <img src={addImage} alt="Add Image" />
      </FileInputLabel>
    </FileInputWrapper>


</ProductInfo>

<ProductInfo>
<h3> Select Properties </h3>

        <div>
          <label><h4>Currency:</h4></label>
            <select onChange={(e) => setCurrency(e.target.value)} className="currency-select" id="currency">
              {currencyOptions}
            </select>
        </div>

        <div>
          <label><h4>Quantity:</h4></label>
          <select onChange={(e) => setQuantityiunit(e.target.value)}  className="currency-select" id="Quantityunit">
          {quantityOptions}
          </select>
        </div>

        <div>
          <label><h4>Category:</h4></label>
          <select  onChange={(e) => setCategory(e.target.value)} id="CategoryOptions">
          {categoryOptions}
          </select>
        </div>

</ProductInfo>

        </FormElement>

        <div>
                      <Button  type="submit"
                              onClick={addFunction}>
                        Add Product
                        </Button>
                  </div>

        </>
    );
};

export default AddProduct;