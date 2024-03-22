import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../style/ChangeAdvenceInfo.css";

import AddIcon from "../icon/add.png";
import ArrowRigth from "../icon/arrow.png";
import addphone from "../icon/addphone.png";
import addimage from "../icon/addimage.png";
import addemail from "../icon/addmail.png";
import addcomment from "../icon/addcomment.png";


interface UserContainerProps {
  setAdvanceData: Function;
  advanceData: any;
  setUserData: Function;
  addProductFunction:any;
  product:boolean;
  setProduct:Function;
  updateAdvance: boolean;
  setUpdateAdvance: Function;

}


const InputItem = styled.input`
  margin-bottom: 4px;
  padding: 6px;
  padding-left: 10px;
  background: none;
  backdrop-filter: blur(0.8px);
  box-shadow: -0.3px -0.6px 3px 0.3px red inset;
  outline: none;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 700;
`;


const Addnewuser: React.FC<UserContainerProps> = ({
  setUserData,
  advanceData,
  setAdvanceData,
  addProductFunction,
  product,
  setProduct,
  updateAdvance,
  setUpdateAdvance
}) => {

  //ამოწმებს მონაცემების განახლებას მონაცემთა ბაზაში
  //აბრუნებს განახლებულ მონაცემებს
  const fetchData = async () => {
    try {
      const response = await fetch("/checkProducts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const userdata = await response.json();
      setUserData(userdata);

      const advanceResponse = await fetch("/checkAdvance", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const advanceData = await advanceResponse.json();
      setAdvanceData(advanceData[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const { basice } = advanceData as { basice: any[] };
  const { more } = advanceData as { more: object };
  const { selectcurrency } = more
    ? (more as { selectcurrency: any[] })
    : { selectcurrency: [] };
  const { selectquantity } = more
    ? (more as { selectquantity: any[] })
    : { selectquantity: [] };

  // განსაზღვრავს ლოდინის მომენტს მომხმარებლის
  // მიერ გაგზავნილი მოთხოვნის შესაბამისად
  const [loading, setLoading] = useState(false);

  // განსაზღვრავს კონკრეტულ მომენტში რომელი სეცია უნდა იყოსს აქტიური
  // მონაცემების სწორ მისამართზე გაგზავნისთვის
//   const [product, setProduct] = useState(false);
  const addProductF = () => {
    product ? setProduct(false) : setProduct(true);
    setUpdateAdvance(false);
  };

  const updateAdvanceFunction = () => {
    updateAdvance ? setUpdateAdvance(false) : setUpdateAdvance(true);
    setProduct(false);
  };



  // იღებსე სერვერის მიერ დაბრუნებულ პასუხს
  // განსაზღვრული ლოგიკის მიხედვეით
  const [response, setResponse] = useState({ message: "" });

  const advanceForm = document.getElementById("advanceForm");
  const advanceFormInputs: HTMLCollectionOf<HTMLInputElement> | undefined =
    advanceForm?.getElementsByTagName("input");
  const currencyElement = document.getElementById(
    "currency"
  ) as HTMLSelectElement | null;
  const quantityElement = document.getElementById(
    "Quantityunit"
  ) as HTMLSelectElement | null;

  // ახდენს მონაცემების რამუშავებას აქტიური ექციის შესაბამისად
  // აბრუნებს მასივს ან მასივსა სა ობიექტის კომბინაციას
  // ახალი პროდუქტის დასამატებლად ან არსებული ძირითადი მონაცემების განახლებისტვის
  const optimiseinfo = () => {
    if (advanceFormInputs && currencyElement && quantityElement) {
      const inputsArray = Array.from(advanceFormInputs);
      const selectedCurrency = currencyElement.value;
      const selectedQuantity = quantityElement.value;
      const AdvanceInfo: Record<string, any> = {};

      if (!updateAdvance) {
        AdvanceInfo.Currency = selectedCurrency;
        AdvanceInfo.Quantityiunit = selectedQuantity;
      } else {
        if (!AdvanceInfo.more) {
          AdvanceInfo.more = {};
        }
        AdvanceInfo.more.currency = selectedCurrency;
        AdvanceInfo.more.quantity = selectedQuantity;
        AdvanceInfo.more.selectcurrency = selectcurrency;
        AdvanceInfo.more.selectquantity = selectquantity;
      }

      inputsArray.forEach((item, index) => {
        if (!updateAdvance) {
          AdvanceInfo[basice[index]] = item.value;
        } else {
          if (!AdvanceInfo.basice) {
            AdvanceInfo.basice = [];
          } 
          else if(item.type === 'file')
          {AdvanceInfo.basice.push(item.accept);}
          if(item.value.length >0){
            AdvanceInfo.basice.push(item.value);
          }
        }
      });

      return AdvanceInfo;
    }
  };

  //   აღნიშნული ფუნქცია დამუშავდება ისე რომ
  //   შესაძლებელი იყოს მომხმარებლისთვის სასურველი
  //   მონაცემების განახლება და ხელმისაწვდომი იყოს მისტვის
  const updateadvance = async () => {
    const advanceInfo = optimiseinfo();

    console.log(advanceInfo);
    setLoading(true);
    try {
      // if(advanceData){
      // const advanceResponse = await fetch('http://localhost:80/checkAdvance', {
      //     method: 'GET',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      // });
      //       if (!advanceResponse.ok) {throw new Error('Failed to fetch advance data');}
      //       const advanceData = await advanceResponse.json();
      //       setAdvanceData(advanceData);
      // }
      // else{
      // const response = await fetch('http://localhost:80/changeAdvance', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(AdvanceInfo)
      // });
      // const data = await response.json();
      // setResponse({ message: data.message });
      // }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ფუნქცია იღებს დამუშავებულ მონაცემებს
  // და მონაცემთა ბაზაში ქმნის
  // შესაბამისი მონაცემების მქონეე ახალ პროდუცტს
  // შედეგი მომენტალურად აისახება გვერდზე
  // იყენებს POST მეთოდს მონაცემების ცასაწერად
  const addnewproduct = async () => {
    const advanceInfo = optimiseinfo();
    try {
      const response = await fetch("/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(advanceInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch advance data");
      }

      const NewUser = await response.json();
      setResponse(NewUser);
      return <h1>new user is : {NewUser}</h1>;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  // განსაზრვრავს რომელი სექცია უნდა იყოს აქტიური
  // ახალი პროგუქტს დამატება
  // ძირითადი მონაცემების განახლება
  const handleClick = (type: string) => {
    if (type === "advance") {
      updateAdvanceFunction();
    } else if (type === "product") {
      addProductF();
    }
  };
  //  ეს კოდი ქმნის პროდუქტის დასამატებლად საჭირო მონაცემების შესაყვანად
  // <input /> html ელემენტს, მონაცემთა ბაზაში წინასწარ განსაზღვრული მონაცემების მიხედვე.
  // მომხმარებელს შეუძლია აღნიშნულ მონაცემებს დაამატოს მისთვის სასურველი ელემენტი
  // განსაზღვრული ლოგიკის შესაბამისად და შედეგი შეინახოს მონაცემტა ბაზაში შემდგომი გამოყენებისთვის,
  // ასევე წაშალოს ისინი საბაზისო მონაცემების გარდა.
  //__1__
  const CreatInput = () => {
    const [inputValues, setInputValues] = useState<string[]>([]);

    const setInputValue = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const newValue = e.target.value;
      setInputValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index] = newValue;
        return updatedValues;
      });
    };

    return (
      <>
      <div  style={{borderRight: '1px solid green'}} className="elementinarticle">

        {basice?.map((item, index) =>
          updateAdvance ? (
            <InputItem
              key={index}
              type="text"
              disabled={updateAdvance}
              value={item}
            />
          ) : (
            <InputItem
              key={index}
              type="text"
              placeholder={item}
              value={inputValues[index] || ""}
              onChange={(e) => setInputValue(e, index)}
            />
          )
        )}
              </div>

      </>
    );
  };

  // კოდის ეს ფრაგმენტი პასუხისმგებელია ძირითადი მონაცემების გარდა
  // მომხმარებლისთვის სასურველი სხვა მონაცემების
  //შესაყვანად საჭირო შესაბამისი ველების დასამატებლად
  // ეს ფრაგმენტი აქტიურია მხოლოდ იმ შემთხვევაში როდესაც რიდესაც
  // აქტიურია ძირითადი მონაცემების შეცვლის სექცია  updateAdvance = True
  //__2__
  const AddNewInputs: React.FC = () => {
    // მომხმარების სურვილის შემთხვევაში ქმნის
    // დამატებითი შეყვანის ველებს
    const [inputFields, setInputFields] = useState<JSX.Element[]>([]);

    const addphoneid = document.getElementById('addphoneid');
    const addemailid = document.getElementById('addemailid');
    const addcommentid = document.getElementById('addcommentid');
    const addimageid = document.getElementById('addimageid');

    const handleAddInput = (type: string, value: string): void => {
        setInputFields((prevInputFields) => {
          let inputElement;
      
          if (type === 'file') {
            inputElement = <InputItem disabled key={prevInputFields.length} accept={value} type={type} />;
          } else {
            inputElement = <InputItem disabled key={prevInputFields.length} value={value} type={type} />;
          }
      
          return [...prevInputFields, inputElement];
        });
      };
      
const handleItemClick = (type: string, value: string, itemId: string): void => {
  handleAddInput(type, value);

  const itemToRemove = document.getElementById(itemId);
  if (itemToRemove) {
    if (itemId === 'addimageid') {
      itemToRemove.style.display = 'none';
    } else {
      itemToRemove.remove();
    }
  }
};

return (
      <>

<div style={{borderLeft: '1px solid green'}} className="elementinarticle">

        {inputFields.map((input, index) => (

          <div style={{marginLeft: '10px'}} key={index}>{input}</div>
        ))}

<div id="addimageid" onClick={() => handleItemClick('file','img', 'addimageid')} className="add-btn-conteiner">
        <div className="addnewinputicon">
            <img src={addimage} alt="add info" />
          </div>
            Add Image
        </div>

        
<div id="addphoneid" onClick={() => handleItemClick('text', 'Phone', 'addphoneid')} className="add-btn-conteiner">
        <div className="addnewinputicon">
            <img src={addphone} alt="add info" />
          </div>
            Add Phone
        </div>
        
        <div id="addemailid" onClick={() => handleItemClick('email', 'Emaile', 'addemailid')} className="add-btn-conteiner">
        <div className="addnewinputicon">
            <img src={addemail} alt="add info" />
          </div>
            Add Email
        </div>
        <div  id="addcommentid"  onClick={() => handleItemClick('text', 'Comment', 'addcommentid')} className="add-btn-conteiner">
        <div className="addnewinputicon">
            <img src={addcomment} alt="add info" />
          </div>
            Add Cmment
        </div>


        </div>
      </>
    );
  };

  //__3__
  const CreatSelection = () => {
    return (
      <>
        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Currency:</h2>
          <select className="currency-select" id="currency">
            {selectcurrency?.map((corrency, index) => (
              <option key={index} value={corrency}>
                {corrency}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-conteiner">
          <h2 className="currency-label">Choose a Quantity:</h2>
          <select className="currency-select" id="Quantityunit">
            {selectquantity?.map((quantity, index) => (
              <option key={index} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={
          !updateAdvance && !product
            ? "update-advanse"
            : "update-advanse update-advanse-active"
        }
      >
        <div className={"update-advanse-head"}>
          <h1
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => handleClick("advance")}
          >
            <samp
              style={{
                color: !updateAdvance ? "black" : "red",
                padding: "7px",
              }}
            >
              Change Advance User Info
            </samp>
            <samp style={{ display: "flex" }}>
              <img
                className={
                  !updateAdvance ? "aarowRight" : "aarowRight aarowRight-active"
                }
                src={ArrowRigth}
                alt=""
              />
            </samp>
          </h1>

          <h1
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
            onClick={() => handleClick("product")}
          >
            <samp style={{ color: !product ? "black" : "red", padding: "7px" }}>
              Add Product
            </samp>
            <samp style={{ display: "flex" }}>
              <img
                className={
                  !product ? "aarowRight" : "aarowRight aarowRight-active"
                }
                src={ArrowRigth}
                alt=""
              />
            </samp>
          </h1>
        </div>

        <section
          className={
            !updateAdvance && !product
              ? "change-info-conteiner"
              : "change-info-conteiner-active change-info-conteiner"
          }
        >
          <article style={{ overflowY: "scroll", width: "60%", display: 'flex', flexDirection: 'column' }}>
            <h1 style={{width:'100%'}}>{updateAdvance ? " Add Basice Info" : "Add product info"}</h1>

            <form id="advanceForm" className="advance-info-form">
              {/* __1 */}
              <CreatInput />

              {/* __2 */}
              {updateAdvance ? <AddNewInputs /> : null}
            </form>
          </article>

          <article style={{ width: "35%" }}>
            <h1> Currency/Quantity </h1>
            {/* __3 */}
            <CreatSelection />
          </article>
        </section>

        <div
          onClick={updateAdvance ? updateadvance : addnewproduct}
          className="advance-info-btn-conteiner"
          style={{ display: updateAdvance || product ? "flex" : "none" }}
        >
          <button disabled={loading} className="advance-info-btn">
            {" "}
            {updateAdvance ? "Change Advence" : "Add New Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Addnewuser;
