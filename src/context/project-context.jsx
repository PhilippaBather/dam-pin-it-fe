import { createContext, useContext, useState } from "react";

// create context
const ProjectContext = createContext({
  projects: [],
  tasks: {},
});

// create provider
export const ProjectContextProvider = ({ children }) => {
  const [isAlert, setIsAlert] = useState(false);
  const [projectNotifications, setProjectNotifications] = useState([]);
  const [projectsState, setProjectsState] = useState([]);
  const [currProject, setCurrProject] = useState({});
  const [sharedProjects, setSharedProjects] = useState([]);
  const [selectedSharedProject, setSelectedSharedProject] = useState({});
  const [tasks, setTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState({});

  const updateDraggedTasksYAxis = (colId, updatedTasks) => {
    setTasks((prev) => {
      return {
        ...prev,
        [colId]: {
          tasks: updatedTasks,
        },
      };
    });
  };

  const updateDraggedTasksXAxis = (
    sourceColId,
    destinationColId,
    updatedSourceTasks,
    updatedDestinationTasks
  ) => {
    setTasks((prev) => {
      return {
        ...prev,
        [sourceColId]: {
          tasks: [...updatedSourceTasks],
        },
        [destinationColId]: {
          tasks: [...updatedDestinationTasks],
        },
      };
    });
  };

  const resetTaskState = (reorderedTasks, colId) => {
    setTasks((prev) => {
      return {
        ...prev,
        [colId]: {
          tasks: [...reorderedTasks],
        },
      };
    });
  };

  const ctxtValue = {
    currProject,
    isAlert,
    projectNotifications,
    projects: projectsState,
    projectTasks: tasks,
    selectedTask,
    sharedProjects,
    selectedSharedProject,
    resetTaskState,
    setCurrProject: setCurrProject,
    setIsAlert,
    setProjectNotifications,
    setProjects: setProjectsState,
    setSharedProjects,
    setSelectedSharedProject,
    setTasks,
    setSelectedTask,
    updateDraggedTasksXAxis,
    updateDraggedTasksYAxis,
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
