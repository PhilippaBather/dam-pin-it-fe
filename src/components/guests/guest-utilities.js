import { convertToPermissionsEnum } from "./guest-permissions-dropdown-settings";

export const processData = (data, selectedOption, id, pid) => {
  const body = data.msg.replace("Include an optional message...", "");

  console.log("here");
  console.log(convertToPermissionsEnum[selectedOption]);

  return {
    email: data.email,
    body: body.length > 0 ? body : "",
    permissions: convertToPermissionsEnum[selectedOption],
    userId: id,
    projectId: pid,
  };
};

export const handleInvitationRequest = async (data, token) => {
  try {
    const resp = await fetch("http://localhost:3000/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Authorizaton: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const respData = await resp.json();
    return respData;
  } catch (e) {
    console.error(e);
  }
};
