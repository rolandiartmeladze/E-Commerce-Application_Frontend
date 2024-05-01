import React, { useState } from "react";
import styled from "styled-components";
import UserInfo from "../BuyProduct/Userinfo";


const Conteiner = styled.div`
        display:  flex;
        flex-direction:  column;
        align-items:  center; 
        `;

        const Header = styled.h1`
        text-align: left;
        border-radius: 10px 10px 0px 0px;
        margin: 0;
        background-color: brown;
        display: flex;

        font-weight: 400;
    font-size: 150%;
    display: flex;
    padding: 5px;
}
    `;
        const ProductList = styled.ul`
            display: flex;
            flex-direction: column; 
            width: 60%; 
            @media (max-width: 750px) {
                padding-top: 35px;
                width: 98%;
            }
        `;


            const ProductsTable = styled.table`
                    background-color:  rgb(24, 22, 19, 0.4); 
                    padding: 10px; 
                    margin-top:  0px; 
                    color:  white; 
                    
                    `;

                const ProductsTableHead = styled.tr`
                    box-shadow: 0 0 1px 0.5px black;
                    padding: 2px;
                    `;

                    const ProductName = styled.td`
                        text-align: left;
                        max-width: 160px;
                    `;

                        const Footer = styled.div`
                                width:  100%; 
                                text-align: left; 
                                background-color: wheat; 
                                padding: 0px 0px 10px 0px; 
                                margin: 0px; 
                                border-radius: 0px 0px 10px 10px;
                                h4{
                                    margin: 4px; 
                                    margin-left: 12px;
                                }
                                `;
interface Props{
    products:any[];
    cost:number;
    quantities:any[];
    usermode: boolean;
    members:any[];
}

const BuyFromCart = ({products, cost, quantities, usermode, members}: Props) => {


    
    return(
        <>
        <Conteiner  id="BuyConteiner">


<ProductList>

<UserInfo usermode={usermode} members={members} />

        <Header> <samp>თქვენ შეარჩიეთ - {products.length} პროდუქტი </samp></Header>

        <ProductsTable>
            <tbody>
            <ProductsTableHead>
                <td>Name</td> 
                <td>quantity</td> 
                <td>price</td> 
                <td>cost</td>
            </ProductsTableHead>

            {products.map((product, index) => (
                <tr key={product._id}>
                    <ProductName>
                        <samp>
                            {index+1}: - 
                        </samp>
                        {product.name}
                    </ProductName> 
                    <td> 
                        {quantities[index].quantity } 
                        {product.quantityUnit}
                    </td> 
                    <td>
                        {product.price.toFixed(1)} 
                        {product.currency}
                    </td> 
                    <td>
                        {(quantities[index].quantity * product.price).toFixed(1)} 
                        {product.currency}
                    </td>
                </tr>
                 ) 
        )}

            </tbody>
        </ProductsTable>

        <Footer>
            <h4> საერთო ღირებულებით - {cost} ₾.</h4> 
        </Footer> 

</ProductList>
   
</Conteiner>


        </>
    );
};

export default BuyFromCart;