import { getAuthToken, setJWTExpiration } from "../auth/auth-functions";
import { origin } from "./endpoints";

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

  if ((method === "DELETE" || method === "PUT") && resp.status === 204) {
    return resp.status;
  }

  const respData = await resp.json();

  if (resp.status === 401 || resp.status === 422) {
    throw new Error("Incorrect login details.");
  }

  if (resp.status === 500) {
    throw new Error(respData.message);
  }

  return respData;
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
