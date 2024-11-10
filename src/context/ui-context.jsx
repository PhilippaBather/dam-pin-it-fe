import { createContext, useContext, useState } from "react";

// create context
const UIContext = createContext();

// create provider
export const UIContextProvider = ({ children }) => {
  //const [rerender, setRerender] = useState(false);
  const [columnClicked, setColumnClicked] = useState("");
  //const [modal, setModal] = useState(null);

  const ctxtValue = {
    //modal,
    //rerender,
    columnClicked,
    //setModal,
    //setRerender,
    setColumnClicked,
  };

  return <UIContext.Provider value={ctxtValue}>{children}</UIContext.Provider>;
};

// create use context
// eslint-disable-next-line react-refresh/only-export-components
export const useUIContext = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error("useUIContext must be used in UIContextProvider");
  }
  return context;
};
