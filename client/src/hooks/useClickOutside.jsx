import React, { useEffect } from "react";

const useClickOutside = ({ ref, setState }) => {
  useEffect(() => {
    const outSideClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setState(false);
      }
    };

    document.addEventListener("mousedown", outSideClick);

    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, [ref, setState]);
};

export default useClickOutside;
