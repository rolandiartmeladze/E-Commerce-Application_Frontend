import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import styled from "styled-components";

// Import icons
import HomeIcon from '../../icon/home.png';
import ProductIcon from '../../icon/product.png';
import CategoryIcon from '../../icon/category.png';
import DataTimeIcon from '../../icon/clock.png';
import ViewIcon from '../../icon/view.png';
import LabelIcon from '../../icon/label.png';

// Import tools
import sortedcategory from "../ProductConteiner/SortCategory";
import Product from '../../Tools';

// Styled components
const Selection = styled.select`
    padding: 4px;
    background: none;
    font-weight: 800;
    border: none;
    text-align: left;
    color: black;
    margin-left: 4px;
    outline: none;
    border-radius: 10px;

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

    ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
        color: black;
        display: flex;
        align-items: center;

        li {
            box-shadow: none;
            background: none;
            backdrop-filter: none;
            padding: 0px;
            margin: 0px 10px;

            img {
                width: 20px;
                margin: 0px 2px;
            }
        }
    }

    h3 {
        margin: 0px 10px;
        font-size: 100%;
    }
`;

const Productsnavigation = styled.h1`
    text-decoration: none; 
    width: 100%;
    padding: 2px 0px;
    box-shadow: 0px 1px 1px -0.5px;
    margin: 0px;
    display: flex;
    align-items: center;

    samp {
        margin: 1px 1px;
        padding: 2px;
    }

    a {
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

    img {
        width: 25px;
    }
`;

// Main component
const SortProduct = ({ setRespons, setLoading, respons }) => {



        const storedSort = localStorage.getItem('Sort');
        let sort = storedSort ? JSON.parse(storedSort) : { category: "All", view: "All", time: "All" };
    
        const [view, setView] = useState(sort.view);
        const [time, setTime] = useState(sort.time);
        const [selectedCategory, setSelectedCategory] = useState(sort.category);
    
        const navigate = useNavigate();
    
        useEffect(() => {
            const updatedSort = { ...sort, category: selectedCategory, view: view, time: time };
            localStorage.setItem('Sort', JSON.stringify(updatedSort));
            let link = `/products${selectedCategory !== "All" ? '/?category=' + selectedCategory : ""}${view !== "All" ? '/?view=' + view : ""}${time !== "All" ? '/?time=' + time : ""}`;
            navigate(link);
        }, [selectedCategory, time, view, navigate]);
    
        const location = useLocation();


    const loadCategory = async (category) => {

        try {
            setLoading(true);
            const response = category === "All" ? await Product() : await sortedcategory(category);
            setRespons(response);
        } catch (error) {
            console.error('Error fetching category:', error);
        } finally {
            setLoading(false);
        }
    };

    // Select category function
    const selectCategory = async (event) => {


        const selectedCategory = event.target.value;
       setSelectedCategory(selectedCategory);


        await loadCategory(selectedCategory);


    };

    const SortData = async (event) => {

        const selectedTime = event.target.value;
       setTime(selectedTime);


    };

    const SortView = async (event) => {

        const selectedView = event.target.value;
        setView(selectedView);

    };

    // Reset function
    const reset = () => {
        setLoading(true);
        setRespons(null);
        setView("All");
        setTime("All");
        setSelectedCategory("All");
        loadCategory("All"); 
    };

    const CategoryItem = ["All", "Clothing", "Technique", "Food", "Accessories"];
  
    return (
        <SortedPanel>
            <h3>Sort Products: </h3>
            <ul>
                <li>
                    <img src={CategoryIcon} alt="Category Icon" />
                    <Selection 
                        onChange={selectCategory} 
                        name="category" 
                        id="category"
                        value={selectedCategory || "All"} 
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
                        onChange={SortData} 
                        name="sortDara" 
                        id="sortData"
                        value={time} 
                    >
                        {['All',"Newest", "Oldest"].map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}                    
                    </Selection>
                </li>
                <li>
                    <img src={ViewIcon} alt="Category Icon" />
                    <Selection 
                        onChange={SortView} 
                        name="sortView" 
                        id="SortView"
                        value={view} 
                    >
                        {["All", "Most View", "Less View"].map((view, index) => (
                            <option key={index} value={view}>
                                {view}
                            </option>
                        ))}
                    </Selection>                
                </li>
            </ul>
            <input
                type="button"
                value="Reset"
                onClick={reset}
            />
        </SortedPanel>
    );
};

// Export SortProduct component
export { SortProduct }

// Navigation component
const Navigation = ({ items, setProduct, product }) => {
    const click = () => { setProduct(null) };
    
    return (
        <Productsnavigation>
            {items.map((itemName, index) => (
                itemName !== undefined && (
                    <samp key={index}>
                        {itemName === 'home' && (
                            <Link onClick={click} to={'/'}>
                                <img src={HomeIcon} alt='Home icon' />
                                Home{'>'}
                            </Link>
                        )}
                        {itemName === 'products' && (
                            <Link onClick={click} to={'/products'}>
                                <img src={ProductIcon} alt='Product icon' />
                                Products{'>'}
                            </Link>
                        )}
                        {itemName === 'category' && (
                            <Link onClick={click} to={'/products'}>
                                <img src={CategoryIcon} alt='Product icon' />
                                {'Category/'}
                            </Link>
                        )}
                    </samp>
                )
            ))}
            {product && 
                <samp style={{ display: 'flex' }}>
                    <img src={LabelIcon} alt='label icon' /> ID: {`${product?.id}`}
                </samp>
            }
        </Productsnavigation>
    ); 
};

// Export Navigation component
export { Navigation };
