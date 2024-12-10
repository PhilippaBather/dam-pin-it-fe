import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import FormGuest from "../forms/FormGuest";
import LoadingDots from "../ui/spinners/LoadingDots.jsx";
import { processData, processUpdatedPermissions } from "./guest-utilities";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleGuestHTTPRequest } from "./guest-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function UpdateGuest() {
  const { id } = useParams();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionError, setSelectionError] = useState(false);
  const { selectedGuest, currProject, ownedProjects, setOwnedProjects } =
    useProjectContext();
  const { selectOption, setSelectOption, setModalComponentType } =
    useUIContext();

  const handleGuestUpdate = async (data) => {
    let processedData;
    console.log(selectOption);

    if (selectOption === null) {
      setSelectionError(true);
      return;
    }

    processedData = processData(data, selectOption, id, currProject.projectId);
    console.log(processedData);

    try {
      setIsLoading(true);
      console.log("here");
      const resp = await handleGuestHTTPRequest(
        null,
        "PUT",
        "PUT",
        processedData
      );

      const updatedProjects = processUpdatedPermissions(
        resp,
        ownedProjects,
        currProject.projectId
      );

      setOwnedProjects(updatedProjects);
      setModalComponentType(null);
    } catch (e) {
      setIsLoading(false);
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON || e.message.includes(UNDEFINED_PARAM)
          ? MALFORMED_REQUEST
          : e.message
      );
    }

    reset();
  };

  const reset = () => {
    setHttpError(null);
    setIsLoading(false);
    setSelectionError(false);
    setSelectOption(null);
  };

  const handleCancel = () => {
    setModalComponentType(null);
  };

  return (
    <Card>
      {httpError && <span className="error-msg__form-resp">{httpError}</span>}
      {isLoading && !httpError && <LoadingDots />}
      <CloseForm handleClose={handleCancel} />
      <FormGuest
        guest={selectedGuest}
        handleGuestSubmit={handleGuestUpdate}
        setSelectionError={setSelectionError}
        selectionError={selectionError}
        setSelectOption={setSelectOption}
      />
    </Card>
  );
}

export default UpdateGuest;
