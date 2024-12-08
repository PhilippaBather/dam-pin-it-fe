import { getAuthToken, setJWTExpiration } from "./auth-functions";
import { origin } from "../api/endpoints";

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