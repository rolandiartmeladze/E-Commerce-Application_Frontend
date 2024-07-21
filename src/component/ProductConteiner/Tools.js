import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Import icons
import HomeIcon from '../../icon/home.png';
import ProductIcon from '../../icon/product.png';
import CategoryIcon from '../../icon/category.png';
import DataTimeIcon from '../../icon/clock.png';
import ViewIcon from '../../icon/view.png';
import LabelIcon from '../../icon/label.png';

// Import tools
import sortedcategory from '../ProductConteiner/SortCategory';
import Product from '../../Tools';
import serverUri from '../serverUrl';

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

        @media only screen and (max-width: 750px) {
          flex-grow: 1;
          box-shadow: -20px 0px 3px 0.3px rgb(255, 200, 10, 0.2) inset;
          cursor:pointer;
          border-radius: 0px;
        }

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
  @media only screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
  }

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

    @media only screen and (max-width: 768px) {
        bottom: 0px;
        position: relative;
        margin-top: 5px;
        left: 70%;
        float: right;
        width: 30%;
        padding: 10px 20px;
        border-radius: 5px;
        margin-bottom: 5px;
        background: #100d08;
        box-shadow: 0px 0px 2px 1px brown inset;
        font-weight: 900;  
        color: cyan; 
            &:hover {
              color: yellow;
    }

        }

    &:hover {
      color: yellow;
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

    @media only screen and (max-width: 750px) {
      align-items: flex-start;
      flex-direction: column;
      margin-left: 0px;
      width:100%;
    }

    li {
      box-shadow: none;
      background: none;
      backdrop-filter: none;
      padding: 0px;
      margin: 0px 10px;

      @media only screen and (max-width: 750px) {
        width: 100%;
        position: relative;
        // margin: 0px 0px;
            margin: 4px 0px;


      }

      img {          
      

        z-index: 3;
        width: 20px;
        margin: 0px 2px;
        position: relative;

        @media only screen and (max-width: 750px) {
          background-color: none;
          padding: 2px;
          width: 25px;
          border-radius: 5px 0px 5px 0px;
        }
      }
    }
  }

  h3 {
    margin: 0px 10px;
    font-size: 100%;

    @media only screen and (max-width: 750px) {
      margin-left: 0px;
    }
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
    @media only screen and (max-width: 750px) {
      align-items: center;
    }

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
const SortProduct = ({ setRespons, setLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState('All');
  const [time, setTime] = useState('All');
  const [category, setCategory] = useState('All');

  const UpdateSort = (category, view, time) => {
    const updatedSort = { category, view, time };
    localStorage.setItem('Sort', JSON.stringify(updatedSort));
  };

  const GenerateUrl = (category, view, time) => {
    let link = `/products?${category !== 'All' ? 'category=' + category : ''}${view !== 'All' ? '&' + 'view=' + view : ''}${time !== 'All' ? '&' + 'time=' + time : ''}`;
    return navigate(link);
  };

  const LocParams = () => {
    const params = new URLSearchParams(location.search);
    let info = {
      category: params.get('category') || 'All',
      view: params.get('view') || 'All',
      time: params.get('time') || 'All',
      size: params.size,
    };
    return info;
  };

  useEffect(() => {
    const ProductsSortParams = localStorage.getItem('Sort');
    const SortsItem = JSON.parse(ProductsSortParams);

    let info = LocParams();
    const handlePopstate = () => {
      setView(info.view);
      setTime(info.time);
      setCategory(info.category);
    };

    window.addEventListener('popstate', handlePopstate);

    if (info.size === 0) {
      if (SortsItem) {
        setView(SortsItem.view);
        setTime(SortsItem.time);
        setCategory(SortsItem.category);
        GenerateUrl(SortsItem.category, SortsItem.time, SortsItem.view);

        fetchData();
      } else {
        UpdateSort('All', 'All', 'All');
        navigate('/products');
        fetchData();
      }
    } else if (info.size > 0) {
      setView(info.view);
      setTime(info.time);
      setCategory(info.category);
      UpdateSort(info.category, info.view, info.time);
      fetchData();
    }

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  async function fetchData() {
    const server = 'https://lavish-husky-gaura.glitch.me';
    setRespons(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://quasar-wind-trader.glitch.me/api/sortedcategory/${window.location.search}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      setRespons(await response.json());
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  }

  const selectCategory = async (event) => {
    const Category = event.target.value;
    UpdateSort(Category, view, time);
    GenerateUrl(Category, view, time);
    setCategory(Category);
    fetchData();
  };

  const SortData = async (event) => {
    const Time = event.target.value;
    UpdateSort(category, view, Time);
    GenerateUrl(category, view, Time);
    setTime(Time);
    fetchData();
  };

  const SortView = async (event) => {
    const View = event.target.value;
    UpdateSort(category, View, time);
    GenerateUrl(category, View, time);

    setView(View);
    fetchData();
  };

  const reset = async () => {
    setLoading(true);
    setRespons(null);
    setView('All');
    setTime('All');
    setCategory('All');
    UpdateSort('All', 'All', 'All');
    GenerateUrl('All', 'All', 'All');
    fetchData();
  };

  const CategoryItem = ['All', 'Clothing', 'Technique', 'Food', 'Accessories'];

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
            value={category || 'All'}
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
            {['All', 'Newest', 'Oldest'].map((time, index) => (
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
            {['All', 'Most View', 'Less View'].map((view, index) => (
              <option key={index} value={view}>
                {view}
              </option>
            ))}
          </Selection>
        </li>
      </ul>
      <input type="button" value="Reset" onClick={reset} />
    </SortedPanel>
  );
};

export { SortProduct };

const Navigation = ({ items, setProduct, product }) => {
  const click = () => {
    setProduct(null);
  };

  return (
    <Productsnavigation>
      {items.map(
        (itemName, index) =>
          itemName !== undefined && (
            <samp key={index}>
              {itemName === 'home' && (
                <Link onClick={click} to={'/'}>
                  <img src={HomeIcon} alt="Home icon" />
                  Home{'>'}
                </Link>
              )}
              {itemName === 'products' && (
                <Link onClick={click} to={'/products'}>
                  <img src={ProductIcon} alt="Product icon" />
                  Products{'>'}
                </Link>
              )}
              {itemName === 'category' && (
                <Link onClick={click} to={'/products'}>
                  <img src={CategoryIcon} alt="Product icon" />
                  {'Category/'}
                </Link>
              )}
            </samp>
          )
      )}
      {product && (
        <samp style={{ display: 'flex' }}>
          <img src={LabelIcon} alt="label icon" /> ID: {`${product?.id}`}
        </samp>
      )}
    </Productsnavigation>
  );
};

// Export Navigation component
export { Navigation };
