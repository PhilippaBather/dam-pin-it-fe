import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import FormGuest from "../forms/FormGuest";
import LoadingDots from "../ui/spinners/LoadingDots.jsx";
import { useUIContext } from "../../context/ui-context";
import { processData, processOwnedGuestProjects } from "./guest-utilities";
import { useProjectContext } from "../../context/project-context";
import { handleGuestHTTPRequest } from "./guest-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

// export const handleInvitationRequest = async (data) => {
//   const token = getAuthToken();
//   try {
//     const resp = await fetch("http://localhost:3000/guests", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Origin: origin,
//         Authorizaton: "Bearer " + token,
//       },
//       body: JSON.stringify(data),
//     });
//     const respData = await resp.json();
//     return respData;
//   } catch (e) {
//     console.error(e);
//   }
// };

function InviteGuest() {
  const { id } = useParams();
  const {
    currProject,
    ownedProjects,
    selectedSharedProject,
    setOwnedProjects,
  } = useProjectContext();
  const { selectOption, setSelectOption, setModalComponentType } =
    useUIContext();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionError, setSelectionError] = useState(false);

  const handleSubmit = async (data, event) => {
    event.preventDefault();

    if (selectOption !== null) {
      const processedData = processData(
        data,
        selectOption,
        id,
        currProject.projectId
      );
      try {
        const resp = await handleGuestHTTPRequest(
          null,
          "POST",
          "POST",
          processedData
        );
        // const resp = await handleInvitationRequest(processedData);
        setModalComponentType(null);
        const updatedProjects = processOwnedGuestProjects(
          resp,
          ownedProjects,
          selectedSharedProject.projectId
        );
        setOwnedProjects(updatedProjects);
        reset();
      } catch (e) {
        setIsLoading(false);
        setHttpError(
          e.message === FAILED_FETCH
            ? "Network error"
            : e.message === UNEXPECTED_JSON ||
              e.message.includes(UNDEFINED_PARAM)
            ? MALFORMED_REQUEST
            : e.message
        );
      }

      setSelectionError(true);
    }
  };

  const reset = () => {
    setHttpError(null);
    setSelectionError(false);
    setSelectOption(null);
    setIsLoading(false);
  };

  return (
    <Card>
      {httpError && <span className="error-msg__form-resp ">{httpError}</span>}
      {isLoading && !httpError && <LoadingDots />}
      <FormGuest
        handleGuestSubmit={handleSubmit}
        selectionError={selectionError}
        setSelectionError={setSelectionError}
      />
    </Card>
  );
}

export default InviteGuest;
