import styled from "styled-components";
import favIcon from '../../icon/favIcon.svg';
import cartIcon from '../../icon/cartIcon.svg';
import smsIcon from '../../icon/smsIcon.svg'


const Logo = styled.h1`
  margin: 0;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 4px;
  left: 25px;
`;

const LoginBtn = styled.div`
  display: flex;
  // position: absolute;
  margin-right: 15px;
  margin-top: 10px;
  //   right: 15px;
  // top: 10px;
  padding: 2px;
  padding-right: 8px;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0.3px 0.3px 2px 0.1px black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.8s ease-in-out;
  background-color: rgb(10, 15, 30, 0.3);

        &:hover{
  box-shadow: 0.3px 0.3px 2px 0.1px black inset;
  background-color: rgb(210, 105, 30, 0.1);
}

samp {
  margin: 2px;
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 750px) {

  right: 60px;

}

`;


  const HeaderComponent = styled.div`
    padding: 0px 0px;
    display: flex;
    flex-direction: column;
    margin: 0;
    // height: 20%;
    max-height: 250px;
    box-shadow: 2px 2px 6px 0.5px rgb(0, 0, 0 , 0.8);
    backdrop-filter: blur(2px);
    position: relative;
    min-height: 100px;
    grid-row: 1;
    grid-column: 1;
    background-color: rgb(51, 51, 51, 0.2);
    margin-bottom: 4px;
    z-index: 1000;


  `;

  const UserInfo = styled.div`
        display: flex;
        // position: absolute;
        position: relative;
        margin-top: 5px;
        margin-right: 28px;
        transition: 0.4s ease-in-out;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 800;
        flex-direction: column;
        z-index: 5;
        transition: 0.3s eae-in-out;


  &:hover {
    background-color: ${props => !props.active ? 'rgb(1, 1, 1, 0.1)' : 'none'};
  }

  &:before {
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 40px; 
    background: none;
    z-index: -1;
    padding-bottom: 10px;
  }


  div {
    padding: 5px 0;
    height: auto;
    display: flex;
    align-items: flex-end;

    samp {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    img {
      margin: 0;
      max-width: 40px;
    }
  }

  .item {
    width: 85%;
    margin: auto;
    color: white;
    box-shadow: 0px 2px 2px 0.5px white;
    margin-top: 7px;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;
      transform: scale(0);
      transition: 0.3s ease-in-out;
  

    &:hover {
      color: yellow;
      box-shadow: 0px 2px 2px 0.5px yellow;
      transform: scale(1.05) !important;
    }
  }

  @media only screen and (max-width: 750px) {
    right: 60px;
    margin-right: 0px;

  }

  ${({ active }) =>
    active &&
    `
    &:before {
      height: 100%; 
      background-color: rgb(51, 51, 51); 
      transition: width 0.3s ease-in-out, height 1.1s ease-in-out; 
      border-radius: 10px;
    }
  `}
`;


const HeaderNavigateStyle = styled.nav`
display: inline-block;

ul{
  display: flex;
}

@media only screen and (max-width: 750px) {
  margin-right: 60px;
  ul{
    margin-top: 0px !important
  }
}

`;


const ListItem = styled.li`
  position: relative;
  cursor: pointer;
  background-color: rgb(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
    margin: 5px;
    padding: 5px;
    font-weight: 700;
    box-shadow: -1px 0px 3px 0px black;
    align-items: center;
    border-radius: 6px 6px 0px 0px;
    transition: 0.4s ease-in-out;

  &:before {
    left: -1px;
    bottom: -5px;
    position: absolute;
    content: '';
    width: 100%;
    height: 6px;
    background-color: ${props => props.color};
    padding: 1px;
    border-radius: 0px 0px 5px 5px;
    transition: 0.4s ease-in-out;

  } 

  &:hover{
    box-shadow: 0px 0px 1px 0px yellow;
    border-radius: 6px;

      transform: scale(1.05);

    &:before {
      height: 100%;
      bottom: -3px;
      left: -3px;
      z-index: -1;
      opacity: 0.1;
      padding: 3px;
      border-radius: 6px;

    }
  }
 };

 @media only screen and (max-width: 750px) {
  img{
    width: 20px;
  }

};


`;

export {favIcon, cartIcon, smsIcon};

export {ListItem, HeaderNavigateStyle, UserInfo, HeaderComponent, LoginBtn, Logo};