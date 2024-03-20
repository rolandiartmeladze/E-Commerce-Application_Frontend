import React, {useEffect, useState } from 'react';
import styled from 'styled-components';

// Define the styled input component
interface UserContainerProps {
  userData: any[]; 
  setUserData: React.Dispatch<React.SetStateAction<any[]>>
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
const LoadConteiner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5.5px);
  bottom: 0;
  font-size: 200%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;
const Additem = styled.button`
  padding: 5px;
  background: none;
  backdrop-filter: blur(2.5px);
  border-radius: 8px;
  position: relative;
  cursor: pointer;
    max-width: 100px;
    margin-bottom: 3px;
    margin-right: 12px;
    transition: 0.3 ease-in-out;

    &:hover {
      color: red;
      font-weight: 700;
      border: solid 2px red;
    }
    `;
const Newproducteaddform = styled.form`
  width: 70%;
  display: flex;
  align-content: center;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 10px;
`; 
const CreacUserHead = styled.h1`
      width:100%; 
      max-height:15%; 
      background-color: gray;
`;

const CreacUserConteiner = styled.div`
      width: 100%;
      min-height: 65px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
`;

function CreatNewUser({ userData, setUserData }: UserContainerProps) {



  const [response, setResponse] = useState({ message: '', name: '', address: '' });
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const AddItemValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
        case 'itemname': setItemName(value); break;
        case 'itemaddress': setLocation(value); break;
        case 'itemquantity': setQuantity(value); break;
        case 'itemprice': setPrice(value); break;
        case 'itemdescription': setDescription(value); break;
        default: break;
    }
};
      // მომხმარებლის შექმნის შემდეგ 
      // აგზავნის მოთხოვნას GET მონაცემთა ბაზაში
      // განახლიბული მონაცემების ასახვისთვის
      // ___001
      
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:80/checkUsers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      // ფუნქცია აგზავნის მოთხოვნას POST მონაცემთა ბაზაში 
      // ახალი მომხმარებლის დასამატებლად
      // form ელემენტიდან მიღებული მონაცემების მიხედვით

      const createdUser = async () => {

        setLoading(true);
        const newUser = { 
              name: itemName, 
              address: location, 
              price: price, 
              quantity: quantity, 
              description: description 
            };

        try {
          const response = await fetch('http://localhost:80/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
          });
                const data = await response.json();
                if (data.user) {
                  setResponse({ message: data.message, name: data.user.name, address: data.user.address });
              } else {
                  setResponse({ message: data.message, name: '', address: '' }); // or handle null case as appropriate
              }
          
              setItemName('');
              setLocation('');
              setQuantity('');
              setDescription('');
              setPrice('');
          } catch (error) {
          console.error('Error creating user:', error);

        } finally {
          setLoading(false);
          // console.log(userData);
            console.log(newUser)

            // __001
          fetchData();
        }
      };



    // დაყოვნება სანამ მოთხოვნა დააბრუნებს შედეგს 
    // ახალი მომხმარებლის შექმნის შესახებ
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [loading]);




  return (
    <>
      <CreacUserHead>Add New Item</CreacUserHead>

          <CreacUserConteiner>
                  {/*  POST მოთხოვნისგან პასუხის მომლოდინე */}
                      {loading ? 
                            (<LoadConteiner> {"Loaging..."} </LoadConteiner> ) 
                            : 
                            ( <div style={{ display: 'none' }}></div>)
                      }

                            {/* ახალი მომხმარებლის მონაცემები */}
                                <Newproducteaddform>

                                <InputItem name='itemname'
                                              type='text'
                                              placeholder='Name'
                                              value={itemName}
                                              onChange={AddItemValues}
                                              />

                                          <InputItem name='itemaddress'
                                                    type='text'
                                                    placeholder='Location'
                                                    value={location}
                                                    onChange={AddItemValues}
                                                    />

                                                              <InputItem name='itemquantity'
                                                                        type='number'
                                                                        placeholder='Quantity'
                                                                        value={quantity}
                                                                        onChange={AddItemValues}
                                                                        />

                                                              <InputItem name='itemprice'
                                                                        type='number'
                                                                        placeholder='Price'
                                                                        value={price}
                                                                        onChange={AddItemValues}
                                                                        />

                                                                <textarea
                                                                        name="itemdescription"
                                                                        placeholder="Add Description"
                                                                        value={description}
                                                                        onChange={AddItemValues}
                                                                            />
                                                                    
                                </Newproducteaddform>

<div style={{width: '100%', display:'flex', justifyContent: 'flex-end', marginTop: '8px'}}>

                                <Additem type='button'
                                                      onClick={createdUser}
                                                      disabled={loading}>
                                                      {loading ? 'Adding Producte...' : 'Add New Product'}
                                                        </Additem>
</div>



          </CreacUserConteiner>

    </>
  );
}

export default CreatNewUser;
