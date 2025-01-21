import styled from "styled-components";
import { useModeToggleContext } from "../contexts/ModeToggleContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo ()
{
  const { isDarkMode } = useModeToggleContext();

  const src = isDarkMode
    ? "/logo-dark.png"
    : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
