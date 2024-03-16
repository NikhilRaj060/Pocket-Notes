import React, { createContext, useContext, useState, useEffect } from 'react';

const MobileViewContext = createContext();

export const useMobileView = () => useContext(MobileViewContext);

export const MobileViewProvider = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(window.innerWidth <= 768);
      }
      
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MobileViewContext.Provider value={isMobileView}>
      {children}
    </MobileViewContext.Provider>
  );
};
