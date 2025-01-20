import { useNavigate } from "react-router";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul.attrs({ name: 'header-menu' })`
  
  display:flex;
  gap:0.4rem;
`;

export default function HeaderMenu ()
{
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon name="account" onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}