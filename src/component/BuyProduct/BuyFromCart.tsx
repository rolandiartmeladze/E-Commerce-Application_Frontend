import React from "react";

interface Props{
    products:any[];
    setBuy:Function;
    cost:number;
    quantities:any[];

}
const BuyFromCart = ({products, cost, quantities}: Props) => {

    return(
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} id="BuyConteiner" >

<ul style={{display:'flex', flexDirection:'column', width:'60%'}}>
        <h1> თქვენ შეარჩიეთ - {products.length} პროდუქტი </h1>

        <table style={{ backgroundColor: 'rgb(24, 22, 19, 0.4)', padding:'10px', marginTop: '10px', color: 'white', borderRadius:'10px 10px 0px 0px'}}>
            <tbody>
            <tr style={{boxShadow:'0 0 1px 0.5px black'}}><td>Name</td> <td>quantity</td> <td>price</td> <td>cost</td></tr>
            {products.map((product, index) => (
            <tr key={product._id}><td style={{textAlign:'left'}}><samp>{index+1}: - </samp>{product.name}</td> <td> {quantities[index].quantity } {product.quantityUnit}</td> <td>{product.price.toFixed(1)} {product.currency}</td> <td>{(quantities[index].quantity * product.price).toFixed(1)} {product.currency}</td></tr>

        ) 
        )}

            </tbody>
        </table>
        <div style={{width: '100%', textAlign:'left', backgroundColor:'wheat', padding:'0px 0px 10px 0px', margin:'0px', borderRadius: '0px 0px 10px 10px'}}>
            <h4 style={{margin:'4px', marginLeft: '12px' }}> საერთო ღირებულებით - {cost} ₾.</h4> 
            </div> 

            <div style={{width: '100%', textAlign:'left', display: 'flex', alignItems: 'center'}}>
            <samp><input type="checkbox"></input> ვეთანხმები პირობებს</samp>
        </div>
        <div style={{width: '100%', textAlign:'left', display: 'flex', alignItems: 'center'}}>
        <button>Pay Now</button>
        <button>Tacke invoice</button>
        </div>
</ul>
   
</div>


        </>
    );
};

export default BuyFromCart;