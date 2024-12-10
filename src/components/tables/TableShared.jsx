import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../ui/Card";
import LoadingDots from "../ui/spinners/LoadingDots.jsx";
import { useProjectContext } from "../../context/project-context";
import { useUIContext } from "../../context/ui-context";
import {
  FAILED_FETCH,
  MALFORMED_REQUEST,
  UNDEFINED_PARAM,
  UNEXPECTED_JSON,
} from "../../api/api-constants.js";
import "../../stylesheets/table.css";
import { handleManagementHTTPRequest } from "./table-apis.js";

function TableShared() {
  const { id } = useParams();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedSharedProject, sharedProjects, setSharedProjects } =
    useProjectContext();
  const { setModalComponentType } = useUIContext();

  const handleLeaveSharedProject = (project) => {
    setSelectedSharedProject(project);
    setModalComponentType("DELETE_SHARED_PROJECT");
  };

  const route = `/projects-home/user/${id}/project/`;

  useEffect(() => {
    setHttpError(null);
    const getSharedProjects = async () => {
      setIsLoading(true);
      try {
        const projects = await handleManagementHTTPRequest(
          id,
          "GET",
          "SHARED_PROJECTS",
          null
        );
        setSharedProjects(projects);
      } catch (e) {
        setIsLoading(false);
        setHttpError(
          e.message === FAILED_FETCH
            ? "Network error"
            : e.message === UNEXPECTED_JSON ||
              e.message.includes(UNDEFINED_PARAM)
            ? MALFORMED_REQUEST
            : e.message
        );
      }
      setIsLoading(false);
      // const projects = await handleGetSharedProjects(id);
    };
    getSharedProjects();
  }, [id, setSharedProjects, setIsLoading, setHttpError]);

  return (
    <section className="section-table section-table__shared">
      <Card isTable>
        <h1 className="table-title">Shared Projects</h1>
        <div className="table-container__head">
          <div className="table-row__head head-title">Project</div>
          <div className="table-row__head">Permissions</div>
          <div className="table-row__head">Deadline</div>
          <div className="table-row__head">Owner</div>
          <div className="table-row__head head-email">Email</div>
          <div className="table-row__head">Remove</div>
        </div>
        {sharedProjects &&
          sharedProjects.map((project) => (
            <div key={project.projectId} className="table-row__items">
              <div className="table-row__body item-title">
                <Link
                  className="table-row__link"
                  to={route + project.projectId}
                >
                  {project.projectTitle}
                </Link>
              </div>
              <div className="table-row__body">
                {project.permissions.replace("_", " ").toLowerCase()}
              </div>
              <div className="table-row__body">{project.deadline}</div>
              <div className="table-row__body">{`${project.ownerName} ${project.ownerSurname}`}</div>
              <div className="table-row__body item-email">
                {project.ownerEmail}
              </div>
              <div className="table-row__body">
                <button
                  className="card-btn table-btn"
                  type="button"
                  onClick={() => handleLeaveSharedProject(project)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        {!httpError && !isLoading && sharedProjects.length == 0 && (
          <p className="table-msg__not-found">No shared projects found.</p>
        )}
        {httpError && <span className="table-msg__error">{httpError}</span>}
        {!httpError && isLoading && sharedProjects.length === 0 && (
          <LoadingDots dotColor="rgba(202, 247, 170, 0.5)" />
        )}
      </Card>
    </section>
  );
}

export default TableShared;
