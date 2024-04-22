import React, {useEffect, useState} from "react";
// import { getFileExtension, uploadFile } from './utils';
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
  [key: string]: string | any[]; 
  imgObjects: { [key: string]: string }[]; 
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
        
                const categoryElement = document.getElementById("CategoryOptions") as HTMLSelectElement | null;

                const serverlink = serverUri();


            const addProductF = () => {product ? setProduct(false) : setProduct(true);};

  // ახდენს მონაცემების რამუშავებას აქტიური ექციის შესაბამისად
  // აბრუნებს მასივს ან მასივსა სა ობიექტის კომბინაციას
  // ახალი პროდუქტის დასამატებლად ან არსებული ძირითადი მონაცემების განახლებისტვის
  const getOptimizedInfo = () => {  

    if (advanceFormInputs && currencyElement && quantityElement && categoryElement) {

        const inputsArray = Array.from(advanceFormInputs);
        const selectedCurrency = currencyElement.value;
        const selectedQuantity = quantityElement.value;

        const selectedCategory = categoryElement.value;

        const AdvanceInfo: Record<string, any> = {};

          AdvanceInfo.currency = selectedCurrency;
          AdvanceInfo.quantityiunit = selectedQuantity;
          AdvanceInfo.category = selectedCategory;
          
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
  const addNewProduct = async () => {
    const userId = localStorage.getItem('token');
    const owner = localStorage.getItem('user');
    const location = localStorage.getItem('address');

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let period = 'AM'; // Default period is AM
    
    // Adjust hours and period for PM format
    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    }
    
    minutes = typeof minutes === 'string' ? parseInt(minutes, 10) : minutes;

        
    const datatime = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
        

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let id = '';
    for (let i = 0; i < 2; i++) {id += letters.charAt(Math.floor(Math.random() * letters.length));}
    for (let i = 0; i < 6; i++) {id += numbers.charAt(Math.floor(Math.random() * numbers.length));}


    const productData = {
        ...getOptimizedInfo(), 
        owner,
        view: 0,
        location,
        sale: 0,
        userID: userId,
        datatime,
        share: 0,
        id: id
    };


    console.log(productData);
    setNewUser(true);
  
    try {
        const response = await fetch(`${serverlink}/createProduct`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch advance data");
        }

        const newUser = await response.json();
        console.log(newUser);
        setInputValues(['', '', '', '']);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setNewUser(false);
        fetchData(); 
        setTimeout(() => {
            advanceForm.reset(); 
        }, 1000);
    }

};


      

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;
  //     if (files && files.length > 0) {
  //         setSelectedFile(files[0]);
  //     }
  // };

  // const handleUpload = async () => {
  //     if (selectedFile) {
  //         const formData = new FormData();
  //         formData.append('image', selectedFile);

  //         try {
  //             const response = await fetch(`http:/localhost:3001/upload`, {
  //                 method: 'POST',
  //                 body: formData,
  //             });
  //             if (!response.ok) {
  //                 throw new Error('Failed to upload file');
  //             }
  //             console.log('File uploaded successfully');
  //             console.log(response);
  //             const uploadResp = await response.json(); // Parse response JSON
  //             console.log(uploadResp);
  //         } catch (error) {
  //             console.error('Error uploading file:', error);
  //         }
  //     } else {
  //         console.warn('No file selected.');
  //     }
  // };  




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
                              onClick={addNewProduct}>
                        {"Add New Product"} </button>
                  </div>:null}


                  {/* <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Photo</button>
        </div> */}

      </div>

    </>
  );
};

export default AddNewProduct;


