import { cloneDeep } from "lodash";

// object literal to get column name by position
export const getColName = {
  1: "Pending",
  2: "In Progress",
  3: "Blocked",
  4: "Completed",
};

export const getItemDragStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? `rgb(251, 5, 173)` : "white",
  border: `1px solid grey`,
  borderRadius: `5px`,
  color: isDragging ? "white" : "black",

  ...draggableStyle,
});

export const getTaskStatus = (col) => {
  const taskStatus = getColName[col].toUpperCase();
  if (taskStatus === "IN PROGRESS") {
    return taskStatus.replace(" ", "_");
  }
  return taskStatus;
};

export const parseTaskData = (data) => {
  const pendingTasks = data
    .filter((task) => task.taskStatus === "PENDING")
    .sort((a, b) => a.taskPosition - b.taskPosition);
  const progressTasks = data
    .filter((task) => task.taskStatus === "IN_PROGRESS")
    .sort((a, b) => a.taskPosition - b.taskPosition);
  const blockedTasks = data
    .filter((task) => task.taskStatus === "BLOCKED")
    .sort((a, b) => a.taskPosition - b.taskPosition);
  const completedTasks = data
    .filter((task) => task.taskStatus === "COMPLETED")
    .sort((a, b) => a.taskPosition - b.taskPosition);

  const parsedData = {};
  parsedData[1] = { tasks: [...pendingTasks] };
  parsedData[2] = { tasks: [...progressTasks] };
  parsedData[3] = { tasks: [...blockedTasks] };
  parsedData[4] = { tasks: [...completedTasks] };

  return parsedData;
};

export const resetTaskOrderInColumn = (savedTask, tasks, col) => {
  const clonedTasks = cloneDeep(tasks);
  clonedTasks[col].tasks.map((task) => {
    ++task.taskPosition;
    return task;
  })[0];
  clonedTasks[col].tasks.unshift(savedTask);
  return clonedTasks[col].tasks.sort((a, b) => a.taskPosition - b.taskPosition);
};

export const resetTaskPositionOnTaskDeletion = (tasks, selectedTask, col) => {
  const clonedTasks = cloneDeep(tasks);
  const filteredTask = clonedTasks[col].tasks
    .filter((task) => {
      return task.id !== selectedTask.id;
    })
    .map((task) => {
      if (task.taskPosition > selectedTask.taskPosition) {
        --task.taskPosition;
        return task;
      } else {
        return task;
      }
    });

  console.log(filteredTask);

  return filteredTask;
};

export const updateColumnOnTaskUpdate = (
  tasks,
  selectedTask,
  processedData,
  col
) => {
  const clonedTasks = cloneDeep(tasks);
  let updatedTasks = clonedTasks[col].tasks.filter(
    (task) => task.id !== selectedTask.id
  );
  updatedTasks.unshift(processedData);
  updatedTasks.sort((a, b) => a.taskPosition - b.taskPosition);
  return updatedTasks;
};
