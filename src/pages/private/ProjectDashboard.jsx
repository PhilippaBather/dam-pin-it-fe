import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingDots from "../../components/ui/spinners/LoadingDots";
import ModalHandler from "../../components/ui/ModalHandler";
import ContextContainer from "../../components/draggable/ContextContainer";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import { handleProjectHTTPRequest } from "../../components/projects/project-apis";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/http-requests.js";
import "../../stylesheets/project-dashboard.css";

function ProjectDashboard() {
  const { id, pid } = useParams();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currProject, setCurrProject, setTasks } = useProjectContext();
  const {
    setDashboardError,
    setGlobalError,
    modalComponentType,
    setModalComponentType,
  } = useUIContext();

  useEffect(() => {
    async function fetchProjectData() {
      setHttpError(false);
      setDashboardError(false);
      try {
        setIsLoading(true);
        const data = await handleProjectHTTPRequest(
          { id, pid },
          "GET",
          "GET_PROJECT",
          null
        );
        setCurrProject(data);
      } catch (e) {
        setIsLoading(false);
        if (e.message.toLowerCase().includes("user not found")) {
          setGlobalError(e.message);
          navigate("/error-page");
        } else {
          setDashboardError(true);
          setHttpError(
            e.message === FAILED_FETCH
              ? "Network error"
              : e.message === UNEXPECTED_JSON ||
                e.message.includes(UNDEFINED_PARAM)
              ? MALFORMED_REQUEST
              : e.message
          );
        }
      }
    }
    fetchProjectData();
  }, [
    id,
    pid,
    setCurrProject,
    setDashboardError,
    setGlobalError,
    setTasks,
    setIsLoading,
    navigate,
  ]);

  const handleClick = (type) => {
    setModalComponentType(type);
  };

  const errorTxt = "Unable to load project details: ";

  return (
    <>
      {modalComponentType && <ModalHandler />}
      <main>
        <header className="dashboard-header__project">
          {isLoading && !httpError && !currProject && (
            <LoadingDots dotColor="rgba(251, 5, 173, 0.7)" />
          )}
          {httpError && (
            <h1 className="title-page dashboard-error">
              {errorTxt}
              {httpError}
            </h1>
          )}
          <h1 hidden={httpError} className="title-page">
            {currProject.title}
          </h1>
          <div className="dashboard-btn_container">
            {currProject.permissions === "OWNER" && (
              <button
                hidden={httpError}
                type="button"
                className="dashboard-btn"
                onClick={() => handleClick("INVITE_GUEST")}
              >
                Invite &#128389;
              </button>
            )}
            <button
              hidden={httpError}
              type="button"
              className="dashboard-btn"
              onClick={() => handleClick("ADD_TASK")}
            >
              Task &#128203;
            </button>
            <button
              hidden={httpError}
              type="button"
              className="dashboard-btn"
              onClick={() => handleClick("EDIT_PROJECT")}
            >
              Edit &#128393;
            </button>
            <button
              hidden={httpError}
              type="button"
              className="dashboard-btn"
              onClick={() => handleClick("DELETE_PROJECT")}
            >
              Delete &#x1f5d1;
            </button>
          </div>
        </header>
        <p hidden={httpError} className="para-title">
          Deadline:
          <span className="para-info">
            {"  "}
            {new Date(currProject.deadline).toLocaleDateString()}{" "}
          </span>
        </p>
        <p hidden={httpError} className="para-title">
          Description:
          {"  "}
          <span className="para-info">{currProject.description}</span>
        </p>
        <ContextContainer />
      </main>
    </>
  );
}

export default ProjectDashboard;
