import { BASE_URL } from "../../api/endpoints";
import { getAuthToken } from "../../auth/auth-functions";

const getURL = (ids, action) => {
  const { id, pid } = ids;
  switch (action) {
    case "GET_PROJECTS":
      return `${BASE_URL}projects/${parseInt(id)}`;
    case "GET_PROJECT":
      return `${BASE_URL}project/user/${id}/project/${pid}`;
    case "POST":
      return `${BASE_URL}projects/${id}`;
    case "PUT":
      return `${BASE_URL}project/${pid}`;
    case "DELETE":
      return `${BASE_URL}project/${pid}`;
    case "DELETE_SHARED":
      return `guests/${id}/shared-projects/${pid}`;
    default:
      return null;
  }
};

export const handleProjectHTTPRequest = async (
  ids,
  reqMethod,
  action,
  data
) => {
  const token = getAuthToken();
  const url = getURL(ids, action);

  data = data ? JSON.stringify(data) : null;

  const resp = await fetch(`${url}`, {
    method: reqMethod,
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
    },
    body: data,
  });

  if (resp.status === 200 || resp.status === 201) {
    return await resp.json();
  } else if (resp.status === 204) {
    return true;
  } else {
    await handleErrors(resp);
  }
};

const handleErrors = async (resp) => {
  const error = await resp.json();
  console.log(error);

  if (!resp.ok) {
    if (resp.status === 401) {
      console.log("here");
      if (error.message.includes("Unexpected end of JSON input")) {
        throw new Error("Malformed request");
      }
      throw new Error(error.message);
    }

    if (resp.status === 404) {
      throw new Error(error.message);
    }

    if (resp.status === 500) {
      throw new Error("Internal server error");
    } else {
      throw new Error(error.message);
    }
  }
  return;
};
