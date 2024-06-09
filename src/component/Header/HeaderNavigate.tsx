import React from "react";
import {
    HeaderNavigateStyle, ListItem,
    favIcon, cartIcon, smsIcon
    } from './Tools';

    import { useNavigate } from 'react-router-dom';
    
interface navProps{
    link:string;
  }
  interface Props{
    usermode:boolean;
  }


  const HeaderNavigate: React.FC<Props> = ({ usermode }) => {
    const navigate = useNavigate();

    const goTo = ({ link }: navProps) => {
        navigate(link);
    };

    return(
        <HeaderNavigateStyle>
  <ul>
    {usermode && 
    <ListItem  
      onClick={() => goTo({ link: '/main/message' })} 
      color='blue'> 
        <img 
        src={smsIcon} 
        alt='' />  
      </ListItem>
}
        <ListItem  
          onClick={() => goTo({ link: '/cart' })} 
          color='red'> 
            <img 
            src={cartIcon} 
            alt='' /> 
          </ListItem>

            <ListItem  
              onClick={() => goTo({ link: '/favorite' })} 
              color='#d301cd'> 
              <img 
              src={favIcon} 
              alt='' /> 
            </ListItem> 
    </ul>
</HeaderNavigateStyle>

    );
}
export default HeaderNavigate;