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
  const [tasks, setTasks] = useState({
    1: {
      tasks: [
        {
          id: 1,
          projectId: "1",
          title: "Task 1",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "PENDING",
          position: 1,
        },
        {
          id: 2,
          projectId: "1",
          title: "Task 2",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "PENDING",
          position: 2,
        },
        {
          id: 6,
          projectId: "1",
          title: "Task 6",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "PENDING",
          position: 3,
        },
      ],
    },
    2: {
      tasks: [
        {
          id: 4,
          projectId: "1",
          title: "Task 4",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "IN_PROGRESS",
          position: 1,
        },
        {
          id: 3,
          projectId: "1",
          title: "Task 3",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "IN_PROGRESS",
          position: 2,
        },
      ],
    },
    3: {
      tasks: [],
    },
    4: {
      tasks: [
        {
          id: 5,
          projectId: "1",
          title: "Task 5",
          description: "taskDescription",
          deadline: "01/01/2025",
          priority: "NORMAL",
          status: "COMPLETED",
          position: 1,
        },
      ],
    },
  });
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
