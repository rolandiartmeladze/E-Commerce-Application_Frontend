

const Product = async () => {



    let serverlink = "https://lavish-husky-gaura.glitch.me";

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