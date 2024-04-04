import React from "react";
import  FindIcon from '../icon/find.png';

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
    setFindInput


}:findeprops)=>{
    
    const serverUrl = "https://dry-shore-70664-df3b504ad877.herokuapp.com";

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
                        const findProduct = await fetch(`http://localhost:80/findProduct?FindInput=${FindInput}`, {
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
        <div className='Finde'>
        <input id='FindProduct' 
            onChange={handleChange} 
            value={findInput} 
            type='text' 
            placeholder='search term'/> 
            <samp onClick={findRequest}>
                <img src={FindIcon} alt='find icon' />
            </samp>
    </div>

    );
}
export default FindeComponent;