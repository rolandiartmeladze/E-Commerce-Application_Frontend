import react, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Loading from '../../Loading';

import formatDate from '../../FormatDataTime';

const Header = styled.h1`
        border-bottom-left-radius: 5px;
        text-align: left;
        background-color: rgb(51, 181, 81, 0.4);
        padding: 3px 8px;
        display: flex;
        justify-content: space-between;

        div{
            display: flex;
    align-items: center;

            samp{
                display: flex;
                cursor: pointer;
                background-color: rgb(51, 181, 181, 0.4);
                box-shadow: 0px 0px 1px 1px red;
                height: 100%;
                align-items: center;
                padding: 0px 5px;
                margin: 0px 3px;
                transition: 0.4s ease;
                border-radius: 4px;

&:hover{
    background-color: rgb(51, 81, 181, 0.6);
    box-shadow: 0px 0px 1px 1px yellow;
    color: yellow;

}
                        }
        }
        
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
    // const [sort, setSort] = useState("All");

    async function FetchData(sort:string) {
        try {

            const jurnalrespons = await fetch(`http://localhost:3001/salejurnal/${token}/?sort=${sort}`, {
                method: 'GET', 
                headers:{ 'Content-Type': 'application/json' },
            });
            if(!jurnalrespons.ok){throw new Error('Failed to fetch users data');}
            const result = await jurnalrespons.json();
                    setRespons(result);
        } catch (error) {}
    }

        useEffect(()=>{
            FetchData("All");
        }, [])

        const Media = `https://embarrassing-unifor.000webhostapp.com/Media/${token}`;

    return(
        <>
                <Header>Sale Jurnal  
                    <div>
                        <samp onClick={()=>{FetchData("day")}}>Today</samp>
                        <samp onClick={()=>{FetchData("Week")}}>This Week</samp>
                        <samp onClick={()=>{FetchData("month")}}>This Month</samp>
                        </div> 
                    </Header>

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