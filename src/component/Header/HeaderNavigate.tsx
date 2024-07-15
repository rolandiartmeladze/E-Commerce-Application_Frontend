import React from 'react';
import {
  HeaderNavigateStyle,
  ListItem,
  favIcon,
  cartIcon,
  smsIcon,
} from './Tools';


import { isMobile } from './HeadeUserElement';


import { useNavigate } from 'react-router-dom';

interface navProps {
  link: string;
}
interface Props {
  usermode: boolean;
}

const HeaderNavigate: React.FC<Props> = ({ usermode }) => {
  const navigate = useNavigate();

  const goTo = ({ link }: navProps) => {
    navigate(link);
  };

  const mobile = isMobile();


  return (
    <HeaderNavigateStyle>
      <ul>
        {usermode && (
          <ListItem
            onClick={() => goTo({ link: '/main/message' })}
            color="blue"
          >
            <img src={smsIcon} alt="" />
          </ListItem>
        )}
        <ListItem onClick={() => goTo({ link: '/cart' })} color="red">
          <img src={cartIcon} alt="" />
        </ListItem>
{
  !mobile &&
        <ListItem onClick={() => goTo({ link: '/favorite' })} color="#d301cd">
          <img src={favIcon} alt="" />
        </ListItem>
        }

      </ul>
    </HeaderNavigateStyle>
  );
};
export default HeaderNavigate;
