import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // ref.current is the white modal window which basically is a DOM element
        // On DOM element we can call .contain method
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // Adding true as a 3rd argument means, event will be listened in the capturing phase (As it moves down the tree)
      document.addEventListener("click", handleClick, listenCapturing);

      // Removing the event listener after the component unmounts
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
