import { createContext, useContext, useState } from "react";

// create context
const UIContext = createContext();

// create provider
export const UIContextProvider = ({ children }) => {
  const [columnClicked, setColumnClicked] = useState("");
  const [modalComponentType, setModalComponentType] = useState(null);
  const [selectOption, setSelectOption] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  const [dashboardError, setDashboardError] = useState(false);

  const ctxtValue = {
    columnClicked,
    dashboardError,
    globalError,
    modalComponentType,
    selectOption,
    setColumnClicked,
    setDashboardError,
    setGlobalError,
    setModalComponentType,
    setSelectOption,
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
