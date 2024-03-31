import React from "react";
import './ProductsConteiner.css';


import vewicon from '../../icon/view.png';
import shareicon from '../../icon/cost.png';

import testimg from '../../img/slide_9.jpg';



interface props{
    userData:any[];
}

const AllProductsConteiner = ({ userData }:props) => {


    return(
    
    <div className="all-product-conceiner-II">
    <h1 className="products-header"> All Products</h1>

        {userData.map((item) =>(

    
    <div  key={item._id}  className='userConteinet'>

{/* <div className='headerMore'>...</div> */}
<div className='header-all-product-conteiner' >
<div className='imgconteinet'>
<img src={testimg} alt='User Icon' />
</div>
        <div style={{width:'74%'}}  className='userHeaderline userHeaderlineall'>

                <samp className='productname all-product-conteiner'>{('ეს არის მომხმარებილს სახელი რომელიც შეიძლება ყოს საკმაოდ გრძელი.').substring(0,50)}{'...'}</samp>
                <samp className='productname all-product-conteiner'>{'__Address'}</samp>


        </div>
</div>

<div className='userInfoLineall'>

                <div  className='userInfoLineall-item'>
                        <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px'
                                }}>მარაგშია
                        </span> 
                        <span>{300} {'kg'}</span></div>
                <div  className='userInfoLineall-item'>
                        <span style={{
                                fontWeight: '800', 
                                color:'red', 
                                margin:'3px'
                                }}>ფასი</span> 
                                <span>{4500}  {'$'}</span>
                                </div>


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
        


<div className='moredetalt'>
    <ul style={{padding:'0', margin:'0'}}>
    <li><samp>მფლობელი:</samp> <samp> Roland Rrtmeladze</samp></li>
    <li><samp>მეილი:</samp><samp><a>Rartmeladze@gmail.com</a></samp></li>
    <li><samp>ტელეფონი:</samp><samp><a>(+995) 595 03-56-58</a></samp></li>
    <li style={{alignItems: 'flex-start'}}><samp>აღწერა:</samp>
    <samp style={{fontSize:'80%'}}>
        {('ესა რის მოკლე აღწერა აღნიშნული პროდუქტისთვის რომელიც შეიძლება იყოს საკმაოდ გრრძელი ამიტომ აქ გამოჩნდება მხოლოდ ნაწილი დანარჩენი დეტალურად ნახვის შემთხვევაში').substring(0,100)}{'...'} </samp></li>
        <li style={{alignItems: 'flex-start'}}><samp>კომენტარი:</samp>
    <samp style={{fontSize:'80%'}}>
        {('ესა რის მომხარებლის მიერ დამარებული კომენტარი აღნიშნული პროდუქტისთვის რომელიც შეიძლება იყოს საკმაოდ გრრძელი ამიტომ აქ გამოჩნდება მხოლოდ ნაწილი დანარჩენი დეტალურად ნახვის შემთხვევაში').substring(0,100)}{'...'} </samp></li>
        <li><samp>ნახვა:{1200}</samp><samp> ___ გაყიგვა:{10}</samp></li>
        <li><samp>რჩეულებში დამატება</samp><samp> ____ გაზიარება</samp></li>
        <li><samp>Data:</samp><samp>30/03/2023. 18:00</samp></li>
    </ul>
</div>

                <div className='userTotal'> 
                შეიძინე ახავე
                {/* <samp>
                        <h2>ღირებულება: <samp>{(300*450).toFixed(1)} {'$'}</samp></h2>
                </samp> */}
                </div>

</div>


))}

    </div>
 );

}

export default AllProductsConteiner;