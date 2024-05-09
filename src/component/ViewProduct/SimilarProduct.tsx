
import React, { useEffect, useState } from "react";

import styled from "styled-components";

import sortedcategory from "../ProductConteiner/SortCategory";
import ProductsConteiner from "../ProductConteiner/Products";
import viewProduct from "../ProductComponent/VievUpdate";
import ProductComponent from "../ProductComponent/ProductComponent";

const SimilarProductHead = styled.h1`
      position: relative;
      padding: 4px;
      text-align: left;
      width: 96%;
      margin: auto;
      padding-left: 14px;
      margin-bottom: 10px;
      margin-top: 10px;
      box-shadow: 1px 1px 3px 0px black;
      border-radius: 10px 0px 0px 10px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 10px;
          background-color: red; 
          border-radius: 10px 0px 0px 10px;
        }
  `;

  const SimilarProductConteiner = styled.div`
        width:  98%; 
        margin: auto; 
        min-height:  150px; 
        margin-bottom: 10px; 
        box-shadow:  0px -2px 9px 0px black; 
        border-radius:  6px 6px 0 0;
      `;


      interface Props {
        incart: string[];
        setInCart: Function;
        favorits: string[];
        setFavorits: Function; 
        loading: boolean;
        setProduct: Function;
        setLoading: Function;
        product:any;
    }
    
    
    
    

      const SimilarProduct = ({ incart, setInCart, favorits, setFavorits, loading, setProduct, setLoading, product }: Props) => {
          const [respons, setRespons] = useState<any>(null);
          const [category, setCategory] = useState<any>(null);
      
          useEffect(() => {
              if (product) {
                  setCategory(product.category);
              }
          }, [product]);
      
          useEffect(() => {
              if (category) {
                  Similar();
              }
          }, [category]);
      
          const Similar = async () => {
              try {
                  const sortedRespons = await sortedcategory(category);
                  setRespons(sortedRespons);
              } catch (error) {
                  console.error('Error fetching category:', error);
              }
          };
      
          // Logging respons whenever it changes
          useEffect(() => {
              console.log(respons);
          }, [respons]);

          const clickF = (productId: string) => {
            viewProduct(productId, setProduct, setLoading);
            setLoading(true);
        };
    
         const ProductProps = {clickF, incart, setInCart, favorits, setFavorits, loading}

    
      
          return (
              <>
                  <SimilarProductHead>Similar products</SimilarProductHead>
                  <SimilarProductConteiner>


{respons &&

                //   <ProductsConteiner 
                //         incart={incart}
                //         setInCart={setInCart}
                //         favorits={favorits}
                //         setFavorits={setFavorits}
                //         loading={loading}
                //         setProduct={setProduct} 
                //         setLoading={setLoading}
                //         product={respons}
                        
                //     />

                <ProductComponent products={respons}  {...ProductProps} />

                    }




                      {/* {product && (
                          <h1>
                              {product.name}
                              {product.category}
                          </h1>
                      )} */}
                  </SimilarProductConteiner>
              </>
          );
      };
      
      export default SimilarProduct;
      