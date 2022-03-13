import { MutableRefObject, useEffect } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

//usehooks.com/useOnClickOutside/
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T>,
  handler: Handler
): void => {
  useEffect(() => {
    const listener: Handler = (event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
