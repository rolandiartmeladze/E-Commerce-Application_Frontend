import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom'; 

import styled from "styled-components";

import serverUri from '../serverUrl';

import HomeIcon from '../../icon/home.png';
import ProductIcon from '../../icon/product.png';
import LabelIcon from '../../icon/label.png';
import categoryIcon from '../../icon/category.png';


const CategorySelection = styled.select`
        padding:  4px;
        background:  none;
        font-weight:  800;
        border:  none;
        textialign:  center;
        color:  yellow;
        margin-left: 4px;
`;



const MeniuCmponent = styled.div`
background-color: rgba(100, 1, 47, 0.4);
height: 40px;
padding: 2px 0px;
display: flex;
flex-direction: row;
box-shadow: 0px 2px 5px 0.5px black;
align-items: center;
justify-content:flex-end;

margin-bottom: 7px;
 ul{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    margin: 0px;
    align-items: stretch;
    height: 100%;
    margin-right: 5px;
   li{

    display: flex;
    flex-grow: 1;
    height: 100%; 
    margin: 0px;
    margin-left: 3px;
    padding: 0px 10px;
    text-decoration: none;
    backdrop-filter: contrast(1.5);   
    font-weight: 700;
    box-shadow: 0px 0px 1px 0.5px brown;
    transition: 0.4s ease-in-out;

    &: hover {
        backdrop-filter: contrast(0.5);  
        box-shadow: 0px 0px 1px 0.5px yellow;
        color: yellow;
 
    }

}
 
}

`;



const Productsnavigation = styled.h1`
text-decoration: none; 
width:  99%;
padding: 3px 0px;

  margin: 3px 0px;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: inset 2px 2px 1500px 0.2px rgba(255, 55, 0, 0.4), 2px 2px 4px 0.4px black;
  padding-left: 12px;
  margin-bottom: 5px;
  margin-top: 0px;
  display: flex;
  align-items: center;
      samp{
        margin: 1px 1px;
        padding: 2px;
      }
      a{
        transition: 0.4s ease-in-out;
        padding: 3px;
        cursor: pointer;
        text-decoration: underline; 

        display: flex;
        align-items: flex-end;

        &:hover {
          box-shadow: 0.3px 1px 1px 0px black; 
          color: red;
        }

      }
      img{
        width: 25px;
      }
`;


 interface MeniuProps{
    setUserData:Function;
    fetchData:Function;
    usermode:boolean;
    setMyRoom:Function;
    setProduct:Function;
 }


let categori = "all";
 const ProductsNavigation = ({ items, setProduct, product}: { items: string[], setProduct: Function, product: any}) => {
  const click =()=>{setProduct(null)}
  
return (
  <Productsnavigation>
      {items.map((itemName, index) => (
          itemName !== undefined && (
            <samp key={index}>
              {itemName === 'home' && (<><Link onClick={click} to={'/'}><img src={HomeIcon} alt='Home icon' />Home{'>'}</Link></>)}
              {itemName === 'products' && ( <Link onClick={click} to={'/products'}><img src={ProductIcon} alt='Product icon' />Products{'>'}</Link> )}
              {itemName === 'category' && ( <Link onClick={click} to={'/category'}><img src={categoryIcon} alt='Product icon' />{'category/' + categori}</Link> )}
            </samp>
          )
        ))}
        {product && <samp style={{display: 'flex'}}><img src={LabelIcon} alt='label icon' /> ID:{`${product?.id}`}</samp>}
        
    </Productsnavigation>
); 
}

export {ProductsNavigation};

const Meniu = ({setUserData, fetchData, usermode, setMyRoom, setProduct}:MeniuProps) => {
  const navigate = useNavigate(); 

    const serverlink = serverUri();
    let items = ['home', 'myRoom', 'products',"About",'Contact'];


    const categories: string[] = ["All", "Clothing", "Technique", "Food", "Accessories"];

    const [categoria, setCategoria] = useState(categories[0]);
    
    const categoryOptions: JSX.Element[] = categories.map((category: string, index: number) => (
      <option style={{ backgroundColor: 'black' }} key={index} value={category}>
        {category}
      </option>
    ));
    
    const selectCategory = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {

      const selectedCategory: string = event.target.value;
      if (selectedCategory !== "All") {
        try {
          const sortedcategory = await fetch(`${serverlink}/sortedcategory?category=${encodeURIComponent(selectedCategory)}`, {                
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!sortedcategory.ok) { throw new Error('Failed to fetch users data'); }
          const categoryresponse = await sortedcategory.json();
          setUserData(categoryresponse);
          setCategoria(selectedCategory); 
          categori = selectedCategory;
          navigate('/category');
          setProduct(null);

        } catch (error) { console.log('Error:', error); }
      } else {
        fetchData(); 
        setCategoria(selectedCategory); 
        categori = "All";
        navigate('/Products');
        setProduct(null)

      }
    }


    return(
      <MeniuCmponent>
        
<ul>




          {items.map((itemName, index) => (
              <>
                {itemName === 'home' && (
                  <Link key={index} to={`/`}>
                    <li>{'Home'}</li>
                  </Link>
                )}
                    {usermode &&
                    itemName === 'myRoom' && (
                    <Link onClick={()=>{setMyRoom(true)}} key={index} to={`/main`}>
                        <li>{'My Room'}</li>
                    </Link>
                    )}                   
                        {itemName === 'products' && (
                        <Link onClick={()=>{setProduct(null)}} key={index} to={`/products`}>
                            <li>{'Products'}</li>
                        </Link>
                        )}  

                        {itemName === 'About' && (
                        <Link key={index} to={`/about`}>
                            <li>{'About'}</li>
                        </Link>
                        )}  

                            {itemName === 'Contact' && (
                            <Link key={index} to={`/contact`}>
                                <li>{'Contact'}</li>
                            </Link>
                            )}  

              </>
            ))}

                <li> Category: 
                    <CategorySelection 
                        onChange={selectCategory} 
                        name="category" 
                        id="category"
                        value={categoria} 
                        >
                    {categoryOptions}
                    </CategorySelection>
                </li>

</ul>


    
     
      
      </MeniuCmponent> 
    
    );
  }

  export default Meniu;