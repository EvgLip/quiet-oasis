import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;

export default function Header ()
{
  return (
    <StyledHeader name='header'>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
