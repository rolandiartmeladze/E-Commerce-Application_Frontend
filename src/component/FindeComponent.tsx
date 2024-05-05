import React from "react";
import  FindIcon from '../icon/find.png';
import styled from 'styled-components';

import serverUri from '../component/serverUrl';


const SearchContainer = styled.div`
  position: absolute;
  bottom: 5px;
  display: flex;
  width: 98%;
  justify-content: center;
  margin:auto;
  @media screen and (max-width: 550px) {
    width: 96%;
  }

`;

const StyledInput = styled.input`
  padding: 10px;
  text-align: center;
  width: 80%;
  border: 1px solid #daac;
  border-radius: 5px;
  backdrop-filter: blur(8px); 
  background-color: rgba(255, 255, 255, 0.3);
  outline: none;
  transition: 0.4s ease-in-out;


  &::placeholder { 
  font-weight: 800;
}
&:focus {
  background-color: rgba(255, 255, 255, 0.7);
}
  
  `;

const StyledButton = styled.button`
  background-color: rgba(255, 255, 255, 0.6); 
  border: none;
  padding: 2px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9); 
  }
`;

interface findeprops {
    setUserData: Function;
    userData: any[];

        loading: boolean;
        setLoading: Function;

            findstatus: boolean;
            setFindStatus:Function;

                notfound:boolean;
                setNotound:Function;

                    findInput:string;
                    setFindInput: Function;

                    usermode:boolean;

                    myRoom:any;
  }


const FindeComponent =({ 
    findstatus,
    setFindStatus,
    loading, 
    setLoading, 
    userData, 
    setUserData ,
    notfound,
    setNotound,
    findInput,
    setFindInput, 
    usermode,
    myRoom


}:findeprops)=>{
    const serverlink = serverUri();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFindInput(newValue);
    };

        // აგზავნის მოთხოვნას მითითებული საძიებო სიტყვის შესაბამისის შედეგის საჩვენებლად
        const findRequest = async () => {

            if(findInput.length >0){

            setLoading(true);
                try {
                        const FindInput = findInput;
                        const findProduct = await fetch(`${serverlink}/findProduct?FindInput=${FindInput}`, {
                                method: 'GET',
                                headers: {'Content-Type': 'application/json'},
                        });
                        if (!findProduct.ok) {throw new Error('Failed to fetch users data');}
                        const findResult = await findProduct.json();
                        setUserData(findResult);
                        if(findResult.length === 0){ setNotound(true); setFindStatus(false); }
                        else{setNotound(false);}                  

                    } 
                catch (error) {console.error( error);} 
                finally { setLoading(false);  if(userData.length > 0){setFindStatus(true)} }
            }
            else{

                const input: HTMLInputElement | null = document.getElementById("FindProduct") as HTMLInputElement;
                if(input){
                input.style.borderColor = "red";
                input.placeholder = "Enter a search term";
                setTimeout(() => {
                    input.style.borderColor = "black";
                    input.placeholder = "search term";

                }, 500);
                }
                
            }

        };


    return(
        <>
  <SearchContainer>
    <StyledInput 
      id='FindProduct' 
      onChange={handleChange} 
      value={findInput} 
      type='text' 
      placeholder='Find Product' 
    />
    <StyledButton onClick={findRequest}>
      {'Find'}
    </StyledButton>
  </SearchContainer>


        </>

    );
}
export default FindeComponent;