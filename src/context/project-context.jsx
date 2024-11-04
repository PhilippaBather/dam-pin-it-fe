import { createContext, useContext, useState } from "react";

// create context
const ProjectContext = createContext({
  projects: [],
});

// create provider
export const ProjectContextProvider = ({ children }) => {
  const [projectsState, setProjectsState] = useState([]);
  const [currProject, setCurrProject] = useState({});

  const ctxtValue = {
    currProject,
    projects: projectsState,
    setCurrProject: setCurrProject,
    setProjects: setProjectsState,
  };

  return (
    <ProjectContext.Provider value={ctxtValue}>
      {children}
    </ProjectContext.Provider>
  );
};

// create use context
// eslint-disable-next-line react-refresh/only-export-components
export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (context === undefined) {
    throw new Error("useProjectContext must be used in ProjectContextProvider");
  }
  return context;
};
