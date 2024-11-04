import { useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../context/project-context";
import { deleteProject } from "../api/http-requests";
import { projectDeleteEndpoint as url } from "../api/endpoints";

function DeleteProject() {
  const navigate = useNavigate();
  const { id, pid } = useParams();
  const { currProject } = useProjectContext();

  const alertMsg = `Are you sure you want to delete project ${currProject.title}?`;

  const handleDeleteProject = async (e) => {
    e.preventDefault();

    try {
      await deleteProject(url, pid);
      navigate(`/projects-home/user/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form method="dialog">
        <div className={"delete-modal_btn-container-cancel"}>
          <button method="dialog" type="cancel" className={"delete-modal_btn"}>
            Cancel
          </button>
        </div>
      </form>
      <form onSubmit={handleDeleteProject}>
        <h1 className={"delete-modal_title"}>{alertMsg}</h1>
        <div className={"delete-modal_btn-container"}>
          <button type="submit" className={"delete-modal_btn"}>
            Confirm
          </button>
        </div>
      </form>
    </>
  );
}

export default DeleteProject;
