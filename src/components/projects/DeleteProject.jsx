import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../ui/Card";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleHttpReq } from "../../api/http-requests";
import { projectEndpoint as url } from "../../api/endpoints";

function DeleteProject() {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { id, pid } = useParams();
  const { currProject } = useProjectContext();
  const { setModalComponentType } = useUIContext();

  const alertMsg = `Are you sure you want to delete project ${currProject.title}?`;

  const handleDeleteProject = async (e) => {
    e.preventDefault();

    try {
      const resp = await handleHttpReq(url, null, pid, "DELETE", "PROJECT");
      setIsDeleted(resp.status === 204 ? true : false);
      console.log(resp);
      navigate(`/projects-home/user/${id}`);
      setModalComponentType(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setModalComponentType(null);
  };

  return (
    <Card>
      <div className="form-btn__container-close">
        <button className="form-btn" type="button" onClick={handleClose}>
          Cancel
        </button>
      </div>
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
