import React from "react";
import UserIcon from '../../icon/addproperties.png';

interface Props {
    userData: any[];
    setUserData: Function;
    setIsSelected: Function;
    setSoldAmount: Function;
    setSelectedUser: Function;
    product: any[];
    setProduct: Function;
};


const MyProducts: React.FC<Props> = ({ 
    userData, 
    setUserData, 
    setIsSelected, 
    setSoldAmount, 
    setSelectedUser,     
    product, 
    setProduct
 }) =>{

    const SelectProduct = async (UserID: string) => {

        const selectedProduct = userData.find((product) => product._id === UserID);
        // setSelectedUser(selectedProduct)
                const QuantityInput = document.getElementById('QuantityInput') as HTMLInputElement;

        console.log(selectedProduct)
        setIsSelected(true);
        if(QuantityInput){ setTimeout(() => {
                QuantityInput?.focus(); 
                QuantityInput.value = '1';
                setSoldAmount(1);
        }, 300); }
        setSelectedUser(selectedProduct);
        
    };    

    return (
<>
        { userData.map((item, index) => (
      
              <div onClick={() => { SelectProduct(item._id) }}  key={item._id} className='userConteinet'>
      
                      <div className='userHeaderline'>
                              <img src={UserIcon} alt='User Icon' />
                              <samp> <span>{item.Name} </span>
      
                              <h3>{item.Address}</h3>
                              
                              </samp>
                              <div className='headerMore'>...</div>
                      </div>
              
                              <div className='userInfoLine'>
                                      <samp><h1>რაოდენობა</h1> <h3>{item.Quantity} {item.Quantityiunit}</h3></samp>
                                      <samp><h1>ფასი</h1><h3> {item.Price}  {item.Currency}</h3></samp>
                              </div>
              
                                      <div className='userTotal'> 
                                      <samp>
                                              <h2>ღირებულება: <samp>{(item.Quantity * item.Price).toFixed(1)} {item.Currency}</samp></h2>
                                      </samp>
                                      </div>
      
              </div>
                      
            ))

     
            }
     </>  
    );
};

export default MyProducts;