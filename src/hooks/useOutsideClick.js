import { useEffect, useRef } from "react";

export default function useOutsideClick (handler, useCapture = true)
{
  const ref = useRef();

  useEffect(function ()
  {
    document.addEventListener('click', handleClick, useCapture);

    function handleClick (e) 
    {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    return () => document.removeEventListener('click', handleClick, useCapture);
  }, [handler, useCapture]);

  return ref;
}