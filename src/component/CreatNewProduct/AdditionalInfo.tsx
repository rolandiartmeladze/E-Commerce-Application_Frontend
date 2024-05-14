import React, { useState,  ChangeEvent  } from "react";
import './AddProducte.css';
import addimage from "../../icon/addimage.png";
import addcomment from "../../icon/addcomment.png";

interface Props {
  activeUser: any;
}

const AdditionalInfo: React.FC<Props> = ({ activeUser }) => {
  const [inputFields, setInputFields] = useState<JSX.Element[]>([]);

  const [images, setImages] = useState<File[]>([]);

  const setImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files && e.target.files[0];
      
      if (selectedImage) {
          setImages(prevImages => [...prevImages, selectedImage]);
      }
  
      console.log(images); 
  };
  
  
  const handleAddInput = (type: string, value: string): void => {
    let inputElement: JSX.Element;
    const comentbtn = document.getElementById('addcommentid');
    
    if (value === "comment") {
      if (comentbtn) {
        comentbtn.style.display = 'none';
      }
      inputElement = (
        <textarea
          className="inputItem"
          key={inputFields.length} 
          placeholder="comment"
        />
      );
    } else {
      inputElement = (
        <input
          className="inputItem"
          onChange={setImageHandler}
          key={inputFields.length} 
          accept={value === "img" ? "image/*" : ""}
          type={type}
        />
      );
    }

    setInputFields(prevInputFields => [...prevInputFields, inputElement]);
  };

  const handleItemClick = (type: string, value: string): void => {
    handleAddInput(type, value);
  };

  return (
<div id='inputsconteiner' style={{ borderLeft: "1px solid green", position:'relative'}} className="elementinarticle">
  <div className="additionalInputConteiner">
    <input className="inputItem" value={activeUser.phone || ''} placeholder="phone" type="text" disabled />
  </div>

  <div className="additionalInputConteiner">
    <input className="inputItem" value={activeUser.email || ''} placeholder="email" type="text" disabled />
  </div>

  <div className="additionalInputConteiner">
    <input className="inputItem" value={activeUser.address || ''} placeholder="location" type="text" disabled />
  </div>


        <div className="additionalInputConteiner" >
        <textarea className="inputItem" placeholder="comment" />
        </div>

  {inputFields.map((input, index) => (
    <div className="additionalInputConteiner" key={index}>
      {input}
    </div>
  ))}

  {/* <div
    id="addcommentid"
    onClick={() => handleItemClick("text", "comment")}
    className="add-btn-conteiner"
  >
    <div className="addnewinputicon">
      <img src={addcomment} alt="add info" />
    </div>Add Comment
  </div> */}

  <div style={{marginBottom: '5px'}}
    id="addimageid"
    onClick={() => handleItemClick("file", "img")}
    className="add-btn-conteiner"
  >
    <div className="addnewinputicon">
      <img src={addimage} alt="add info" />
    </div> Add image
  </div>
</div>
  );
};

export default AdditionalInfo;
