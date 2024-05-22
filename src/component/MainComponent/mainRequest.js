

async function FetchData(setMyProducts) {
    try {                                        
            let serverlink = "https://lavish-husky-gaura.glitch.me";
            const token = localStorage.getItem('token');
            const MainProduct = await fetch(`https://quasar-wind-trader.glitch.me/api/Main/${token}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                    });

            if(!MainProduct.ok){throw new Error('Failed to fetch users data');}
                    setMyProducts(await MainProduct.json());
    } catch (error) {console.log(error)}
}
export default FetchData;