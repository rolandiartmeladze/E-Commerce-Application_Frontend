import React from "react";
import UserIcon from '../../icon/addproperties.png';
import vewicon from '../../icon/view.png';
import shareicon from '../../icon/cost.png';

interface Props {
    userData: any[];
    setUserData: Function;
    setIsSelected: Function;
    setSoldAmount: Function;
    setSelectedUser: Function;
    product: any[];
    setProduct: Function;
    activeuser:object;

};

interface Product { _id: string; }
interface ActiveUser { products: Product[]; }


const MyProducts: React.FC<Props> = ({ 
    userData, 
    setUserData, 
    setIsSelected, 
    setSoldAmount, 
    setSelectedUser,     
    product, 
    setProduct,
    activeuser

 }) =>{

    const SelectProduct = async (UserID: string) => {

        const selectedProduct = userData.find((product) => product._id === UserID);
        // setSelectedUser(selectedProduct)
                const QuantityInput = document.getElementById('QuantityInput') as HTMLInputElement;

        setIsSelected(true);
        if(QuantityInput){ setTimeout(() => {
                QuantityInput?.focus(); 
                QuantityInput.value = '1';
                setSoldAmount(1);
        }, 300); }
        setSelectedUser(selectedProduct);
        
    };    

    const myproduct: Product[] = (activeuser as ActiveUser).products;

    const myproducts = userData.filter(product => myproduct.includes(product._id));

    return (
<>
        { myproducts.map((item, index) => (
      
              <div onClick={() => { SelectProduct(item._id) }}  key={item._id} className='userConteinet'>
      
                      <div className='userHeaderline'>
                              {/* <img src={UserIcon} alt='User Icon' /> */}
                              <samp className="uroduct-header-info"> 
                                <span className="product-name">{item.name} </span>
      
                              <samp className="product-addres">{item.address}</samp>
                              
                              </samp>
                              <div className='headerMore'>...</div>
                      </div>
              
                              <div className='userInfoLine'>
                                      <samp style={{display: 'flex', alignItems:'center', flexDirection: 'column', justifyContent:'center'}}><h1>რაოდენობა</h1> <h3>{item.quantity} {item.quantityUnit}</h3></samp>
                                      <samp style={{display: 'flex', alignItems:'center', flexDirection: 'column', justifyContent:'center'}}><h1>ფასი</h1><h3> {item.price}  {item.currency}</h3></samp>
                                      <div style={{flexDirection: 'column',  height: '40%'}}  className='userInfoLineall-item'>
                               <div style={{ alignItems: 'center' ,  display:'flex', flexDirection: 'row'}}>

                                <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px',
                                marginRight: '6px'
                                }}><img width={15} src={vewicon} alt='wiev' />  </span> 
                                <span style={{fontSize: '80%'}}>1250</span>
                                
                                </div>

                                <div style={{ alignItems: 'center' ,  display:'flex', flexDirection: 'row'}}>
                                <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px',
                                marginRight: '6px'
                                }}><img width={15} src={shareicon} alt='wiev' />  </span> 
                                <span style={{fontSize: '80%'}}>150</span>
                                </div>

                                </div>

                              </div>
              
                                      <div style={{width: '80%'}} className='userTotal'> 
                                      <samp>
                                              <h2>ღირებულება: <samp>{(item.quantity * item.price).toFixed(1)} {item.currency}</samp></h2>
                                      </samp>
                                      </div>
      
              </div>
                      
            ))

     
            }
     </>  
    );
};

export default MyProducts;