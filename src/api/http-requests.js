import { getAuthToken, setJWTExpiration } from "../auth/auth-functions";
import { origin } from "./endpoints";

export const postUserLogin = async (url, data) => {
  const token = getAuthToken();
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
    },
  });

  const respData = await resp.json();
  console.log(respData);

  if (!resp.ok) {
    throw new Error("TODO: create custom error message");
  }

  return respData;
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
  return respData;
};

export const postProjectData = async (url, data, id, method) => {
  const token = getAuthToken();
  const ep = url + id;

  const resp = await fetch(ep, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
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

export const deleteProject = async (url, pid) => {
  const token = getAuthToken();
  const ep = url + pid;

  await fetch(ep, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
    },
  });
};
