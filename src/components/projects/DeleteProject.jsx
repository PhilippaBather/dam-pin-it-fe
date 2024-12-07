import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function DeleteProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();
  const [httpError, setHttpError] = useState(null);
  const [deleted, setIsDeleted] = useState(false);

  const alertMsg = `Are you sure you want to delete project '${currProject.title}'?`;

  const handleDeleteProject = async (e) => {
    e.preventDefault();
    //const resp = await deleteProjectRequest(currProject.projectId);

    try {
      const isDeleted = await handleProjectHTTPRequest(
        { id: id, pid: currProject.projectId },
        "DELETE",
        "DELETE",
        null
      );
      setIsDeleted(isDeleted);
      setModalComponentType(null);
      navigate(`/projects-home/user/${id}`);
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
      <form onSubmit={handleDeleteProject}>
        <h1 className={"delete-modal_title"}>{alertMsg}</h1>
        {httpError && <span className="error-msg__generic">{httpError}</span>}
        <div className={"delete-modal_btn-container"}>
          {!deleted && (
            <button
              type="submit"
              hidden={httpError}
              className={"delete-modal_btn"}
            >
              Confirm
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default DeleteProject;
