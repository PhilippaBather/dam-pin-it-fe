import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../../context/project-context";
import { getAuthToken } from "../../auth/auth-functions";
import Card from "../../components/ui/Card";
import AddTask from "../../components/tasks/AddTask";
import DeleteProject from "../../components/projects/DeleteProject";
import EditProject from "../../components/projects/EditProject";
import Modal from "../../components/ui/Modal";
import "../../stylesheets/project-dashboard.css";
import ContextContainer from "../../components/draggable/ContextContainer";

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

  const handleAddTask = () => {
    dialog.current.open();
    setDialogType("ADD_TASK");
  };

  return (
    <>
      <Modal ref={dialog}>
        <Card>
          {dialogType === "EDIT" ? (
            <EditProject />
          ) : dialogType === "DELETE" ? (
            <DeleteProject />
          ) : (
            <AddTask />
          )}
        </Card>
      </Modal>
      <main>
        <header className="dashboard-header">
          <h1 className="title-page">{currProject.title}</h1>
          <div className="dashboard-btn_container">
            <button
              type="button"
              className="dashboard-btn"
              onClick={handleAddTask}
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
        <ContextContainer />
      </main>
    </>
  );
}

export default ProjectDashboard;
