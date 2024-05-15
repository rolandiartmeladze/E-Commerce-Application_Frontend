import React, {useState, useEffect} from "react";
import styled, { css }  from "styled-components";
import ArrowRigth from "../../../icon/arrow.png";

import addImage from '../../../icon/add_photo.svg';
import '../../CreatNewProduct/AddProducte.css';

const FormElement = styled.form`
display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 10px 0px;
    justify-content: flex-start;

    ul{
      display: flex;
    }
    
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

    select{
      flex: 2;
    }
    h4{
      margin: 0px;
    }
    h4{
      margin: 0px; 
      margin-right: 5px;
    }
    
    
  `;


  const FileInputWrapper = styled.div`
    position: relative;
    display: inline-block !important;
    width: 50px;
    height: 50px;
    border-radius: 8px;
margin: 8px;    


    // img{
    //   width: 50px;
    // }

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

&:hover {
  box-shadow: 0px 0px 1px 0.5px black;
}
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
margin-top: 12px;

max-width: 300px;
div{

  display: flex;  
  width: 60px;
  max-width: 22%;
  max-height: 60px;
  margin-top: 6px;
  padding: 3px;
  box-shadow: 0px 0px 3px 1px black;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 6px;
  
} 
 img{
  width: auto;
  max-width: 90%;
  height: 90%;
  max-height: 60px;
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
      let period = 'AM'; // Default period is AM
      
      // Adjust hours and period for PM format
      if (hours >= 12) {
          period = 'PM';
          if (hours > 12) {
              hours -= 12;
          }
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
        name,
        address,
        quantity,
        price,
        description,
        comment,
        email: User.email,
        phone: User.phone,
        location,
        currency,
        quantityiunit,
        category,
        owner,
        view: 0,
        sale: 0,
        userID: userId,
        datatime,
        share: 0,
        id,
    };

    return productData;
      
    }




    const addFunction = async () => {
      
      const serverlink = 'https://lavish-husky-gaura.glitch.me';

      try {
        const Data = Info();
        const response = await fetch(`${serverlink}/createProduct`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Data),
        });
    

        if (!response.ok) {
            throw new Error("Failed to fetch advance data");
        }
    
        const newProduct = await response.json();
        console.log(newProduct);


            const formData = new FormData();
        formData.append('newProduct', newProduct); 
        formData.append('User', User._id); 


        images.forEach((image, index) => {
          formData.append(`photo_${index}`, image);
      });

      try {


      


        const response =  await fetch('./Upload.php', {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const filenames = await response.json(); 

      if(filenames){

        const addImage = await fetch(`${serverlink}/addImage/${newProduct}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filenames),
      });
      
      if (!addImage.ok) {
          throw new Error("Failed to fetch advance data");
      }
      
      const updatedProduct = await addImage.json();
      console.log(updatedProduct);
    
    }



      console.log(filenames); 
      
      
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }

    } catch (error) {
        console.error("Error:", error);
    }
    


    }

      console.log(Info());
      
    


    
    return(
        <>          
        
        <h1>Add New Products</h1>

        <FormElement  action="Upload.php" method="POST">

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

<ProductInfo>

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


<ImagesConteiner>
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
          <select  onChange={(e) => setCategory(e.target.value)}   className="currency-select" id="CategoryOptions">
          {categoryOptions}
          </select>
        </div>

</ProductInfo>

        </FormElement>

        {!addMode ? <div className="advance-info-btn-conteiner" >
                      <button  type="submit"
                              className="advance-info-btn"
                              onClick={addFunction}>
                        {"Add New Product"} </button>
                  </div>:null}

        </>
    );
};

export default AddProduct;