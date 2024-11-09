import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectContext } from "../context/project-context";
import { handleHttpReq } from "../api/http-requests";
import { projectDeleteEndpoint as url } from "../api/endpoints";

function DeleteProject() {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { id, pid } = useParams();
  const { currProject } = useProjectContext();

  const alertMsg = `Are you sure you want to delete project ${currProject.title}?`;

  const handleDeleteProject = async (e) => {
    e.preventDefault();

    try {
      const resp = await handleHttpReq(url, null, pid, "DELETE", "PROJECT");
      setIsDeleted(resp.status === 204 ? true : false);
      console.log(resp);
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
          {!isDeleted && (
            <button type="submit" className={"delete-modal_btn"}>
              Confirm
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default DeleteProject;
