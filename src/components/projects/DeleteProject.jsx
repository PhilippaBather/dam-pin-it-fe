import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../ui/Card";
import CloseForm from "../forms/CloseForm";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { deleteProjectRequest } from "./project-utilities";

function DeleteProject() {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { currProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to delete project '${currProject.title}'?`;

  const handleDeleteProject = async (e) => {
    e.preventDefault();
    console.log(currProject.projectId);
    const resp = await deleteProjectRequest(currProject.projectId);
    console.log(resp);

    if (resp === 204) {
      setIsDeleted(true);
      setModalComponentType(null);
      navigate(`/projects-home/user/${id}`);
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

export default DeleteProject;
