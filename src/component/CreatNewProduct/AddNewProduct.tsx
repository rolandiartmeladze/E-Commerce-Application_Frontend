import React, {useEffect, useState} from "react";
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


                  import serverUri from '../../component/serverUrl';

import { Console } from "console";


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

          activeuser:any;
          setActiveUser:Function;
      
      
}

interface AdvanceInfo {
  [key: string]: string | any[]; // You may need to adjust the type accordingly
  // Define other properties as needed
  imgObjects: { [key: string]: string }[]; // Array of objects with string keys and values
}

interface InputItem {
  type: string;
  value: string;
  placeholder: string;
  accept?: string;
}

 



const AddNewProduct: React.FC<UserContainerProps> = ({
      setUserData,
      advanceData,
      product,
      setProduct,
      setAdvanceData,
      fetchData,
      soldAmount,
      setSoldAmount,

      activeuser,
      setActiveUser
  
  
      }) => {


            const [newuser, setNewUser] = useState(false);

            const [inputValues, setInputValues] = useState<string[]>(['', '', '', '']);
            
                const advanceForm = document.getElementById("advanceForm") as HTMLFormElement;
                const advanceFormInputs = advanceForm?.querySelectorAll<HTMLInputElement>('input, textarea');

                const currencyElement = document.getElementById("currency") as HTMLSelectElement | null;

                const quantityElement = document.getElementById("Quantityunit") as HTMLSelectElement | null;
        

                const serverlink = serverUri();


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

          AdvanceInfo.currency = selectedCurrency;
          AdvanceInfo.quantityiunit = selectedQuantity;

            const img: { [key: string]: string }[] = []; 
            let fileIndex = 0;

                inputsArray.forEach((item: InputItem, index: number) => {
                    if (item.value.length > 0) { AdvanceInfo[item.placeholder] = item.value; }
                
                    if (item.type === "file" && item.accept) {
                        img.push({ [`${item.accept}${fileIndex}`]: item.value });
                        fileIndex++;
                    }
                    
                });
            
          AdvanceInfo.img = img;
                    console.log(inputsArray)
          return AdvanceInfo;
    }
  };

  // ფუნქცია იღებს დამუშავებულ მონაცემებს
  // და მონაცემთა ბაზაში ქმნის
  // შესაბამისი მონაცემების მქონეე ახალ პროდუცტს
  // შედეგი მომენტალურად აისახება გვერდზე
  // იყენებს POST მეთოდს მონაცემების ცასაწერად
  const addnewproduct = async () => {


    const userid = localStorage.getItem('token');
    const owner = localStorage.getItem('user');
    const location  =localStorage.getItem('address');

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();  

    const data = `${day}/${month}/${year}`;



    const productData ={
      ...optimiseinfo(),
      owner: owner,
      view: 0,
      location: location,
      sale: 0,
      userID: userid,
      data: data
    }; 

    console.log(productData)
      setNewUser(true);
        
        try {
              setTimeout( async () => {
                

            const response = await fetch(`${serverlink}/createProduct`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(productData),
            });

              if (!response.ok) {throw new Error("Failed to fetch advance data");}
                  const NewUser = await response.json();
                  console.log(NewUser)
                    setInputValues(['', '', '', '']);
                               }, 500);
   
                                          

        
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
                      {/* __2 */}<AdditionalInfo activeUser={activeuser} /> 

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