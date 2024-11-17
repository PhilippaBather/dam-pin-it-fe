import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import Card from "../../components/Card";
import DeleteProject from "../../components/DeleteProject";
import EditProject from "../../components/EditProject";
import Modal from "../../components/Modal";
import "../../stylesheets/project-dashboard.css";

function ProjectDashboard() {
  const [dialogType, setDialogType] = useState(null);
  const { id, pid } = useParams();
  const dialog = useRef();
  const { currProject, setCurrProject } = useProjectContext();
  const token = getAuthToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(
          `http://localhost:3000/project/user/${id}/project/${pid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Origin: origin,
              Authorizaton: "Bearer " + token,
            },
          }
        );
        const data = await resp.json();
        setCurrProject(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [id, pid, setCurrProject, token]);

  const handleEditProject = () => {
    dialog.current.open();
    setDialogType("EDIT");
  };

  const handleDeleteProject = () => {
    dialog.current.open();
    setDialogType("DELETE");
  };

  return (
    <>
      <Modal ref={dialog}>
        <Card>
          {dialogType === "EDIT" ? <EditProject /> : <DeleteProject />}
        </Card>
      </Modal>
      <main>
        <header className="dashboard-header">
          <h1 className="title-page">{currProject.title}</h1>
          <div className="dashboard-btn_container">
            <button
              type="button"
              className="dashboard-btn"
              onClick={handleEditProject}
            >
              Task &#128203;
            </button>
            <button
              type="button"
              className="dashboard-btn"
              onClick={handleEditProject}
            >
              Edit &#128393;
            </button>
            <button
              type="button"
              className="dashboard-btn"
              onClick={handleDeleteProject}
            >
              Delete &#x1f5d1;
            </button>
          </div>
        </header>
      </main>
    </>
  );
}

export default ProjectDashboard;
