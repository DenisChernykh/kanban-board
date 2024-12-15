import { useEffect, useRef } from 'react';

export function useOutsideClick(
  handler: () => void,
  listenCapture: boolean = true
) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }
      document.addEventListener('click', handleClick, listenCapture);
      return () =>
        document.removeEventListener('click', handleClick, listenCapture);
    },
    [handler, listenCapture]
  );
  return ref;
}