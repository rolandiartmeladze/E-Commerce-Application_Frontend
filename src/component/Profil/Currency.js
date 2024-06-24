import { fetchAllRates } from 'nbg-currency-rates-api';

const Currency = async ()=>{

const allRates = await fetchAllRates(new Date('2021-10-01'));
console.log(allRates);

return allRates;
}
export default Currency;
