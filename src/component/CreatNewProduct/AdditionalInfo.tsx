import React, { useState } from "react";
import './AddProducte.css';
import addimage from "../../icon/addimage.png";
import addcomment from "../../icon/addcomment.png";

interface Props {
  activeUser: any;
}

const AdditionalInfo: React.FC<Props> = ({ activeUser }) => {
  const [inputFields, setInputFields] = useState<JSX.Element[]>([]);
  
  const handleAddInput = (type: string, value: string): void => {
    let inputElement: JSX.Element;
    const comentbtn = document.getElementById('addcommentid');
    
    if (value === "Comment") {
      if (comentbtn) {
        comentbtn.style.display = 'none';
      }
      inputElement = (
        <textarea
          className="inputItem"
          key={inputFields.length} // Ensure each input has a unique key
          placeholder={value}
        />
      );
    } else {
      inputElement = (
        <input
          className="inputItem"
          key={inputFields.length} // Ensure each input has a unique key
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

  {inputFields.map((input, index) => (
    <div className="additionalInputConteiner" key={index}>
      {input}
    </div>
  ))}

  <div
    id="addcommentid"
    onClick={() => handleItemClick("text", "Comment")}
    className="add-btn-conteiner"
  >
    <div className="addnewinputicon">
      <img src={addcomment} alt="add info" />
    </div>Add Comment
  </div>

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
