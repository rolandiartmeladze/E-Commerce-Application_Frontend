import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductComponent from "../ProductComponent/ProductComponent";
import viewProduct from "../ProductComponent/VievUpdate";
import { Link, useLocation } from "react-router-dom";
import Loaing from "../Loading";

import { Member } from "../../Tools";

import View from '../../icon/view.svg';
import Sale from '../../icon/cost.png';
import Category from '../../icon/category.png';
import Person from '../../icon/person.svg';
import Product from '../../icon/products.svg';
import Guset from '../../icon/guest.svg';




interface Props{
    setProduct:Function;
}


const Conteiner = styled.div`
    width: 100%;
    min-height: 200px;
    border-radius: 8px;
    box-shadow: 1px 0px 3px 0.5px;
    margin-top: 16px;  
    position:relative; 
    
    padding-bottom: 5px;
    // z-index: -1;
   
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


const MoreBtn = styled.h5`
    margin: 3px;
    margin-right: 12px; 
    padding: 5px;
    position: relative;
    z-index: 1;
    color: black;
    padding-right: 10px;
    transition: color 0.4s ease-in-out;
    background-color: rgba(35, 46, 200, 0.3);
    border-radius: 0px 5px 5px 0px;

    &:before {
        content: '';
        position: absolute;
        background-color: red;
        width: 6px;
        left: -4px;
        top: 0;
        height: 100%;
        border-radius: 4px 0px 0px 4px;
    }
    
    &:after {
        content: '';
        position: absolute;
        width: 0px;
        left: 0px;
        top: 0;
        height: 100%;      
        z-index: -1; 
        border-radius: 0px 5px 5px 0px;
        transition: width 0.4s ease-in-out, background-color 0.4s ease-in-out;
    }

    &:hover {
        color: yellow;
        &:before {
            background-color: black;
        }
        &:after {
            width: 100%;
            background-color: green;
        }
    }
`;



const InfoBoard = styled.div`
width: 100%;
background-color: rgba(70, 45, 27, 0.2);
position: relative;
padding: 10px 0px;
border-radius: 0px 0px 10px 10px;
overflow: hidden;
z-index: -1;

&:before{
    content: '';
    position: absolute;
    background: rgb(85, 25, 55, 0.3);
    width: 100%;
    left: 0px;
    bottom: 0;
    height: 100%;
    box-shadow: 2px 2px 8px 1px black;

    z-index: -1;

}
&:after{
    content: '';
    position: absolute;
    width: 100%;
    background-color: red;
    left: 0px;
    height: 6px;
    z-index: 0;
    bottom: 0;
    z-index: -1;

}


ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0px;
    z-index: -1;


    li{
        width: 30%;
        min-width: 200px;
        box-shadow: none;
        background: none;
        display: flex;
        justify-content: flex-start;
        border-radius: 0px;
        z-index: -1;
        backdrop-filter: blur(0px);
        img{
            width: 22px;
            margin: 0px 2px;
        }


    }
}

@media (max-width: 500px) {
    li{
        width: auto !important;
        min-width: 100px !important;
    
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
        respons.forEach((product:any) => { TotalView += product.view; });

        let TotalSale = 0;
        respons.forEach((product:any) => { TotalSale += product.sale; });

        const Actually: any[] = [...respons].sort((a, b) => b.view - a.view);
            let category: string | undefined;
            if (Actually.length > 0) { category = Actually[0].category; }
        const ActuallyCategory = respons.filter((product: any) => product.category === category);

    useEffect(() => {
        const fetchData = async () => {
            try {            
                setLoading(true);
                const productsResponse = await fetch(`https://lavish-husky-gaura.glitch.me/checkProducts`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!productsResponse.ok) { throw new Error('Failed to fetch products data'); }
                const productsData = await productsResponse.json();
                setRespons(productsData);
                setLoading(false);
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

    const Load = (loading && <Loaing />);


    const moreBtn = ()=>{
        return(<>
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
            <MoreBtn>
                Show More...
            </MoreBtn>
        </div>
        </>);
    }

    const [memberLength, setMemberLength] = useState<number | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            const members = await Member();
            if (members) { setMemberLength(members); } 
            else { setMemberLength(0); }
        };

        fetchMembers();
    }, []);

    return (
        <>


        <InfoBoard>

            <ul>
            <li>{<img src={Product} alt="" />}Products: {respons.length}</li>
            <li>{<img src={Person} alt="" />}Members: {memberLength}</li>
            <li>{<img src={Category} alt="" />}Categorys: {'5'}</li>

            <li>{<img src={View} alt="" />}View: {TotalView}</li>
            <li>{<img src={Guset} alt="" />}Guests: {'0'}</li>
            <li>{<img src={Sale} alt="" />}Sales: {TotalSale}</li>
            </ul>

        </InfoBoard>




        <Conteiner>
            <h1>Actually Products</h1>
             {Load ||  
                <ProductComponent products={Actually.slice(0, item)}  {...ProductProps} />}
                   <Link to={'/products?&view=Most%20View'} > {moreBtn()} </Link>
        </Conteiner>

        <Conteiner>
            <h1>Newest Products</h1>
             {Load ||  
                <ProductComponent products={respons.slice(0, item)}  {...ProductProps} />}
                    {moreBtn()} 
        </Conteiner>

        <Conteiner>
            <h1>Actually-Category/{category}</h1>
             {Load || 
                <ProductComponent products={ActuallyCategory.slice(0, (item))}  {...ProductProps} />}
                   <Link to={`/products?category=${category}`}> {moreBtn()} </Link>
        </Conteiner>

        </>
    );
};

export default Home;
