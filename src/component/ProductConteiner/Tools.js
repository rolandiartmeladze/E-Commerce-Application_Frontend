import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom'; 

import styled from "styled-components";


import HomeIcon from '../../icon/home.png';
import ProductIcon from '../../icon/product.png';
import LabelIcon from '../../icon/label.png';

import CategoryIcon from '../../icon/category.png';
import DataTimeIcon from '../../icon/clock.png';
import ViewIcon from '../../icon/view.png';

import sortedcategory from "../ProductConteiner/SortCategory";
import Product from '../../Tools';


const Selection = styled.select`
    padding: 4px;
    background: none;
    font-weight: 800;
    border: none;
    text-align: left;
    color: black;
    margin-left: 4px;
    outline: none;
    border-radiuse: 10px;

    option {
        background-color: white;
        color: black; 
        border-radius: 10px;
    }
`;

 const SortedPanel = styled.nav`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 3px 0px;

    input {
        padding: 4px 10px;
        cursor: pointer;
        position: absolute;
        right: 15px;
        background: moccasin;
        border: none;
        outline: none;
        border-radius: 4px;
        transition: 0.2s ease-in-out;
        box-shadow: 0px 0px 2px 1px brown;
        color: ${({ disabled }) => (disabled ? 'black' : 'red')};
        font-weight: 600;

        &:hover {
            color: black;
            transform: scale(1.1);
        }
    }
    

            ul{
                list-style: none;
                padding: 0px;
                margin: 0px;
                color: black;
                display: flex;
                align-items: center;

                    li{
                        box-shadow: none;
                        background: none;
                        backdrop-filter: none;
                        padding: 0px;
                        margin: 0px 10px;

                            img{
                                width: 20px;
                                margin: 0px 2px;
                            }
                    }

            }
                h3{
                    margin: 0px 10px;
                    font-size: 100%;
                }
 `;


 
const Productsnavigation = styled.h1`
text-decoration: none; 
width:  100%;
padding: 2px 0px;
box-shadow: 0px 1px 1px -0.5px;

  margin:0px;
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



  
   const SortProduct =({setRespons})=>{
    const [category, setCategory] = useState("All"); 
  
    // const navigate = useNavigate(); 
  
    const loadCategory = async (category) => {
      try {
        if(category === "All") {  setRespons(await Product());  } 
        else { setRespons(await sortedcategory(category)); }
      } catch (error) { console.error('Error fetching category:', error); }
    };
  
    const selectCategory = async (event) => {
        const selectedCategory = event.target.value;  
        await loadCategory(selectedCategory);
        setCategory(selectedCategory);
      };

      const selectData = async (event) => {
        const selectedData = event.target.value;  
            console.log(selectedData);
        // await loadCategory(selectedCategory);
      };
      
    const CategoryItem = ["All", "Clothing", "Technique", "Food", "Accessories"];
  
    
    return (
      <>
      <SortedPanel>
           <h3>Sort Products: </h3>
          <ul>
              <li>
                  <img src={CategoryIcon} alt="Category Icon" />
                  <Selection 
                      onChange={selectCategory} 
                      name="category" 
                      id="category"
                      value={category} 
                  >
                      {CategoryItem.map((category, index) => (
                          <option key={index} value={category}>
                              {category}
                          </option>
                      ))}
                  </Selection>
              </li>
                  <li>
                      <img src={DataTimeIcon} alt="Category Icon" />
                      <Selection 
                          onChange={selectData} 
                          name="category" 
                          id="category"
                          value={category} 
                      >
                          {["Newest", "Oldest"].map((category, index) => (
                              <option key={index} value={category}>
                                  {category}
                              </option>
                          ))}                    
                          
  
                      </Selection>
                  </li>
                      <li>
                          <img src={ViewIcon} alt="Category Icon" />
                          <Selection 
                              onChange={selectCategory} 
                              name="category" 
                              id="category"
                              value={category} 
                          >
                              {["most popular", "less view"].map((category, index) => (
                                  <option key={index} value={category}>
                                      {category}
                                  </option>
                              ))}
                          </Selection>                
                      </li>
  
          </ul>
          <input
                type="button"
                disabled={category === "All"}
                value="Reset"
                onClick={()=>{loadCategory("All"); setCategory("All")}}
                />
          
                </SortedPanel>
      </>
  );
  
   };
    export {SortProduct}
  

    const Navigation = ({ items, setProduct, product}) => {
        const click =()=>{setProduct(null)}
        
      return (
        <>
        <Productsnavigation>
            {items.map((itemName, index) => (
                itemName !== undefined && (
                  <samp key={index}>
                    {itemName === 'home' && (<><Link onClick={click} to={'/'}><img src={HomeIcon} alt='Home icon' />Home{'>'}</Link></>)}
                    {itemName === 'products' && ( <Link onClick={click} to={'/products'}><img src={ProductIcon} alt='Product icon' />Products{'>'}</Link> )}
                    {/* {itemName === 'category' && ( <> <img src={CategoryIcon} alt='Product icon' /> {'category'} </>)} */}
                  </samp>
                )
              ))}
              {product && <samp style={{display: 'flex'}}><img src={LabelIcon} alt='label icon' /> ID:{`${product?.id}`}</samp>}
              
          </Productsnavigation>
          </>
      ); 
      }
      export {Navigation};
      