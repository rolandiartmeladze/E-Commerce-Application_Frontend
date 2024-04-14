import React, { useState } from 'react';

import './ProductsConteiner.css';
import '../UsersComponent/SingUp.css';




import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import AddProductBtn from './AddProductBtn';
import MyProducts from './MyProducts';



interface UserContainerProps {
        setUserData: Function;
        setAdvanceData: Function;
        advanceData: object;
        userData: any[];
        Adduser?: any;
        loading: boolean;
        setLoading: Function;
        fetchData: Function;
        findstatus: boolean;
        setFindStatus: Function;
        notfound:boolean;
        setNotound: Function;
        findInput:string;
        setFindInput: Function; 
        isselected:boolean; 
        setIsSelected:Function;
        setSelectedUser:Function;
        selectedUser:any;
        soldAmount:any;
        setSoldAmount:Function;
        singup:boolean; 
        setSingUp:Function;
        inUerMode:boolean;
        setInUserMode:Function;
        product:any[];
        setProduct:Function;
    
        login:boolean;
        setLogIn:Function;
    
        activeuser:object
        setActiveUser:Function;

        usermode:boolean;
        favorits:any[];
      
      }
      interface Product { _id: string; }
      interface ActiveUser { 
        products: Product[]; 
        favorits: Favorits[]; 

      }

      interface Favorits {
        _id: string;
        name: string;
      }
      

      
    
      
function ProductsConteiner({
        fetchData, 
        loading, 
        setLoading, 
        userData, 
        setUserData, 
        advanceData, 
        setAdvanceData,
        findstatus,
        setFindStatus,
        notfound,
        setNotound,
        findInput,
        setFindInput,
        isselected, 
        setIsSelected,
        setSelectedUser,
        selectedUser,
        soldAmount,
        setSoldAmount,
        singup, 
        setSingUp,
        inUerMode,
        setInUserMode,
    
        product, 
        setProduct,

        login,
        setLogIn,
    

        activeuser,
        setActiveUser,

        usermode,
        favorits
  
}: UserContainerProps) {






        const addProductFunction = () => {product? setProduct(false):setProduct(true)};


                const closefinde = () => {
                            setFindStatus(false)
                            setNotound(false);
                            fetchData();
                            setFindInput('');
                        }

                        const myproduct: Product[] = (activeuser as ActiveUser)?.products || [];
                        const favproduct: Favorits[] = (activeuser as ActiveUser)?.favorits || [];


                        const [ismain ,setIsMain] = useState(true);
                        const [isfav ,setIsFav] = useState(false);


                        const setfavoritmode = () =>{
                                !isfav && setIsFav(true); setIsMain(false)
                          }

                          const setmyproductmode = () =>{
                                !ismain && setIsFav(false); setIsMain(true)
                          }
                                                

return (
<>

<div   style={{position: 'relative', width: '100%'}}  className='userTable'>

{/* {notfound? <LoadConteiner style={{height: '200px'}} > {" product No found "} <button onClick={closefinde}>close</button></LoadConteiner> : null }
{loading ? <Loaing />:null} */}
        <h1 className='products-header'> 
        <samp onClick={setmyproductmode} style={{
                boxShadow: ismain? 'none': 'inset 0px 0.5px 3px 0.3px rgb(235, 15, 15)',
                color: ismain? 'black': 'rgb(22, 8, 145)',
                cursor: ismain? 'default' : 'pointer',
                }} className='my-favorits-btn'>My Products 
              <span className='my-favorits-numb'>{myproduct.length}</span></samp>
                <samp onClick={setfavoritmode} style={{
                boxShadow: isfav? 'none': 'inset 0px 0.5px 3px 0.3px rgb(235, 15, 15)',
                color: isfav? 'black': 'rgb(22, 8, 145)',
                cursor: isfav? 'default' : 'pointer',

                }} className='my-favorits-btn' >Favorites 
                        <span className='my-favorits-numb'>{favproduct.length}</span></samp>  </h1>


        <AddNewProduct fetchData={fetchData}
                product={product} 
                setProduct={setProduct}  
                addProductFunction={addProductFunction} 
                setUserData={setUserData}  
                advanceData={advanceData} 
                setAdvanceData={setAdvanceData} 
                soldAmount={soldAmount}
                setSoldAmount={setSoldAmount}
                activeuser={activeuser}
                setActiveUser={setActiveUser}
            
                />

                {findstatus && 
                <div className='find-result-btn-coneiner'>
                <span className='find-result-btn-coneiner-title'> Found 
                  <span className='find-result-btn-coneiner-result-count'>{userData.length}</span> 
                  products 
                </span> 
                <span onClick={closefinde} className='closeFindeBtn'>Close Finde</span>
              </div>
              
        }


              
                        <>

                        {ismain&& <AddProductBtn  addProductFunction={addProductFunction} product={product} />}
    
                                
        
      

                                                <MyProducts 
                                                userData={userData} 
                                                setUserData={setUserData} 
                                                setIsSelected={setIsSelected}
                                                setSoldAmount={setSoldAmount} 
                                                setSelectedUser={setSelectedUser}     
                                                product={product} 
                                                setProduct={setProduct}
                                                activeuser={activeuser}
                                                ismain={ismain}
                                                isfav={isfav}

                                                />
</>


      </div>
    





<>


</>




</>
        );
}

export default ProductsConteiner;
