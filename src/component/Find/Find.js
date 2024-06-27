const FindRequest = async (search) => {
  try {
    let serverlink = 'https://lavish-husky-gaura.glitch.me';

    const findProduct = await fetch(
      `http://localhost:3001/api/Find/${search}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!findProduct.ok) {
      throw new Error('Failed to fetch users data');
    }
    return await findProduct.json();
  } catch (error) {
    throw error;
  }
};

export default FindRequest;
