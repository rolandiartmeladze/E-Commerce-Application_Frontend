import react, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Loading from '../../Loading';

import formatDate from '../../FormatDataTime';

const Header = styled.nav`
        border-radius: 0px 0px 10px 10px;
        text-align: left;
        background-color: rgb(51, 181, 81, 0.4);
        padding: 3px 8px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        div{
            display: flex;
            align-items: center;
            }
        
        @media (max-width: 750px) {border-radius: 0px;}

        .navigate {
            max-width: 250px;
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            samp {
                padding: 5px 0;
                height: auto;
                width: 40%;
                margin: 4px;
                align-items: center;
                align-content: center;
                justify-content: center;
                row-gap: 5px;
                display: flex;
                cursor: pointer;
                background-color: rgba(51, 181, 181, 0.4);
                box-shadow: -1px 0px 1px 1px red;
                height: 100%;
                align-items: center;
                margin: 3px;
                transition: 0.4s ease-in-out;
                border-radius: 4px 0px 0px 4px;
                position: relative;
                font-weight: 900;

                &:hover{
                    transform: scale(1.05);
                    border-radius: 4px;}

                    &:before {
                            content: '';
                            position: absolute;
                            top: 1%;
                            left: 0;
                            width: 0;
                            height: 98%;
                            background-color: yellow;
                            transition: width 0.5s ease-in-out;
                            border-radius: 4px;
                            z-index: -1;
                        }
                        &:hover {
                                background-color: rgba(51, 81, 81, 0);
                                box-shadow: 0px 0px 1px 0px green;
                                color: red;

                                 &:before {width: 100%;}
                                }
                     }
            }      



        .datatime{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            flex-direction: row;

            .title {
                font-weight: 900;
                padding: 8px 0px;
                margin: 0px 10px;
                align-items: center;
                border-radius: 5px;
                color: red;
                display: flex;
                background-color:  rgba(10, 35, 67, 0.5);
                border-radius: 5px 0px 0px 5px;
                width: 120px;
                justify-content: center;
            
                }

                .time{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    position: relative;
    font-weight: 900;
    font-size: 100%;
    padding-left: 3px;
    &:before{
            content: '';
            position: absolute;
            top: 1%;
            left: -5px;
            width: 6px;
            height: 98%;
            background-color: red;
            transition: width 0.5s ease-in-out;
            border-radius: 4px 0px 0px 4px;

    }
                }

            }

        .head{
            display: flex;
            width: 100%;
            box-shadow: 0px 3px 2px -2px;
            padding: 3px 0px;
            margin-bottom: 4px;
            align-items: center;
            
            h4{
                margin: 0;
                padding: 3px;
                }
    
                div{
                    position:relative;
                    margin: 0px 18px;
                   
                    }
                }
            }
        .conteiner{
            display: flex;
            justify-content: space-between;
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
    const [mode, setMode] = useState<string>('Today')
    async function FetchData(sort:string) {
        setRespons(null);
        try {

            const jurnalrespons = await fetch(`https://quasar-wind-trader.glitch.me/api/salejurnal/${token}/?sort=${sort}`, {
                method: 'GET', 
                headers:{ 'Content-Type': 'application/json' },
            });
            if(!jurnalrespons.ok){throw new Error('Failed to fetch users data');}
            const result = await jurnalrespons.json();
                    setRespons(result);
        } catch (error) {}
    }

        useEffect(()=>{
            FetchData("day");
        }, [])

        const Media = `https://embarrassing-unifor.000webhostapp.com/Media/${token}`;

        const sortJurnal =( sort:string, title:string ):void =>{
            FetchData(sort);
            setMode(title);
        };

        const [products, setProduct] = useState<number>(0);
        const [cost, setCost] = useState<number>(0);
        const [data1, setData1] = useState<string>('');
        const [data2, setData2] = useState<string>('');
    
        useEffect(() => {
            const update = async () => {
                    const total = resspons?.reduce((acc:any, product:any) => acc + product.amount, 0);
                    const totalCost = resspons?.reduce((acc:any, product:any) => acc + (product.amount * product.price), 0);

                if (resspons && resspons.length > 0) {
                    setCost(totalCost);
                    setProduct(total);

                    setData1(formatDate(resspons[0]?.time));
                    setData2(formatDate(resspons[resspons.length - 1]?.time));
                }
            };
            update();
        }, [resspons]);


    return(
        <>
                <Header>     
                    
                    <div className='head'> 
                        <h4>Sale Jurnal </h4>
                            <div>Units Sold: {products}</div> 
                            <div>Total Cost: {cost.toFixed(2)} ₾.</div> 
                    </div>

                    <div className='conteiner'>
                        <div className='datatime'>
                            <span className='title'> {mode} </span> 
                        
                            {resspons &&
                                <div className='time'>
                                    <samp>From: {data1}</samp>
                                    <samp>To: {data2}</samp>                        
                                </div> 
                            }
                        
                        </div>

                        <div className='navigate'>
                            <samp onClick={()=>{sortJurnal("All",'All')}}>All</samp>
                            <samp onClick={()=>{sortJurnal("day",'Today')}}>Today</samp>
                            <samp onClick={()=>{sortJurnal("week", 'This Week')}}>This Week</samp>
                            <samp onClick={()=>{sortJurnal("month", 'This Month')}}>This Month</samp>
                        </div> 
                    </div>

                </Header>

                <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', position: 'relative'}}>
                {!resspons && <Loading /> }
                {resspons?.map((item:any, index:number) => (
                    <Conteiner key={index}>
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