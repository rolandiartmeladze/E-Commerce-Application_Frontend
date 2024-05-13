const FindRequest = async (search) => {
    try {
        const findProduct = await fetch(`http://localhost:3001/Find/${search}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!findProduct.ok) {
            throw new Error('Failed to fetch users data');
        }
        return await findProduct.json();
    } catch (error) {
        throw error;
    }
};

export default FindRequest;