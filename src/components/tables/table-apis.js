import { getAuthToken } from "../../auth/auth-functions";
import { BASE_URL } from "../../api/endpoints";

const getURL = (id, action) => {
  switch (action) {
    case "OWNED_PROJECTS":
      return `${BASE_URL}guests/owned-projects/${id}`;
    case "SHARED_PROJECTS":
      return `${BASE_URL}guests/shared-projects/${id}`;
    default:
      return;
  }
};

export const handleManagementHTTPRequest = async (
  id,
  reqMethod,
  action,
  data
) => {
  const token = getAuthToken();
  const url = getURL(id, action);

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
