import React, { useState } from "react";


import './AddProducte.css';

interface inputsvalue{
    inputValues:any; 
    setInputValues:Function;

}

        //  ეს კოდი ქმნის პროდუქტის დასამატებლად საჭირო მონაცემების შესაყვანად
        //__1__

const BasicInfo: React.FC<inputsvalue> = ({inputValues, setInputValues}) => {

  
    const setInputValue = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number ) => {
        const newValue = e.target.value;
              setInputValues((prevValues: string[]) => {
                const updatedValues = [...prevValues];
                      updatedValues[index] = newValue;
                  return updatedValues;
              });
    };


    return (
        <div style={{ borderRight: "1px solid green" }}
        className="elementinarticle" >

            <input className="inputItem" type="text"
                        placeholder="name"
                        value={inputValues[0] || ""}
                        onChange={(e) => setInputValue(e, 0)} />

            <input className="inputItem" type="text"
                        placeholder="address"
                        value={inputValues[1] || ""}
                        onChange={(e) => setInputValue(e, 1)} />

            <input className="inputItem" type="number"
                        placeholder="quantity"
                        value={inputValues[2] || ""}
                        onChange={(e) => setInputValue(e, 2)} />

            <input className="inputItem" type="number"
                        placeholder="price"
                        value={inputValues[3] || ""}
                        onChange={(e) => setInputValue(e, 3)} />

            <textarea className="inputItem" placeholder="description"
                      value={inputValues[4] || ""}
                      onChange={(e) => setInputValue(e, 4)} />

      </div>

    );


};

export default BasicInfo;
