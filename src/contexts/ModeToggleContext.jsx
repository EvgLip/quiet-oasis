import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ModeToggleContext = createContext();

/* eslint-disable react/prop-types */
export function ModeToggleProvider ({ children })
{
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(
    function ()
    {
      const html = document.documentElement.classList;
      if (isDarkMode)
      {
        html.add('dark-mode');
        html.remove('light-mode');
      }
      else
      {
        html.add('light-mode');
        html.remove('dark-mode');
      }
    }
    , [isDarkMode]);

  function switchBetweenModes ()
  {
    setIsDarkMode(isDark => !isDark);
  }

  return (
    <ModeToggleContext.Provider
      value={{ isDarkMode, switchBetweenModes }}
    >
      {children}
    </ModeToggleContext.Provider>
  );
}

export function useModeToggleContext ()
{
  const context = useContext(ModeToggleContext);

  if (!context) throw new Error('Контекст ModeToggleContext использован за пределами провайдера ModeToggleProvider');

  return context;
}
