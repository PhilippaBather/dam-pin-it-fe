import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleProjectHTTPRequest } from "./project-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNEXPECTED_JSON,
} from "../../api/http-requests.js";

function DeleteSharedProject() {
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const { selectedSharedProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to leave the shared project '${selectedSharedProject.projectTitle}'?`;

  const handleDeleteSharedProject = async () => {
    // const token = getAuthToken();

    try {
      // const resp = await fetch(
      //   `http://localhost:3000/guests/${id}/shared-projects/${selectedSharedProject.projectId}`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Origin: origin,
      //       Authorizaton: "Bearer " + token,
      //     },
      //   }
      // );

      const isDeleted = await handleProjectHTTPRequest(
        { id, pid: selectedSharedProject.projectId },
        "DELETE",
        "DELETE_SHARED",
        null
      );

      setDeleted(isDeleted);
      setModalComponentType(null);
    } catch (e) {
      setHttpError(
        e.message === FAILED_FETCH
          ? "Network error"
          : e.message === UNEXPECTED_JSON
          ? MALFORMED_REQUEST
          : e.message
      );
    }
  };

  const handleCancel = () => {
    setModalComponentType(null);
  };

  return (
    <Card>
      <CloseForm handleClose={handleCancel} />
      <form onSubmit={handleDeleteSharedProject}>
        <h1 className={"delete-modal_title"}>{alertMsg}</h1>
        {httpError && <span className="error-msg__generic">{httpError}</span>}
        <div className={"delete-modal_btn-container"}>
          {!deleted && (
            <button type="submit" className={"delete-modal_btn"}>
              Confirm
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default DeleteSharedProject;
