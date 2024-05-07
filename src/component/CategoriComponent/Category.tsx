import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; 
import ProductComponent from  '../ProductComponent/Product';
import viewProduct from '../ProductComponent/VievUpdate';
import sortedcategory from "./SortCategory";

import CategoryIcon from '../../icon/category.png';
import DataTimeIcon from '../../icon/clock.png';
import ViewIcon from '../../icon/view.png';

interface Props {
    incart: string[];
    setInCart: Function;
    favorits: string[];
    setFavorits: Function; 
    loading: boolean;
    setProduct: Function;
    setLoading: Function;
    userData:any;
}

const CategorySelection = styled.select`
    padding: 4px;
    background: none;
    font-weight: 800;
    border: none;
    text-align: left;
    color: white;
    margin-left: 4px;
    outline: none;
    border-radiuse: 10px;

    option {
        background-color: black;
        color: white; 
        border-radius: 10px;
    }
`;

 const SortedPanel = styled.nav`
    display: flex;
    height: 35px;
    background-color: gray;
    align-items: center;
    flex-direction: row;

        button{
            padding: 4px 10px;
            cursor:pointer;
            position:absolute;
            right: 15px;
            background: none;
            border:none;
            outline: none;
            border-radius: 4px;
            transition: 0.5s ease-in-out;
            box-shadow: 0px 0.8px 0.6px 1px white;
            color: red;
            font-weight: 600;
                &:hover {
                    box-shadow: 0px 0px 7px 1px black inset;
                    color:white;
                    font-weight: 900;
                }
        }

            ul{
                list-style: none;
                padding: 0px;
                margin: 0px;
                color: white;
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

const Category = ({userData, incart, setInCart, favorits, setFavorits, loading, setProduct, setLoading }: Props) => {
    const [category, setCategory] = useState<string>("All"); // Initialize category state with "All"
    const [categoryData, setCategoryData] = useState<any | null>(userData); // State to hold category data
    const navigate = useNavigate(); 

    useEffect(() => {loadCategory("All");}, []);

    const loadCategory = async (category: string) => {
        try {
            if(category === "All"){
                setCategoryData(userData);
            }else{
                const categoryResponse = await sortedcategory(category);
                      setCategoryData(categoryResponse);
            }
            
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    const selectCategory = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory: string = event.target.value;  
        setCategory(selectedCategory); 
        navigate(selectedCategory === "All" ? `/` : `/products`);
        loadCategory(selectedCategory);
    };

    const clickF = (productId: string) => {
        viewProduct(productId, setProduct, setLoading);
        setLoading(true);
    };

     const CategoryItem = ["All", "Clothing", "Technique", "Food", "Accessories"];
    return (
        <>
        <SortedPanel>
             <h3>Sort Products: </h3>
            <ul>
                <li>
                    <img src={CategoryIcon} alt="Category Icon" />
                    <CategorySelection 
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
                    </CategorySelection>
                </li>
                    <li>
                        <img src={DataTimeIcon} alt="Category Icon" />
                        <CategorySelection 
                            onChange={selectCategory} 
                            name="category" 
                            id="category"
                            value={category} 
                        >
                            {["Newest", "Oldest"].map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}                    
                            

                        </CategorySelection>
                    </li>
                        <li>
                            <img src={ViewIcon} alt="Category Icon" />
                            <CategorySelection 
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
                            </CategorySelection>                
                        </li>

            </ul>
                 <button> Reset </button>
        </SortedPanel>

            {categoryData && <ProductComponent products={categoryData} clickF={clickF} incart={incart} setInCart={setInCart} favorits={favorits} setFavorits={setFavorits} loading={loading} />}
        </>
    );
};

export default Category;
