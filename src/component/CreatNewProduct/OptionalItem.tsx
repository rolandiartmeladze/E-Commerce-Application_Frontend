import React from "react";

import './AddProducte.css';

const  OptionalItem = ({advanceData}:any) =>{

    const { more } = advanceData as { more: object };
    const { selectcurrency } = more? (more as { selectcurrency: any[] }): { selectcurrency: [] };
    const { selectquantity } = more? (more as { selectquantity: any[] }): { selectquantity: [] };
  

    const currencies = ["₾", "$", "€", "£", "₺"];

const currencyOptions = currencies.map((currency, index) => (
  <option key={index} value={currency}>
    {currency}
  </option>
));

const quantities = ["L", "pcs", "kg", "m"];

const quantityOptions = quantities.map((quantity, index) => (
  <option key={index} value={quantity}>
    {quantity}
  </option>
));

const cattegorys = ["All","Clothing","Technique","Food","Accessories"];

const categoryOptions = cattegorys.map((cattegory, index) => (
  <option key={index} value={cattegory}>
    {cattegory}
  </option>
));

    return (


<article style={{ width: "35%" }}>
{/* <h1> Currency/Quantity </h1> */}
        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Currency:</h2>
            <select className="currency-select" id="currency">
              {currencyOptions}
            </select>
        </div>

        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Quantity:</h2>
          <select className="currency-select" id="Quantityunit">
          {quantityOptions}
          </select>
        </div>

        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Category:</h2>
          <select className="currency-select" id="CategoryOptions">
          {categoryOptions}
          </select>
        </div>

        {/* __3 */}
</article>



    );
};

export default OptionalItem;


