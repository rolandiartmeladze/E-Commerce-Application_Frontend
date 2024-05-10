import { useEffect } from 'react';
import serverUri from '../serverUrl';
import { useLocation } from 'react-router-dom';


const sortedcategory = async (SelectedCategory) => {



    try {
        const serverlink = serverUri();
        const response = await fetch(`${serverlink}/sortedcategory?category=${encodeURIComponent(SelectedCategory)}`, {                
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }
        return await response.json();
    } catch (error) {
        console.log('Error:', error);
        return null;
    }


};

export default sortedcategory;