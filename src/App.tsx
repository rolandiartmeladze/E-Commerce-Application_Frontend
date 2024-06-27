import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';

import './App.css';
import Header from './component/Header/Header';
import Main from './component/MainComponent/Main';
// import Aside from './component/Aside';

import Home from './component/Home/Home';

import Profil from './component/Profil/Profil';

import SimilarProduct from './component/ViewProduct/SimilarProduct';

import serverUri from './component/serverUrl';

import { Navigation } from './component/ProductConteiner/Tools';

import Login from './component/UsersComponent/LogIn';
import SignUp from './component/UsersComponent/SingUp';

import View from './component/ViewProduct/View';
import ViewProductAside from './component/ViewProduct/ViewProductAside';
import Footer from './component/Footer';

import Product from './component/ProductComponent/ProductComponent';

import ProductsConteiner from './component/ProductConteiner/Products';
import FindContainer from './component/Find/FindContainer';
import AddProduct from './component/MainComponent/AddProduct/Add';
import MainNavigate from './component/MainComponent/Navigate/MainNavigate';
import SaleJurnal from './component/MainComponent/Jurnal/SaleJurnal';

import Invoic from './component/BuyProduct/Invoic';

import Cart from './component/CartComponent/ProductsInCart';
// const server = process.env.SERVER_LINK;

interface User {
  Name: string;
  Address: string;
  Price: number;
  Currency: string;
  Quantity: number;
}

interface Productprops {
  name: string;
  _id: string;
  id: string;
  location: string;
  quantityUnit: string;
  quantity: number;
  price: number;
  currency: string;
  owner: string;
  email: string;
  phone: string;
  comment: string;
  description: string;
  view: number;
  sale: number;
  share: number;
  category: string;
  datatime: string;
}

const Section = styled.section`
  padding: 8px;
  padding-top: 2px;

  @media (max-width: 650px) {
    padding: 0px;
  }
`;
const ViewConteiner = styled.div`
  flex-wrap: nowrap;
  width: 100%;
  margin: auto;
  padding: 0px;
  height: auto;
  margin-top: 8px;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 900px) {
    width: 100%;
    flex-direction: column;
  }
`;

const App: React.FC = () => {
  const token = localStorage.getItem('token');

  const [usermode, setUserMode] = useState<boolean>(() => {
    if (token) {
      return true;
    } else {
      return false;
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any[]>([]);
  const [login, setLogIn] = useState(false);
  const [activeuser, setActiveUser] = useState<any>({});
  const [members, setMembers] = useState<any>([]);
  const [favorits, setFavorits] = useState<any[]>(
    JSON.parse(localStorage.getItem('favorits') ?? '[]')
  );
  const [incart, setInCart] = useState<any[]>(
    JSON.parse(localStorage.getItem('incart') ?? '[]')
  );
  const [incartResponse, setInCartResponse] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<
    { id: string; quantity: number }[]
  >([]);
  const [productNum, setProductNum] = useState<number>(1);

  const [buy, setBuy] = useState<boolean>(false);
  const [product, setProduct] = useState<Productprops | null>(null);

  const serverlink = serverUri();

  // როდესაც ჩაიტვირთრბა app.js აგზავნის მოთხოვნას GET მონაცემთა ბაზაში
  // ამოწმებს შედეგს და ანიჭებს მიღებულ მონაცემებს dataResponse ცვლადს
  // რაც აისახება რეალურ გარემოში

  //       const chekfavorits  = async () => {

  //         try {

  //             const option = {
  //                 userId: token,
  //                 favorits:favorits
  //             }
  //             const favorit = await fetch(`${serverlink}/FavoritProduct`, {
  //                 method: 'POST',
  //                 headers: {
  //                     'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify(option),
  //             })
  //             if (!favorit.ok) {
  //                 throw new Error('Failed to fetch users data');
  //             }

  //                const favoritResponse = await favorit.json();
  //                localStorage.setItem('favorits', JSON.stringify(favoritResponse));
  //                     setFavorits(favoritResponse);
  //         } catch (error) { console.error('Error fetching data:', error);}

  // };

  const fetchData = async () => {
    setLoading(true);

    try {
      if (token) {
        const userResponse = await fetch(`${serverlink}/user?token=${token}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setActiveUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      }

      const productsResponse = await fetch(`${serverlink}/checkProducts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!productsResponse.ok) {
        throw new Error('Failed to fetch users data');
      }
      const productsData = await productsResponse.json();
      setUserData(productsData);

      const membersdata = await fetch(`${serverlink}/Members`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!membersdata.ok) {
        throw new Error('Failed to fetch users data');
      }
      const membersResponse = await membersdata.json();
      setMembers(membersResponse);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = async (itemId: string) => {
    let newItem = itemId;

    let storedFavorites = localStorage.getItem('favorits');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    let updatedFavorites = [...favorites];

    const index = updatedFavorites.indexOf(newItem);
    if (index === -1) {
      updatedFavorites.push(newItem);
    } else {
      updatedFavorites.splice(index, 1);
    }
    localStorage.setItem('favorits', JSON.stringify(updatedFavorites));
    setFavorits(updatedFavorites);
  };

  const handleClickCart = async (itemId: string) => {
    const token = localStorage.getItem('token');
    let newItem = itemId;

    if (usermode) {
      try {
        const userID = token;
        const checkCartItem = await fetch(
          `http://localhost:3001/api/addCarItem/${userID}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId }),
          }
        );

        if (!checkCartItem.ok) {
          throw new Error('not working');
        }
        const cartResponse = await checkCartItem.json();
        setInCart(cartResponse);
      } catch (error) {
        console.log(error, 'not Found');
      }
    }

    let storedcarts = localStorage.getItem('incart');
    let incart = storedcarts ? JSON.parse(storedcarts) : [];
    let updatedcarts = [...incart];

    const index = updatedcarts.indexOf(newItem);
    if (index === -1) {
      updatedcarts.push(newItem);
    } else {
      updatedcarts.splice(index, 1);
    }
    localStorage.setItem('incart', JSON.stringify(updatedcarts));
    setInCart(updatedcarts);
  };

  const ViewProductProps = {
    product,
    incart,
    favorits,
    handleItemClick,
    buy,
    handleClickCart,
    setBuy,
    incartResponse,
    quantities,
    members,
    setFavorits,
    setInCart,
  };

  const ViewProductAsideProps = {
    members,
    incart,
    favorits,
    usermode,
    product,
    setBuy,
    handleClickCart,
    activeuser,
    loading,
    incartResponse,
    userData,
    setLoading,
    setInCartResponse,
    quantities,
    setQuantities,
    productNum,
    setProductNum,
    setProduct,
  };

  // console.log(server)

  const NavigationProps = { setProduct, product };
  const HeaderProps = { login, setLogIn, usermode, setProduct };

  const timestamp = 1716502055353;
  const date = new Date(timestamp);

  console.log('Original date:', date.toISOString());

  date.setDate(date.getDate() - 1);

  console.log('Date minus one day:', date.toISOString());

  return (
    <>
      <div className="app">
        <Header {...HeaderProps} />

        <Section>
          <Routes>
            <Route path={'/'} element={<Home setProduct={setProduct} />} />

            <Route path="main/profil" element={<Profil />} />

            <Route path="/main" element={<MainNavigate />}>
              <Route path="products" element={<Main />} />
              <Route path="add" element={<AddProduct User={activeuser} />} />
              <Route path="jurnal" element={<SaleJurnal />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SignUp />} />
            <Route path="/about" element={<h2>About</h2>} />
            <Route path="/contact" element={<h2>Contact</h2>} />

            <Route path="/cart" element={<Cart setProduct={setProduct} />} />

            {/* hear back Find result respons */}
            <Route
              path="/FindResult"
              element={<FindContainer setProduct={setProduct} />}
            />

            <Route
              path="/products"
              element={
                <>
                  {userData && (
                    <>
                      <ProductsConteiner
                        incart={incart}
                        setInCart={setInCart}
                        favorits={favorits}
                        setFavorits={setFavorits}
                        loading={loading}
                        setProduct={setProduct}
                        setLoading={setLoading}
                        product={product}
                      />
                    </>
                  )}
                </>
              }
            />

            <Route
              path={`/products/:productId`}
              element={
                <div>
                  <Navigation
                    items={['home', 'products']}
                    {...NavigationProps}
                  />
                  {loading && <h2>Loading ...</h2>}

                  <ViewConteiner>
                    {product && (
                      <>
                        <View {...ViewProductProps} />
                        <ViewProductAside {...ViewProductAsideProps} />
                      </>
                    )}
                  </ViewConteiner>

                  <>
                    <SimilarProduct
                      incart={incart}
                      setInCart={setInCart}
                      favorits={favorits}
                      setFavorits={setFavorits}
                      loading={loading}
                      setProduct={setProduct}
                      setLoading={setLoading}
                      product={product}
                    />
                  </>
                </div>
              }
            />

            <Route
              path={`/products/:productId/pay`}
              element={<h2>Pay now</h2>}
            />
            <Route
              path={`/products/:productId/invois`}
              element={<Invoic product={product} productnumb={productNum} />}
            />
          </Routes>
        </Section>

        <Footer />
      </div>
    </>
  );
};

export default App;
