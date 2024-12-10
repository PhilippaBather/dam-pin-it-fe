import { useEffect, useState } from "react";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import LoadingDots from "../../components/ui/spinners/LoadingDots.jsx";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleGuestHTTPRequest } from "./guest-apis";
import { updateGuestListOnDeletion } from "./guest-utilities.js";
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
  const {
    selectedGuest,
    selectedSharedProject,
    ownedProjects,
    setOwnedProjects,
  } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to remove ${selectedGuest.email} from the shared project ${selectedSharedProject.title}?`;

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const resp = await handleGuestHTTPRequest(
        {
          email: selectedGuest.email,
          pid: selectedSharedProject.projectId,
        },
        "DELETE",
        "DELETE_GUEST",
        null
      );

      setIsDeleted(resp.status === 204);

      // updated state
      const updatedGuestList = updateGuestListOnDeletion(
        selectedGuest.email,
        selectedSharedProject.projectId,
        ownedProjects
      );
      setOwnedProjects(updatedGuestList);
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
    setIsLoading(false);
  };

  const handleCancel = () => {
    setModalComponentType(null);
  };

  useEffect(() => {
    isDeleted;
  }, [isDeleted]);

  return (
    <Card>
      <CloseForm handleClose={handleCancel} />
      {httpError && <span className="error-msg__generic">{httpError}</span>}
      <form onSubmit={handleDelete}>
        {isLoading && !httpError && <LoadingDots />}
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
