import { BASE_URL } from "../../api/api-constants";
import { getAuthToken } from "../../auth/auth-functions";

const getURL = (email, pid, action) => {
  switch (action) {
    case "DELETE_GUEST":
      return `${BASE_URL}guests/owned-projects/guest/${email}/project/${parseInt(
        pid
      )}`;
    case "POST":
      return `${BASE_URL}guests`;
    case "PUT":
      return `${BASE_URL}guests/owned-projects`;
    default:
      return;
  }
};

export const handleGuestHTTPRequest = async (ids, reqMethod, action, data) => {
  const token = getAuthToken();
  console.log("here");
  const { email = null, pid = null } = ids;
  const url = getURL(email, pid, action);
  console.log(url);
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
