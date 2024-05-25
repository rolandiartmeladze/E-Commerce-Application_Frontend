import React, {useState, useEffect } from "react";

const serverlink = "https://quasar-wind-trader.glitch.me";

const Member = async () => {
    try {
        const response = await fetch(`${serverlink}/Members`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }

        const membersData = await response.json();
        return membersData.length;
    } catch (error) {
        console.log(error, "not found");
        return null;
    }
};

export { Member };


const Product = async () => {

    try {
        const productsResponse = await fetch(`${serverlink}/checkProducts`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!productsResponse.ok) { 
            throw new Error('Failed to fetch products data'); 
        }
            return await productsResponse.json();
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

 
export default Product;