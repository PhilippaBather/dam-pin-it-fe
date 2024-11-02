import { origin } from "./endpoints";

export const fetchData = async (url, errMsg) => {
  const resp = await fetch(url);
  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(errMsg);
  }

  return data;
};

export const postData = async (url, data) => {
  // TODO: remove when JWT implemented
  const auth = "";
  const base64 = window.btoa(auth);

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: "Basic " + base64,
      "Content-Type": "application/json",
      Origin: origin,
    },
  });

  const respData = await resp.json();
  console.log(respData);
  if (!resp.ok) {
    if (resp.status === 500) {
      throw new Error(respData.message);
    }

    if (resp.status === 404) {
      throw new Error(respData.message);
    }

    if (resp.status === 409) {
      throw new Error(respData.message);
    }
  }

  return respData;
};
