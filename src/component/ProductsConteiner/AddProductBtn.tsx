import React from "react";
import styled from "styled-components";
import AddIcon from '../../icon/add.png';
import UserIcon from '../../icon/addproperties.png';



interface addbtn{
    addProductFunction: React.MouseEventHandler<HTMLDivElement>;
    product:any;

}

const AddUserHead = styled.div`
        flex-direction:  column;
        align-items:  center;
        margin-bottom: 15px;
        h3{margin: 0;}
`;



const AddProductBtn: React.FC<addbtn> = ({
    addProductFunction, 
    product
}) =>{

    return (
        <div onClick={addProductFunction} 
        style={{border: product? '2px rgb(37, 6, 211) solid':'none'}} 
        className='userConteinet'>

        <div style={{justifyContent: 'center'}} 
                className='userHeaderline'>
        <img src={UserIcon} alt='User Icon' />
        </div>

                <AddUserHead className='userInfoLine'>
                <h3>Add Product</h3>
                <img src={AddIcon} alt='User Icon' />
                </AddUserHead>

</div>

    );
};

export default AddProductBtn;