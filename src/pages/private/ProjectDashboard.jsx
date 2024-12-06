import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthToken } from "../../auth/auth-functions";
import ModalHandler from "../../components/ui/ModalHandler";
import "../../stylesheets/project-dashboard.css";
import ContextContainer from "../../components/draggable/ContextContainer";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";

function ProjectDashboard() {
  const { id, pid } = useParams();
  const { currProject, setCurrProject, setTasks } = useProjectContext();
  const { modalComponentType, setModalComponentType } = useUIContext();

  useEffect(() => {
    async function fetchProjectData() {
      const token = getAuthToken();
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
    fetchProjectData();
  }, [id, pid, setCurrProject, setTasks]);

  const handleClick = (type) => {
    setModalComponentType(type);
  };

  return (
    <>
      {modalComponentType && <ModalHandler />}
      <main>
        <header className="dashboard-header">
          <h1 className="title-page">{currProject.title}</h1>
          <div className="dashboard-btn_container">
            <button
              type="button"
              className="dashboard-btn"
              onClick={() => handleClick("ADD_TASK")}
            >
              Task &#128203;
            </button>
            <button
              type="button"
              className="dashboard-btn"
              onClick={() => handleClick("EDIT_PROJECT")}
            >
              Edit &#128393;
            </button>
            <button
              type="button"
              className="dashboard-btn"
              onClick={() => handleClick("DELETE_PROJECT")}
            >
              Delete &#x1f5d1;
            </button>
          </div>
        </header>
        <p className="para-info">
          <span className="para-info_title">Deadline:</span>
          {new Date(currProject.deadline).toLocaleDateString()}
        </p>
        <p className="para-info">
          <span className="para-info_title">Description:</span>
          {currProject.description}
        </p>
        <ContextContainer />
      </main>
    </>
  );
}

export default ProjectDashboard;
