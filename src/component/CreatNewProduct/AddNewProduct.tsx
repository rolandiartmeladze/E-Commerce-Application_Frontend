import React, { useState} from "react";
import './AddProducte.css';

import ArrowRigth from "../../icon/arrow.png";

      // შემომაქვს პროდუქტი დამატებისას მომხმარების სურვისლის შესაბამისად 
      // პირადი მონაცემების მითითებისტვის საჭირო ველების დასამატებელი ფუნქცია
      import AdditionalInfo from "./AdditionalInfo";

          // შემომაქვს პროდუქტი დამატებისას მომხმარების მიერ შესავსები ძირიტადი ველები
          import BasicInfo from "./BasicInfo";

              // შემომაქვს პროდუქტი დამატებისას ასარჩევი ველები: ერთეული, ვალტა, კატეგორია
              import OptionalItem from "./OptionalItem";

                  import Loading from "../Loading";


interface UserContainerProps {
          setAdvanceData: Function;
          advanceData: any;
          setUserData: Function;
          addProductFunction:any;
          // product:boolean;
          setProduct:Function;
          fetchData:Function;
          soldAmount:any;
          setSoldAmount:Function;
          product:any[];
      
}

const AddNewProduct: React.FC<UserContainerProps> = ({
      setUserData,
      advanceData,
      product,
      setProduct,
      setAdvanceData,
      fetchData,
      soldAmount,
      setSoldAmount
  
      }) => {

            const serverUrl = "https://limitless-tor-40344-c89ae9237437.herokuapp.com";

            const [response, setResponse] = useState({ message: "" });
            const [newuser, setNewUser] = useState(false);
            const [inputValues, setInputValues] = useState<string[]>(['', '', '', '']);
            
                const advanceForm = document.getElementById("advanceForm") as HTMLFormElement;
                const advanceFormInputs: HTMLCollectionOf<HTMLInputElement> | undefined = advanceForm?.getElementsByTagName("input");
                const currencyElement = document.getElementById("currency") as HTMLSelectElement | null;
                const quantityElement = document.getElementById("Quantityunit") as HTMLSelectElement | null;
        
            const addProductF = () => {product ? setProduct(false) : setProduct(true);};

  // ახდენს მონაცემების რამუშავებას აქტიური ექციის შესაბამისად
  // აბრუნებს მასივს ან მასივსა სა ობიექტის კომბინაციას
  // ახალი პროდუქტის დასამატებლად ან არსებული ძირითადი მონაცემების განახლებისტვის
  const optimiseinfo = () => {  

    if (advanceFormInputs && currencyElement && quantityElement) {

        const inputsArray = Array.from(advanceFormInputs);
        const selectedCurrency = currencyElement.value;
        const selectedQuantity = quantityElement.value;
        const AdvanceInfo: Record<string, any> = {};

          AdvanceInfo.Currency = selectedCurrency;
          AdvanceInfo.Quantityiunit = selectedQuantity;
              inputsArray.forEach((item, index) => {
                  if(item.value.length >0){AdvanceInfo[item.placeholder] = item.value;}
                  if(item.type === "file"){AdvanceInfo[item.accept] = item.value;}
              });

      return AdvanceInfo;
    }
  };

  // ფუნქცია იღებს დამუშავებულ მონაცემებს
  // და მონაცემთა ბაზაში ქმნის
  // შესაბამისი მონაცემების მქონეე ახალ პროდუცტს
  // შედეგი მომენტალურად აისახება გვერდზე
  // იყენებს POST მეთოდს მონაცემების ცასაწერად
  const addnewproduct = async () => {
    const NewProduct = optimiseinfo();
      setNewUser(true);
        try {
            const response = await fetch(`${serverUrl}/create`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(NewProduct),
            });
              if (!response.ok) {throw new Error("Failed to fetch advance data");}
                  const NewUser = await response.json();
                    setResponse(NewUser);
                    setInputValues(['', '', '', '']);
            } 
              catch (error) {console.error("Error:", error);} 
              finally { setNewUser(false); fetchData(); advanceForm.reset(); }
  };

  return (
    <>

      <div className={!product
            ? "update-advanse"
            : "update-advanse update-advanse-active"}>

                  {newuser? <Loading />:null}

        <div onClick={addProductF} className={"update-advanse-head"}>
            <h1>
              <samp style={{ color: !product ? "black" : "red", padding: "7px" }}>
                Add Product </samp>
                  <samp style={{ display: "flex" }}>
                    <img className={!product ? "aarowRight" : "aarowRight aarowRight-active"}
                      src={ArrowRigth}
                      alt=""/> </samp>
            </h1>
        </div>

            <section className={!product
                        ? "change-info-conteiner"
                        : "change-info-conteiner-active change-info-conteiner"}>

              <article style={{ overflowY: "scroll", width: "60%", display: 'flex', flexDirection: 'column' }}>
                <h1 style={{width:'100%'}}>{"Add product info"}</h1>
                  <form id="advanceForm" className="advance-info-form">
                      {/* __1 */}<BasicInfo inputValues={inputValues} setInputValues={setInputValues} />
                      {/* __2 */}<AdditionalInfo /> 
                  </form>
              </article>

                <OptionalItem advanceData={advanceData}/>

            </section>

                  {product ? <div className="advance-info-btn-conteiner" >
                      <button disabled={newuser} 
                              className="advance-info-btn"
                              onClick={addnewproduct}>
                        {"Add New Product"} </button>
                  </div>:null}

      </div>

    </>
  );
};

export default AddNewProduct;