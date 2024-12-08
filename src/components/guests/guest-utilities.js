import { cloneDeep } from "lodash";
import { convertToPermissionsEnum } from "./guest-permissions-dropdown-settings";
import { getAuthToken } from "../../auth/auth-functions";

export const processData = (data, selectOption, id, pid) => {
  const body = data.msg.replace("Include an optional message...", "");

  return {
    email: data.email,
    permissions: convertToPermissionsEnum[selectOption.value],
    userId: id,
    projectId: pid,
    body: body.length > 0 ? body : "",
  };
};

export const processOwnedGuestProjects = (data, ownedProjects, pid) => {
  const clonedOwnedProjects = cloneDeep(ownedProjects);

  // get object index
  // let index = null;
  // for (const [k, v] of Object.entries(clonedOwnedProjects)) {
  //   if (v.projectId === pid) index = k;
  // }

  // if (index === null) return;

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

export const handleUpdateRequest = async (data) => {
  const token = getAuthToken();
  try {
    const resp = await fetch(`http://localhost:3000/guests/owned-projects`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Authorizaton: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const respData = await resp.json();
    return respData;
  } catch (e) {
    console.error(e);
  }
};
