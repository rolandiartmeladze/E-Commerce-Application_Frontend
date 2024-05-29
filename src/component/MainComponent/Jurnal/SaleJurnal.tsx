import react, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Loading from '../../Loading';

import Arrow from '../../../icon/arrow.png';
import productIcon from '../../../icon/product.png';
import costIcon from '../../../icon/cost.png';


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
                    max-height: 70px;;
                    display: flex;
                    align-items: center;
                    padding: 0px 3px; 
                    justify-content: center;
                    
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


                            const ContainerItem =styled.div`
                                display: flex; 
                                justify-content: space-around; 
                                flex-wrap: wrap; 
                                position: relative; 
                                width: 100%; 
                                margin: 5px 0px;


                                .result{
                                    padding: 3px;
                                    display: flex;
                                    align-items: center;
                                    samp{
                                        img{width: 18px !important;}
                                        display: flex;
                                        align-items: center;
                                        margin: 0px 10px;
                                        min-width: 50px;
                                    }
                                    
                                }

                                h2, h3, h4{
                                    margin: 0px 0px 0px 0px;
                                    text-align: left;
                                    position: relative;
                                    cursor: pointer;
                                    box-shadow: 0px 1px 3px 0.5px; 
                                    transition: 0.4s ease-in-out;

                                    display: flex;
                                    align-items: center; 
                                    width: 100%;
                                    img{margin: 0px 6px;}

                                    &:before{
                                        height: 100%;
                                        top: 0;
                                        left: 0px;
                                        position: absolute;
                                        content: '';
                                        width: 2px;
                                    }


                                }


                            .year-section{
                                width: 100%;
                                padding: 3px;                                    
                                background-color: rgb(120, 0, 0, 0.1);
                                h2{
                                    img{width: 28px;} 
                                    &:before{ background-color: rgb(120, 0,0); } 
                                }
                            }



                           .month-div{
                                padding: 3px;
                                background-color: rgb(0,220, 0, 0.1);
                                    h3{
                                        img{width: 25px;}
                                        &:before{ background-color: rgb(0, 220,0); } 
                                    }
                           }

                            .day-div{
                                display: flex;
                                flex-wrap: wrap; 
                                justify-content: center;
                                padding: 3px;
                                margin-top: 4px;
                                background-color: rgb(0, 0, 250, 0.1);

                                
                                    h4{
                                        img{width: 22px;} 
                                        &:before{ background-color: rgb(0, 0, 250); } 
                                    }
                            }
                           
                           
                            `;



                            interface Product {
                                time: string;
                                name: string;
                                price: number;
                                currency: string;
                                amount: number;
                                unit: string;
                                img: string;
                            }
                            
                            interface FormattedDate {
                                formatted: string;
                                year: string;
                                month: string;
                                day: string;
                            }
                            
                            interface GroupedProducts {
                                [year: string]: {
                                    [month: string]: {
                                        [day: string]: (Product & { formattedTime: string })[];
                                    };
                                };
                            }

                            
                            

                            const SaleJurnal: React.FC = () => {

                                function formatDate(dateString: string): FormattedDate {
                                    const date = new Date(dateString);
                                    const day = date.getUTCDate().toString().padStart(2, '0');
                                    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
                                    const year = date.getUTCFullYear().toString();
                                
                                    let hours = date.getUTCHours() + 4;
                                    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                                    const ampm = hours >= 12 ? 'PM' : 'AM';
                                    hours = hours % 12 || 12;
                                
                                    return {
                                        formatted: `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`,
                                        year,
                                        month,
                                        day,
                                    };
                                }
                                


                                const [resspons, setRespons] = useState<Product[] | null>(null);
                                const [mode, setMode] = useState<string>('Today');
                                const [products, setProducts] = useState<number>(0);
                                const [cost, setCost] = useState<number>(0);
                                const [data1, setData1] = useState<string>('');
                                const [data2, setData2] = useState<string>('');
                                const token = localStorage.getItem('token');
                                const [hiddenYear, setHiddenYear] = useState<Record<string, boolean>>({});
                                const [hiddenMonth, setHiddenMonth] = useState<Record<string, boolean>>({});
                                const [hiddenDay, setHiddenDay] = useState<Record<string, boolean>>({});

                                const today = new Date();
                                const todayDay = today.getUTCDate().toString().padStart(2, '0');
                                const activMonth = (today.getUTCMonth() + 1).toString().padStart(2, '0');
                                const activYear = today.getUTCFullYear().toString();

                                const [thisDay, setThisDay] = useState<string | null>(todayDay);
                                const [thisMonth, setThisMonth] = useState<string | null>(activMonth);
                                const [thisYear, setThisYear] = useState<string | null>(activYear);



                                async function fetchData(sort: string): Promise<void> {
                                    setRespons(null);
                                    try {
                                        const response = await fetch(`https://quasar-wind-trader.glitch.me/api/salejurnal/${token}/?sort=${sort}`, {
                                            method: 'GET',
                                            headers: { 'Content-Type': 'application/json' },
                                        });
                                        if (!response.ok) throw new Error('Failed to fetch data');
                                        const result: Product[] = await response.json();
                                        setRespons(result);
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            
                                useEffect(() => { fetchData('day'); }, []);
                            
                                useEffect(() => {
                                    if (resspons && resspons.length > 0) {
                                        const total = resspons.reduce((acc, product) => acc + product.amount, 0);
                                        const totalCost = resspons.reduce((acc, product) => acc + product.amount * product.price, 0);
                                        setProducts(total);
                                        setCost(totalCost);
                                        setData1(formatDate(resspons[0].time).formatted);
                                        setData2(formatDate(resspons[resspons.length - 1].time).formatted);
                                    }
                                }, [resspons]);
                            
            const sortJurnal = (sort: string, title: string): void => { fetchData(sort); setMode(title);};
                            
                                const groupRessponsByYearMonthDay = (resspons: Product[]): GroupedProducts => {
                                    return resspons.reduce((acc: GroupedProducts, product: Product) => {
                                        const { year, month, day, formatted } = formatDate(product.time);
                                        if (!acc[year]) acc[year] = {};
                                        if (!acc[year][month]) acc[year][month] = {};
                                        if (!acc[year][month][day]) acc[year][month][day] = [];
                                        acc[year][month][day].push({ ...product, formattedTime: formatted });
                                        return acc;
                                    }, {});
                                };
                            
                                const groupedResspons = resspons ? groupRessponsByYearMonthDay(resspons) : {};

                                const toggleYear = (year: string): void => {
                                    const keyMonth = `${year}`;
                                    setHiddenYear((prevVisibility) => ({
                                        ...prevVisibility,
                                        [keyMonth]: !prevVisibility[keyMonth],
                                    }));
                                };

                                const toggleMonth = (year: string, month: string): void => {
                                    const keyMonth = `${year}-${month}`;
                                    setHiddenMonth((prevVisibility) => ({
                                        ...prevVisibility,
                                        [keyMonth]: !prevVisibility[keyMonth],
                                    }));
                                };

                                const toggleDay = (year: string, month: string, day: string): void => {
                                    const key = `${year}-${month}-${day}`;
                                    setHiddenDay((prevVisibility) => ({
                                        ...prevVisibility,
                                        [key]: !prevVisibility[key],
                                    }));
                                };


                                const total = (result:any)=>{
                                    let saleProduct = 0; let totalCost = 0;
                                    result.forEach((product:any) => { saleProduct += product.amount });
                                    result.forEach((product:any) => { totalCost += (product.amount * product.price)});
                                    return( <div className='result'>
                                        <samp> <img src={productIcon} alt='' /> {saleProduct}</samp>
                                        <samp> <img src={costIcon} alt='' />  {totalCost.toFixed(2)}</samp>
                                        </div> );
                                    }

    const sortKeysDesc = (obj: { [key: string]: any }) => { return Object.keys(obj).sort((a, b) => Number(b) - Number(a)); };



                                useEffect(() => { setThisDay(todayDay); }, []);

                                const clickToday = () => { setThisDay(null);};
                                const clickMonth = () => { setThisMonth(null);};
                                const clickYear = () => { setThisYear(null);};
                                const iconstyle ={transform: 'rotate(90deg)'};


                                      const monthis =(monthitem:string)=> {
                                            const item =parseInt(monthitem, 0);
                                      const month =  [
                                                "January",
                                                "February",
                                                "March",
                                                "April",
                                                "May",
                                                "June",
                                                "July",
                                                "August",
                                                "September",
                                                "October",
                                                "November",
                                                "December"
                                            ]
                                        
                                        return month[item];
                                        
                                                                    };


                                return (
                                    <>
                                        <Header>
                                            <div className='head'>
                                                <h4>Sale Jurnal</h4>
                                                <div>Units Sold: {products}</div>
                                                <div>Total Cost: {cost.toFixed(2)} ₾</div>
                                            </div>
                                            <div className='conteiner'>
                                                <div className='datatime'>
                                                    <span className='title'>{mode}</span>
                                                    {resspons && (
                                                        <div className='time'>
                                                            <samp>From: {data1}</samp>
                                                            <samp>To: {data2}</samp>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='navigate'>
                                                    <samp onClick={() => sortJurnal('All', 'All')}>All</samp>
                                                    <samp onClick={() => sortJurnal('day', 'Today')}>Today</samp>
                                                    <samp onClick={() => sortJurnal('week', 'This Week')}>This Week</samp>
                                                    <samp onClick={() => sortJurnal('month', 'This Month')}>This Month</samp>
                                                </div>
                                            </div>
                                        </Header>
                            
                                        <ContainerItem>
                {!resspons && <Loading />}
                {sortKeysDesc(groupedResspons).map((year) => {
                    const keyYear = `${year}`;
                    return(
                    <section key={year} className='year-section'>
                        <h2  onClick={() => {toggleYear(year);
                                            if (year === activYear) {clickYear()} 
                                            }} >&nbsp; {year}
                        {<img style={hiddenYear[keyYear]  || year === thisYear? iconstyle:undefined}  src={Arrow} alt='' />}  

                        </h2>
                        {(hiddenYear[keyYear] || year === thisYear) && sortKeysDesc(groupedResspons[year]).map((month) => {
                            const keyMonth = `${year}-${month}`;
                            return(
                            <div key={month} className='month-div'>
                                <h3 onClick={() => {
                                    toggleMonth(year, month);
                                    if (month === activMonth) {clickMonth()}
                                }}>&ensp; {monthis(month)} 
                                    {<img style={hiddenMonth[keyMonth]  || month === thisMonth? iconstyle:undefined} src={Arrow} alt='' />}  
                                </h3>

                                {(hiddenMonth[keyMonth] || month === thisMonth) && sortKeysDesc(groupedResspons[year][month]).map((day)  => {
                                    const key = `${year}-${month}-${day}`;
                                    const products = groupedResspons[year][month][day];
                                    return (
                                        <div key={day} className='day-div'>
                                            <h4 onClick={() => { toggleDay(year, month, day);
                                                                if (day === todayDay) {clickToday()}
                                                                }}
                                            style={{marginBottom: hiddenDay[key]  || day === thisDay? '8px': '0'}}>
                                                &ensp;   {day} 
                                                {<img style={hiddenDay[key]  || day === thisDay? iconstyle:undefined} src={Arrow} alt='' />}  
                                                {total(products)}
                                            </h4>
                                            {(hiddenDay[key] || day === thisDay)  && products.map((product, index) => (
                                                <Conteiner key={index}>
                                                    <Image>
                                                        <img
                                                            src={`https://embarrassing-unifor.000webhostapp.com/Media/${token}/${product.img}`}
                                                            alt=''
                                                        />
                                                    </Image>
                                                    <Info>
                                                        <samp><b>Name:</b> {product.name}</samp>
                                                        <samp><b>Price:</b> {product.price} {product.currency}</samp>
                                                        <samp><b>Amount:</b> {product.amount} {product.unit}</samp>
                                                        <samp><b>Cost:</b> {(product.price * product.amount).toFixed(2)} {product.currency}</samp>
                                                        <samp><b>Time:</b> {product.formattedTime}</samp>
                                                    </Info>
                                                </Conteiner>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                            );

                        
                            })}
                    </section>
                    );
                })}
            </ContainerItem>                                    </>
                                );
                            };
                            
                            export default SaleJurnal;