import react, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Loading from '../../Loading';

import formatDate from '../../FormatDataTime';

const Header = styled.h1`
        border-bottom-left-radius: 5px;
        text-align: left;
        background-color: rgb(51, 181, 81, 0.4);
        padding: 3px 8px;

        @media (max-width: 750px) {
        border-radius: 0px;
        }
`;

    const Conteiner = styled.article`
            box-shadow: 0px 0px 1000px 0px inset rgb(1, 1, 1, 0.1);
            width: 30%;
            max-width: 300px;
            margin: 4px;
            border-radius: 5px;
            display: flex;
            flex-direction: row;
            padding: 3px;           
        
            `;

            const Image = styled.div`
                    width:70px;
                    min-height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0px 3px; 
                    
                    img{
                        max-width: 100%;
                        max-height: 100%;
                        border-radius: 4px;
                        justify-content: center;
                    }
                    
                    `;


                    const Info = styled.div`
                            display: flex;
                            height: 100%;
                            width: auto;
                            margin-left: 6px;
                            flex-direction: column;
                            align-items: flex-start;
                            samp{
                                color: red;
                                b{color:black;}
                            }
                            `;

const SaleJurnal =()=>{
    const [resspons, setRespons] = useState<any | null>(null);
    const token = localStorage.getItem('token');
        useEffect(()=>{
            async function FetchData() {
                try {
                    const jurnalrespons = await fetch(`https://quasar-wind-trader.glitch.me/salejurnal/${token}`, {
                        method: 'GET', headers:{ 'Content-Type': 'application/json' }, });
                    if(!jurnalrespons.ok){throw new Error('Failed to fetch users data');}
                    const result = await jurnalrespons.json();
                            setRespons(result);
                } catch (error) {}
            }
            FetchData();
        }, [])
        const Media = `https://embarrassing-unifor.000webhostapp.com/Media/${token}`;

    return(
        <>
                <Header>Sale Jurnal</Header>

                <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', position: 'relative'}}>
                {!resspons && <Loading /> }
                {resspons?.map((item:any, index:number) => (
                    <Conteiner>
                        <Image> <img src={`${Media}/${item.img}`} alt=''/></Image>
                            <Info>
                            <samp><b>Name:</b> {item.name} </samp>
                            <samp><b>Price:</b> {item.price} {item.currency} </samp>
                            <samp><b>Amount:</b> {item.amount} {item.unit} </samp>
                            <samp><b>Cost:</b> {(item.price * item.amount).toFixed(2)} {item.currency} </samp>
                            <samp><b>Time:</b> {formatDate(item.time)} </samp>
                                    
                            </Info>
                    </Conteiner>
                ))}
                </div>
        </>
    );
};
export default SaleJurnal;