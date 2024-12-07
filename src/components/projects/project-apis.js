import { BASE_URL } from "../../api/endpoints";
import { getAuthToken } from "../../auth/auth-functions";

const getURL = (ids, action) => {
  const { id, pid } = ids;
  switch (action) {
    case "GET_PROJECTS":
      return `${BASE_URL}projects/${parseInt(id)}`;
    case "GET_PROJECT":
      return `${BASE_URL}project/user/${id}/project/${pid}`;
    case "POST":
      return `${BASE_URL}projects/${id}`;
    case "PUT":
      return;
    case "DELETE":
      return `${BASE_URL}project/${pid}`;
    case "DELETE_SHARED":
      return `guests/${id}/shared-projects/${pid}`;
    default:
      return null;
  }
};

export const handleProjectHTTPRequest = async (
  ids,
  reqMethod,
  action,
  data
) => {
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
    return true;
  } else {
    await handleErrors(resp);
  }
};

// export const handleFetchProjects = async (id) => {
//   const token = getAuthToken();
//   const resp = await fetch(`http://localhost:3000/projects/${parseInt(id)}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Origin: origin,
//       Authorizaton: "Bearer " + token,
//     },
//   });

//   await handleErrors(resp);

//   if (resp.status === 200) {
//     return await resp.json();
//   }
// };

// export const handleCreateProjectRequest = async (data, id, setHttpReqError) => {
//   const token = getAuthToken();
//   try {
//     const resp = await fetch(`http://localhost:3000/projects/${id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Origin: origin,
//         Authorizaton: "Bearer " + token,
//       },
//       body: JSON.stringify(data),
//     });

//     await handleErrors(resp);

//     if (resp.status === 201) {
//       return await resp.json();
//     }
//   } catch (e) {
//     setHttpReqError(e.message);
//   }
// };

export const handleFetchSelectedProject = async (id, pid) => {
  const token = getAuthToken();

  const resp = await fetch(
    `http://localhost:3000/project/user/${id}/project/${pid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Authorizaton: "Bearer " + token,
      },
    }
  );

  await handleErrors(resp);

  if (resp.status === 200) {
    return await resp.json();
  }
};

export const handleUpdateProjectRequest = async (url, data, pid) => {
  const token = getAuthToken();

  url += pid;

  const resp = await fetch(url, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      Authorizaton: "Bearer " + token,
    },
  });

  await handleErrors(resp);

  if (resp.status === 200 || resp.status === 201) {
    return await resp.json();
  }
};

export const handleDeleteProjectRequest = async (pid) => {
  const token = getAuthToken();
  try {
    const resp = await fetch(`http://localhost:3000/project/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Authorizaton: "Bearer " + token,
      },
    });

    return resp.status;
  } catch (e) {
    console.error(e);
  }
};

export const handleDeleteSharedProjectRequest = async (id, pid) => {
  const token = getAuthToken();

  const resp = await fetch(
    `http://localhost:3000/guests/${id}/shared-projects/${pid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Authorizaton: "Bearer " + token,
      },
    }
  );

  await handleErrors(resp);

  if (resp.status === 204) {
    return await resp.json();
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
