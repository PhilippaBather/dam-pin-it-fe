import { createContext, useContext, useState } from "react";
// import AddTask from "../components/tasks/AddTask";
// import DeleteProject from "../components/projects/DeleteProject";
// import EditProject from "../components/projects/EditProject";
// import TaskViewer from "../components/tasks/TaskViewer";

// create context
const UIContext = createContext();

// create provider
export const UIContextProvider = ({ children }) => {
  const [columnClicked, setColumnClicked] = useState("");
  const [modalComponentType, setModalComponentType] = useState(null);

  // const modalComponents = {
  //   ADD_TASK: <AddTask />,
  //   DELETE_PROJECT: <DeleteProject />,
  //   EDIT_PROJECT: <EditProject />,
  //   VIEW_TASK: <TaskViewer />,
  // };

  const ctxtValue = {
    columnClicked,
    modalComponentType,
    setColumnClicked,
    setModalComponentType,
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
