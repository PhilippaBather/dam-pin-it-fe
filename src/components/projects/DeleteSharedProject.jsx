import { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleProjectHTTPRequest } from "./project-apis";
import { deleteSharedProject } from "./project-utilities.js";
import {
  FAILED_FETCH,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";

function DeleteSharedProject() {
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const {
    selectedSharedProject,
    setSelectedSharedProject,
    sharedProjects,
    setSharedProjects,
  } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to leave the shared project?`;

  const handleDeleteSharedProject = async (e) => {
    e.preventDefault();

    try {
      const isDeleted = await handleProjectHTTPRequest(
        { id, pid: selectedSharedProject.projectId },
        "DELETE",
        "DELETE_SHARED",
        null
      );

      setDeleted(isDeleted);
      resetState();
    } catch (e) {
      if (
        e.message === UNEXPECTED_JSON ||
        e.message.includes(UNDEFINED_PARAM)
      ) {
        resetState();
      }

      setHttpError(e.message === FAILED_FETCH ? "Network error" : e.message);
    }
  };

  const resetState = () => {
    deleteSharedProject(
      sharedProjects,
      setSharedProjects,
      selectedSharedProject.projectId
    );
    setSelectedSharedProject(null);
    setModalComponentType(null);
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
