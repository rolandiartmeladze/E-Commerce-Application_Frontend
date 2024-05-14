import React, { useState } from 'react';

import './ProductsConteiner.css';
import '../UsersComponent/SingUp.css';
import arrowIcon from '../../icon/arrow.png';



import AddNewProduct from '../CreatNewProduct/AddNewProduct';
import AddProductBtn from './AddProductBtn';
import AddProduct from './AddProduct/Add';
import MyProducts from './MyProducts';
import { Link } from 'react-router-dom';



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
        addproduct:any[];
        setAddProduct:Function;
    
        login:boolean;
        setLogIn:Function;
    
        activeuser:object
        setActiveUser:Function;

        usermode:boolean;
        favorits:any[];
        myRoom:boolean;
        setMyRoom:Function;

      
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
    
        addproduct, 
        setAddProduct,

        login,
        setLogIn,
    

        activeuser,
        setActiveUser,

        usermode,
        favorits,
        myRoom,
        setMyRoom

  
}: UserContainerProps) {






        const addProductFunction = () => {addproduct? setAddProduct(false):setAddProduct(true)};


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


                        const myroom = () => {
                                
                                if(myRoom){
                                setMyRoom(false);
                                //  setIsMain(false); 
                                //  setIsFav(false);      
                                } else {
                                        setMyRoom(true);
                                        setIsMain(true);
                                }
                                  
                                
                        }

                        const setfavoritmode = () =>{
                                if(!isfav && (favproduct.length > 0)){
                                        setIsFav(true); 
                                        setIsMain(false);
                                        setMyRoom(true);
                                }
                                  
                                
                          }

                          const setmyproductmode = () =>{
                                !ismain && setIsFav(false); setIsMain(true);
                                setMyRoom(true);
                          }
                                                

return (
<>
{findstatus && 
                <div className='find-result-btn-coneiner'>
                <span className='find-result-btn-coneiner-title'> Found 
                  <span className='find-result-btn-coneiner-result-count'>{userData.length}</span> 
                  products 
                </span> 
                <span onClick={closefinde} className='closeFindeBtn'>Close Finde</span>
              </div>
              
        }


<div style={{
        marginRight: myRoom? '8px': '0px', 
        paddingBottom: myRoom? '10px': '0px'}} 
        className='main-products-container'>


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
                        <span className='my-favorits-numb'>{favproduct.length}</span></samp> 
                        
                        
                       <samp onClick={myroom} 
                        style={{
                                display: 'flex', 
                                alignItems: 'center' ,
                                position:'absolute', 
                                right: '10px', 
                                cursor: 'pointer'
                                }}>
                                    <Link style={{display: 'contents'}} to={'/'}>     {myRoom? 'close':'open'} 
                        <img style={{transform: myRoom? 'rotate(90deg)': 'rotate(0deg)'}} width={30} src={arrowIcon} alt='arrow icon'/>
  </Link>
                      
                        </samp>
                               

                         </h1>



              

    
                                
        
      

                                               {myRoom && 
                                                  <>

                                                        {/* {ismain&&  */}
                                                                <>
                                                                <AddNewProduct fetchData={fetchData}
                                                                                product={addproduct} 
                                                                                setProduct={setAddProduct}  
                                                                                addProductFunction={addProductFunction} 
                                                                                setUserData={setUserData}  
                                                                                advanceData={advanceData} 
                                                                                setAdvanceData={setAdvanceData} 
                                                                                soldAmount={soldAmount}
                                                                                setSoldAmount={setSoldAmount}
                                                                                activeuser={activeuser}
                                                                                setActiveUser={setActiveUser}/>

                                                                                {/* <AddProduct /> */}
                                                                                
                                                                <AddProductBtn  addProductFunction={addProductFunction} product={addproduct} />
                                                                </>
                                                        {/* } */}
                                                
                                                   <MyProducts userData={userData} 
                                                                setUserData={setUserData} 
                                                                setIsSelected={setIsSelected}
                                                                setSoldAmount={setSoldAmount} 
                                                                setSelectedUser={setSelectedUser}     
                                                                product={addproduct} 
                                                                setProduct={setAddProduct}
                                                                activeuser={activeuser}
                                                                ismain={ismain}
                                                                isfav={isfav}/>
                                                
                                                  </>

                                               } 


      </div>
    


</div>






</>
        );
}

export default ProductsConteiner;
