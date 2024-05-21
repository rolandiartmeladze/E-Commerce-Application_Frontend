import react, {useEffect, useState} from 'react';
import styled from 'styled-components';


const Header = styled.h1`
border-bottom-left-radius: 5px;
text-align: left;
background-color: rgb(51, 181, 81, 0.4);
padding: 3px 8px;

@media (max-width: 750px) {
border-radius: 0px;
}
`;



const SaleJurnal =()=>{

    const [resspons, setRespons] = useState<any | null>(null);
    const token = localStorage.getItem('token');


        useEffect(()=>{
            async function FetchData() {
                try {
                    const jurnalrespons = await fetch(`http://localhost:3001/salejurnal/${token}`, {
                        method: 'GET', headers:{ 'Content-Type': 'application/json' }, });
                    if(!jurnalrespons.ok){throw new Error('Failed to fetch users data');}

                    const result = await jurnalrespons.json();
                            setRespons(result);
                            console.log(result);
                    
                } catch (error) {
                    
                }
            }
            FetchData();
        }, [])


    return(
        <>
                <Header>Sale Jurnal</Header>

                <article>

                </article>

        <table  style={{width: '100%'}}>
            <tbody>
                <tr>
                
                <td>N:</td>
                <td>name</td>
                <td>price</td>
                <td>amount</td>
                <td>cost</td>
                <td>time</td>
                </tr>
                {resspons?.map((item:any, index:number) => (
                <tr>
                
                <td style={{width: '25px'}}>{index}</td>
                <td>{item.name}</td>
                <td>{item.price} {item.currency}</td>
                <td>{item.amount} {item.unit}</td>
                <td>{(item.price * item.amount).toFixed(1)} {item.currency}</td>
                <td>{item.time}</td>
                </tr>

                ))}
            </tbody>
        </table>
        </>
    );
};

export default SaleJurnal;