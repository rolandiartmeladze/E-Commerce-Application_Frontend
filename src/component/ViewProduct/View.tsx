import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import user from '../../icon/user.png';
import view from '../../icon/view.png';
import cost from '../../icon/cost.png';
import share from '../../icon/share.png';

import clock from '../../icon/clock.png';
import loc from '../../icon/loc1.png';
import mail from '../../icon/mail.png';
import phone from '../../icon/phone.png';

import arrowL from '../../icon/arrow_left.svg';
import arrowR from '../../icon/arrow_right.svg';

import testimg from '../../img/slide_9.jpg';

import { Fav } from '../ProductComponent/AddFav';
import { Cart } from '../ProductComponent/AddCart';

import formatDate from '../FormatDataTime';

import Invoic from '../BuyProduct/Invoic';

import { BuyProduct } from '../BuyProduct/BuyFromCart';

// import BuyFromCart from '../BuyProduct/BuyFromCart';

const ProductConteiner = styled.div`
  width: 70%;
  max-width: none;
  margin: 3px;
  border-radius: 0;
  padding: 8px;
  backdrop-filter: blur(2px);
  box-shadow: 3px 3px 300px 5px inset rgb(15, 42, 42, 0.1);
  border-radius: 10px 10px 0px 0px;
  position: relative;

  @media (max-width: 900px) {
    width: 98%;
    padding: 0px;
  }
  @media (max-width: 750px) {
    width: 98%;
    padding: 3px;
  }
`;

const ProductHeadInfo = styled.div`
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const ImgCont = styled.div`
  display: flex;
  width: 100%;
  height: 170px;
  align-items: center;
  justify-content: center;
`;

const ImgConteiner = styled.div`
  overflow: hidden;
  width: 300px;
  transition: 0.4s ease-in;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  & img {
    height: auto;
    width: auto;
    max-width: 96%;
    max-height: 170px;
    border-radius: 6px;
  }

  @media (max-width: 650px) {
    margin: auto;
    width: 98%;
    max-width: none;
  }
`;

const ImgsBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
    samp {
      margin: 0px 3px;
      flex: 0 0 50px;
      height: 85%;
      box-shadow: 0px 0px 1px 0.5px black;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: hidden;

      img {
        border-radius: 2px;
        margin: 0;
        max-width: 92%;
        max-height: 92%;
      }
    }
  }
`;

const ArrowSpan = styled.span`
  position: absolute;
  width: 25px;
  height: 86%;
  align-items: center;
  cursor: pointer;
  background-color: rgb(201, 1, 1, 0.3);
  justify-content: center;
  transform: translateX(0px);
  display: flex;

  &:hover {
    background-color: rgb(201, 1, 1, 1);
  }

  img {
    width: 100%;
    margin-top: 0;
  }
`;

const MainInfo = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 6px;
`;

const InfoLine = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 5px;
  @media (max-width: 900px) {
    margin: 5px 0px;
  }
  & img {
    width: 30px;
    margin-right: 6px;
  }

  & samp {
    margin: 0;
    display: flex;
    white-space: pre-wrap;
    text-align: left;
    font-size: 115%;
    font-weight: 500;
  }

  & h4 {
    margin: 0px;
    margin-right: 5px;
  }
`;

const LineItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 4px;
  margin-right: 18px;

  & samp {
    font-weight: 600;
    font-size: 100%;
  }

  & img {
    width: 20px;
    margin-right: 8px;
  }
`;

const Table = styled.table`
  text-align: left;
  & tr {
    margin: 8px;

    & th {
      white-space: nowrap;
      vertical-align: top;
    }
  }
`;

//____
const BuyFromCartCont = styled.div`
  position: absolute;
  width: 98%;
  min-height: 100%;
  height: auto;
  margin: auto;
  background: none;
  z-index: 5;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 3px 2px black;
  border-radius: 10px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
`;

const BuyModeCloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
`;

const BtnsConteiner = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 10px;
  align-items: center;

  button {
    padding: 8px 15px;
    border-radius: 8px;
    cursor: pointer;
    margin: 6px;
  }
`;

interface Props {
  product: any;
  incart: any;
  favorits: any;
  buy: boolean;
  setBuy: Function;
  quantities: any;
  incartResponse: any;
  members: any[];
  setFavorits: Function;
  setInCart: Function;
}

const View = ({
  setFavorits,
  setInCart,
  product,
  incart,
  favorits,
  buy,
  quantities,
  incartResponse,
  setBuy,
  members,
}: Props) => {
  const closebtn = () => {
    setBuy(false);
  };

  const [check, setCheck] = useState<boolean>(false);
  const accept = () => {
    setCheck((prevCheck) => !prevCheck);
  };

  const [invoic, setInvoic] = useState<boolean>(false);
  const tackeinvois = () => {
    setInvoic((prevInvoic) => !prevInvoic);
  };

  const FavProps = { favorits, setFavorits, product };
  const CartProps = { incart, setInCart, product };

  const [elementItem, setElementItem] = useState<number>(1);

  const Media = `https://embarrassing-unifor.000webhostapp.com/Media/${product.userID}`;

  const [num, setNum] = useState(0);

  useEffect(() => {
    const Cont = document.getElementById('Images');
    if (Cont) {
      const itemNumb = Cont.clientWidth / 50;
      const parsedNum = parseInt(itemNumb.toFixed(0), 10);
      setNum(parsedNum);
    }
  }, [product]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('imgs-container');
    const rigtharrow = document.getElementById('Arrowrigth');
    const leftarrow = document.getElementById('Arrowleft');

    if (!container || (!rigtharrow && !leftarrow)) return;

    const scrollAmount = direction === 'left' ? -50 : 50;
    const initialScrollLeft = container.scrollLeft;
    container.scrollLeft += scrollAmount;
    const finalScrollLeft = container.scrollLeft;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const isScrollableLeft = finalScrollLeft > 0;
    const isScrollableRight = finalScrollLeft < maxScroll;

    if (leftarrow) {
      leftarrow.style.display = isScrollableLeft ? 'flex' : 'none';
    }
    if (rigtharrow) {
      rigtharrow.style.display = isScrollableRight ? 'flex' : 'none';
    }
  };

  return (
    <>
      {buy && (
        <BuyFromCartCont id="conteiner">
          {/* {invoic && <Invoic quantities={quantities} incartResponse={incartResponse} setInvoic={setInvoic} />} */}

          <BuyModeCloseBtn onClick={closebtn}>Close</BuyModeCloseBtn>

          <BtnsConteiner>
            <button onClick={tackeinvois} disabled={!check}>
              Tacke invoice
            </button>
            <button disabled={!check}>Pay Now</button>
          </BtnsConteiner>

          <BtnsConteiner>
            <samp>
              <input onChange={accept} type="checkbox"></input> ვეთანხმები
              პირობებს
            </samp>
          </BtnsConteiner>
        </BuyFromCartCont>
      )}

      <ProductConteiner key={product._id}>
        {/* <BuyProduct product={product} members={members} /> */}

        <ProductHeadInfo>
          <ImgConteiner>
            <ImgCont>
              <img
                src={`${Media}/${product.image[elementItem]}`}
                alt="User Icon"
              />
            </ImgCont>

            <ImgsBox id="Images">
              <ArrowSpan
                style={{
                  right: '0px',
                  display: product.image.length >= num - 1 ? 'flex' : 'none',
                  borderRadius: '5px 0px 0px 5px',
                }}
                id="Arrowrigth"
                onClick={() => {
                  handleScroll('right');
                }}
              >
                <img src={arrowL} alt="arrow" />
              </ArrowSpan>

              <ArrowSpan
                style={{
                  left: '0px',
                  display: 'none',
                  borderRadius: '0px 5px 5px 0px',
                }}
                id="Arrowleft"
                onClick={() => {
                  handleScroll('left');
                }}
              >
                <img src={arrowR} alt="arrow" />
              </ArrowSpan>

              <div id="imgs-container">
                {product.image.map((item: string, index: number) => (
                  <samp
                    onClick={() => {
                      setElementItem(index);
                    }}
                    key={index}
                  >
                    <img
                      src={`${Media}/${product.image[index]}`}
                      alt="prodict imgs"
                    />
                  </samp>
                ))}
              </div>
            </ImgsBox>
          </ImgConteiner>

          <MainInfo>
            <InfoLine>
              <LineItem>
                <h4>ID: </h4>
                <samp>{product.id}</samp>
              </LineItem>

              <LineItem>
                <img src={view} alt="view icon" />
                <samp>{product.view}</samp>
              </LineItem>

              <LineItem>
                <img src={cost} alt="cost icon" />
                <samp>{product.sale}</samp>
              </LineItem>

              <LineItem style={{ cursor: 'pointer' }}>
                <img src={share} alt="cost icon" />
                <samp>{product?.share}</samp>
              </LineItem>

              <LineItem>
                <img src={clock} alt="time icon" />
                <samp>{formatDate(product.datatime)}</samp>
              </LineItem>
            </InfoLine>

            <Table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>
                    <samp>{product.name}</samp>
                  </td>
                </tr>
                <tr>
                  <th>In stock:</th>
                  <td>
                    <samp style={{ color: 'red' }}>
                      {product.quantity} {product.quantityUnit}.
                    </samp>
                  </td>
                </tr>
                <tr>
                  <th>Price:</th>
                  <td>
                    <samp style={{ color: 'red' }}>
                      {product.price} {product.currency}.
                    </samp>
                  </td>
                </tr>
              </tbody>
            </Table>

            <InfoLine>
              <h4>
                <img
                  style={{ marginRight: '0' }}
                  width={20}
                  src={user}
                  alt="user icon"
                />
              </h4>
              <samp>{product.owner}</samp>
            </InfoLine>
          </MainInfo>
        </ProductHeadInfo>

        <div style={{ borderTop: '0.5px solid black', marginTop: '5px' }}>
          <InfoLine>
            <h4>Category:</h4>
            <samp> {product.category} </samp>
          </InfoLine>

          <InfoLine>
            <h4>Description:</h4>
            <samp> {product.description} </samp>
          </InfoLine>

          <InfoLine>
            <h4>Comment:</h4>
            <samp>{product.comment}</samp>
          </InfoLine>

          <div style={{ marginLeft: '25px' }}>
            <h3 style={{ padding: '0', margin: '0', textAlign: 'left' }}>
              Contact Info:
            </h3>

            <InfoLine>
              <img src={phone} alt="emailicon" />
              <a href={`tel:${product.phone}`}>
                <samp>{product.phone}</samp>
              </a>
            </InfoLine>

            <InfoLine>
              <img src={mail} alt="emailicon" />
              <a href={`mailto:${product.email}`}>
                <samp>{product.email}</samp>
              </a>
            </InfoLine>

            <InfoLine>
              <img src={loc} alt="emailicon" />
              <samp>{product.location}</samp>
            </InfoLine>

            <Fav {...FavProps} itemId={product._id} />
            <Cart {...CartProps} itemId={product._id} />
          </div>
        </div>
      </ProductConteiner>
    </>
  );
};

export default View;
