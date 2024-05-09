import { useLocation, Location } from 'react-router-dom'; // Import Location type
import serverUri from '../serverUrl';


const SortedCategory = async (SelectedCategory: string) => {
    const location = useLocation();
const serverlink = serverUri();

    try {
        logURLParameters(location);

        const response = await fetch(`${serverlink}/sortedcategory?category=${encodeURIComponent(SelectedCategory)}`, {                
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

const logURLParameters = (location: Location<any>) => { // Use Location type
    console.log(location);

    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const time = params.get('time');
    const view = params.get('view');

    console.log('Category:', category);
    console.log('Time:', time);
    console.log('View:', view);
};

export default SortedCategory;













// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import serverUri from '../serverUrl';

// const SortedCategory = async (SelectedCategory: string) => {
//     const location = useLocation();

//     useEffect(() => {
//         logURLParameters(location);
//         fetchData(SelectedCategory);
//     }, [location, SelectedCategory]);

//     const fetchData = async (SelectedCategory: string) => {
//         try {
//             const serverlink = serverUri();
//             const response = await fetch(`${serverlink}/sortedcategory?category=${encodeURIComponent(SelectedCategory)}`, {                
//                 method: 'GET',
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch users data');
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.log('Error:', error);
//             return null;
//         }
//     };

//     const logURLParameters = (location: any) => {
//         console.log(location);

//         const params = new URLSearchParams(location.search);
//         const category = params.get('category');
//         const time = params.get('time');
//         const view = params.get('view');

//         console.log('Category:', category);
//         console.log('Time:', time);
//         console.log('View:', view);
//     };

//     return null; // or your JSX component if you need to render something
// };

// export default SortedCategory;
