import React, { useState, useEffect } from 'react';
import serverUrl from '../serverUrl';

const viewProduct = async (productId, setProduct, setLoading, location) => { 

  console.log(location)


  if(location){

    const params = new URLSearchParams(location.search);

    // ge

    const category = params.get('category');
    const time = params.get('time');
    const view = params.get('view');
    
    console.log('Category:', category);
    console.log('Time:', time);
    console.log('View:', view);   

      }

  try {
    setLoading(true);
    const updateViewNumber = await fetch(`https://lavish-husky-gaura.glitch.me//updateView/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!updateViewNumber.ok) {
      throw new Error('Failed to fetch users data');
    }
    const updateViewResponse = await updateViewNumber.json();
    setProduct(updateViewResponse);
    setLoading(false);
  } catch (error) {
    console.log('Error:', error);
  }
};

export default viewProduct;
