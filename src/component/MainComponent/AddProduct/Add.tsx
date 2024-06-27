import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import addImage from '../../../icon/add_photo.svg';
import call from '../../../icon/call.svg';
import mail from '../../../icon/mail.svg';
import loc from '../../../icon/loc.svg';

const Header = styled.h1`
  border-bottom-left-radius: 5px;
  text-align: left;
  background-color: rgb(1, 1, 201, 0.4);
  padding: 3px 8px;

  @media (max-width: 750px) {
    border-radius: 0px;
  }
`;

const FormElement = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 12px;
  // max-width: 1024px;

  @media (max-width: 750px) {
    margin-top: 4px;
    padding: 5px 0px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0px 25px;

  div {
    display: flex;
  }

  h3 {
    margin: 0px;
    text-align: left;
    display: inline-block;
    padding-bottom: 2px;
    position: relative;
    text-decoration: underline;
  }

  @media (max-width: 750px) {
    width: 100%;
    margin: 6px 25px;
  }

  @media (max-width: 500px) {
    margin: 10px auto;
    width: 90%;

    div {
      max-width: 98%;
      margin-left: 2%;
      flex-direction: column;
    }
  }
`;

const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;
  padding: 6px;
  background-color: rgb(120, 18, 4, 0.1);

  input,
  textarea,
  select {
    flex: 1;
    box-shadow: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    color: #333;
    outline: none;
  }
  label {
    width: auto;
    margin-right: 4px;
    text-align: left;
    flex: 1;
  }

  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 10px;
    top: -1px;
    left: -10px;
    background-color: red;
    padding: 1px 0px;
    border-radius: 6px 0px 0px 6px;

    @media (max-width: 500px) {
      input,
      textarea {
        width: 90%;
        margin-left: 10px;
      }

      label {
        font-weight: bolder;
        margin: 4px;
      }
    }

    @media (max-width: 750px) {
      width: 4px;
      left: -4px;
    }
  }
`;

const StyledContactInfo = styled.div`
  flex-direction: column;
  position: relative;
  padding: 6px;
  background-color: rgb(221, 51, 1, 0.1);

  img {
    width: 25px;
    margin-top: 3px;
  }
  div {
    display: flex;
    margin: 3px 5px;
  }

  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 10px;
    top: 0px;
    left: -10px;
    background-color: blue;
    padding: 0px 0px;
    border-radius: 6px 0px 0px 6px;

    @media (max-width: 750px) {
      width: 4px;
      left: -4px;
    }
  }

  @media (max-width: 750px) {
    div {
      display: flex;
      display: flex;
      width: 90%;
      flex-direction: row;
    }
  }
`;

const MediaInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 6px;
  background-color: rgb(120, 118, 4, 0.1);

  div {
    justify-content: space-evenly;
  }
  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 10px;
    top: -1px;
    left: -10px;
    background-color: green;
    padding: 1px 0px;
    border-radius: 6px 0px 0px 6px;

    @media (max-width: 750px) {
      width: 4px;
      left: -4px;
    }
  }
`;

const Propertyes = styled.div`
        display: flex;
        flex-direction: column;
        background-color: rgb(90,11,68, 0.1);
        padding: 6px;
        position: relative;
        div{margin: 3px 0px;
          display: flex;
    flex-direction: row;
        }
        h4{margin: 0px 6px;}
        select {
          flex: 1; 
          padding: 4px;
          border: none;
          outline: none;
          background: none;
          color:red;
        }
    
&:after {
  position: absolute;
  content: "";
  height: 100%;
  width: 10px;
  top: -1px;
  left: -10px;
  background-color: yellow;
  padding: 1px 0px;
  border-radius: 6px 0px 0px 6px;

  @media (max-width: 750px) {
    width: 4px;
    left: -4px;

  }
}
  @media (max-width: 500px) {

    input, textarea {
      width: 90%;
      margin-left: 10px;

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
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHoverColor || 'darkblue'};
  }
  &:active {
    transform: scale(0.98);
  }
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
  background-color: #b83e3e6e;
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
  max-width: 300px;

  div {
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

    img {
      width: auto;
      max-width: 98%;
      height: auto;
      max-height: 98%;
      border-radius: 3px;
    }
  }

  @media (max-width: 750px) {
    display: flex;
    max-width: 90%;

    flex-direction: row !important;
  }
`;

interface Props {
  User: any;
}

const AddProduct = ({ User }: Props) => {
  const [loading, setLoadin] = useState<boolean>(false);

  const currencies = ['₾', '$', '€', '£', '₺'];
  const currencyOptions = currencies.map((currency, index) => (
    <option key={index} value={currency}>
      {currency}
    </option>
  ));

  const quantities = ['L', 'pcs', 'kg', 'm'];
  const quantityOptions = quantities.map((quantity, index) => (
    <option key={index} value={quantity}>
      {quantity}
    </option>
  ));

  const cattegorys = ['All', 'Clothing', 'Technique', 'Food', 'Accessories'];
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
  const [quantityiunit, setQuantityiunit] = useState('L');
  const [category, setCategory] = useState('All');

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

  const Info = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = '';
    for (let i = 0; i < 2; i++) {
      id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 6; i++) {
      id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

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
      id,
      view: 0,
      sale: 0,
      phone: User.phone,
      userID: userId,
      share: 0,
      location,
      currency,
      quantityiunit,
      category,
      owner,
    };
    return productData;
  };

  const addFunction = async () => {
    const serverlink = 'https://lavish-husky-gaura.glitch.me';

    try {
      setLoadin(true);
      // Step 1: Create the product
      const data = Info();
      const createProductResponse = await fetch(
        `https://quasar-wind-trader.glitch.me/createProduct`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (!createProductResponse.ok) {
        throw new Error('Failed to create product');
      }

      const newProduct = await createProductResponse.json();
      console.log('New product created:', newProduct);

      // Step 2: Upload images
      const formData = new FormData();
      formData.append('newProduct', JSON.stringify(newProduct));
      formData.append('User', User._id);

      images.forEach((image, index) => {
        formData.append(`photo_${index}`, image);
      });

      const uploadImagesResponse = await fetch(
        'https://embarrassing-unifor.000webhostapp.com/Upload.php',
        {
          method: 'POST',
          body: formData,
        }
      );

      //   const uploadImagesResponse = await fetch('/Upload.php', {
      //     method: "POST",
      //     body: formData,
      // });

      if (!uploadImagesResponse.ok) {
        throw new Error('Failed to upload images');
      }

      const filenames = await uploadImagesResponse.json();
      console.log('Image filenames:', filenames);

      // Step 3: Update product with image filenames
      const addImageResponse = await fetch(
        `${serverlink}/addImage/${newProduct}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filenames),
        }
      );

      if (!addImageResponse.ok) {
        throw new Error('Failed to update product with image filenames');
      }

      const updatedProduct = await addImageResponse.json();
      console.log('Product updated with image filenames:', updatedProduct);

      const Form = document.getElementById('FormElement') as HTMLFormElement;
      Form.reset();
      setImages([]);
      setLoadin(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 750;
  const ContactOrder = { order: '-1' };

  return (
    <>
      <Header>Add New Products</Header>

      <FormElement id="FormElement">
        {loading && (
          <h1
            style={{
              position: 'absolute',
              width: '99%',
              height: '100%',
              backgroundColor: 'rgb(1,1,1, 0.3)',
              zIndex: '3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading...
          </h1>
        )}

        <ProductInfo>
          <StyledProductInfo>
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
                style={{ flex: '2' }}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Comment:</label>
              <textarea
                style={{ flex: '2' }}
                placeholder="Comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </StyledProductInfo>
        </ProductInfo>

        <ProductInfo style={isMobile ? ContactOrder : undefined}>
          <StyledContactInfo>
            <h3>Contact Info:</h3>

            <div>
              <img src={call} alt="Phone" />
              <div>{User.phone}</div>
            </div>

            <div>
              <img src={mail} alt="Mail" />
              <div>{User.email}</div>
            </div>

            <div>
              <img src={loc} alt="Location" />
              <div>{User.address}</div>
            </div>
          </StyledContactInfo>

          <MediaInfo>
            <ImagesConteiner>
              <h3 style={{ width: '100%' }}>Upload Media:</h3>

              {images.map((item, index) => (
                <div key={index}>
                  <img src={URL.createObjectURL(item)} alt={`image ${index}`} />
                </div>
              ))}
            </ImagesConteiner>

            <FileInputWrapper>
              <FileInput onChange={Select} type="file" id="file" />
              <FileInputLabel htmlFor="file">
                <img src={addImage} alt="Add Image" />
              </FileInputLabel>
            </FileInputWrapper>
          </MediaInfo>
        </ProductInfo>

        <ProductInfo>
          <Propertyes>
            <h3> Select Properties </h3>

            <div>
              <label>
                <h4>Currency:</h4>
              </label>
              <select
                onChange={(e) => setCurrency(e.target.value)}
                className="currency-select"
                id="currency"
              >
                {currencyOptions}
              </select>
            </div>

            <div>
              <label>
                <h4>Quantity:</h4>
              </label>
              <select
                onChange={(e) => setQuantityiunit(e.target.value)}
                className="currency-select"
                id="Quantityunit"
              >
                {quantityOptions}
              </select>
            </div>

            <div>
              <label>
                <h4>Category:</h4>
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                id="CategoryOptions"
              >
                {categoryOptions}
              </select>
            </div>
          </Propertyes>
        </ProductInfo>
      </FormElement>

      <div
        style={{
          marginTop: '8px',
          height: '40px',
          backgroundColor: 'rgb(35, 15, 15, 0.2)',
          padding: '6px 0px',
          borderRadius: '5px',
        }}
      >
        <Button type="submit" onClick={addFunction}>
          Add Product
        </Button>
      </div>
    </>
  );
};

export default AddProduct;
