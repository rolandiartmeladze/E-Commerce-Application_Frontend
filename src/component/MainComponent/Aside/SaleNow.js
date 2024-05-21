
const SaleNow = async (Info)=>{
    console.log(Info);

        try {

           const saleProduct = await fetch(`http://localhost:3001/api/sale/${Info.user}`, {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(Info),
           })

           if(!saleProduct.ok) {throw  new Error('Failed to fetch users data');}

            const saleRespons = await saleProduct.json();
            console.log(saleRespons);
        } catch (error) {
            
        }



}

export default SaleNow;