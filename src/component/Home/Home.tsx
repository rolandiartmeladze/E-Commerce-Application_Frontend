import React, { useState, useEffect } from "react";
import ProductComponent from "../ProductComponent/ProductComponent";
import viewProduct from "../ProductComponent/VievUpdate";
import {  useLocation, useNavigate } from "react-router-dom";
import Loaing from "../Loading";

import { Member } from "../../Tools";


import { 
    Conteiner, MoreBtn, InfoBoard,
    View, Sale, Category, Person, Product, Guset,
    fetchData, LoaingComponent
 } from './Tools';




interface Props{
    setProduct:Function;
}

interface BtnProps {
    link: string;
}


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

    useEffect(() => { fetchData(setLoading, setRespons) }, []); 

    const location = useLocation();

    const clickF = (productId: string) => {



        viewProduct(productId, setProduct, setLoading, location);
        setLoading(true);
    };



    const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading};

    // const Load = (loading && <Loaing />);


    const MoreButton: React.FC<BtnProps> = ({ link }) => {
        const navigate = useNavigate();
    
        const handleClick = () => {
            navigate(link);
        };
    
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MoreBtn onClick={handleClick}>
                    Show More...
                </MoreBtn>
            </div>
        );
    };

    const [memberLength, setMemberLength] = useState<number | null>(null);

    const anime = () => {
        const items = Array.from(document.getElementsByClassName('cont')) as HTMLDivElement[];

        items.forEach((element, index) => {
          setTimeout(() => {
            element.style.transform = 'scale(1)';
          }, 800);
        });
      };
      
      const AnimeII = () =>{
        const article = Array.from(document.querySelectorAll('article')) as HTMLElement[];

            article.forEach((element, index) => {
                setTimeout(() => {
                  element.style.transform = 'scale(1)';
                }, index * 300);
              });
        }    


      useEffect(()=>{AnimeII();}, [respons])


     useEffect(() => {
        const fetchMembers = async () => {
            const members = await Member();
            if (members) { setMemberLength(members); } 
            else { setMemberLength(0); }
        };

        fetchMembers();
        anime();
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




        <Conteiner className="cont">
            <h1>Actually Products</h1>
            {loading && <LoaingComponent />}
             { !loading && <ProductComponent products={Actually.slice(0, item)}  {...ProductProps} />}
                   <MoreButton link="/products?&view=Most%20View" />
        </Conteiner>

        <Conteiner className="cont">
            <h1>Newest Products</h1>
            {loading && <LoaingComponent />}
             { !loading && 
                <ProductComponent products={respons.slice(0, item)}  {...ProductProps} />}
                {/* <MoreButton link={`/..`} /> */}
        </Conteiner>

        <Conteiner className="cont">
            <h1>Actually-Category/{category}</h1>
            {loading && <LoaingComponent />}

             {!loading && 
                <ProductComponent products={ActuallyCategory.slice(0, (item))}  {...ProductProps} />}
                   <MoreButton link={`/products?category=${category}`} />
        </Conteiner>

        </>
    );
};

export default Home;
