import { cloneDeep } from "lodash";

export const validateDeadlineDate = (deadline, setDeadlineValError) => {
  const currDate = Date.now();
  const parsedProjectDate = Date.parse(deadline);

  if (parsedProjectDate < currDate) {
    setDeadlineValError(true);
    return true;
  }

  return false;
};

export const deleteSharedProject = (sharedProjects, setSharedProjects, id) => {
  const clonedProjects = cloneDeep(sharedProjects);
  const filteredProjects = clonedProjects.filter((p) => p.projectId !== id);
  setSharedProjects(filteredProjects);
};
