import { cloneDeep } from "lodash";
import { convertToPermissionsEnum } from "./guest-permissions-dropdown-settings";

export const processData = (data, selectOption, id, pid) => {
  const body = data.msg.replace("Include an optional message...", "");

  const modData = {
    email: data.email,
    permissions: convertToPermissionsEnum[selectOption],
    userId: id,
    projectId: pid.toString(),
    body: body.length > 0 ? body : "",
  };

  return modData;
};

export const processOwnedGuestProjects = (data, ownedProjects, pid) => {
  const clonedOwnedProjects = cloneDeep(ownedProjects);

  const index = getObjectIndex(clonedOwnedProjects, pid);

  // return data with new guest added
  clonedOwnedProjects[index].guestList.push(data);
  return clonedOwnedProjects;
};

export const processUpdatedPermissions = (data, ownedProjects, pid) => {
  const clonedOwnedProjects = cloneDeep(ownedProjects);

  const index = getObjectIndex(clonedOwnedProjects, pid);

  const updatedGuestList = clonedOwnedProjects[index].guestList.filter((g) => {
    if (g.email !== data.email && g.projectId !== pid.toString()) {
      return data;
    }
  });

  updatedGuestList.push(data);
  clonedOwnedProjects[index].guestList = updatedGuestList;
  return clonedOwnedProjects;
};

const getObjectIndex = (clonedOwnedProjects, pid) => {
  // get object index
  let index = null;
  for (const [k, v] of Object.entries(clonedOwnedProjects)) {
    if (v.projectId === pid) index = k;
  }

  if (index === null) return;
  return index;
};

export const updateGuestListOnDeletion = (email, pid, ownedProjects) => {
  const clonedOwnedProjects = cloneDeep(ownedProjects);

  const index = getObjectIndex(clonedOwnedProjects, pid);

  // return data with new guest added
  const guestList = clonedOwnedProjects[index].guestList;
  const modGuestList = guestList.filter((g) => g.email !== email);

  clonedOwnedProjects[index].guestList = modGuestList;
  return clonedOwnedProjects;
};
