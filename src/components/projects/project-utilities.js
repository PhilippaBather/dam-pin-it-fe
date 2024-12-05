import { getAuthToken } from "../../auth/auth-functions";

export const deleteProjectRequest = async (pid) => {
  const token = getAuthToken();
  try {
    const resp = await fetch(`http://localhost:3000/project/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Authorizaton: "Bearer " + token,
      },
    });

    return resp.status;
  } catch (e) {
    console.error(e);
  }
};
