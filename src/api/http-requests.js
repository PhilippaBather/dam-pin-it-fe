import { setJWTExpiration } from "../auth/auth-functions";
import { origin } from "./endpoints";

export const fetchData = async (url, errMsg) => {
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(errMsg);
  }

  return data;
};

export const postAuthData = async (url, data, method) => {
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

  if (method === "SIGNUP" && resp.status !== 200) {
    if (resp.status === 404) {
      throw new Error(respData.message);
    }

    if (resp.status === 409) {
      throw new Error(respData.message);
    }
  }

  if (method === "LOGIN") {
    localStorage.setItem("token", respData.jsonToken);
    setJWTExpiration();
  }
};

export const postProjectData = async (url, data, method) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
    },
  });

  if (method === "PROJECT") {
    // TODO
  }

  if (method === "TASK") {
    // TODO
  }

  const respData = await resp.json();

  return respData;
};
