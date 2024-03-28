import React from "react";

import './AddProducte.css';

const  OptionalItem = ({advanceData}:any) =>{

    const { more } = advanceData as { more: object };
    const { selectcurrency } = more? (more as { selectcurrency: any[] }): { selectcurrency: [] };
    const { selectquantity } = more? (more as { selectquantity: any[] }): { selectquantity: [] };
  

    return (


<article style={{ width: "35%" }}>
<h1> Currency/Quantity </h1>
        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Currency:</h2>
          <select className="currency-select" id="currency">
            {selectcurrency?.map((corrency, index) => (
              <option key={index} value={corrency}>
                {corrency}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Quantity:</h2>
          <select className="currency-select" id="Quantityunit">
            {selectquantity?.map((quantity, index) => (
              <option key={index} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>
        {/* __3 */}
</article>



    );
};

export default OptionalItem;
