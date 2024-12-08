import { getAuthToken, setJWTExpiration } from "./auth-functions";
import { BASE_URL } from "../api/api-constants";

const getURL = (ids, action) => {
  switch (action) {
    case "LOGIN":
      return `${BASE_URL}users/auth/login`;
    case "SIGNUP":
      return `${BASE_URL}users/auth/signup`;
    case "POST_USER":
      return `${BASE_URL}users`;
    case "PSWD_RESET":
      return ``;
    default:
      return;
  }
};

export const handleAuthHTTPRequest = async (ids, reqMethod, action, data) => {
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
    const data = await resp.json();
    if (action === "LOGIN") {
      localStorage.setItem("token", data.jsonToken);
      setJWTExpiration();
    }
    return data;
  } else if (resp.status === 204) {
    return;
  } else {
    return await handleErrors(resp, action);
  }
};

const handleErrors = async (resp, action) => {
  if ((action === "LOGIN" && resp.status === 401) || resp.status === 422) {
    throw new Error("Incorrect login details.");
  }

  if (!resp.ok) {
    const error = await resp.json();
    if (error.status === 401) {
      if (error.message.includes("Unexpected end of JSON input")) {
        throw new Error("Malformed request");
      }
      throw new Error(error.message);
    } else if (error.status === 500) {
      throw new Error("Internal server error");
    } else {
      throw new Error(error.message);
    }
  }

  return;
};

export const postAuthData = async (url, data, dataType) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
    },
  });

  if (resp.status === 401 || resp.status === 422) {
    throw new Error("Incorrect login details.");
  }

  if (resp.status === 500) {
    throw new Error(respData.message);
  }

  const respData = await resp.json();

  if (resp.status !== 200) {
    if (resp.status === 404) {
      throw new Error(respData.message);
    }

    if (resp.status === 409) {
      throw new Error(respData.message);
    }
  }

  if (dataType === "LOGIN") {
    localStorage.setItem("token", respData.jsonToken);
    setJWTExpiration();
  }
};

export const handleHttpReq = async (url, data, id, method, dataType) => {
  const token = getAuthToken();

  if (dataType === "PROJECT" || dataType === "TASK") {
    url += id;
  }

  data = data ? JSON.stringify(data) : null;

  const resp = await fetch(url, {
    method: method,
    body: data,
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
    },
  });

  if (resp.status === 401) {
    throw new Error("Insufficient permissions.");
  }

  if ((method === "DELETE" || method === "PUT") && resp.status === 204) {
    return resp.status;
  }

  if (method === "LOGIN" && (resp.status === 401 || resp.status === 422)) {
    throw new Error("Incorrect login details.");
  }

  if (resp.status === 500) {
    throw new Error("Internal server error.");
  }
  return await resp.json();
};
