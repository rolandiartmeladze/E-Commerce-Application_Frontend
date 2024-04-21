import React, { useEffect, useState } from "react";
import './ProductsConteiner.css';
import './product.css';


import user from '../../icon/user.png';
import view from '../../icon/view.png';
import cost from '../../icon/cost.png';
import share from '../../icon/share.png';
import favicon0 from '../../icon/fav.png';
import favicon1 from '../../icon/favcheck.png';

import testimg from '../../img/slide_9.jpg';


interface ActiveUserProps {products: string[];}

interface Props{
    userData: Productprops[];
    usermode:boolean;
    favorits:any[]; 
    setFavorits:Function;
    chekfavorits:Function;
    activeuser:ActiveUserProps;
}
interface Productprops{
    name:string;
    _id: string;
    location:string;
    quantityUnit:string;
    quantity:number;
    price:number;
    currency:string;
    owner:string;
    email:string;
    phone:string;
    comment:string;
    description:string;
    view:number;
    sale:number;
    category: string;
}


const AllProductsConteiner: React.FC<Props> = ({ userData, favorits, setFavorits, chekfavorits, activeuser, usermode}) => {

const handleItemClick = async (itemId: string) => {
    let newItem = itemId;
    
    let storedFavorites = localStorage.getItem('favorits');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    let updatedFavorites = [...favorites];
    
    const index = updatedFavorites.indexOf(newItem);
        if (index === -1) {updatedFavorites.push(newItem);} 
        else {updatedFavorites.splice(index, 1);}
    localStorage.setItem('favorits', JSON.stringify(updatedFavorites));
        setFavorits(updatedFavorites);
};

        let products;
        if(usermode){products = userData.filter(product => !activeuser.products.includes(product._id));} 
        else{products = userData}


        const viewProduct = async (productId:string) =>{
            console.log(productId)

            try {
                            const updateViewNumber = await fetch(`http://localhost:3001/updateView/${productId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!updateViewNumber.ok) { throw new Error('Failed to fetch users data'); };
            const updateViewResponse = await updateViewNumber.json();
                    console.log(updateViewResponse);
            } catch (error) {
               console.log('Error:', error); 
            }

        }



        return(
    
    <div style={{top:'0'}} className="all-product-conceiner-II">
        {usermode && <h1 className="products-header"> All Products:-<samp style={{color:'red'}}>{products.length}</samp></h1>}
<div className="productarray">
        {products.map((item) =>(

    <article onClick={() => viewProduct(item._id)} key={item._id} className="product-conteiner">
        <div className="img-conteiner">
            <img  src={testimg} alt="prodict img" />
        </div>

        <div className="product-info">
    <div className="product-info-item">
        {/* {item.owner} */}
        {(item.name.length > 20) ? item.name.slice(0, 35) + '...' : item.name}
    </div>
    <div className="product-info-item add">
        <p>
        <samp style={{display:'flex', alignItems:' center'}}>
            <img style={{marginRight:'5px'}} width="20" src={user} alt='owner icon' /> 
                    {item.owner}
</samp> 
        </p>
    </div>
    <div className="product-info-item add">
        <p>
        <samp><samp>{item.description && (item.description.length > 20) ? item.description.slice(0, 35) + '...' : item.description}</samp></samp> 
        </p>
    </div>

    <div className="product-info-item"><samp>Category: {item.category}</samp></div>    
    <div style={{color:'red'}} className="product-info-item">{(item.price).toFixed(2)} {item.currency}</div>

    <div style={{ justifyContent: !usermode?  'space-around': 'flex-start', marginTop:'8px'}} className="product-info-item end">
    
    <samp><img src={view} alt="view icon"/>{item.view}</samp>
    <samp><img src={cost} alt="cost icon"/>{item.sale}</samp>
    <samp><img src={share} alt="share icon"/>{0}</samp>
    {usermode&&
    (<samp onClick={() => handleItemClick(item._id)} style={{position:'absolute', right: '3px', bottom: '8px'}}>
        <img style={{width: '30px'}} width={30} src={
            favorits.includes(item._id) ? favicon1 : favicon0 }
         alt="fav icon"/>
        </samp>)}
    
        </div>
</div>
    </article>


))}
</div>
    </div>
 );

}

export default AllProductsConteiner;



// <div  key={item._id}  className='userConteinet'>

// {/* <div className='headerMore'>...</div> */}
// <div className='header-all-product-conteiner' >
// <div className='imgconteinet'>
// <img src={testimg} alt='User Icon' />
// </div>
//         <div style={{width:'74%'}}  className='userHeaderline userHeaderlineall'>

//                 <samp className='productname all-product-conteiner'>{(`${item.name}`).substring(0,50)}{'...'}</samp>
//                 <samp className='productname all-product-conteiner'>{item.location}</samp>


//         </div>
// </div>

// <div style={{paddingBottom:'0px'}} className='userInfoLineall'>

//                 <div  className='userInfoLineall-item'>
//                         <span style={{
//                                 fontWeight: '800', 
//                                 color:'red', 
//                                 margin:'3px'
//                                 }}>მარაგშია
//                         </span> 
//                         <span>{item.quantity} {item.quantityUnit}</span></div>
//                 <div  className='userInfoLineall-item'>
//                         <span style={{
//                                 fontWeight: '800', 
//                                 color:'red', 
//                                 margin:'3px'
//                                 }}>ფასი</span> 
//                                 <span>{item.price}  {item.currency}</span>
//                                 </div>


//                                 <div style={{flexDirection: 'column',  height: '40%'}}  className='userInfoLineall-item'>
//                                <div style={{ alignItems: 'center' ,  display:'flex', flexDirection: 'row'}}>

//                                 <span style={{
//                                 fontWeight: '800', 
//                                 color:'red', 
//                                 margin:'3px',
//                                 marginRight: '6px'
//                                 }}><img width={15} src={vewicon} alt='wiev' />  </span> 
//                                 <span style={{fontSize: '80%'}}>1250</span>
                                
//                                 </div>

//                                 <div style={{ alignItems: 'center' ,  display:'flex', flexDirection: 'row'}}>
//                                 <span style={{
//                                 fontWeight: '800', 
//                                 color:'red', 
//                                 margin:'3px',
//                                 marginRight: '6px'
//                                 }}><img width={15} src={shareicon} alt='wiev' />  </span> 
//                                 <span style={{fontSize: '80%'}}>150</span>
//                                 </div>

//                                 </div>

//                                 <li style={{width:'100%'}}><samp>Add Favorit</samp><samp> ____ Share Product</samp></li>





//         </div>
        


// <div className='moredetalt'>
//     <ul style={{padding:'0', margin:'0'}}>
//     <li><samp>Owner: </samp> <samp> {item.owner}</samp></li>
//     <li><samp>Email: </samp> <samp><a>{item.email}</a></samp></li>
//     <li><samp>Phone: </samp> <samp><a>{item.phone}</a></samp></li>

//     {/* <li style={{alignItems: 'flex-start'}}><samp>აღწერა:</samp>
//     <samp style={{fontSize:'80%'}}>
//         {('ესა რის მოკლე აღწერა აღნიშნული პროდუქტისთვის რომელიც შეიძლება იყოს საკმაოდ გრრძელი ამიტომ აქ გამოჩნდება მხოლოდ ნაწილი დანარჩენი დეტალურად ნახვის შემთხვევაში').substring(0,100)}{'...'} </samp></li>
//         <li style={{alignItems: 'flex-start'}}><samp>კომენტარი:</samp>
//     <samp style={{fontSize:'80%'}}>
//         {('ესა რის მომხარებლის მიერ დამარებული კომენტარი აღნიშნული პროდუქტისთვის რომელიც შეიძლება იყოს საკმაოდ გრრძელი ამიტომ აქ გამოჩნდება მხოლოდ ნაწილი დანარჩენი დეტალურად ნახვის შემთხვევაში').substring(0,100)}{'...'} </samp></li> */}
        
//         {/* <li><samp>ნახვა:{1200}</samp><samp> ___ გაყიგვა:{10}</samp></li> */}
//         <li><samp>Data:</samp><samp>30/03/2023</samp></li>
//     </ul>
// </div>

//                 <div className='userTotal'> 
//                 შეიძინე ახავე
//                 {/* <samp>
//                         <h2>ღირებულება: <samp>{(300*450).toFixed(1)} {'$'}</samp></h2>
//                 </samp> */}
//                 </div>

//         </div>
