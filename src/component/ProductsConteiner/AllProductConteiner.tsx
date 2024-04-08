import React from "react";
import './ProductsConteiner.css';
import './product.css';


import user from '../../icon/user.png';
import shareicon from '../../icon/cost.png';

import testimg from '../../img/slide_9.jpg';



interface Props{
    userData: userprops[];
    usermode:boolean;
}
interface userprops{
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

}



const AllProductsConteiner: React.FC<Props> = ({ userData, usermode }) => {


    return(
    
    <div style={{top:'0'}} className="all-product-conceiner-II">
        {usermode && <h1 className="products-header"> All Products</h1>}
<div className="productarray">
        {userData.map((item) =>(

    <article key={item._id} className="product-conteiner">
        <div className="img-conteiner">
            <img  src={testimg} alt="prodict img" />
        </div>

        <div className="product-info">
    <div className="product-info-item">
        <img width="30" src={user} alt='owner icon' />
        {item.owner}
    </div>
    <div className="product-info-item name">
        <p>
                  <samp> {item.name}</samp>
 
        </p>
    </div>
    <div className="product-info-item">
        {item.comment}
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
