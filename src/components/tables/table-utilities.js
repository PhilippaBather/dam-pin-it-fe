import { getAuthToken } from "../../auth/auth-functions";

export const handleGetOwnedProjects = async (id) => {
  const token = getAuthToken();
  try {
    const resp = await fetch(
      `http://localhost:3000/guests/owned-projects/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
          Authorizaton: "Bearer " + token,
        },
      }
    );
    return await resp.json();
  } catch (e) {
    console.error(e);
  }
};

export const handleGetSharedProjects = async (id) => {
  const token = getAuthToken();

  try {
    const resp = await fetch(
      `http://localhost:3000/guests/shared-projects/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
          Authorizaton: "Bearer " + token,
        },
      }
    );
    return await resp.json();
  } catch (e) {
    console.error(e);
  }
};
