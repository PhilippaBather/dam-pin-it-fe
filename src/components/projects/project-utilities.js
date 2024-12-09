// import { getAuthToken } from "../../auth/auth-functions";

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

//     return await resp.json();
//   } catch (e) {
//     setHttpReqError(e.message);
//   }
// };

// export const deleteProjectRequest = async (pid) => {
//   const token = getAuthToken();
//   try {
//     const resp = await fetch(`http://localhost:3000/project/${pid}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Origin: origin,
//         Authorizaton: "Bearer " + token,
//       },
//     });

//     return resp.status;
//   } catch (e) {
//     console.error(e);
//   }
// };

export const validateDeadlineDate = (deadline, setDeadlineValError) => {
  const currDate = Date.now();
  const parsedProjectDate = Date.parse(deadline);

  if (parsedProjectDate < currDate) {
    //setDeadlineValError("Project deadline cannot be in the past.");
    setDeadlineValError(true);
    return true;
  }

  return false;
};
