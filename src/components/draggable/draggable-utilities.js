import { cloneDeep } from "lodash";

export const getModStartCol = ({
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

export const getModEndCol = ({
  destination,
  draggableId,
  startCol,
  endCol,
}) => {
  const newEndTaskIds = Array.from(endCol.tasks.map((task) => task.id));
  const taskPosition =
    destination.index - (startCol.tasks.length + endCol.tasks.length);
  newEndTaskIds.splice(taskPosition + 1, 0, parseInt(draggableId));

  return {
    ids: newEndTaskIds,
  };
};

export const updatedClonedTasks = (
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
