import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductComponent from "../ProductComponent/ProductComponent";
import viewProduct from "../ProductComponent/VievUpdate";
import { useLocation } from "react-router-dom";

interface Props{
    setProduct:Function;
}


const Conteiner = styled.div`
    width: 100%;
    min-height: 200px;
    // max-width: 1250px;
    border-radius: 8px;
    box-shadow: 1px 0px 3px 0.5px;
    margin-top: 16px;        
    // @media (min-width: 1250px) {
    
    //     padding: 5px 20px;
    // }

    h1{
        text-align: left;
        padding: 5px;        
        padding-top: 0px;
        padding-left: 10px;
        position:relative;

        &:before{
            content: '';
            position: absolute;
            background-color: red;
            width: 6px;
            left: 0px;
            height: 100%;
            border-radius: 6px 0px 0px 0px;
        }
        &:after{
            content: '';
            position: absolute;
            background-color: red;
            width: 100%;
            left: 0px;
            bottom: 0px;
            height: 2px;        
        }
    }
`;


const InfoBoard = styled.div`
width: 100%;
background-color: rgba(70, 45, 27, 0.2);
position: relative;
padding-bottom: 10px;

&:before{
    content: '';
    position: absolute;
    background-color: rgba(250, 25, 17);             
    width: 100%;
    left: 0px;
    bottom: 0;
    height: 3px;
    z-index: 0;
}

ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0px;
    li{
        width: 30%;
        min-width: 200px;
        box-shadow: none;
        background: none;
        display: flex;
        justify-content: flex-start;
        border-radius: 15px;
        z-index: 2;
        &:before{
            content: '';
            position: absolute;
            background-image: linear-gradient(to right, rgba(70, 45, 27, 0.5), transparent);             
            width: 50%;
            left: 0px;
            top: 0;
            height: 100%;
            border-radius: 3px;
            z-index: 0;
        }

    }
}
`;


const Home = ({setProduct}:Props) => {

    const [respons, setRespons] = useState<any>([]);
    const [favorits, setFavorits] = useState<any[]>(JSON.parse(localStorage.getItem('favorits') ?? '[]'));
    const [incart, setInCart] = useState<any[]>(JSON.parse(localStorage.getItem('incart') ?? '[]'));
    const [loading, setLoading] = useState<boolean>(false);

        const width = window.innerWidth;
        let numb = width / 280;
        let item: number = parseInt((numb - 1).toFixed(0));

let TotalView = 0;
    respons.forEach((product:any) => {
    TotalView += product.view;
});


        const Actually: any[] = [...respons].sort((a, b) => b.view - a.view);
        let category: string | undefined;
        if (Actually.length > 0) {
            category = Actually[0].category;
        }
        
        const ActuallyCategory = respons.filter((product: any) => product.category === category);


        console.log(item);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetch(`https://lavish-husky-gaura.glitch.me/checkProducts`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!productsResponse.ok) {
                    throw new Error('Failed to fetch products data');
                }
                const productsData = await productsResponse.json();
                setRespons(productsData);
                                    console.log(productsData)

            } catch (error) {
                console.error(error);
            }

        };

        fetchData();
    }, []); 

    const location = useLocation();

    const clickF = (productId: string) => {



        viewProduct(productId, setProduct, setLoading, location);
        setLoading(true);
    };



    const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading};

    return (
        <>


        <InfoBoard>

            <ul>
            <li>Products: {respons.length}</li>
            <li>Members: {'2'}</li>
            <li>Categorys: {'5'}</li>

            <li>View: {TotalView}</li>
            <li>Guests: {'0'}</li>
            <li>Sales: {'0'}</li>
            </ul>

        </InfoBoard>




        <Conteiner>
            <h1>Actually Products</h1>
             {respons &&  <ProductComponent products={Actually.slice(0, item)}  {...ProductProps} />}

        </Conteiner>

        <Conteiner>
            <h1>Newest Products</h1>
             {respons &&  <ProductComponent products={respons.slice(0, item)}  {...ProductProps} />}

        </Conteiner>

        <Conteiner>
            <h1>Actually-Category/{category}</h1>
             {respons &&  <ProductComponent products={ActuallyCategory.slice(0, (item))}  {...ProductProps} />}

        </Conteiner>

        </>
    );
};

export default Home;
