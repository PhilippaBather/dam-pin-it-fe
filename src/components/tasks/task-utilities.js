export const processNewTaskData = (data, selectedOption, pid) => {
  return {
    title: data.title,
    description: data.description === "" ? "None" : data.description,
    deadline: data.deadline,
    priorityLevel: (data.priorityLevel =
      selectedOption === "" ? "NONE" : selectedOption.toUpperCase()), // none by default
    taskStatus: (data.taskStatus = "PENDING"), // for first column ordering
    taskPosition: 1, // add new tasks to top of column
    projectId: (data.projectId = parseInt(pid)),
  };
};

export const processUpdatedTaskData = (
  data,
  selectedOption,
  selectedTask,
  col,
  pid
) => {
  return {
    title: data.title,
    description: data.description,
    priorityLevel: (data.priorityLevel =
      selectedOption === "" ? "NONE" : selectedOption.toUpperCase()),
    taskStatus: --col,
    taskPosition: selectedTask.taskPosition,
    deadline: data.deadline,
    projectId: pid,
    id: selectedTask.id,
  };
};

export const validateTaskDeadlineDate = (
  taskDeadline,
  projectDeadline,
  setDateValError
) => {
  const currDate = Date.now();
  const parsedTaskDate = Date.parse(taskDeadline);
  const parsedProjectDate = Date.parse(projectDeadline);

  if (parsedTaskDate < currDate) {
    setDateValError("Deadline cannot be in the past.");
    return true;
  }

  if (parsedTaskDate > parsedProjectDate) {
    setDateValError("Task dadline cannot be after project deadline.");
    return true;
  }

  return false;
};
