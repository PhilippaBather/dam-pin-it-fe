import { createContext, useContext, useState } from "react";

// create context
const ProjectContext = createContext({
  projects: [],
  tasks: {},
});

// create provider
export const ProjectContextProvider = ({ children }) => {
  const [projectsState, setProjectsState] = useState([]);
  const [currProject, setCurrProject] = useState({});
  const [tasks, setTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState({});

  const updateDraggedTasksXAxis = (updatedTasks) => {
    setTasks((prev) => {
      return {
        ...prev,
        ...updatedTasks,
      };
    });
  };

  const updateDraggedTasksYAxis = (updatedStartTasks, updatedEndTasks) => {
    setTasks((prev) => {
      return {
        ...prev,
        ...updatedStartTasks,
        ...updatedEndTasks,
      };
    });
  };

  const ctxtValue = {
    currProject,
    projects: projectsState,
    projectTasks: tasks,
    selectedTask,
    setCurrProject: setCurrProject,
    setProjects: setProjectsState,
    setTasks,
    setSelectedTask,
    updateDraggedTasksXAxis,
    updateDraggedTasksYAxis,

    // updateChangedColumn,
    // updateReorderedColumn,
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
