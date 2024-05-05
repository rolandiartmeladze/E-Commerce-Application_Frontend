import React from "react";

const viewProduct = async (productId, setProduct, setLoading) =>{

    try {
      setLoading(true);
      const updateViewNumber = await fetch(`https://lavish-husky-gaura.glitch.me//updateView/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            });
        if (!updateViewNumber.ok) { throw new Error('Failed to fetch users data'); };
        const updateViewResponse = await updateViewNumber.json();
            setProduct(updateViewResponse);
            setLoading(false);
    } catch (error) {console.log('Error:', error);}


}

export default viewProduct;