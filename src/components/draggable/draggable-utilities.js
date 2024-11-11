import { cloneDeep } from "lodash";

export const getModStartColTaskIds = ({
  destination,
  newStartTaskIds,
  draggedItem,
  sameCol,
}) => {
  if (sameCol) {
    newStartTaskIds.splice(destination.index, 0, draggedItem);
  }

  return {
    ids: newStartTaskIds,
  };
};

export const getDraggedTaskIndex = ({
  destination,
  draggableId,
  startCol,
  endCol,
}) => {
  const newEndTaskIds = Array.from(endCol.tasks.map((task) => task.id));
  const taskPosition =
    destination.index - (startCol.tasks.length + endCol.tasks.length);
  newEndTaskIds.splice(taskPosition + 1, 0, parseInt(draggableId));
  return newEndTaskIds.indexOf(+draggableId);
};

export const updateTaskPositionInColumn = (
  columnIdentifier,
  tasks,
  newTaskOrderByIds
) => {
  const clonedTasks = cloneDeep(tasks);
  Object.entries(clonedTasks).map((key) => {
    key[1].tasks.map((task) => {
      if (task.status === columnIdentifier) {
        task.position = newTaskOrderByIds.ids.indexOf(task.id) + 1;
      }
    });
    key[1].tasks.sort((a, b) => a.position - b.position);
  });
  return clonedTasks;
};

export const filterTasksInStartColumn = (
  colIdentifier,
  modStartTaskIds,
  projectTasks
) => {
  const clonedTasks = cloneDeep(projectTasks);
  // const startCol = Object.entries(clonedTasks).filter((key, value) => {
  //   if (key[0] === colIdentifier) return value;
  // })[0][1];
  const startColTasks = getColumnTasks(clonedTasks, colIdentifier);

  const filteredTasks = Object.values(startColTasks)[0].filter((task) => {
    if (modStartTaskIds.includes(task.id)) return task;
  });

  return filteredTasks;
};

export const addTaskToEndColumn = (
  taskId,
  colStartId,
  colEndId,
  projectTasks
) => {
  const clonedTasks = cloneDeep(projectTasks);

  const startColTasks = getColumnTasks(clonedTasks, colStartId);

  const draggedTask = Object.values(startColTasks)[0].filter((task) => {
    if (task.id === +taskId) return task;
  })[0];

  const endColTasks = Object.entries(clonedTasks).filter((key, value) => {
    if (key[0] === colEndId) {
      return value;
    }
  })[0][1];

  endColTasks.tasks.push(draggedTask);

  return endColTasks.tasks;
};

const getColumnTasks = (clonedTasks, colIdentifier) => {
  console.log(clonedTasks);
  return Object.entries(clonedTasks).filter((key, value) => {
    if (key[0] === colIdentifier) {
      return value;
    }
  })[0][1];
};
