import { useState } from "react";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import LoadingDots from "../../components/ui/spinners/LoadingDots.jsx";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleGuestHTTPRequest } from "./guest-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function DeleteGuest() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedGuest, selectedSharedProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to remove ${selectedGuest.email} from the shared project ${selectedSharedProject.projectTitle}?`;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const resp = await handleGuestHTTPRequest(
        {
          id: null,
          pid: selectedSharedProject.projectId,
        },
        "DELETE",
        "DELETE_OWNED_PROJECT",
        null
      );
      setIsDeleted(resp.status === 204 ? true : false);

      if (resp.status === 204) {
        setModalComponentType(null);
      }
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
    setIsLoading(false);
  };

  const handleCancel = () => {
    setModalComponentType(null);
  };

  return (
    <Card>
      {httpError && <span className="error-msg__form-resp">{httpError}</span>}
      {isLoading && !httpError && <LoadingDots />}
      <CloseForm handleClose={handleCancel} />
      <form onSubmit={handleDelete}>
        <h1 className={"delete-modal_title"}>{alertMsg}</h1>
        <div className={"delete-modal_btn-container"}>
          {!isDeleted && (
            <button type="submit" className={"delete-modal_btn"}>
              Confirm
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default DeleteGuest;
