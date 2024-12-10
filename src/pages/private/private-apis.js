// import { getAuthToken } from "../../auth/auth-functions";

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

// export const handleFetchSelectedProject = async (id, pid) => {
//   const token = getAuthToken();

//   const resp = await fetch(
//     `http://localhost:3000/project/user/${id}/project/${pid}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Origin: origin,
//         Authorizaton: "Bearer " + token,
//       },
//     }
//   );

//   await handleErrors(resp);

//   if (resp.status === 200) {
//     return await resp.json();
//   }
// };

// const handleErrors = async (resp) => {
//   if (!resp.ok) {
//     if (resp.status === 401) {
//       throw new Error("Insufficient privileges");
//     }

//     if (resp.status === 404) {
//       throw new Error("User not found");
//     }

//     if (resp.status === 500) {
//       throw new Error("Internal server error");
//     }
//   }
// };
