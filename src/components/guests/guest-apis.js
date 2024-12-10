import { UNREG_GUEST } from "../../api/api-constants";
import { getAuthToken } from "../../auth/auth-functions";

export const handleGuestHTTPRequest = async (reqMethod, data, url) => {
  const token = getAuthToken();
  data = data ? JSON.stringify(data) : null;

  const resp = await fetch(url, {
    method: reqMethod,
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
    },
    body: data,
  });

  const respData = await resp.json();

  if (resp.status === 200 || resp.ok) {
    return respData;
  }

  if (respData === null) {
    return;
  }

  if (respData.code === "404") {
    throw new Error(UNREG_GUEST);
  }

  if (respData.code === "500") {
    throw new Error("Internal server error");
  } else {
    throw new Error(resp.message);
  }
};
