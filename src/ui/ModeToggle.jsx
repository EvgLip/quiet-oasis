import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import { useModeToggleContext } from "../contexts/ModeToggleContext";


export default function ModeToggle ()
{
  const { isDarkMode, switchBetweenModes } = useModeToggleContext();

  return (
    <ButtonIcon onClick={switchBetweenModes}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
