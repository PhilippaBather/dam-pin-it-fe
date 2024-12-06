// object literal to get column name by position
export const getColName = {
  1: () => "Pending",
  2: () => "In Progress",
  3: () => "Blocked",
  4: () => "Completed",
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

export const processTaskData = (data, selectedOption, pid) => {
  // none by default
  data.priorityLevel =
    selectedOption === "" ? "NONE" : selectedOption.toUpperCase();
  data.taskStatus = "PENDING"; // for first column ordering
  data.taskPosition = 1;
  data.projectId = parseInt(pid);
  return data;
};

export const resetTasksOrderInColumn = (savedTask, projectTasks) => {
  const modTaskList = projectTasks[1].tasks.map((task) => {
    ++task.taskPosition;
    return task;
  });
  modTaskList.unshift(savedTask);
  return modTaskList.reverse();
};

export const updateContext = (modTaskList, setTasks) => {
  setTasks((prev) => {
    return {
      ...prev,
      1: {
        tasks: [...modTaskList],
      },
    };
  });
};
