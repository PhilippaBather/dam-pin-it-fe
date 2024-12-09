import { BASE_URL } from "../../api/api-constants";
import { getAuthToken } from "../../auth/auth-functions";

const getURL = (ids, action) => {
  const { tid, id, pid } = ids;
  switch (action) {
    case "GET_TASK":
    case "POST":
      return `${BASE_URL}tasks/user/${id}/project/${pid}`;
    case "POST_BATCH":
      return `${BASE_URL}tasks-list/user/${id}/project/${pid}`;
    case "UPDATE":
      return `${BASE_URL}task/${tid}/user/${id}/project/${pid}`;
    case "GET_COMMENTS":
      return `${BASE_URL}comments/${tid}`;
    case "POST_COMMENT":
      return `${BASE_URL}comments/${tid}/user/${id}`;
    default:
      return null;
  }
};

export const handleTaskHTTPRequest = async (ids, reqMethod, action, data) => {
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
    return;
  } else {
    await handleErrors(resp);
    return;
  }
};

const handleErrors = async (resp) => {
  const error = await resp.json();

  if (!resp.ok) {
    if (resp.status === 401) {
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

// export const handleAddNewTask = async (id, pid, processedData) => {
//   const token = getAuthToken();
//   const resp = await fetch(
//     `http://localhost:3000/tasks/user/${id}/project/${pid}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Origin: origin,
//         Authorizaton: "Bearer " + token,
//       },
//       body: JSON.stringify(processedData),
//     }
//   );
//   await handleErrors(resp);

//   if (resp.status === 201) {
//     return await resp.json();
//   }
// };

// export const handleUpdatedTaskOrderOnAddTask = async (
//   id,
//   pid,
//   updatedTaskOrderInColumn
// ) => {
//   const token = getAuthToken();

//   const resp = await fetch(`${BASE_URL}/tasks-list/user/${id}/project/${pid}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Origin: origin,
//       Authorizaton: "Bearer " + token,
//     },
//     body: JSON.stringify(updatedTaskOrderInColumn),
//   });

//   await handleErrors(resp);

//   if (resp.status === 201 || resp.status === 200) {
//     return await resp.json();
//   }
// };
