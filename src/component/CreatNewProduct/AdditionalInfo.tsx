import React, { useState } from "react";

import './AddProducte.css';

import addphone from "../../icon/addphone.png";
import addimage from "../../icon/addimage.png";
import addemail from "../../icon/addmail.png";
import addcomment from "../../icon/addcomment.png";

interface props {
  activeuser:any;
}

  // კოდის ეს ფრაგმენტი პასუხისმგებელია ძირითადი მონაცემების გარდა
  // მომხმარებლისთვის სასურველი სხვა მონაცემების
  //შესაყვანად საჭირო შესაბამისი ველების დასამატებლად
  // ეს ფრაგმენტი აქტიურია მხოლოდ იმ შემთხვევაში როდესაც რიდესაც
  // აქტიურია ძირითადი მონაცემების შეცვლის სექცია  updateAdvance = True
  //__2__

const AdditionalInfo:React.FC<props> = ({activeuser}) =>  {

    const [inputFields, setInputFields] = useState<JSX.Element[]>([]);

    const addphoneid = document.getElementById('addphoneid');
    const addemailid = document.getElementById('addemailid');
    const addcommentid = document.getElementById('addcommentid');
    const addimageid = document.getElementById('addimageid');



    const userphone: string = activeuser.phone;
    const useremail: string = activeuser.email;
    const useraddress: string = activeuser.address;
    
console.log(userphone)

    const handleAddInput = (type: string, value: string): void => {
        setInputFields((prevInputFields) => {
          let inputElement;
  
          if (type === "file") {
            inputElement = (
              <input 
                className="inputItem"
                key={prevInputFields.length}
                accept={value}
                type={type}
              />
            );
          } else if (value === "Comment") {
            inputElement = (
              <textarea
                className="inputItem"
                key={prevInputFields.length}
                placeholder={value}
              />
            );
          } else {
            inputElement = (
              <input
                className="inputItem"
                key={prevInputFields.length}
                placeholder={value}
                type={type}
              />
            );
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
            <div style={{ borderLeft: "1px solid green" }} className="elementinarticle">
              <>
              <div className="additionalInputConteiner">
                {userphone &&
                  <input
                    className="inputItem"
                    value={userphone}
                    placeholder="Phone"
                    type="text" 
                    
                  />
                 }
              </div>

              <div className="additionalInputConteiner">
                {userphone &&
                  <input
                    className="inputItem"
                    value={useremail}
                    placeholder="Email"
                    type="text"
                    
                  />
                 }
              </div>
              <div className="additionalInputConteiner">
                {userphone &&
                  <input
                    className="inputItem"
                    value={useraddress}
                    placeholder="Address"
                    type="text"
                    
                  />
                 }
              </div>

              </>
            {inputFields.map((input, index) => (
              <div className="additionalInputConteiner" key={index}>
                
                {input}
              </div>
            ))}
      

            <div id="addcommentid"
              onClick={() => handleItemClick("text", "Comment", "addcommentid")}
              className="add-btn-conteiner">
              <div className="addnewinputicon">
                <img src={addcomment} alt="add info" />
              </div>Add Cmment
            </div>


            
            <div id="addimageid"
              onClick={() => handleItemClick("file", "img", "addimageid")}
              className="add-btn-conteiner">
              <div className="addnewinputicon">
                <img src={addimage} alt="add info" />
              </div>Add Image
            </div>

          </div>
              );

    
}
export default AdditionalInfo;
